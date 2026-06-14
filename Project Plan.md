# SiteForge — MVP Product Requirements Document v2

> **Phase:** 0 — MVP
> **Revision:** v2 — Template-first flow, AI-enhanced copy, dynamic setup form
> **Core change from v1:** Text Prompt generator moved to Phase 1. MVP centres on Template → Signup → Setup Form → AI-polished Preview → Publish.
> **Status:** Pre-development. Backend + Frontend setup in progress.

---

## 1. Product Overview

**SiteForge** (Name is not decided yet) is an AI-powered website builder that lets a non-technical user pick a template, answer a short form about their business, and have a polished, live landing page published in under 5 minutes — without writing code, designing anything, or knowing how to write a "good AI prompt."

### Why Template-First for MVP

| Concern | Text Prompt | Template + Setup Form |
|---|---|---|
| Output reliability | Low — GPT invents structure | High — structured input, predictable JSON |
| Cost per site | ~₹1.5–4 (large prompt) | ~₹0.5–1 (small focused call) |
| UX for non-tech users | Poor — "what do I even type?" | Great — guided questions |
| Build complexity | High — prompt engineering + JSON validation | Low — form → AI expand → template |
| Time to ship | 4–5 weeks | 2–3 weeks |
| Abuse risk | High — burns API budget | Low — tied to account + site creation event |

**Text Prompt mode is deferred to Phase 1.** It will be built with real data from Phase 0 showing what users want to describe.

### AI's Role in MVP

AI is not removed — it is used differently. When a user submits the setup form:

1. Structured form data is sent to GPT-4o with a tightly controlled system prompt and the exact Site JSON schema as the required output format.
2. GPT-4o expands the user's short answers into polished, professional copy: hero heading, tagline, about text, service descriptions, footer.
3. The response is validated against the schema. If invalid, one silent retry. If still invalid, form data maps directly to template fields (graceful fallback — user still gets a site).
4. User sees a beautifully written, personalised site — not just their raw answers pasted in.

This is the "magic moment" that makes SiteForge feel genuinely AI-powered, without the fragility of free-form generation.

### Quota Model (Changed from v1)

Free tier: **3 concurrently published sites** (not "3 AI generations"). Simpler to explain, harder to abuse, more meaningful to the user. Deleting or unpublishing a site frees a slot.

---

## 2. Core User Journey

```
[Guest] visits SiteForge
         │
         ▼
  Browses Template Gallery (3 categories)
         │
  Selects a Template
         │
  ┌──────┴──────┐
  │ Not logged  │ Already
  │    in       │ logged in
  ▼             ▼
Signup Modal  ──┤
  │             │
  └──────┬──────┘
         │
  Setup Form loads
  (fields driven by template category)
         │
  [← Back] returns to gallery (template switch allowed here)
  [Template locked once form is submitted]
         │
  User fills form → Submit
         │
  Loading screen ~5–10 sec
  "We're crafting your site..."
         │
  Backend: form data → GPT-4o → validated Site JSON → draft saved
         │
  Live Preview screen
  ┌────────────────────────────────┐
  │  Full rendered template        │
  │  [Edit details] sidebar        │
  │  [Choose your subdomain]       │
  │  [Publish] CTA                 │
  └────────────────────────────────┘
         │
  User edits (optional) → clicks Publish
         │
  Site live at {subdomain}.siteforge.app
         │
  Success screen:
  Live URL + Copy Link + WhatsApp Share
         │
  Dashboard (manage all sites)
```

---

## 3. Template Categories

Three categories. One template design each in MVP. The chosen template determines which setup form is shown.

| # | Category | Slug | Template Name | Target Users |
|---|---|---|---|---|
| 1 | Service Business | `service` | ServePro | Tutors, consultants, salons, clinics, repair shops, fitness trainers, plumbers |
| 2 | Freelancer / Portfolio | `portfolio` | PortfolioHub | Photographers, designers, developers, writers, coaches, artists |
| 3 | Local Shop / Product | `shop` | ShopFront | Food businesses, boutiques, handmade goods, local retail, home-based sellers |

**Why these three:** They cover ~80% of the two core personas (Sahil the freelancer, Meena the local business owner) and represent the highest-volume SMB segments in India. "Startup/SaaS" is deliberately excluded from MVP — that is not the target audience.

---

## 4. Setup Forms (Dynamic by Category)

