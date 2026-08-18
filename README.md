# Dolly Angels School Website

A colorful school website for Dolly Angels — React, Vite, Tailwind, and Radix (shadcn-style) components.

## Features

- **Landing** splash, then Home, About, Programs, Gallery, and Contact
- **Working enquiry form** — opens email if Formspree is not configured; posts to Formspree when it is
- **Gallery** albums from `src/data/gallery.json` (or Supabase if you set that up)
- **Admin gallery** at `/admin/gallery` for adding/removing photos (needs Supabase + Netlify)
- **Dark mode**, mobile nav, and keyboard gallery browsing

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test    # data + form helper checks
npm run build
```

## School content

Edit **`src/data/school.json`** for name, phone, email, address, hours, programs, and events. Those values show on Home, About, Programs, Contact, and the footer.

## Adding Gallery Albums

Edit `src/data/gallery.json`, or use the admin page after following [docs/ADMIN_GALLERY_SETUP.md](docs/ADMIN_GALLERY_SETUP.md).

## Contact Form

Until `VITE_CONTACT_API` is set, **Submit** opens the visitor’s email app with the enquiry filled in.

To collect submissions in your inbox automatically:

1. Create a form at [formspree.io](https://formspree.io)
2. Copy `.env.example` to `.env` and set:
   ```
   VITE_CONTACT_API=https://formspree.io/f/YOUR_FORM_ID
   ```

### Automatic WhatsApp reply

**Send on WhatsApp** opens WhatsApp with the enquiry pre-filled, so the free WhatsApp Business app
can auto-reply with its Greeting message — no code or account needed. For a reply sent straight
from the server, point `VITE_CONTACT_API` at `/.netlify/functions/enquiry` and add your Meta Cloud
API keys. Both routes are in
[docs/WHATSAPP_AUTOREPLY_SETUP.md](docs/WHATSAPP_AUTOREPLY_SETUP.md).

---

## Hosting

### Netlify (recommended)

1. Push this repo to GitHub
2. Import the repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build` · Publish directory: `dist`
4. Add your custom domain in Site settings → Domain management

The `netlify.toml` in this repo already sets Node 20 and SPA redirects.

### Vercel

Import the GitHub repo; Vite is auto-detected. Add the domain in Project → Settings → Domains.

---

## Project structure

```
src/
  data/          school.json + gallery.json
  pages/         Landing, Home, About, Programs, Gallery, Contact, Admin
  components/    Navbar, Footer, Logo, UI primitives
  lib/           contact helpers, supabase client
```
