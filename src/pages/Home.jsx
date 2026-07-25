import { SITE } from "../content.js";
import {
  BtnLime,
  BtnGhost,
  StatsRail,
  SectionHead,
  ServiceCategoryCard,
  CaseCard,
  Testimonial,
  FAQ,
  CtaStrip,
  AnimatedTitle,
  HeroParticles,
} from "../components.jsx";
import { useSeo, faqJsonLd } from "../seo.js";

function Hero() {
  return (
    <section className="hero">
      <HeroParticles />
      <div className="hero-inner container">
        <div className="hero-copy">
          <div className="hero-meta">
            <span>01</span>
            <span className="sep">/</span>
            <span>Growth systems</span>
          </div>
          <AnimatedTitle
            text="A force that moves your business forward."
            className="headline"
            baseDelay={0.12}
            step={0.055}
            accentIndex={1}
          />
        </div>
        <p className="lede hero-lede">
          <span className="brand">OPUS Media Lab</span> helps ambitious brands turn digital complexity into clear growth. We build marketing systems that combine strategy, performance media, creative content, and conversion optimization.
        </p>
        <div className="hero-actions">
          <BtnLime to="/contact">Book a free 30‑minute consultation</BtnLime>
          <BtnGhost to="/services">Explore services</BtnGhost>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------
// Home page composition
// ---------------------------------------------------------------
export function HomePage() {
  const { SERVICE_CATEGORIES, CASE_STUDIES, TESTIMONIALS, HOME_FAQS, HOME_STATS } = SITE;
  const featured = CASE_STUDIES.filter((c) => c.featured);

  useSeo({
    title: "OPUS Media Lab — Digital Marketing Agency | Southern California & Inland Empire",
    description: "OPUS Media Lab is a performance-driven digital marketing agency serving Southern California and the Inland Empire. We help ambitious brands grow through SEO, Google Ads, paid social, web design, and content marketing.",
    path: "/",
    jsonLd: faqJsonLd(HOME_FAQS),
  });

  return (
    <>
      <Hero />
      <StatsRail stats={[
      { value: "150+", label: "Brands shipped" },
      { value: "3.8×", label: "Avg. ROAS lift" },
      { value: "42%", label: "Conversion gain" },
      { value: "24/7", label: "Reporting cycle" }]
      } />

      {/* About preview */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="More than a marketing agency"
            title="Your growth partner from research to revenue"
            body="When you partner with OPUS Media Lab, you gain a focused team that studies your market, sharpens your positioning, and builds campaigns around measurable business outcomes. We help brands enter new markets, increase demand, and turn attention into revenue." />
          
          <div className="home-stats">
            {HOME_STATS.map((s, i) =>
            <div key={i}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Services"
            title="Built around how growth actually happens"
            body="Four areas of focus, designed to work together. We bring strategy, creative, paid media, and conversion thinking under one roof so nothing gets lost between handoffs." />
          
          <div className="service-grid">
            {SERVICE_CATEGORIES.map((s, i) =>
            <ServiceCategoryCard key={s.id} index={i + 1} {...s} />
            )}
          </div>
          <div className="section-btn-row">
            <BtnGhost to="/services">See all services</BtnGhost>
          </div>
        </div>
      </section>

      {/* Featured case studies */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Trusted by growing teams and ambitious brands"
            title="Real campaigns. Clear numbers."
            body="From startups to established companies, our work is designed to create measurable momentum across the full digital funnel." />
          
          <div className="card-grid cols-3">
            {featured.map((c) => <CaseCard key={c.slug} c={c} />)}
          </div>
          <div className="section-btn-row">
            <BtnGhost to="/case-studies">Browse all case studies</BtnGhost>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Words from teams we work with" title="The kind of partnership clients keep choosing" />
          <div className="testimonials">
            {TESTIMONIALS.map((t, i) => <Testimonial key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Common questions" title="Things people ask before we start" />
          <FAQ items={HOME_FAQS} />
        </div>
      </section>

      <CtaStrip />
    </>);

}
