import { SITE } from "../content.js";
import {
  Link,
  PageHero,
  SectionHead,
  CaseCard,
  CtaStrip,
  Testimonial,
} from "../components.jsx";
import { MediaFrame } from "../components/MediaFrame.jsx";

export function CaseStudiesPage() {
  const { CASE_STUDIES } = SITE;
  const featured = CASE_STUDIES.filter(c => c.featured);

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Our success stories"
        subtitle="Real campaigns. Clear numbers. Measurable growth."
        body="Explore how OPUS Media Lab turns strategy, creative, and performance marketing into practical growth outcomes."
        image="/assets/case_hero.png"
        imageAlt="Glitch-rendered figures representing brand audiences"
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

      <CtaStrip heading="Curious how a story like these might look for you?" />
    </>
  );
}

export function PortfolioPage() {
  const { PORTFOLIO } = SITE;
  // varied grid spans for visual rhythm
  const spans = [6, 6, 4, 4, 4, 8, 4, 6, 6, 12];
  const spanRatios = { 4: "5/7", 6: "16/9", 8: "16/9", 12: "16/9" };
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
        image="/assets/contact_hero.png"
        imageAlt="Glitch-rendered professionals in conversation"
      />

      <section className="section">
        <div className="container">
          <div className="portfolio-grid">
            {PORTFOLIO.map((p, i) => {
              const span = spans[i % spans.length];
              const [a, b] = palettes[i % palettes.length];
              const ratio = p.ratio || spanRatios[span] || "16/9";
              return (
                <div className={"portfolio-item span-" + span} key={p.id} style={{ "--g-from": a, "--g-to": b }}>
                  <MediaFrame
                    slot={ratio === "5/7" ? "portfolioTall" : "portfolioWide"}
                    ratio={ratio}
                    src={p.image}
                    alt={p.title}
                    className="portfolio-item__media"
                  />
                  <div className="portfolio-item__copy">
                    <div className="cat">{p.category}</div>
                    <h3>{p.title}</h3>
                    <div className="client">{p.client}</div>
                    <p className="desc">{p.description}</p>
                  </div>
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
export function BlogPage() {
  return (
    <PageHero
      eyebrow="Blog"
      title="We're working on it — coming soon."
      image="/assets/blog_hero.png"
      imageAlt="Glitch-rendered figures representing the OPUS Blog"
    />
  );
}

// ---------------------------------------------------------------
// Careers
// ---------------------------------------------------------------
export function CareersPage() {
  const { JOBS, BENEFITS } = SITE;
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join OPUS Media Lab"
        subtitle="It takes a team to build outstanding things."
        body="OPUS Media Lab is a modern marketing agency helping brands grow through strategy, performance, creative, and optimization. We hire people who want to make work that matters."
        ctaTo="/contact"
        ctaLabel="See current openings"
        image="/assets/careers_hero.png"
        imageAlt="Glitch-rendered team representing careers at OPUS Media Lab"
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

