# Dolly Angels School Website

A colorful, lively, and animated website for Dolly Angels School — built with React, Chakra UI, Framer Motion, and Vite.

## Features

- **Landing page** with animated gradient and floating emojis
- **Gallery** — easy to add/rename albums via `src/data/gallery.json`
- **About, Contact, Home** pages with playful school theme
- **Responsive** design for mobile and desktop
- **Particle effects** on main pages

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Gallery Albums

Edit `src/data/gallery.json`:

```json
{
  "albums": [
    {
      "id": "my-album",
      "title": "Album Name",
      "description": "Short description",
      "coverImage": "https://... or /images/cover.jpg",
      "images": ["url1", "url2"],
      "date": "2024-12"
    }
  ]
}
```

See [docs/GALLERY_STORAGE_STRATEGIES.md](docs/GALLERY_STORAGE_STRATEGIES.md) for more storage options.

## Contact Form Setup

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form ID (e.g. `xyzabc`)
3. Create a `.env` file (copy from `.env.example`):
   ```
   VITE_CONTACT_API=https://formspree.io/f/YOUR_FORM_ID
   ```

---

## Hosting & Connecting Your Domain

You have a domain — here’s how to host and connect it.

### Option 1: Netlify (recommended, free)

1. **Push code to GitHub**
   - Create a repo and push this project:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/dolly-angels.git
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com) → Sign up → “Add new site” → “Import an existing project”
   - Connect your GitHub repo
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy

3. **Connect your domain**
   - Netlify → Site settings → Domain management → “Add custom domain”
   - Enter your domain (e.g. `dollyangels.com`)
   - Netlify will show DNS records. In your domain registrar:
     - Add an **A record**: `@` → `75.2.60.5` (Netlify’s load balancer)
     - Add a **CNAME**: `www` → `YOUR_SITE.netlify.app`
   - Wait for DNS to propagate (minutes to 48 hours). Netlify will auto-provision SSL.

### Option 2: Vercel

1. Push to GitHub, then go to [vercel.com](https://vercel.com)
2. Import repo → Vercel auto-detects Vite; deploy
3. Add domain in Project → Settings → Domains; update DNS at your registrar with the records they provide

### Option 3: GitHub Pages

1. Add `"homepage": "https://YOUR_USERNAME.github.io/dolly-angels"` to `package.json`
2. Install: `npm i -D gh-pages`
3. Add scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. In `vite.config.js` add:
   ```js
   base: '/dolly-angels/'
   ```
5. Run `npm run deploy`
6. In repo Settings → Pages, set source to gh-pages branch
7. For custom domain: Settings → Pages → Custom domain → add your domain and update DNS as instructed

### Where Do You Buy/Manage Your Domain?

- **Registrars**: GoDaddy, Namecheap, Google Domains, Cloudflare, etc.
- To connect a domain to any host (Netlify, Vercel, GitHub Pages), you edit DNS at the registrar to point to the host’s servers (they tell you exactly what to add).

### Summary

| Step | What to do |
|------|------------|
| 1 | Host the site (e.g. Netlify) and get a free `*.netlify.app` URL |
| 2 | In your domain registrar’s DNS settings, add the A/CNAME records the host provides |
| 3 | In the host’s dashboard, add your custom domain |
| 4 | Wait for propagation; SSL is usually automatic |

---

## Build & Preview

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  data/          - gallery.json (edit to add albums)
  pages/         - Landing, Home, Gallery, About, Contact
  components/    - Navbar, ParticlesBackground
  theme.js       - Chakra theme (colors, fonts)
```
