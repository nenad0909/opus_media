## PROMPT START

You are implementing a full visual redesign of an existing, working marketing-agency website. Work carefully and incrementally — this is a redesign of a live site, not a greenfield build.

### Project facts

- **Repo:** `/Users/nenad/Documents/Opus Media Lab` (git, branch `main`, deployed to Netlify at opusmedialab.com on push)
- **Stack:** Vite 6 + React 18, plain CSS (`src/styles.css`, ~2000 lines), no CSS framework, no TypeScript. Hand-rolled History-API router in `src/components.jsx` (`useRoute`, `navigate`, `Link`).
- **Structure:** `src/App.jsx` (route switch), `src/components.jsx` (all shared components), `src/pages/{Home,Services,Listings,AboutContact}.jsx`, `src/content.js` (all copy/data as one `SITE` object), `src/seo.js` (per-page meta/JSON-LD via `useSeo`), `src/components/MediaFrame.jsx` (image frame), `src/lib/contact.js` (form submit to Supabase edge function).
- **Assets:** real portfolio images in `public/images/portfolio/{16x9,5x7}/`; `public/assets/hero_main_motion.webm` — a 5s VP9 WebM **with alpha channel** of three walking figures (plays once on desktop, walks in from the right, hands off to `public/assets/hero_main.png`; logic in `src/pages/Home.jsx` `Hero()`).
- **Stale duplicates warning:** the project ROOT contains outdated copies (`app.jsx`, `components.jsx`, `home.jsx`, `content.js`, `styles.css`, etc.). They are NOT part of the build. Only edit files under `src/`, `public/`, `index.html`.

### Do-not-touch guardrails

- Do NOT modify `src/seo.js` logic, routes, canonical URLs, page titles/descriptions, or the `_redirects` file — SEO was just fixed and must survive the redesign. Every page keeps exactly one `<h1>`.
- Keep the FAQ accordions and their content (they feed FAQPage JSON-LD).
- Keep `src/lib/contact.js` and the existing contact form working.
- Do NOT rename route paths or nav link hrefs.
- Commit in meaningful phase-sized chunks, but do NOT push unless told.

### The redesign: "California Editorial"

Replace the current dark/neon/glitch theme (dark bg, lime `#D6FF3D`, orange, Anton ALL-CAPS, glitch effects everywhere) with a light, warm, typography-led editorial design:

**Tokens** (new `:root` in `src/styles.css`):
- `--paper: #FAF7F2` (page bg), `--ink: #1A1815` (text), `--accent: #E85D26` (burnt orange — CTAs, links, highlights), `--pine: #1E3A2F` (secondary, dark band bg), `--sand: #EBE4D8` (card/alt-section bg), `--line: rgba(26,24,21,0.12)`.
- Type: **Fraunces** (Google Fonts, weights 500/600/700, `opsz` axis) for all display headlines, **sentence case** — never all-caps; **Inter** (400/500/600) for body/UI; **JetBrains Mono** only for small eyebrow labels (11–12px, letterspaced, may stay uppercase).
- Scale: hero display ~clamp(44px, 7vw, 96px); section titles ~clamp(32px, 4.5vw, 56px); body 17–18px/1.6.
- Swap the font `<link>` in `index.html` (currently Anton + Space Grotesk + JetBrains Mono) and update `<meta name="theme-color">` to `#FAF7F2`.

**Motion rules:** entrance reveals (fade/rise once, via IntersectionObserver or CSS) and hover states ONLY. No infinite loops. Target: `document.getAnimations().length` ≤ 10 at idle on any page. `prefers-reduced-motion` disables entrance animations.

### What to remove (components + their CSS)

In `src/components.jsx`: the `Ticker` 3D cube (top bar), `Backdrop` (`bg-grid`, cursor glow), `RouteWipe` (route-change wipe overlay), magnetic-hover behavior (`useMagnetic`), and all glitch behavior in `AnimatedTitle` (keep the component as a simple once-on-reveal word-stagger; remove `glitch`/`glitchFlash` props and their interval timers). In `src/pages/Home.jsx` `Hero()`: remove the CSS glitch layers (`hero-glitch-stack__ghost/slice/scan` elements and their keyframes) — KEEP the walk-in `<video>` + still `<img>` + alpha-probe/ended handoff logic exactly as is (the WebM has alpha, so it composites onto the paper background without changes; it remains desktop-only and reduced-motion-aware). Delete all now-dead CSS (glitch keyframes, ticker, wipe, glow, old dark-theme rules) rather than leaving them orphaned.

### Page-by-page

