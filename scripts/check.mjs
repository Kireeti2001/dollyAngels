import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  validateEnquiry,
  isContactApiConfigured,
  digitsOnly,
  buildMailtoHref,
  buildWhatsAppHref,
  toWhatsAppNumber,
  enquiryLines,
} from "../src/lib/contact.mjs";
import { buildTemplatePayload, handler } from "../netlify/functions/enquiry.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const school = JSON.parse(readFileSync(join(root, "src/data/school.json"), "utf8"));
const gallery = JSON.parse(readFileSync(join(root, "src/data/gallery.json"), "utf8"));

assert.ok(school.name);
assert.ok(school.contact.email.includes("@"));
assert.ok(school.contact.phoneHref.startsWith("tel:"));
assert.ok(school.programs.length >= 4);
assert.ok(school.events.every((e) => e.date && e.title));
assert.ok(gallery.albums.length >= 1);
assert.ok(gallery.albums.every((a) => a.id && a.title && Array.isArray(a.images) && a.images.length > 0));

assert.equal(validateEnquiry({ parentName: "", email: "", phone: "" }).length, 3);
assert.equal(
  validateEnquiry({
    parentName: "Asha",
    email: "asha@example.com",
    phone: "+91 98765 43210",
  }).length,
  0
);
assert.ok(validateEnquiry({ parentName: "Asha", email: "nope", phone: "123" }).length >= 2);
assert.equal(digitsOnly("+91 98765 43210").slice(-10), "9876543210");
assert.equal(isContactApiConfigured(""), false);
assert.equal(isContactApiConfigured("https://formspree.io/f/YOUR_FORM_ID"), false);
assert.equal(isContactApiConfigured("https://formspree.io/f/xyzabcde"), true);
assert.ok(
  buildMailtoHref({ parentName: "Asha", email: "a@b.c", phone: "1" }, "info@dollyangels.com").startsWith(
    "mailto:"
  )
);

const enquiry = {
  parentName: "Asha",
  email: "asha@example.com",
  phone: "9876543210",
  childName: "Ira",
  childAge: "4",
  message: "Is a tour possible on Saturday?",
};

assert.equal(toWhatsAppNumber("9876543210"), "919876543210");
assert.equal(toWhatsAppNumber("09876543210"), "919876543210");
assert.equal(toWhatsAppNumber("+91 98765 43210"), "919876543210");
assert.equal(toWhatsAppNumber("9876543210", "44"), "449876543210");
assert.equal(toWhatsAppNumber(""), "");
assert.ok(buildWhatsAppHref(enquiry, school.contact.phone).startsWith("https://wa.me/911234567890?text="));
assert.ok(decodeURIComponent(buildWhatsAppHref(enquiry, school.contact.phone)).includes("Child: Ira"));
assert.ok(enquiryLines(enquiry).includes("Child's age: 4"));
assert.ok(!enquiryLines({ ...enquiry, childName: "" }).some((l) => l.startsWith("Child:")));

const payload = buildTemplatePayload("919876543210", "enquiry_received", "en", ["Asha"]);
assert.equal(payload.messaging_product, "whatsapp");
assert.equal(payload.template.components[0].parameters[0].text, "Asha");
assert.equal(buildTemplatePayload("91", "t", "en").template.components, undefined);

const post = (body) => handler({ httpMethod: "POST", body: JSON.stringify(body) });
assert.equal((await handler({ httpMethod: "GET" })).statusCode, 405);
assert.equal((await post({ parentName: "", email: "", phone: "" })).statusCode, 400);
assert.equal((await post({ ...enquiry, message: "x".repeat(1001) })).statusCode, 400);
// No WhatsApp/forward env in this shell, so the function must tell the site to fall back.
assert.equal((await post(enquiry)).statusCode, 501);

console.log("ok: school data + contact helpers + whatsapp enquiry function");