> **Rule: Maximum 12 fields per form.** Beyond 12, completion rates drop sharply. Fields marked `*` are required.

### 4.1 — Service Business Form (`service`)

| # | Field | Type | Constraint | Maps to |
|---|---|---|---|---|
| 1 | Business name `*` | Text | 2–80 chars | `business_name` |
| 2 | Your name (owner) `*` | Text | 2–60 chars | About section |
| 3 | Type of service `*` | Dropdown | Options below | AI prompt context |
| 4 | Your tagline or what makes you special `*` | Text | Max 120 chars | AI expands → `tagline` + `hero.subtext` |
| 5 | Services you offer `*` | Repeatable | 1–4 items: name (req) + description (opt) | `sections.services.items` |
| 6 | City / Location `*` | Text | 2–60 chars | `sections.contact.address` |
| 7 | Phone number `*` | Tel | Valid format | `sections.contact.phone` |
| 8 | WhatsApp number | Tel | Pre-filled from phone, editable | Contact section + CTA |
| 9 | Email address | Email | Valid format | `sections.contact.email` |
| 10 | Business hours | Text | e.g. "Mon–Sat 9 AM – 7 PM" | Contact section |
| 11 | Google Maps link | URL | Optional | `sections.contact.maps_url` |
| 12 | Special offer or note | Text | Optional, max 100 chars | Hero badge or footer |

**Dropdown options:** Salon & Beauty · Clinic & Healthcare · Tutor & Education · Fitness & Gym · Consultant & Coaching · Repair & Maintenance · Catering & Food · Other

**AI uses this data to generate:** `hero.heading`, `hero.subtext`, `sections.about.text`, expanded service descriptions, `sections.footer.text`.

---

### 4.2 — Freelancer / Portfolio Form (`portfolio`)

| # | Field | Type | Constraint | Maps to |
|---|---|---|---|---|
| 1 | Your full name `*` | Text | 2–60 chars | `business_name` |
| 2 | Your profession / title `*` | Dropdown | Options below | `tagline` prefix, AI context |
| 3 | Short bio `*` | Textarea | 30–250 chars | AI expands → `sections.about.text` |
| 4 | Your specialties `*` | Tag input | 1–3 tags, each max 30 chars | Hero + services section |
| 5 | City / Based in `*` | Text | 2–60 chars | `sections.contact.address` |
| 6 | Contact email `*` | Email | Valid format | `sections.contact.email` |
| 7 | Phone / WhatsApp | Tel | Optional | `sections.contact.phone` |
| 8 | Portfolio / Website URL | URL | Optional | Hero CTA link |
| 9 | Instagram handle | Text | Optional | Footer / contact |
| 10 | LinkedIn URL | URL | Optional | Footer / contact |
| 11 | Client testimonial quote | Textarea | Optional, max 200 chars | Testimonial section |
| 12 | Client name + role | Text | Optional, shown with testimonial | Same section |

**Dropdown options:** Photographer · Graphic Designer · Web Developer · UI/UX Designer · Writer & Copywriter · Video Editor · Coach & Mentor · Illustrator & Artist · Other

---

### 4.3 — Local Shop / Product Form (`shop`)

| # | Field | Type | Constraint | Maps to |
|---|---|---|---|---|
| 1 | Shop / Brand name `*` | Text | 2–80 chars | `business_name` |
| 2 | What do you sell? `*` | Dropdown | Options below | AI context + hero heading |
| 3 | Tagline `*` | Text | Max 120 chars | AI expands → `tagline` + `hero.subtext` |
| 4 | Featured items `*` | Repeatable | 2–4 items: name (req) + description (opt) + price (opt) | `sections.services.items` (repurposed as products) |
| 5 | Location / Address `*` | Text | 2–120 chars | `sections.contact.address` |
| 6 | Phone number `*` | Tel | Valid format | `sections.contact.phone` |
| 7 | WhatsApp number | Tel | Optional | Contact + order CTA |
| 8 | Email | Email | Optional | `sections.contact.email` |
| 9 | Delivery available? | Toggle | Yes / No | Hero badge |
| 10 | Delivery area | Text | Shown if delivery = Yes | About section |
| 11 | Instagram link | URL | Optional | Footer |
| 12 | Google Maps link | URL | Optional | `sections.contact.maps_url` |

**Dropdown options:** Food & Beverages · Clothing & Fashion · Handmade & Crafts · Beauty & Skincare · Books & Stationery · Home & Decor · Electronics & Accessories · Other

