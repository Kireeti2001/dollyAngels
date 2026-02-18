# Gallery Storage Strategies for Dolly Angels School

Choose the strategy that best fits your needs. All are easy to add and modify albums.

---

## Strategy 1: JSON Config File (Current - Easiest) ✅

**Best for:** Quick setup, no backend needed, developer-friendly

**How it works:** Edit `src/data/gallery.json` to add/modify albums.

**To add an album:** Copy an existing album block and update the fields:
```json
{
  "id": "unique-album-id",
  "title": "Album Name",
  "description": "Short description",
  "coverImage": "URL or /images/album-cover.jpg",
  "images": ["url1", "url2", "url3"],
  "date": "2024-12"
}
```

**Pros:** Instant changes, version controlled, no deployment complexity  
**Cons:** Requires redeploy to update (or use CI/CD auto-deploy on file change)

---

## Strategy 2: Static Folder Structure (File-based)

**Best for:** Many images, organized by folders

**Structure:**
```
public/
  gallery/
    school-events-2024/
      cover.jpg
      img1.jpg
      img2.jpg
    classroom-activities/
      cover.jpg
      ...
```

**Implementation:** Create `src/data/gallery-manifest.json` listing albums; images are at `/gallery/{album-id}/image.jpg`

**Pros:** Images in predictable locations, easy bulk upload  
**Cons:** Needs manifest file + folder sync

---

## Strategy 3: Markdown Frontmatter (Content-focused)

**Best for:** Rich album descriptions, blog-style

**Structure:** One `src/content/albums/*.md` per album:
```markdown
---
title: School Events 2024
cover: /gallery/events/cover.jpg
date: 2024-12
---
![img1](/gallery/events/1.jpg)
![img2](/gallery/events/2.jpg)
```

**Pros:** Human-readable, supports long descriptions  
**Cons:** Requires markdown parser (e.g. gray-matter)

---

## Strategy 4: Headless CMS (Sanity, Strapi, Contentful)

**Best for:** Non-technical staff adding albums without code

**How:** Connect to Sanity/Strapi; content editors add albums via UI. Your site fetches via API.

**Pros:** No code edits, real-time updates, media management  
**Cons:** Setup + hosting cost for CMS

---

## Strategy 5: Cloud Storage (Cloudinary, AWS S3)

**Best for:** Large media, CDN delivery, automatic optimization

**How:** Upload images to Cloudinary; store album config (IDs/folders) in JSON. Images load from `https://res.cloudinary.com/...`

**Pros:** Fast global delivery, image transforms, no server storage  
**Cons:** External service, API keys needed

---

## Recommendation

- **Start:** Strategy 1 (JSON) - works immediately
- **Scale:** Strategy 5 (Cloudinary) when you have many images
- **Non-technical editors:** Strategy 4 (Headless CMS)
