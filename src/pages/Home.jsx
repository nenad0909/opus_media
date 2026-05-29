import { useRef, useEffect, Fragment } from "react";
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
} from "../components.jsx";

function Hero() {
  const figRef = useRef(null);
  const imgWrapRef = useRef(null);
  const headlineRef = useRef(null);

  // figure parallax
  useEffect(() => {
    const fig = figRef.current,wrap = imgWrapRef.current;
    if (!fig || !wrap) return;
    let tx = 0,ty = 0,cx = 0,cy = 0,raf = 0;
    const onMove = (e) => {
      const r = fig.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {tx = 0;ty = 0;};
    fig.addEventListener("pointermove", onMove);
    fig.addEventListener("pointerleave", onLeave);
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      wrap.style.transform = `translate3d(${cx * -12}px, ${cy * -8}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      fig.removeEventListener("pointermove", onMove);
      fig.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // periodic glitch flash — 1s animation, 2s pause between loops
  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;
    const FLASH_MS = 1000;
    const PAUSE_MS = 2000;
    let timer = 0;
    const flash = () => {
      const freq = window.__opusGlitchFreq || "medium";
      if (freq === "off") {
        timer = setTimeout(flash, PAUSE_MS);
        return;
      }
      headline.setAttribute("data-flashing", "true");
      setTimeout(() => headline.removeAttribute("data-flashing"), FLASH_MS);
      timer = setTimeout(flash, FLASH_MS + PAUSE_MS);
    };
    timer = setTimeout(flash, PAUSE_MS);
    return () => clearTimeout(timer);
  }, []);

  const lines = [
  [["A", 0.05], ["force", 0.15], ["that", 0.25]],
  [["moves", 0.35], ["your", 0.45]],
  [["business", 0.55], ["forward.", 0.65]]];


  return (
    <section className="hero">
      <div className="hero-inner container">
      <div className="hero-copy">
        <div className="hero-meta">
          <span>opus media lab marketing agency</span>
          <span className="sep">/</span>
          <span>California → Global</span>
        </div>

        <h1 className="headline" ref={headlineRef}>
          {lines.map((line, li) =>
          <span className="line" key={li}>
              {line.map(([w, delay], wi) =>
            <Fragment key={wi}>
                  <span className="word" style={{ animationDelay: `${delay}s` }}>
                    <span className="glitch" data-text={w}>{w}</span>
                  </span>
                  {wi < line.length - 1 ? " " : ""}
                </Fragment>
            )}
            </span>
          )}
        </h1>

        <p className="lede">
          <span className="brand">OPUS Media Lab</span> helps ambitious brands turn digital complexity into clear growth. We build marketing systems that combine strategy, performance media, creative content, and conversion optimization.
        </p>
      </div>

      <div className="hero-aside">
      <div className="hero-figure" ref={figRef}>
        <div className="glow" aria-hidden="true"></div>

        <div className="img-wrap" ref={imgWrapRef}>
          <span className="frame-corner tl" aria-hidden="true"></span>
          <span className="frame-corner tr" aria-hidden="true"></span>
          <span className="frame-corner bl" aria-hidden="true"></span>
          <span className="frame-corner br" aria-hidden="true"></span>
          <img
            src="/assets/hero_main.png"
            alt="Three figures in motion, rendered with chromatic glitch effect"
          />
        </div>
      </div>

        <div className="hero-actions">
          <BtnLime to="/contact">Book a free 30‑minute consultation</BtnLime>
          <BtnGhost to="/services">Explore services</BtnGhost>
        </div>
      </div>

        <div className="scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <span className="line"></span>
        </div>
      </div>
    </section>);

}

// ---------------------------------------------------------------
// Home page composition
// ---------------------------------------------------------------
export function HomePage() {
  const { SERVICE_CATEGORIES, CASE_STUDIES, TESTIMONIALS, HOME_FAQS, HOME_STATS } = SITE;
  const featured = CASE_STUDIES.filter((c) => c.featured);

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
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 32 }} className="home-stats">
            {HOME_STATS.map((s, i) =>
            <div key={i} style={{ borderTop: "1px solid var(--line-2)", paddingTop: 18 }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 56, lineHeight: 1, color: "var(--lime)" }}>{s.value}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase", marginTop: 10 }}>{s.label}</div>
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
          <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
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
          <div style={{ marginTop: 40 }}>
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