---

## 5. Goals & Success Metrics

### Product Goals
- **G1.** Validate that guided form + AI copy expansion produces output users are proud to publish.
- **G2.** Prove the activation funnel (signup → form → publish) completes in under 5 minutes.
- **G3.** Establish a cost-controlled AI pipeline that can scale into Phase 1 (text prompt, billing).

### Success Metrics

| Metric | Target | Signal |
|---|---|---|
| Template select → Signup | ≥ 50% | Onboarding friction |
| Signup → Form submit | ≥ 70% | Form UX quality |
| Form submit → Publish | ≥ 50% | AI output quality (biggest signal) |
| Median time: signup → first publish | ≤ 5 min | Speed of value |
| AI copy generation success rate | ≥ 97% | Backend / OpenAI stability |
| Site publish success rate | ≥ 99% | Infrastructure reliability |
| 7-day return rate | ≥ 20% | Stickiness |

---

## 6. User Roles & Access Matrix

| Role | Description | MVP Status |
|---|---|---|
| **GUEST** | Unauthenticated visitor. Browse templates + view published sites. | Active |
| **USER** | Registered + authenticated. Owns sites. | Active |
| **ADMIN** | `users.is_admin = true` DB flag. No admin UI in MVP — manual moderation only. | DB flag only |

| Capability | GUEST | USER | ADMIN |
|---|:---:|:---:|:---:|
| Browse template gallery | ✅ | ✅ | ✅ |
| View full template preview | ✅ | ✅ | ✅ |
| View any published site `/s/{sub}` | ✅ | ✅ | ✅ |
| Register | ✅ | — | — |
| Login | ✅ | ✅ | ✅ |
| Complete setup form | ❌ | ✅ | ✅ |
| Create site from template | ❌ | ✅ (3 published max) | ✅ |
| View + edit own site | ❌ | ✅ | ✅ |
| Edit any site | ❌ | ❌ | ✅ |
| Publish own site | ❌ | ✅ (3 active max) | ✅ |
| Unpublish own site | ❌ | ✅ | ✅ |
| Delete own site | ❌ | ✅ | ✅ |
| Delete / take down any site | ❌ | ❌ | ✅ |
| Upload images via Cloudinary | ❌ | ✅ | ✅ |
| View dashboard | ❌ | ✅ (own) | ✅ |

---

## 7. Feature List

### 7.1 Authentication (AUTH)

| ID | Feature | Notes |
|---|---|---|
| AUTH-1 | Email + password registration | bcrypt hashing, email format validation |
| AUTH-2 | Login → access JWT (15 min) + refresh JWT (7 days, httpOnly cookie) | |
| AUTH-3 | Refresh token endpoint — rotates on use | |
| AUTH-4 | Logout — server-side token invalidation | |
| AUTH-5 | Get current user (`/users/me`) — includes `sites_published`, `sites_limit` | |
| AUTH-6 | Password reset via email | Signed JWT link, 1-hour expiry. Recommended — see §12 Q1 |

### 7.2 Template Gallery (TMPL)

| ID | Feature | Notes |
|---|---|---|
| TMPL-1 | Gallery page showing 3 categories + templates | Filterable by category. Guest-accessible. |
| TMPL-2 | Full template preview page (placeholder content) | Guest-accessible |
| TMPL-3 | "Use this template" CTA → signup modal (guest) | |
| TMPL-4 | "Use this template" CTA → setup form (logged-in user) | |
| TMPL-5 | Template switching: back button on setup form returns to gallery | Only before form submit — locked after |

### 7.3 Setup Form (FORM)

| ID | Feature | Notes |
|---|---|---|
| FORM-1 | Dynamic form rendering by category | 3 schemas (service / portfolio / shop). See §4 |
| FORM-2 | Client + server validation | Required fields, length limits, format checks |
| FORM-3 | Repeatable groups (services / items) | Min 1, max 4 entries, add/remove rows |
| FORM-4 | Progress indicator ("Step 2 of 2") | |
| FORM-5 | Form state preserved on back navigation | Don't lose answers if user goes back |
| FORM-6 | Loading screen on submit with friendly copy | "We're crafting your site..." — prevents perceived freeze |

### 7.4 AI Copy Generation (AI)

