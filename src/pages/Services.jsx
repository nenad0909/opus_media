import { useState, useEffect } from "react";
import { SITE } from "../content.js";
import {
  Link,
  PageHero,
  StatsRail,
  SectionHead,
  ServiceCategoryCard,
  Testimonial,
  CtaStrip,
  BtnGhost,
  CaseCard,
  FAQ,
  AnimatedTitle,
} from "../components.jsx";

export function ServicesHubPage() {
  const { SERVICES, SERVICE_CATEGORIES, SERVICES_STATS, GOALS, TESTIMONIALS } = SITE;
  const topSlugs = ["web-design", "app-development", "social-media-ads", "google-ads"];
  const topServices = topSlugs.map(s => SERVICES.find(x => x.slug === s)).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Personalized services for measurable growth"
        subtitle="Every business is different, so our services are built around your goals, market, audience, and current stage of growth."
        body="Whether you're entering a new region, scaling demand, or rebuilding an underperforming funnel, we shape engagements around the outcomes that move your business."
        ctaTo="/contact"
        ctaLabel="Schedule a free consultation"
        image="/assets/services_hero.png"
        imageAlt="Glitch-rendered figure representing digital services"
      />

      <StatsRail stats={SERVICES_STATS} />

      {/* Top services */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Top services" title="Where most engagements start" />
          <div className="top-services">
            {topServices.map((s, i) => (
              <Link key={s.slug} to={"/services/" + s.slug} className="top-service-row">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="name">{s.title}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase", marginTop: 8 }}>{s.subtitle}</div>
                </div>
                <span className="tag">View service</span>
                <span className="arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All service categories */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="All services"
            title="Built around how growth actually happens"
            body="Four focus areas designed to work together — strategy, creative, paid, and analytics under one roof."
          />
          <div className="service-grid">
            {SERVICE_CATEGORIES.map((s, i) => (
              <ServiceCategoryCard key={s.id} index={i + 1} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Goals tabs */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Supporting goals" title="What we help you achieve" />
          <GoalsTabs goals={GOALS} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What partners say" title="The kind of work clients ask us to do again" />
          <div className="testimonials">
            {TESTIMONIALS.slice(0, 3).map((t, i) => <Testimonial key={i} t={t} />)}
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}

function GoalsTabs({ goals }) {
  const [active, setActive] = useState(0);
  const current = goals[active];
  return (
    <div className="goal-tabs">
      <div className="tabs">
        {goals.map((g, i) => (
          <button key={i} className={"goal-tab" + (active === i ? " is-active" : "")} onClick={() => setActive(i)}>
            {String(i + 1).padStart(2, "0")} · {g.title}
          </button>
        ))}
      </div>
      <div className="goal-content">
        <h3>{current.title}</h3>
        <p>{current.body}</p>
        <div style={{ marginTop: 32 }}>
          <BtnGhost to="/contact" compact>Talk to us</BtnGhost>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// Service detail page (template, driven by slug)
// ---------------------------------------------------------------
export function ServiceDetailPage({ slug }) {
  const { SERVICES, CASE_STUDIES } = SITE;
  const service = SERVICES.find(s => s.slug === slug);
  if (!service) return <NotFoundFragment label={slug} />;

  // pick related case studies (loosely match on services tag)
  const related = CASE_STUDIES.filter(c =>
    c.services.some(svc => normalizeMatch(svc).includes(normalizeMatch(service.title.split(" ")[0])))
  ).slice(0, 3);
  const relatedFinal = related.length ? related : CASE_STUDIES.slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={"Services / " + service.title}
        title={service.title}
        subtitle={service.subtitle}
        body={service.intro}
        ctaTo="/contact"
        ctaLabel="Book a free consultation"
        image={service.heroImage}
        imageAlt={service.heroImageAlt}
      />

      {/* Service list (chips) */}
      <section className="section tight">
        <div className="container">
          <div className="inside-service">
            <div className="inside-service__head">
              <div className="eyebrow">What we do</div>
              <AnimatedTitle text={"Inside " + service.title} className="title-lg" baseDelay={0.05} step={0.05} as="h2" />
            </div>
            <ChipList items={service.services} />
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What you get" title="A focused team and a clear plan" body="Every engagement is shaped around your goals. These are the ingredients we bring." />
          <div className="what-you-get">
            {service.whatYouGet.map((row, i) => (
              <div className="what-row" key={i}>
                <span className="check">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square"><path d="M3 8.5l3.5 3.5L13 5"/></svg>
                </span>
                <span>{row}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Process" title="How we work together" body="Every engagement follows the same simple arc — clear goals, focused execution, and consistent reviews." />
          <div className="process">
            {service.process.map((p, i) => (
              <div className="process-step" key={i}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related case studies */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Related case studies" title="Some of the work behind this practice" />
          <div className="card-grid cols-3">
            {relatedFinal.map((c) => <CaseCard key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Common questions" />
          <FAQ items={service.faqs} />
        </div>
      </section>

      <CtaStrip heading={"Ready to grow with " + service.title.toLowerCase() + "?"} />
    </>
  );
}

function ChipList({ items }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % items.length);
    }, 2000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <ul className="chip-list">
      {items.map((s, i) => (
        <li key={s} className={i === active ? "is-active" : ""}>{s}</li>
      ))}
    </ul>
  );
}

function normalizeMatch(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function NotFoundFragment({ label }) {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">404</div>
        <AnimatedTitle text="Page not found" className="title-xl" baseDelay={0.25} step={0.075} glitch glitchFlash />
        <p className="body lg">We couldn't find a page for <code>{label}</code>.</p>
        <div style={{ marginTop: 24 }}>
          <BtnGhost to="/">Back home</BtnGhost>
        </div>
      </div>
    </section>
  );
}

