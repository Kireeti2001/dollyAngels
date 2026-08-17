import { validateEnquiry, toWhatsAppNumber, enquiryLines } from "../../src/lib/contact.mjs";

const GRAPH_VERSION = "v21.0";
const MAX_MESSAGE_CHARS = 1000;

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export function buildTemplatePayload(to, templateName, languageCode, parameters = []) {
  return {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
      ...(parameters.length > 0
        ? {
            components: [
              {
                type: "body",
                parameters: parameters.map((text) => ({ type: "text", text: String(text) })),
              },
            ],
          }
        : {}),
    },
  };
}

async function sendWhatsApp(payload, { token, phoneNumberId }) {
  const response = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body?.error?.message || `WhatsApp API returned ${response.status}`);
  }
  return body?.messages?.[0]?.id || "sent";
}

// ponytail: no rate limiting. Ceiling — a public endpoint that spends WhatsApp
// credits. If it gets abused, put a Netlify rate-limit rule or a hCaptcha in front.
export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let formData;
  try {
    formData = typeof event.body === "string" ? JSON.parse(event.body) : event.body || {};
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const errors = validateEnquiry(formData);
  if (errors.length > 0) return json(400, { error: errors[0] });
  if (String(formData.message || "").length > MAX_MESSAGE_CHARS) {
    return json(400, { error: "Message is too long" });
  }

  const {
    WHATSAPP_TOKEN: token,
    WHATSAPP_PHONE_NUMBER_ID: phoneNumberId,
    WHATSAPP_TEMPLATE: template = "enquiry_received",
    WHATSAPP_TEMPLATE_LANG: templateLang = "en",
    WHATSAPP_COUNTRY_CODE: countryCode = "91",
    ENQUIRY_FORWARD_URL: forwardUrl,
  } = process.env;

  if (!forwardUrl && !(token && phoneNumberId)) {
    return json(501, { error: "Enquiry endpoint is not configured" });
  }

  console.log("Enquiry received:", enquiryLines(formData).join(" | "));

  const result = { ok: true };

  if (forwardUrl) {
    try {
      const response = await fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      result.forwarded = response.ok;
      if (!response.ok) result.forwardError = `Forward returned ${response.status}`;
    } catch (err) {
      result.forwarded = false;
      result.forwardError = err.message;
    }
  }

  if (token && phoneNumberId) {
    try {
      const to = toWhatsAppNumber(formData.phone, countryCode);
      const payload = buildTemplatePayload(to, template, templateLang, [formData.parentName.trim()]);
      result.whatsappMessageId = await sendWhatsApp(payload, { token, phoneNumberId });
    } catch (err) {
      console.error("WhatsApp auto-reply failed:", err.message);
      result.whatsappError = err.message;
    }
  }

  // The enquiry is only lost if every channel failed — then let the site fall back to email.
  if (result.forwarded !== true && !result.whatsappMessageId) {
    return json(502, { error: result.forwardError || result.whatsappError || "Could not deliver enquiry" });
  }

  return json(200, result);
};