| ID | Feature | Notes |
|---|---|---|
| AI-1 | Form data → GPT-4o call with JSON mode + strict Site JSON schema | Structured output, no hallucinated fields |
| AI-2 | Category-specific system prompt (3 prompts: service / portfolio / shop) | Tailored copywriter persona per category |
| AI-3 | One silent retry on invalid / malformed AI response | |
| AI-4 | Fallback to direct field mapping if both AI attempts fail | Site still generated — fallback is not failure |
| AI-5 | All AI calls logged to `prompts` table (form_data, ai_response, tokens_used, status) | Cost visibility + debugging from day 1 |
| AI-6 | OpenAI call timeout: 30 seconds | Hard timeout prevents hung requests |

### 7.5 Site Preview & Editor (EDIT)

| ID | Feature | Notes |
|---|---|---|
| EDIT-1 | Full live preview of AI-populated template | Rendered exactly as it appears when published |
| EDIT-2 | Edit sidebar — all text fields editable, preview updates live | business_name, tagline, hero, about, services, contact, footer |
| EDIT-3 | Image upload for logo + banner via Cloudinary | jpg/png/webp, max 5 MB each |
| EDIT-4 | Theme switcher (light / dark / warm) — live preview updates | |
| EDIT-5 | Add / remove service or product items | Cap: 4 items in MVP |
| EDIT-6 | Mobile preview toggle | Critical — users share via WhatsApp from mobile |
| EDIT-7 | Explicit Save button + "unsaved changes" warning on navigate away | Auto-save → Phase 1 |
| EDIT-8 | Subdomain field with real-time availability check (debounced) | Lowercase, alphanumeric + hyphens, 3–30 chars, not reserved |
| EDIT-9 | Publish CTA → confirms subdomain → triggers publish | |
| EDIT-10 | Unpublish toggle on already-published sites | |

### 7.6 Publish & Public Serving (PUB)

| ID | Feature | Notes |
|---|---|---|
| PUB-1 | One-click publish → site live at `{subdomain}.siteforge.app` | |
| PUB-2 | Success screen: live URL + Copy Link button + WhatsApp Share button | WhatsApp share is critical for Indian SMB persona |
| PUB-3 | Public `/s/{subdomain}` serves the published site | No auth. 404 if unknown or unpublished. |
| PUB-4 | SEO meta tags on published site | `<title>`, `<meta description>`, OG title, OG image |
| PUB-5 | Favicon: user's logo if uploaded, else SiteForge default | |
| PUB-6 | Reserved subdomain enforcement | See §10 reserved list |

### 7.7 Dashboard (DASH)

| ID | Feature | Notes |
|---|---|---|
| DASH-1 | Grid of user's sites — thumbnail, name, status badge, subdomain | |
| DASH-2 | Status badges: Draft / Published / Unpublished | |
| DASH-3 | "Create new site" → template gallery | |
| DASH-4 | Publish slot indicator: "2 of 3 sites published" | |
| DASH-5 | Delete site with confirmation modal | Soft-delete; frees slot if published |
| DASH-6 | Empty state + onboarding CTA for first-time users | |
| DASH-7 | Per-card quick actions: Edit · Visit · Publish/Unpublish · Delete | |

### 7.8 Cross-Cutting (XCUT)

| ID | Feature | Notes |
|---|---|---|
| XCUT-1 | Rate limit on `POST /sites`: 1 creation per 30 sec per user | Prevent runaway AI calls |
| XCUT-2 | XSS sanitisation on all text fields | User content is rendered on public sites — critical |
| XCUT-3 | Consistent error response shape: `{ "error": { "code", "message" } }` | |
| XCUT-4 | Correlation IDs on all requests | |
| XCUT-5 | CORS configured for Vercel frontend domain | |
| XCUT-6 | Monthly OpenAI spend hard cap set in OpenAI dashboard | Safety net independent of application code |

---

## 8. Pages (Frontend — React)

