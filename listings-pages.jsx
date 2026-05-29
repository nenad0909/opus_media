/* Case Studies, Portfolio, Blog, Careers pages */

// ---------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------
function CaseStudiesPage() {
  const { CASE_STUDIES } = window.SITE;
  const allIndustries = uniq(CASE_STUDIES.map(c => c.industry));
  const allServices   = uniq(CASE_STUDIES.flatMap(c => c.services));
  const allSegments   = uniq(CASE_STUDIES.map(c => c.segment));

  const filters = [
    { label: "All", value: "" },
    ...allIndustries.map(v => ({ label: v, value: v, kind: "industry" })),
    ...allSegments.map(v => ({ label: v, value: v, kind: "segment" })),
    ...allServices.map(v => ({ label: v, value: v, kind: "service" })),
  ];

  const [active, setActive] = useState({ label: "All", value: "" });

  const filtered = CASE_STUDIES.filter((c) => {
    if (!active.value) return true;
    if (active.kind === "industry") return c.industry === active.value;
    if (active.kind === "segment")  return c.segment  === active.value;
    if (active.kind === "service")  return c.services.includes(active.value);
    return true;
  });

  const featured = CASE_STUDIES.filter(c => c.featured);

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Our success stories"
        subtitle="Real campaigns. Clear numbers. Measurable growth."
        body="Explore how OPUS Media Lab turns strategy, creative, and performance marketing into practical growth outcomes."
      />

      {/* Featured */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Featured work" title="Three stories we keep coming back to" />
          <div className="card-grid cols-3">
            {featured.map((c) => <CaseCard key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      {/* All with filters */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="All case studies" title="Browse by industry, segment, or service" />
          <div className="filter-bar">
            {filters.map((f, i) => (
              <button key={i}
                className={"filter-chip" + (f.value === active.value && (f.kind || "") === (active.kind || "") ? " is-active" : "")}
                onClick={() => setActive(f)}
              >{f.label}</button>
            ))}
          </div>
          <div className="card-grid cols-3">
            {filtered.map((c) => <CaseCard key={c.slug} c={c} />)}
          </div>
          {filtered.length === 0 && (
            <p className="body" style={{ marginTop: 32 }}>No case studies match this filter yet.</p>
          )}
        </div>
      </section>

      <CtaStrip heading="Curious how a story like these might look for you?" />
    </>
  );
}

function uniq(arr) { return Array.from(new Set(arr)); }

// ---------------------------------------------------------------
// Portfolio
// ---------------------------------------------------------------
function PortfolioPage() {
  const { PORTFOLIO } = window.SITE;
  // varied grid spans for visual rhythm
  const spans = [6, 6, 4, 4, 4, 8, 4, 6, 6, 12];
  // varied gradient pairs
  const palettes = [
    ["rgba(255,106,26,0.30)", "rgba(214,255,61,0.12)"],
    ["rgba(214,255,61,0.22)", "rgba(255,106,26,0.10)"],
    ["rgba(255,106,26,0.22)", "rgba(155,140,255,0.16)"],
    ["rgba(124,255,178,0.22)", "rgba(255,106,26,0.12)"],
    ["rgba(255,210,63,0.22)", "rgba(214,255,61,0.10)"],
    ["rgba(155,140,255,0.22)", "rgba(214,255,61,0.10)"],
    ["rgba(214,255,61,0.28)", "rgba(10,14,22,0.4)"],
    ["rgba(11,165,236,0.22)", "rgba(214,255,61,0.10)"],
    ["rgba(255,106,26,0.30)", "rgba(124,255,178,0.10)"],
    ["rgba(214,255,61,0.18)", "rgba(255,106,26,0.20)"],
  ];

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Crafted to catch eyes and move people"
        subtitle="Scroll-stopping campaigns, clear messaging, and conversion-focused creative systems that help brands stand out."
        body="A selection of campaigns, brand systems, and creative production that have moved metrics — and audiences — for our partners."
      />

      <section className="section">
        <div className="container">
          <div className="portfolio-grid">
            {PORTFOLIO.map((p, i) => {
              const span = spans[i % spans.length];
              const [a, b] = palettes[i % palettes.length];
              return (
                <div className={"portfolio-item span-" + span} key={p.id} style={{ "--g-from": a, "--g-to": b }}>
                  <div className="cat">{p.category}</div>
                  <h3>{p.title}</h3>
                  <div className="client">{p.client}</div>
                  <p className="desc">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaStrip heading="Curious about the impact these campaigns can create?" cta="Schedule a free consultation" />
    </>
  );
}

// ---------------------------------------------------------------
// Blog
// ---------------------------------------------------------------
function BlogPage() {
  const { BLOG, BLOG_FILTERS } = window.SITE;
  const [active, setActive] = useState("");

  const filtered = active ? BLOG.filter(p => p.tags.includes(active)) : BLOG;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="OPUS Blog"
        subtitle="Fresh perspectives and practical marketing advice."
        body="Explore insights on digital marketing, market entry, paid media, content, analytics, and business growth."
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <button className={"filter-chip" + (active === "" ? " is-active" : "")} onClick={() => setActive("")}>All</button>
            {BLOG_FILTERS.map((f) => (
              <button key={f} className={"filter-chip" + (active === f ? " is-active" : "")} onClick={() => setActive(f)}>{f}</button>
            ))}
          </div>
          <div className="blog-grid">
            {filtered.map((p) => (
              <article className="blog-card" key={p.id}>
                <div className="tags">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="read">{p.read}</span>
                  <BtnText to="/blog">Read more</BtnText>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="cta-strip" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div>
            <div className="eyebrow">Newsletter</div>
            <h2 className="title-xl" style={{ marginBottom: 0 }}>Learn more about marketing and digital growth</h2>
          </div>
          <div>
            <p className="body lg" style={{ marginBottom: 32 }}>One concise email every other week — the trends, tactics, and metrics worth paying attention to.</p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 12 }}>
              <input type="email" required placeholder="you@company.com" style={{ padding: "16px 18px", background: "rgba(10,14,22,0.6)", border: "1px solid var(--line-2)", color: "var(--ink)", font: "inherit" }}/>
              <BtnLime>Sign me up</BtnLime>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------
// Careers
// ---------------------------------------------------------------
function CareersPage() {
  const { JOBS, BENEFITS } = window.SITE;
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join OPUS Media Lab"
        subtitle="It takes a team to build outstanding things."
        body="OPUS Media Lab is a modern marketing agency helping brands grow through strategy, performance, creative, and optimization. We hire people who want to make work that matters."
        ctaTo="/contact"
        ctaLabel="See current openings"
      />

      {/* Remote-first */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="How we work"
            title="A remote-first team that ships"
            body="We support flexible work, focused collaboration, and strong ownership. Our team works across locations while staying connected through clear communication and shared standards."
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="section tight">
        <div className="container">
          <SectionHead eyebrow="Benefits" title="What you can expect" />
          <div className="benefits-grid">
            {BENEFITS.map((b) => (
              <div className="benefit-row" key={b}>
                <span className="dot" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee story */}
      <section className="section">
        <div className="container narrow">
          <SectionHead eyebrow="Employee story" title="In their words" />
          <Testimonial t={{
            quote: "I joined OPUS because I wanted to work on meaningful growth problems with people who care about both creativity and results.",
            author: "Senior team member",
            company: "Joined 2023",
          }} />
        </div>
      </section>

      {/* Job openings */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Open roles" title="Currently hiring" />
          <div className="jobs-list">
            {JOBS.map((j, i) => (
              <Link key={i} to="/contact" className="job-row">
                <div>
                  <h4>{j.title}</h4>
                  <div className="summary">{j.summary}</div>
                </div>
                <div className="type">{j.type}</div>
                <span className="arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip heading="Don't see a role that fits? Tell us anyway." cta="Send us a message" />
    </>
  );
}

Object.assign(window, { CaseStudiesPage, PortfolioPage, BlogPage, CareersPage });