**Header/Footer** (`src/components.jsx`): slim header on `--paper` with 1px bottom border; logo (`Logo` component is an inline SVG using `currentColor`-ish strokes — restyle to `--ink`); nav links in Inter; ONE cta button "Book an intro call" → `/contact`. Remove "Blog" from `SITE.NAV` and footer link lists in `src/content.js` (route stays alive + noindexed). Footer: `--pine` background, cream text; columns: services links, company links, then a NAP block — "OPUS Media Lab — Temecula, California", `hello@opusmedialab.com`, phone placeholder (see Open Inputs), and a service-area line listing: Temecula, Murrieta, Riverside, San Bernardino, Ontario, Rancho Cucamonga, Corona, Escondido, San Diego, Orange County, Los Angeles.

**Home** (`src/pages/Home.jsx`) — new section order, cutting both stats rails, the testimonial grid, and duplicate CTA strips:
1. Hero: paper bg; eyebrow "Digital marketing studio — Temecula, CA"; h1 (keep the existing headline copy "A force that moves your business forward." in sentence case); one paragraph; ONE accent CTA + one text link "See our work →" (`/portfolio`); walking-video figures on the right (existing logic).
2. Selected work: 3 large portfolio images (use `/images/portfolio/16x9/property_numb.jpg`, `renovation_numb.jpg`, `snapiq.jpg` via existing `CaseCard`/`MediaFrame`, restyled: image, small mono tag, sentence-case title, one-line outcome). Link to `/case-studies`.
3. Services: 4 compact cards from `SITE.SERVICE_CATEGORIES` on `--sand`, each linking into `/services`.
4. Process: 5 steps — reuse the `process` array shape from any service in `SITE.SERVICES` (Free consultation → Personalized offer → …); numbered editorial list, generous whitespace.
5. Local: "Based in Temecula. Built for Southern California." + short paragraph + city list (same cities as footer). This grounds the local-SEO story visibly.
6. FAQ: keep `SITE.HOME_FAQS` content and accordion, restyled, questions sentence case.
7. Closing CTA band on `--pine`: "Let's start a new chapter for your business" + same single CTA.

**Services hub + detail** (`src/pages/Services.jsx`): keep all copy/structure (chips, what-you-get, process, FAQs, related work); restyle to light theme; `PageHero` (in `components.jsx`) becomes editorial: eyebrow + serif h1 + subtitle on paper, NO glitch imagery — either no image or a real work image. Remove the auto-cycling interval in `ChipList` (static chips, hover state only). Drop the `SERVICES_STATS` stat rails.

**Case studies / Portfolio** (`src/pages/Listings.jsx`): portfolio grid becomes the visual lead (real images, larger, fewer decorative gradients); case-studies page keeps its 3 featured cards; remove `Testimonial` usage sitewide (component can be deleted along with `SITE.TESTIMONIALS` usage — leave the data in `content.js` harmless or delete it). Careers: keep, restyle; job rows link to `/contact`.

**About/Contact** (`src/pages/AboutContact.jsx`): About keeps values + story, drops the testimonials section. Contact: two-column — left: NAP info block (email, Temecula, response time, phone when provided); right: scheduler embed placeholder + existing form. Scheduler: render a clearly-styled placeholder card "Prefer to talk? Book a 30-minute intro call" wired to accept a Cal.com/Calendly URL from a single constant `BOOKING_URL` in `src/content.js` — if the constant is empty, show only the form (graceful omission). Do not invent a booking URL.

**content.js edits:** convert any ALL-CAPS-styled headline copy that relies on CSS `text-transform` naturally (most casing comes from CSS — after removing `text-transform: uppercase` rules, verify copy reads correctly in sentence case and fix strings where needed). Remove `TICKER` data usage. Add `SERVICE_AREAS` city array (single source for footer + home local section). Add `BOOKING_URL = ""` and `PHONE = ""` constants.

### Open inputs — ask the user, don't invent

1. Cal.com/Calendly booking link (`BOOKING_URL`)
2. Phone number (`PHONE`)
3. Social profile URLs (footer + could go in index.html `sameAs` — index.html JSON-LD edit allowed for `sameAs` only)

### Verification (required, per phase and at end)

1. `npm run build` passes after each phase.
2. Start the dev server via the Browser pane (`.claude/launch.json` name "dev", port 5173) and visually verify EVERY route at desktop and mobile presets: `/`, `/services`, `/services/seo` (representative detail), `/case-studies`, `/portfolio`, `/about`, `/careers`, `/contact`, plus a 404 path. Screenshot each.
3. Check: exactly one `<h1>` per page; nav/footer links work (client-side, no full reloads); contact form still submits (do not spam real submissions — fill and verify the request fires to the edge function or stop before submit); walk-in video still plays once on desktop `/` and is absent on mobile viewport.
4. Run `document.getAnimations().length` on `/` after load settles — must be ≤ 10.
5. Confirm `document.title` + canonical still correct on 3 sample pages (SEO must be untouched).
6. Console: zero errors on every page.

Work phase by phase (tokens/fonts → components → pages → conversion → cleanup/perf), committing after each verified phase with clear messages. Do not push.

## PROMPT END
