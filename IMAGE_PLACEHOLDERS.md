# Image placeholder manifest

Measured from `src/styles.css` + `MediaFrame` (`aspect-ratio` on each slot).  
Layout reference: **1440px** max content width (desktop). Export at **2×** for retina.

**Crop rule:** All slots use `object-fit: cover` except **Home hero** (`object-fit: contain`, bottom-aligned).

---

## Ratio key (only 2 ratios in use)

| Ratio | Decimal | Use for |
|-------|---------|---------|
| **16:9** | 1.778 | Page heroes, case cards, blog thumbs, wide portfolio tiles |
| **5:7** | 0.714 | Home hero, team photos, tall portfolio tiles (span 4) |

---

## 1. Home (`/`)

| # | Slot ID | Location | Ratio | ~Desktop size (W×H) | 2× export | Suggested file |
|---|---------|----------|-------|---------------------|-----------|----------------|
| 1 | `home-hero` | Hero (right figure) | **5:7** | 520 × 743 px | **1040 × 1486** | `public/images/home/5x7/hero.jpg` |

*Already wired:* `/assets/hero_main.png` — replace with a true **5:7** file for best fit.

---

## 2. Page heroes — **16:9** image, **tall placeholder**

**Layout:** The placeholder box stretches to the **same height as the text column** (varies by page — often **~500–750 px** tall at desktop). Corner brackets wrap that full area.

**Your image file:** Still export **16:9** (e.g. **1184 × 666** at 2×). It is shown with `object-fit: contain` (no crop), centered inside the tall frame.

**Placeholder box size (desktop):** width ≈ **592 px** × height = **text column height** (not fixed).

| # | Page | Route | Suggested file |
|---|------|-------|----------------|
| 2 | Services hub | `/services` | `public/images/heroes/16x9/services.jpg` |
| 3 | Case studies | `/case-studies` | `public/images/heroes/16x9/case-studies.jpg` |
| 4 | Portfolio | `/portfolio` | `public/images/heroes/16x9/portfolio.jpg` |
| 5 | About | `/about` | `public/images/heroes/16x9/about.jpg` |
| 6 | Blog | `/blog` | `public/images/heroes/16x9/blog.jpg` |
| 7 | Careers | `/careers` | `public/images/heroes/16x9/careers.jpg` |
| 8 | Contact | `/contact` | `public/images/heroes/16x9/contact.jpg` |
| 9 | Privacy | `/privacy` | `public/images/heroes/16x9/privacy.jpg` |
| 10 | Terms | `/terms` | `public/images/heroes/16x9/terms.jpg` |

### Service detail heroes — **16:9** (same size as above)

| # | Service | Route | Suggested file |
|---|---------|-------|----------------|
| 11 | Web Design | `/services/web-design` | `public/images/heroes/16x9/web-design.jpg` |
| 12 | App Development | `/services/app-development` | `public/images/heroes/16x9/app-development.jpg` |
| 13 | Social Media Ads | `/services/social-media-ads` | `public/images/heroes/16x9/social-media-ads.jpg` |
| 14 | Google Ads | `/services/google-ads` | `public/images/heroes/16x9/google-ads.jpg` |
| 15 | Content Marketing | `/services/content-marketing` | `public/images/heroes/16x9/content-marketing.jpg` |
| 16 | Email Marketing | `/services/email-marketing` | `public/images/heroes/16x9/email-marketing.jpg` |
| 17 | Digital Marketing | `/services/digital-marketing` | `public/images/heroes/16x9/digital-marketing.jpg` |
| 18 | PPC | `/services/ppc` | `public/images/heroes/16x9/ppc.jpg` |
| 19 | SEO | `/services/seo` | `public/images/heroes/16x9/seo.jpg` |

---

## 3. Case study cards — **16:9**

Card width ≈ **444 × 250 px** (3-column grid). Export **888 × 500**.

Used on: **Home** (3 featured), **Case studies** (12), **each Service detail** (3 related — can reuse same 12 assets).

| # | Slug | Title | Suggested file |
|---|------|-------|----------------|
| 20 | `northbloom-wellness` | Northbloom Wellness | `public/images/cases/16x9/northbloom-wellness.jpg` |
| 21 | `alurie-beauty` | Alurie Beauty | `public/images/cases/16x9/alurie-beauty.jpg` |
| 22 | `helios-clean-energy` | Helios Clean Energy | `public/images/cases/16x9/helios-clean-energy.jpg` |
| 23 | `atelier-norden` | Atelier Norden | `public/images/cases/16x9/atelier-norden.jpg` |
| 24 | `northpoint-capital` | Northpoint Capital | `public/images/cases/16x9/northpoint-capital.jpg` |
| 25 | `rooted-foodco` | Rooted Food Co. | `public/images/cases/16x9/rooted-foodco.jpg` |
| 26 | `harbor-and-co-law` | Harbor & Co. Legal | `public/images/cases/16x9/harbor-and-co-law.jpg` |
| 27 | `stillpoint-mh` | Stillpoint | `public/images/cases/16x9/stillpoint-mh.jpg` |
| 28 | `meridian-realty` | Meridian Realty | `public/images/cases/16x9/meridian-realty.jpg` |
| 29 | `lumen-technology` | Lumen Technology | `public/images/cases/16x9/lumen-technology.jpg` |
| 30 | `verdure-wellness` | Verdure | `public/images/cases/16x9/verdure-wellness.jpg` |
| 31 | `civic-renew` | Civic Renew | `public/images/cases/16x9/civic-renew.jpg` |