| # | Page | Route | Auth Required | Purpose | Key Components |
|---|---|---|:---:|---|---|
| 1 | **Marketing Home** | `/` | ❌ | Introduce SiteForge, drive template browse | Hero, "How it works" 3-step, template preview cards, CTA |
| 2 | **Template Gallery** | `/templates` | ❌ | Browse all 3 templates by category | Category filter tabs, template cards with "Use this" CTA |
| 3 | **Template Preview** | `/templates/:slug` | ❌ | Full-size preview of one template with placeholder content | Rendered template, "Use this template" CTA, back nav |
| 4 | **Register** | `/register` | ❌ | Account creation (also shown as modal overlay) | Email + password form, link to Login |
| 5 | **Login** | `/login` | ❌ | Authenticate | Form, "Forgot password" link |
| 6 | **Forgot Password** | `/forgot-password` | ❌ | Submit email to receive reset link | Email input, submit |
| 7 | **Reset Password** | `/reset-password` | ❌ | Set new password using token from email | New password + confirm fields |
| 8 | **Setup Form** | `/setup/:slug` | ✅ | Dynamic form for the chosen template category | Progress bar, dynamic fields per §4, Back button, Submit |
| 9 | **Site Editor / Preview** | `/sites/:id/edit` | ✅ (owner) | Review AI site, edit fields, choose subdomain, publish | Left sidebar (editable fields) + right panel (live preview) + top bar (theme, mobile toggle, Publish) |
| 10 | **Publish Success** | `/sites/:id/published` | ✅ (owner) | Celebrate the live URL + share | URL display, Copy Link, WhatsApp Share, Go to Dashboard |
| 11 | **Dashboard** | `/dashboard` | ✅ | Manage all sites | Site card grid, Create CTA, publish quota bar |
| 12 | **Account** | `/account` | ✅ | Profile info + danger zone | Email, change password, delete account |
| 13 | **Published Site** | `{sub}.siteforge.app` or `/s/:sub` | ❌ | The live page visitors actually see | Pure rendered site — zero SiteForge chrome |
| 14 | **404** | `*` | — | Unknown route or subdomain | Friendly error, link to home |
| 15 | **Error Boundary** | — | — | Catch React render crashes | Generic fallback UI |

### Page Transition Diagram

```
/ (Home)
 └─▶ /templates (Gallery)
       └─▶ /templates/:slug (Preview)
             │
             ├─▶ [Guest] Signup Modal ─▶ /register ─┐
             │                                       │
             └─▶ [Logged in] ─────────────────────── ▼
                                              /setup/:slug (Form)
                                                │
                                   [← Back] ───┘ (returns to /templates)
                                                │
                                          [Submit]
                                                │
                                       Loading screen
                                                │
                                     /sites/:id/edit (Preview + Editor)
                                                │
                              ┌─────────────────┼──────────────────┐
                           [Save]          [Publish]         [Dashboard]
                              │                 │                  │
                           (stays)   /sites/:id/published   /dashboard
```

---

## 9. API Endpoints

> Base URL: `https://api.siteforge.app/api/v1`
> Auth: `Authorization: Bearer <access_token>` unless noted.
> Standard response: `{ "data": ..., "error": null }` or `{ "data": null, "error": { "code": "...", "message": "..." } }`

### 9.1 Auth

| Method | Path | Auth | Body | Notes |
|---|---|:---:|---|---|
| POST | `/auth/register` | ❌ | `{ email, password }` | Returns `{ user, accessToken }` + refresh cookie |
| POST | `/auth/login` | ❌ | `{ email, password }` | Returns `{ user, accessToken }` + refresh cookie |
| POST | `/auth/refresh` | 🍪 cookie | — | Returns new `accessToken` + rotated refresh cookie |
| POST | `/auth/logout` | ✅ | — | Invalidates refresh token. Returns `204` |
| POST | `/auth/forgot-password` | ❌ | `{ email }` | Always `204` — prevents email enumeration |
| POST | `/auth/reset-password` | ❌ | `{ token, newPassword }` | `204` on success |

### 9.2 Users

| Method | Path | Auth | Notes |
|---|---|:---:|---|
| GET | `/users/me` | ✅ | Returns `{ id, email, sitesPublished, sitesLimit, createdAt }` |
| PUT | `/users/me/password` | ✅ | Body: `{ currentPassword, newPassword }` |
| DELETE | `/users/me` | ✅ | Soft-deletes user + all their sites. Returns `204` |

### 9.3 Templates

| Method | Path | Auth | Notes |
|---|---|:---:|---|
| GET | `/templates` | ❌ | List all templates. Cacheable. Returns `{ id, slug, name, category, description, previewImageUrl }[]` |
| GET | `/templates/:slug` | ❌ | Full template including default `content` JSON |

### 9.4 Sites

