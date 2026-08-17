# Enquiry form: where the data goes, and automatic WhatsApp replies

## 1. How the contact page works today

`src/pages/Contact/ContactPage.jsx` keeps every field in one React state object:

```js
const [formData, setFormData] = useState({
  parentName: "", email: "", phone: "", childName: "", childAge: "", message: "",
});
```

Each input has `name="parentName"` (etc.) and shares one `handleInputChange`, so the state keys
match the input names. On submit:

1. `validateEnquiry(formData)` in `src/lib/contact.mjs` checks name, email, and a 10-digit phone.
2. If `VITE_CONTACT_API` is set, the whole object is `POST`ed as JSON to that URL.
3. If it is not set (or the POST fails), the browser opens a `mailto:` link built by
   `buildMailtoHref` so the enquiry still reaches the school.

So **the form data is just a JSON body** with those six keys. Whatever you point
`VITE_CONTACT_API` at receives it:

| `VITE_CONTACT_API` value | What you get |
| --- | --- |
| unset | Visitor's email app opens, pre-filled. Nothing is stored. |
| `https://formspree.io/f/xxxx` | Every enquiry lands in your email inbox and Formspree dashboard. |
| `/.netlify/functions/enquiry` | The function in this repo: logs the enquiry, optionally forwards it, and sends the WhatsApp auto-reply. |

## 2. The one rule that shapes everything: WhatsApp's 24-hour window

WhatsApp does not let a business send a free-form message to someone out of the blue.

- **Business-initiated** (a parent filled a web form, never messaged you): you may only send a
  **pre-approved template message**. Meta reviews templates, usually quickly, and utility
  templates are billed per message.
- **Parent-initiated** (the parent messages you first): you may reply with any text for 24 hours,
  free of charge.

Both routes below are built into this repo. Route A needs no code, no account, and no cost.

## 3. Route A — instant reply with the free WhatsApp Business app (recommended first)

The contact page now has a **Send on WhatsApp** button next to Submit. It validates the form,
then opens `https://wa.me/<school number>?text=<the enquiry>` (see `buildWhatsAppHref`), so the
parent sends the enquiry themselves. Because the parent messages first, WhatsApp's built-in
auto-reply is allowed.

Setup, on the school's phone:

1. Install **WhatsApp Business** (free) with the school number from `src/data/school.json`.
2. Go to **Settings → Business tools → Greeting message**, turn it on, and write the reply, for
   example: *"Thanks for your enquiry! Our admissions team will call you within one working day.
   Office hours: Mon–Fri, 8 AM – 3 PM."* Set the recipients to *Everyone*.
3. Optionally add an **Away message** for outside office hours and **Quick replies** for the
   questions you answer most.

Result: the parent taps the button, sends the prefilled enquiry, and gets a reply within seconds.
The enquiry also sits in the school's WhatsApp inbox, which is the easiest record to keep.

The number in the link comes from `school.contact.phone`, so update `src/data/school.json` and
nothing else. `toWhatsAppNumber` adds the `91` country code when only 10 digits are present; pass
a different code, or store the number with `+<code>`, for other countries.

## 4. Route B — true server-side auto-reply with the WhatsApp Cloud API

Use this when you want the text to go out the moment the form is submitted, without the parent
opening WhatsApp. `netlify/functions/enquiry.mjs` does it.

### What you need from Meta

1. A **Meta Business account** and a **WhatsApp Business Account** at
   [developers.facebook.com](https://developers.facebook.com) → create an app → add the
   **WhatsApp** product.
2. A **phone number dedicated to the Cloud API**. It cannot be signed in to the regular WhatsApp
   or WhatsApp Business app at the same time, so this is usually a *second* number — Route A can
   keep running on the first one.
3. A **permanent access token**: Business Settings → System users → add a system user with the
   `whatsapp_business_messaging` permission and generate a token. The 24-hour test token from the
   dashboard is fine for trying it out but expires.
4. The **Phone number ID** shown on the WhatsApp → API Setup page (not the phone number itself).
5. An **approved message template**. In WhatsApp Manager → Templates → Create:
   - Name: `enquiry_received`
   - Category: **Utility**
   - Language: English (`en`)
   - Body: `Hi {{1}}, thanks for your enquiry at Dolly Angels School! We have your details and our admissions team will call you within one working day. Office hours: Mon-Fri, 8 AM to 3 PM.`

   `{{1}}` is filled with the parent's name by the function.

### Environment variables (Netlify → Site settings → Environment variables)

| Variable | Required | Purpose |
| --- | --- | --- |
| `WHATSAPP_TOKEN` | yes | System user access token. Server-side only — never prefix it with `VITE_`. |
| `WHATSAPP_PHONE_NUMBER_ID` | yes | Sending number's ID from API Setup. |
| `WHATSAPP_TEMPLATE` | no | Template name. Defaults to `enquiry_received`. |
| `WHATSAPP_TEMPLATE_LANG` | no | Template language code. Defaults to `en`. |
| `WHATSAPP_COUNTRY_CODE` | no | Prefix for 10-digit numbers. Defaults to `91`. |
| `ENQUIRY_FORWARD_URL` | no | A Formspree endpoint (or any webhook) that also gets the raw JSON, so you keep an email copy. |

Then point the site at the function instead of Formspree:

```
VITE_CONTACT_API=/.netlify/functions/enquiry
```

### Behaviour

- Validates with the same `validateEnquiry` as the browser, and rejects messages over 1000 chars.
- Forwards the JSON to `ENQUIRY_FORWARD_URL` when set, so the school still gets an email record.
- Sends the template to the parent's number, converted to WhatsApp's digits-only format.
- Returns `501` when nothing is configured and `502` when every channel failed. Both make the
  contact page fall back to opening the visitor's email app, so no enquiry is silently lost.
- A WhatsApp failure with a successful forward still returns `200`, with `whatsappError` in the
  body for debugging. Check **Netlify → Functions → enquiry** logs.

### Testing locally

```bash
npm install -g netlify-cli
netlify dev
curl -X POST http://localhost:8888/.netlify/functions/enquiry \
  -H 'Content-Type: application/json' \
  -d '{"parentName":"Asha","email":"asha@example.com","phone":"9876543210"}'
```

Add the parent's test number as a **recipient** in WhatsApp → API Setup before the number is
verified for production, otherwise Meta rejects the send.

`npm test` covers the number formatting, the template payload, and the function's status codes
without touching the network.

## 5. Which one should the school use?

Start with Route A. It costs nothing, needs no verification, replies in seconds, and keeps every
enquiry in a WhatsApp chat the staff already know how to use. Move to Route B when you want the
reply sent even if the parent never opens WhatsApp, or when you want enquiries flowing into other
systems automatically.