---

## 4. Portfolio tiles

12-column grid; gaps 24px. Media frame is **only** the image area (text sits below).

| # | ID | Grid span | Ratio | ~Desktop size (W×H) | 2× export | Suggested file |
|---|-----|-----------|-------|---------------------|-----------|----------------|
| 32 | p1 | 6 cols | **16:9** | 678 × 381 | 1356 × 762 | `public/images/portfolio/16x9/p1.jpg` |
| 33 | p2 | 6 cols | **16:9** | 678 × 381 | 1356 × 762 | `public/images/portfolio/16x9/p2.jpg` |
| 34 | p3 | 4 cols | **5:7** | 444 × 622 | 888 × 1244 | `public/images/portfolio/5x7/p3.jpg` |
| 35 | p4 | 4 cols | **5:7** | 444 × 622 | 888 × 1244 | `public/images/portfolio/5x7/p4.jpg` |
| 36 | p5 | 4 cols | **5:7** | 444 × 622 | 888 × 1244 | `public/images/portfolio/5x7/p5.jpg` |
| 37 | p6 | 8 cols | **16:9** | 912 × 513 | 1824 × 1026 | `public/images/portfolio/16x9/p6.jpg` |
| 38 | p7 | 4 cols | **5:7** | 444 × 622 | 888 × 1244 | `public/images/portfolio/5x7/p7.jpg` |
| 39 | p8 | 6 cols | **16:9** | 678 × 381 | 1356 × 762 | `public/images/portfolio/16x9/p8.jpg` |
| 40 | p9 | 6 cols | **16:9** | 678 × 381 | 1356 × 762 | `public/images/portfolio/16x9/p9.jpg` |
| 41 | p10 | 12 cols (full) | **16:9** | 1440 × 810 | 2880 × 1620 | `public/images/portfolio/16x9/p10.jpg` |

---

## 5. Team headshots — **5:7**

4-column grid → **~345 × 483 px**. Export **690 × 966**.

| # | Name | Suggested file |
|---|------|----------------|
| 42 | Maren Volker | `public/images/team/5x7/maren-volker.jpg` |
| 43 | Idris Okafor | `public/images/team/5x7/idris-okafor.jpg` |
| 44 | Selma Hartley | `public/images/team/5x7/selma-hartley.jpg` |
| 45 | Caleb Marín | `public/images/team/5x7/caleb-marin.jpg` |
| 46 | Noor Adel | `public/images/team/5x7/noor-adel.jpg` |
| 47 | Wren Kapoor | `public/images/team/5x7/wren-kapoor.jpg` |
| 48 | Theo Linde | `public/images/team/5x7/theo-linde.jpg` |
| 49 | Aiyana Bekele | `public/images/team/5x7/aiyana-bekele.jpg` |
| 50 | Jonas Eberhardt | `public/images/team/5x7/jonas-eberhardt.jpg` |
| 51 | Sienna Rao | `public/images/team/5x7/sienna-rao.jpg` |
| 52 | Aki Tanabe | `public/images/team/5x7/aki-tanabe.jpg` |
| 53 | Ruairi Lennox | `public/images/team/5x7/ruairi-lennox.jpg` |

---

## 6. Blog thumbnails — **16:9**

3-column grid → **~444 × 250 px**. Export **888 × 500**.

| # | ID | Title | Suggested file |
|---|-----|-------|----------------|
| 54 | b1 | 2026 Digital Marketing Trends… | `public/images/blog/16x9/b1.jpg` |
| 55 | b2 | German Market Entry Checklist… | `public/images/blog/16x9/b2.jpg` |
| 56 | b3 | Paid Social Testing System | `public/images/blog/16x9/b3.jpg` |
| 57 | b4 | Lead Generation in Real Estate | `public/images/blog/16x9/b4.jpg` |
| 58 | b5 | Winning Marketing Strategy | `public/images/blog/16x9/b5.jpg` |
| 59 | b6 | Localize Your Brand for Europe | `public/images/blog/16x9/b6.jpg` |
| 60 | b7 | Google Ads Metrics | `public/images/blog/16x9/b7.jpg` |
| 61 | b8 | Email Automation Flows | `public/images/blog/16x9/b8.jpg` |
| 62 | b9 | SEO Checklist for Landing Pages | `public/images/blog/16x9/b9.jpg` |

---

## Summary counts

| Ratio | Unique images needed |
|-------|---------------------|
| **5:7** | 1 home + 4 portfolio + 12 team = **17** |
| **16:9** | 18 heroes + 12 cases + 6 portfolio + 9 blog = **45** |
| **Total** | **62** unique image files |

---

## Not image placeholders (ignore for assets)

- Form `placeholder` text on Contact / Blog newsletter / Footer email fields  
- Privacy/Terms **body copy** stub (text only, no image slot)  
- Testimonials, stats, service cards (text-only blocks)

---

## Wiring in `content.js` (after you have files)

```js
// Case study example
image: "/images/cases/16x9/northbloom-wellness.jpg",

// Team example
image: "/images/team/5x7/maren-volker.jpg",

// Portfolio example
image: "/images/portfolio/5x7/p3.jpg",
ratio: "5/7", // only if overriding default for that span
```

Page heroes need a small code change to pass `image` into `PageHero` — say the word when files are ready.