| Method | Path | Auth | Body | Notes |
|---|---|:---:|---|---|
| GET | `/sites` | ✅ | — | Current user's sites (summary array) |
| GET | `/sites/:id` | ✅ owner | — | Full site incl. content JSON. 403 if not owner |
| POST | `/sites` | ✅ | `{ templateSlug, formData }` | **Key endpoint.** Triggers AI generation. Returns `{ siteId, content }`. 400 if quota exceeded. |
| PUT | `/sites/:id` | ✅ owner | Partial site content JSON | Editor save |
| DELETE | `/sites/:id` | ✅ owner | — | Soft-delete. Frees publish slot if published. `204` |
| POST | `/sites/:id/publish` | ✅ owner | `{ subdomain }` | Validates subdomain + quota. Returns `{ siteUrl }` |
| POST | `/sites/:id/unpublish` | ✅ owner | — | Frees publish slot. `204` |
| GET | `/sites/check-subdomain` | ✅ | Query: `?name=acme` | Returns `{ available: boolean, reason?: string }` |

#### `POST /sites` — Internal Flow (Most Complex Endpoint)

```
1. Validate auth + quota (sitesPublished < sitesLimit)
     └─▶ 400 "You've reached your 3-site limit" if exceeded

2. Validate templateSlug exists + formData has all required fields

3. Fetch template default content JSON

4. Build GPT-4o request:
   - System: category-specific copywriting prompt + strict Site JSON schema
   - User: form data as structured JSON
   - Config: JSON mode, max_tokens: 800, timeout: 30s

5. Call GPT-4o
   - Parse + validate response against Site JSON schema
   - If invalid → silent retry (same prompt, once)
   - If still invalid → fallback: map form fields directly to template

6. Merge generated copy into template content JSON

7. Save draft site to `sites` table

8. Save to `prompts` table:
   { user_id, site_id, template_slug, form_data, ai_response,
     tokens_used, status: 'success'|'fallback'|'failed', error_message }

9. Return { siteId, content }
```

### 9.5 Media

| Method | Path | Auth | Notes |
|---|---|:---:|---|
| POST | `/media/upload` | ✅ | Multipart `file`. Returns `{ url, publicId }`. jpg/png/webp only, max 5 MB |

### 9.6 Public Serving

| Method | Path | Auth | Notes |
|---|---|:---:|---|
| GET | `/s/:subdomain` | ❌ | Returns published site content JSON (or rendered HTML). 404 if not found or unpublished |

### 9.7 Health

| Method | Path | Notes |
|---|---|---|
| GET | `/health` | Liveness probe |
| GET | `/health/db` | DB connectivity check |

---

## 10. Database Schema

### `users`
| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| email | VARCHAR(255) UNIQUE | Indexed |
| password_hash | VARCHAR(255) | bcrypt |
| sites_published | INT | Default 0. Current count of active published sites |
| sites_limit | INT | Default 3. Free tier cap |
| is_admin | BOOLEAN | Default false |
| created_at, updated_at | TIMESTAMP | |
| deleted_at | TIMESTAMP NULLABLE | Soft delete |

### `sites`
| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| user_id | FK → users.id | Indexed |
| template_slug | VARCHAR(50) | servepro / portfoliohub / shopfront |
| name | VARCHAR(120) | Internal label shown on dashboard card |
| subdomain | VARCHAR(30) UNIQUE NULLABLE | Set on publish. Indexed. |
| status | ENUM('draft','published','unpublished') | Default 'draft' |
| content | JSONB | Full Site JSON — see §11 |
| theme | VARCHAR(20) | light / dark / warm. Default 'light' |
| created_at, updated_at | TIMESTAMP | |
| published_at | TIMESTAMP NULLABLE | |
| deleted_at | TIMESTAMP NULLABLE | Soft delete |

### `templates`
| Column | Type | Notes |
|---|---|---|
| id | SERIAL | PK |
| slug | VARCHAR(50) UNIQUE | |
| name | VARCHAR(100) | |
| category | ENUM('service','portfolio','shop') | Drives setup form selection |
| description | TEXT | |
| preview_image_url | VARCHAR(500) | |
| content | JSONB | Default Site JSON |
| is_active | BOOLEAN | Default true |

