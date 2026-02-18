# Admin gallery: add/remove images from phone

Elder admins can manage the gallery from their phone. They open **Admin gallery**, enter a PIN, then add photos or remove them. The public **Gallery** page shows the same images.

## How it works

- **Without setup:** The site uses the static `src/data/gallery.json` and there is no admin. Gallery works as before.
- **With setup:** You add Supabase (database + storage) and a Netlify serverless function. The gallery loads from Supabase. Admins go to **`/admin/gallery`**, enter a PIN, and can:
  - Create new albums (title + description)
  - Add photos (upload from phone)
  - Remove photos from an album

All changes appear immediately on the public Gallery page.

---

## 1. Contact form (so it actually submits)

The contact form sends to **Formspree** or your own API. Until you set this up, submissions will fail.

### Formspree (easiest)

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form; copy the form ID (e.g. `xyzabcde`).
3. In the project root, create a file `.env` (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` and set:
   ```env
   VITE_CONTACT_API=https://formspree.io/f/YOUR_FORM_ID
   ```
   Replace `YOUR_FORM_ID` with your real Formspree form ID.
5. Restart the dev server (`npm run dev`). New submissions will go to Formspree and you’ll get emails.

---

## 2. Admin gallery (Supabase + Netlify)

### Step 1: Supabase project

1. Go to [supabase.com](https://supabase.com), sign in, create a new project.
2. In **Table Editor**, create a table named **`gallery_albums`** with columns:
   - `id` – uuid, default: `gen_random_uuid()`, primary key
   - `title` – text, not null
   - `description` – text, nullable
   - `cover_image_url` – text, nullable
   - `image_urls` – jsonb, default: `'[]'`
   - `created_at` – timestamptz, default: `now()`
3. In **Table Editor** → **gallery_albums** → **RLS**: enable RLS. Add a policy: “Allow public read”:
   - Policy name: `Public read`
   - Allowed operation: **SELECT**
   - Target roles: `anon`
   - USING: `true`
4. In **SQL Editor**, run:
   ```sql
   -- Allow anon to read (if not already)
   CREATE POLICY "Public read" ON gallery_albums FOR SELECT TO anon USING (true);
   ```
5. In **Storage**, create a bucket named **`gallery`**, set it to **Public**.
6. In **Settings** → **API**: copy **Project URL** and **anon public** key. You’ll use these in the frontend.
7. In **Settings** → **API**: copy **service_role** key (keep it secret). You’ll use it only in Netlify.

### Step 2: Netlify environment variables

In your Netlify site: **Site settings** → **Environment variables** → **Add**:

| Variable | Value | Scopes |
|---------|--------|--------|
| `ADMIN_PIN` | A numeric PIN only admins know (e.g. `1234`) | All |
| `SUPABASE_URL` | Your Supabase Project URL | All |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase **service_role** key | All |

Redeploy the site after adding these.

### Step 3: Frontend environment variables

In the project root, in **`.env`** (and in Netlify **Environment variables** for build):

| Variable | Value |
|----------|--------|
| `VITE_SUPABASE_URL` | Same Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase **anon public** key |
| `VITE_ADMIN_PIN` | (Optional) Same PIN as `ADMIN_PIN`. If set, admins can skip the PIN field and log in with one tap. |

Rebuild and redeploy so the frontend has these at build time.

### Step 4: Give admins the link and PIN

- **Admin URL:** `https://your-site.netlify.app/admin/gallery`
- **PIN:** The value you set for `ADMIN_PIN` (and optionally `VITE_ADMIN_PIN`).

They open the link on their phone, enter the PIN, then can add/remove photos. Changes show right away on the public Gallery.

---

## Summary

| Goal | What to do |
|------|------------|
| Contact form submits and you get emails | Set `VITE_CONTACT_API` to your Formspree URL in `.env` (see section 1). |
| Admins add/remove gallery images from phone | Set up Supabase + Netlify env vars + `.env` (see section 2), then use `/admin/gallery` and the PIN. |
| No backend / no Supabase | Leave Supabase and PIN unset; gallery keeps using `src/data/gallery.json` and contact form will fail until Formspree is set. |