### `prompts`
| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| user_id | FK → users.id | |
| site_id | FK → sites.id NULLABLE | |
| template_slug | VARCHAR(50) | |
| form_data | JSONB | Raw setup form submission |
| ai_response | JSONB NULLABLE | What GPT-4o returned |
| status | ENUM('success','fallback','failed') | 'fallback' = AI failed, used direct mapping |
| tokens_used | INT NULLABLE | Cost tracking |
| error_message | TEXT NULLABLE | If status = 'failed' |
| created_at | TIMESTAMP | |

### `refresh_tokens`
| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| user_id | FK → users.id | Indexed |
| token_hash | VARCHAR(255) | Hashed before storage |
| expires_at | TIMESTAMP | |
| revoked | BOOLEAN | Default false |

### `password_reset_tokens`
| Column | Type | Notes |
|---|---|---|
| id | UUID | PK |
| user_id | FK → users.id | |
| token_hash | VARCHAR(255) | |
| expires_at | TIMESTAMP | 1 hour from creation |
| used | BOOLEAN | Default false |

### Reserved Subdomains (Application-Level Enforcement)
```
admin, api, www, app, mail, support, blog, docs, dashboard,
auth, login, register, s, static, cdn, assets, media, status,
help, about, pricing, terms, privacy, billing, webhook, health
```

---

## 11. Site JSON Schema

The canonical structure for a site. AI output **must** match this exactly. Enforced via OpenAI JSON mode with this schema as the response format definition.

```json
{
  "business_name": "string (required)",
  "tagline": "string (required)",
  "theme": "light | dark | warm",
  "logo_url": "string | null",
  "banner_url": "string | null",
  "whatsapp_number": "string | null",
  "sections": {
    "hero": {
      "heading": "string (required)",
      "subtext": "string (required)",
      "cta_text": "string",
      "cta_link": "string | null"
    },
    "about": {
      "text": "string (required)"
    },
    "services": {
      "heading": "string",
      "items": [
        {
          "name": "string (required)",
          "description": "string",
          "price": "string | null"
        }
      ]
    },
    "contact": {
      "phone": "string | null",
      "email": "string | null",
      "address": "string | null",
      "maps_url": "string | null",
      "hours": "string | null"
    },
    "footer": {
      "text": "string"
    }
  }
}
```

---

## 12. Open Questions & Decisions

### Q1. Password Reset — Included?
**Decision: Yes — included in this PRD.** Cost to add now: ~4 hours. Cost to retrofit post-launch: much higher + user trust damage.

### Q2. Email Verification Before Site Creation?
**Risk:** Without it, a script can create thousands of accounts and drive up AI costs.
**Recommendation:** A 6-digit code sent on registration. Block `POST /sites` until verified. ~1 day to implement.
**Your call:** _______________

### Q3. Transactional Email Provider
Needed for password reset (and email verification if Q2 = yes).
**Recommendation: Resend** — 3,000 emails/month free, excellent developer experience, Spring integration is straightforward.
**Your call:** _______________

### Q4. What Happens When User Hits 3-Site Limit?
Block publish with: *"You've reached the limit of 3 published sites. Unpublish one to continue, or wait for Pro (coming soon)."*
Unpublishing frees the slot immediately.
**Decision: Confirmed — yes, immediate slot release on unpublish/delete.** ✅

### Q5. Dashboard Site Name — How Is It Set?
The site card on the dashboard needs a human-readable name. Two options:
- Auto-set from `business_name` in the form (simplest).
- Let user set a custom internal name separately.
**Recommendation:** Auto-set from `business_name`. Editable in the editor later if needed.
**Your call:** _______________

### Q6. XSS Sanitisation Library
User-entered text is rendered on public pages. Must sanitise before save and before render.
**Recommendation (backend):** Apache Commons Text or OWASP Java HTML Sanitizer.
**Recommendation (frontend):** DOMPurify on any `dangerouslySetInnerHTML`.
**Decision: Both required, non-negotiable.** ✅

---

## 13. Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React.js + shadcn/ui + Magic UI + React Bits |
| Backend | Spring Boot (Java) |
| Database | PostgreSQL (JSONB for site content) |
| AI — Copy Generation | OpenAI GPT-4o (JSON mode / structured outputs) |
| Image Storage | Cloudinary |
| Auth | Spring Security + JWT (access 15 min + refresh 7 days httpOnly cookie) |
| Email | Resend (recommended) |
| Frontend Deploy | Vercel |
| Backend Deploy | Railway |
| CI/CD | GitHub Actions |

---

## 14. Out of Scope — Phase 0

| Feature | Planned Phase |
|---|---|
| Free-form text prompt generator | Phase 1 |
| Voice input (Whisper) | Phase 2 |
| Drag-and-drop editor | Phase 2 |
| Custom domains (BYO) | Phase 2 |
| Admin UI panel | Phase 2 |
| Billing / subscriptions | Phase 1 |
| Site analytics (visitor counts) | Phase 1 |
| Contact form email delivery | Phase 1 |
| Multi-page sites | Phase 3 |
| Hindi / multilingual UI | Phase 3 |
| Template marketplace | Phase 4 |

---

## 15. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI copy feels generic across all sites | High | High | Strong category-specific system prompts. Measure "form submit → publish" rate — if < 40%, prompts need work. |
| OpenAI timeout / outage | Med | High | 30s hard timeout (XCUT-6) + fallback mapping (AI-4). Fallback is not failure. |
| Spam signups burning AI budget | High | High | Email verification (Q2) + rate limit (XCUT-1) + monthly spend cap (XCUT-7) |
| XSS via user-entered content | Med | Critical | OWASP sanitiser on backend + DOMPurify on frontend (XCUT-2) |
| Subdomain squatting or abuse | Med | Med | Reserved list enforcement + ADMIN DB flag for manual takedown |
| Cloudinary free tier exhausted | Med | Med | Monitor monthly. Auto-compress on upload (Cloudinary transforms). |
| Published sites slow to load | Med | High | Vercel CDN for frontend. Cache `/s/:subdomain` response in backend. |
| WhatsApp share link broken on some devices | Low | Med | Use standard `wa.me/?text=` format. Test on Android + iOS before launch. |

---

## 16. Acceptance Criteria

**The MVP is shippable when all of the following are true:**

**Activation funnel (most critical):**
- [ ] Guest browses all 3 templates without any auth.
- [ ] Selecting a template as guest shows signup modal.
- [ ] After registration, user lands on the correct setup form for their chosen template.
- [ ] Form validates required fields client-side before submit.
- [ ] AI copy generation completes in ≤ 15 seconds for the 95th percentile.
- [ ] If AI fails, fallback produces a complete (not broken) site.
- [ ] User sees a full live preview of their populated template after generation.
- [ ] User can edit any text field and see the preview update in real-time.
- [ ] User can upload a logo and banner image.
- [ ] Subdomain availability check works in real-time.
- [ ] User can publish and site is live within 10 seconds of clicking Publish.
- [ ] Published site loads correctly in incognito / different device immediately.
- [ ] Success screen shows live URL + functional WhatsApp share button.

**Site management:**
- [ ] Dashboard shows all user sites with correct status badges.
- [ ] User can unpublish a site and it returns 404 within 30 seconds.
- [ ] User can delete a site and it disappears from dashboard.
- [ ] Publish slot frees on unpublish / delete.
- [ ] 4th publish attempt is blocked with clear message.

**Auth:**
- [ ] Register, login, logout, token refresh all work correctly.
- [ ] Password reset email received + reset completes successfully.
- [ ] JWT expires correctly; refresh token rotates on use.

**Infrastructure:**
- [ ] Frontend live on Vercel (HTTPS).
- [ ] Backend live on Railway (HTTPS).
- [ ] `/health` returns 200.
- [ ] All endpoints have automated happy-path + at least 1 error-path test.
- [ ] Zero P0/P1 bugs in activation funnel for 2 consecutive weeks.

---

## 17. Glossary

| Term | Definition |
|---|---|
| **Site** | A single landing page stored as a Site JSON document, owned by one user. |
| **Template** | A pre-designed layout + default Site JSON belonging to one category. 3 in MVP. |
| **Category** | Groups templates by business type: service / portfolio / shop. Determines setup form. |
| **Setup Form** | The dynamic form (fields driven by category) that collects business details. |
| **AI Copy Generation** | Background process where GPT-4o expands form data into polished site copy. |
| **Fallback** | Direct field mapping used when AI generation fails both attempts. Still produces a valid site. |
| **Publish Slot** | One of up to 3 concurrent published sites on the free tier. |
| **Subdomain** | User-chosen identifier e.g. `acme` → `acme.siteforge.app`. |
| **Draft** | Site exists in DB but is not publicly accessible. |
| **Published** | Site has a confirmed subdomain, accessible at its public URL. |

---

*End of MVP_PRD_v2.md — SiteForge Phase 0*