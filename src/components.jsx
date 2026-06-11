import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  forwardRef,
  Fragment,
} from "react";
import { SITE } from "./content.js";
import { MediaFrame } from "./components/MediaFrame.jsx";

// ---------------------------------------------------------------
// Router (hash-based)
// ---------------------------------------------------------------
export function useHashRoute() {
  const [hash, setHash] = useState(() => normalizePath(window.location.hash));
  useEffect(() => {
    const onHash = () => setHash(normalizePath(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });}, [hash]);
  return hash;
}
function normalizePath(h) {
  const raw = (h || "").replace(/^#\/?/, "/");
  if (!raw || raw === "/") return "/";
  return raw.replace(/\/+$/, "") || "/";
}
export function navigate(to) {
  if (!to) return;
  window.location.hash = "#" + (to.startsWith("/") ? to : "/" + to);
}
export const Link = forwardRef(function Link({ to, children, className, onClick, ...rest }, ref) {
  const handle = (e) => {
    e.preventDefault();
    navigate(to);
    if (onClick) onClick(e);
  };
  return (
    <a href={"#" + to} className={className} onClick={handle} ref={ref} {...rest}>
      {children}
    </a>);

});

// ---------------------------------------------------------------
// Backdrop layers (bg field, grid, cursor glow)
// ---------------------------------------------------------------
export function Backdrop() {
  return (
    <>
      <div className="bg-field" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
    </>);

}

// ---------------------------------------------------------------
// Ticker — 3D cube rotates forward, one feature per face, 2s each
// ---------------------------------------------------------------
const TICKER_FACE_MS = 2000;
const TICKER_CUBE_H = 44;

export function Ticker() {
  const items = SITE.TICKER;
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  const geometry = useMemo(() => {
    const count = Math.max(items.length, 1);
    const angle = 360 / count;
    const depth = (TICKER_CUBE_H / 2) / Math.tan(Math.PI / count);
    return { count, angle, depth };
  }, [items.length]);

  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    const id = setInterval(() => {
      setStep((s) => s + 1);
    }, TICKER_FACE_MS);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const activeIndex = items.length ? step % items.length : 0;

  return (
    <div
      className="ticker"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ticker-cube-scene">
        <div
          className="ticker-cube"
          style={{ transform: `rotateX(${-step * geometry.angle}deg)` }}
        >
          {items.map((feature, i) => (
            <div
              key={feature}
              className="ticker-cube-face"
              style={{
                transform: `rotateX(${i * geometry.angle}deg) translateZ(${geometry.depth}px)`,
              }}
              aria-hidden={i !== activeIndex}
            >
              <span className="ticker-feature">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// Logo
// ---------------------------------------------------------------
export function Logo({ className }) {
  return (
    <Link to="/" className={"logo " + (className || "")} aria-label="OPUS Media Lab">
      <svg viewBox="0 0 789.47 137.09" aria-hidden="true">
        <path className="word-stroke" d="M211.68,94.45v-51.81c0-17.42,9.08-26.8,27.54-26.8h78.76c18.46,0,27.54,9.38,27.54,26.8v51.81c0,17.42-9.08,26.8-27.54,26.8h-78.76c-18.46,0-27.54-9.38-27.54-26.8ZM314.85,107.25c10.12,0,15.04-3.87,15.04-14.29v-48.83c0-10.42-4.91-14.29-15.04-14.29h-72.65c-9.98,0-14.89,3.87-14.89,14.29v48.83c0,10.42,4.91,14.29,14.89,14.29h72.65Z" />
        <path className="word-stroke" d="M364.13,118.42V18.67c0-1.49.74-2.23,2.23-2.23h94.99c18.61,0,26.95,9.38,26.95,26.8v27.39c0,17.27-8.34,26.65-26.95,26.65h-81.59v21.14c0,1.49-.74,2.23-2.23,2.23h-11.17c-1.49,0-2.23-.74-2.23-2.23ZM379.76,30.43v53h78.46c10.12,0,14.59-4.02,14.59-14.44v-24.27c0-10.42-4.47-14.29-14.59-14.29h-78.46Z" />
        <path className="word-stroke" d="M506.9,93.85V18.67c0-1.49.75-2.23,2.23-2.23h11.17c1.49,0,2.23.74,2.23,2.23v73.7c0,10.42,4.47,14.29,14.44,14.29h73.7c9.98,0,14.44-3.87,14.44-14.29V18.67c0-1.49.75-2.23,2.23-2.23h11.17c1.49,0,2.23.74,2.23,2.23v75.18c0,17.42-8.49,26.8-26.95,26.8h-79.95c-18.46,0-26.95-9.38-26.95-26.8Z" />
        <path className="word-stroke" d="M659.35,96.24c0-1.79.89-2.68,2.83-2.68h9.53c1.79,0,2.68.74,2.98,2.68,1.04,7.44,5.21,11.02,14.89,11.02h68.49c10.72,0,16.08-4.17,16.08-14.44s-5.06-15.19-16.38-15.63l-68.19-4.17c-19.95-1.19-30.22-10.57-30.22-29.03,0-19.65,10.27-28.14,30.22-28.14h69.68c19.8,0,28.14,9.23,28.14,25.01,0,1.79-1.04,2.68-2.83,2.68h-9.53c-1.94,0-2.68-.89-2.98-2.68-1.04-7.44-5.21-11.02-15.04-11.02h-66.25c-10.72,0-16.08,4.17-16.08,14.44s5.06,15.19,16.38,15.63l68.19,4.17c19.95,1.19,30.22,10.57,30.22,28.88,0,19.8-10.27,28.29-30.22,28.29h-71.76c-19.95,0-28.14-9.23-28.14-25.01Z" />
        <path className="mark-stroke" d="M55.84,101.72h62.26c8.68,0,12.89-3.32,12.89-12.25v-14.23H43.08v14.23c0,8.93,4.21,12.25,12.76,12.25Z" />
        <path className="mark-stroke" d="M29.69,61.85v-15.5c0-14.93,7.78-22.97,23.6-22.97h67.49c15.82,0,23.6,8.04,23.6,22.97v15.5h29.69v-26.99c0-22.66-11.81-34.85-35.82-34.85H35.82C11.81,0,0,12.2,0,34.85v26.99h29.69Z" />
        <path className="mark-stroke" d="M144.38,75.24v15.5c0,14.93-7.78,22.97-23.6,22.97H53.29c-15.82,0-23.6-8.04-23.6-22.97v-15.5H0v26.99c0,22.65,11.81,34.85,35.82,34.85h102.43c24.01,0,35.82-12.2,35.82-34.85v-26.99h-29.69Z" />
        <path className="mark-stroke" d="M118.10,35.37h-62.26c-8.55,0-12.76,3.32-12.76,12.25v14.23h87.90v-14.23c0-8.93-4.21-12.25-12.89-12.25Z" />
      </svg>
    </Link>);

}

// ---------------------------------------------------------------
// Buttons (Link-aware)
// ---------------------------------------------------------------
export function CtaPrimary({ to, children, magnetic = true, className = "" }) {
  const ref = useMagnetic(magnetic);
  return (
    <Link to={to} className={"cta-primary " + className} ref={ref}>
      <span>{children}</span>
      <svg className="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </Link>);

}
export function BtnLime({ to, children, compact, onClick, magnetic = true, className = "" }) {
  const ref = useMagnetic(magnetic);
  const cls = ["btn-lime", compact && "compact", className].filter(Boolean).join(" ");
  const inner =
  <>
      <span>{children}</span>
      <span className="arrow-circle">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </>;

  if (to) return <Link to={to} className={cls} ref={ref}>{inner}</Link>;
  return <button type="button" className={cls} onClick={onClick} ref={ref}>{inner}</button>;
}
export function BtnGhost({ to, children, compact, onClick, magnetic = true }) {
  const ref = useMagnetic(magnetic);
  const inner =
  <>
      <span>{children}</span>
      <span className="arrow-circle">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </>;

  if (to) return <Link to={to} className={"btn-ghost" + (compact ? " compact" : "")} ref={ref}>{inner}</Link>;
  return <button type="button" className={"btn-ghost" + (compact ? " compact" : "")} onClick={onClick} ref={ref}>{inner}</button>;
}
export function BtnText({ to, children }) {
  return (
    <Link to={to} className="btn-text">
      {children}
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </Link>);

}

// ---------------------------------------------------------------
// Magnetic effect (subtle pull toward cursor)
// ---------------------------------------------------------------
export function useMagnetic(enabled = true) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });
    };
    const onLeave = () => {cancelAnimationFrame(raf);el.style.transform = "";};
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
  return ref;
}

// ---------------------------------------------------------------
// Header (with services flyout)
// ---------------------------------------------------------------
function NavFlyoutItem({ item, active, route }) {
  const [open, setOpen] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  const closeFlyout = () => {
    setOpen(false);
    if (itemRef.current?.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  };

  return (
    <div
      ref={itemRef}
      className={"nav-item" + (open ? " is-flyout-open" : "")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.to}
        className={"nav-link" + (active ? " is-active" : "")}
        onClick={closeFlyout}
      >
        {item.label}
        <svg className="caret" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4" /></svg>
      </Link>
      <div className="nav-flyout">
        {item.children.map((c) => (
          <Link key={c.to} to={c.to} onClick={closeFlyout}>
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const route = useHashRoute();
  const { NAV } = SITE;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={"header" + (scrolled ? " is-scrolled" : "") + (menuOpen ? " is-menu-open" : "")}>
        <div className="header-inner container">
        <Logo />
        <nav className="nav" aria-label="Primary">
          {NAV.primary.map((item) => {
            const active = route === item.to || item.children && item.children.some((c) => route === c.to) || item.to !== "/" && route.startsWith(item.to + "/");
            if (item.children) {
              return (
                <NavFlyoutItem key={item.label} item={item} active={active} route={route} />
              );
            }
            return (
              <div className="nav-item" key={item.label}>
                <Link to={item.to} className={"nav-link" + (active ? " is-active" : "")}>{item.label}</Link>
              </div>);

          })}
        </nav>
        <div className="header-actions">
          <BtnLime to={NAV.ctaTo} compact className="header-cta is-orange">{NAV.ctaLabel}</BtnLime>
          <button
            type="button"
            className={"header-menu-toggle" + (menuOpen ? " is-open" : "")}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="header-menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
        </div>
      </header>

      <div className={"mobile-nav" + (menuOpen ? " is-open" : "")} aria-hidden={!menuOpen}>
        <button type="button" className="mobile-nav__backdrop" aria-label="Close menu" onClick={closeMenu} />
        <nav className="mobile-nav__panel" aria-label="Mobile">
          {NAV.primary.map((item) => {
            const active = route === item.to || item.children && item.children.some((c) => route === c.to) || item.to !== "/" && route.startsWith(item.to + "/");
            return (
              <div className="mobile-nav__group" key={item.label}>
                <Link
                  to={item.to}
                  className={"mobile-nav__link" + (active && !item.children ? " is-active" : "")}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mobile-nav__sub">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className={"mobile-nav__sublink" + (route === c.to ? " is-active" : "")}
                        onClick={closeMenu}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="mobile-nav__cta">
            <BtnLime to={NAV.ctaTo} compact onClick={closeMenu}>{NAV.ctaLabel}</BtnLime>
          </div>
        </nav>
      </div>
    </>);

}

// ---------------------------------------------------------------
// Footer
// ---------------------------------------------------------------
export function Footer() {
  const { FOOTER } = SITE;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="brand-block">
            <Logo />
            <p>{FOOTER.description}</p>
            <div className="office">
              <strong>{FOOTER.office.label}</strong>
              <span>{FOOTER.office.address}</span>
            </div>
          </div>
          {FOOTER.columns.map((col) =>
          <div className="footer-col" key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((l) =>
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              )}
              </ul>
            </div>
          )}
          <div className="newsletter">
            <h5>{FOOTER.newsletter.heading}</h5>
            <form onSubmit={(e) => {e.preventDefault();}}>
              <input type="email" placeholder={FOOTER.newsletter.placeholder} required />
              <button type="submit">{FOOTER.newsletter.cta}</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {FOOTER.brand}. All rights reserved.</span>
          <span>OPUS://global.network · v2.0</span>
        </div>
      </div>
    </footer>);

}

// ---------------------------------------------------------------
// FAQ accordion
// ---------------------------------------------------------------
export function FAQ({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={"faq-item" + (isOpen ? " is-open" : "")} key={i}>
            <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{item.q}</span>
              <span className="plus" aria-hidden="true" />
            </button>
            <div className="faq-a" style={{ maxHeight: isOpen ? "400px" : "0" }}>
              <div className="faq-a-inner">{item.a}</div>
            </div>
          </div>);

      })}
    </div>);

}

// ---------------------------------------------------------------
// Stats rail
// ---------------------------------------------------------------
export function StatsRail({ stats }) {
  return (
    <section className="rail" style={{ textAlign: "center" }}>
      <div className="container">
        {stats.map((s, i) =>
        <div className="stat" key={i}>
            <div className="num"><Counter text={s.value} /></div>
            <div className="lbl">{s.label}</div>
          </div>
        )}
      </div>
    </section>);

}
export function Counter({ text }) {
  // counts numeric portion, preserves suffix/prefix
  const m = String(text).match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!m) return <span>{text}</span>;
  const [, prefix, numStr, suffix] = m;
  const target = parseFloat(numStr);
  const isFloat = numStr.includes(".");
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.disconnect();
          const dur = 1500,start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = target * eased;
            setVal(isFloat ? v.toFixed(1) : Math.round(v));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {prefix}<span className="val">{val}</span><span className="unit">{suffix}</span>
    </span>);

}

// ---------------------------------------------------------------
// Animated title (word-by-word rise + optional glitch)
// ---------------------------------------------------------------
export function AnimatedTitle({
  text,
  className = "title-xl",
  baseDelay = 0.15,
  step = 0.07,
  as = "h1",
  glitch = false,
  glitchFlash = false,
}) {
  const titleRef = useRef(null);
  const words = String(text).split(/\s+/);
  const Tag = as;

  useEffect(() => {
    if (!glitchFlash) return;
    const el = titleRef.current;
    if (!el) return;
    const FLASH_MS = 1000;
    const PAUSE_MS = 2000;
    let timer = 0;
    const flash = () => {
      const freq = window.__opusGlitchFreq || "medium";
      if (freq === "off") {
        timer = setTimeout(flash, PAUSE_MS);
        return;
      }
      el.setAttribute("data-flashing", "true");
      setTimeout(() => el.removeAttribute("data-flashing"), FLASH_MS);
      timer = setTimeout(flash, FLASH_MS + PAUSE_MS);
    };
    timer = setTimeout(flash, PAUSE_MS);
    return () => clearTimeout(timer);
  }, [glitchFlash]);

  return (
    <Tag
      ref={glitchFlash ? titleRef : undefined}
      className={["animated-title", glitch && "animated-title--glitch", className].filter(Boolean).join(" ")}
      aria-label={text}
    >
      {words.map((w, i) =>
      <Fragment key={i}>
          <span className="word-wrap">
            <span className="word" style={{ animationDelay: `${baseDelay + i * step}s` }}>
              {glitch ? <span className="glitch" data-text={w}>{w}</span> : w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      )}
    </Tag>);

}

// ---------------------------------------------------------------
// Route wipe overlay — plays once each route change
// ---------------------------------------------------------------
export function RouteWipe({ route }) {
  // keying by route forces a remount and replays the animation
  return <div className="route-wipe" key={route} aria-hidden="true" />;
}

// ---------------------------------------------------------------
// Section head (title + body)
// ---------------------------------------------------------------
export function SectionHead({ eyebrow, title, body }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <AnimatedTitle text={title} className="title-lg" baseDelay={0.05} step={0.05} as="h2" />
      </div>
      {body && <p className="body lg">{body}</p>}
    </div>);

}

// ---------------------------------------------------------------
// CTA strip / final CTA
// ---------------------------------------------------------------
export function CtaStrip({ heading = "Let's start a new chapter for your business", cta = "Send us a message", to = "/contact" }) {
  return (
    <section className="cta-strip">
      <div className="container">
        <div>
          <div className="eyebrow">Next step</div>
          <h2 className="title-xl" style={{ marginBottom: 0 }}>{heading}</h2>
        </div>
        <div>
          <p className="body lg" style={{ marginBottom: 32 }}>
            A 30-minute conversation is enough to know whether we're a good fit. No slides, no pressure — just a clear next step.
          </p>
          <BtnLime to={to}>{cta}</BtnLime>
        </div>
      </div>
    </section>);

}

// ---------------------------------------------------------------
// Service category card
// ---------------------------------------------------------------
export function ServiceCategoryCard({ index, title, body, bullets }) {
  return (
    <div className="service-card">
      <div className="num">{String(index).padStart(2, "0")} · Service</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <ul>
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </div>);

}

// ---------------------------------------------------------------
// Case card
// ---------------------------------------------------------------
export function CaseCard({ c }) {
  const onCardClick = () => navigate("/case-studies");
  return (
    <article className="case-card" onClick={onCardClick} style={{ cursor: "pointer" }}>
      <MediaFrame
        slot="caseStudy"
        ratio={c.ratio || "16/9"}
        src={c.image}
        alt={c.title}
        className="case-card__media"
      />
      <div className="meta"><span>{c.segment}</span><span>{c.client}</span></div>
      <h3>{c.title}</h3>
      <p>{c.summary}</p>
      <ul className="services">
        {c.services.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <span
        className="btn-text"
        onClick={(e) => {e.stopPropagation();navigate("/case-studies");}}>
        
        Learn more
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </article>);

}

// ---------------------------------------------------------------
// Testimonial
// ---------------------------------------------------------------
export function Testimonial({ t }) {
  return (
    <div className="testimonial">
      <blockquote>{t.quote}</blockquote>
      <cite>
        <span className="who">{t.author}</span>
        <span className="what">{t.company}</span>
      </cite>
    </div>);

}

// ---------------------------------------------------------------
// Layout wrapper
// ---------------------------------------------------------------
export function Layout({ children }) {
  return (
    <>
      <Backdrop />
      <Ticker />
      <Header />
      <main className="page">{children}</main>
      <Footer />
    </>);

}

// ---------------------------------------------------------------
// Page hero (non-home)
// ---------------------------------------------------------------
export function PageHero({ eyebrow, title, subtitle, body, ctaTo, ctaLabel, image, imageAlt }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-copy">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <AnimatedTitle text={title} className="title-xl" baseDelay={0.25} step={0.075} glitch glitchFlash />
          {subtitle && <p className="kicker fade-up-in" style={{ animationDelay: "0.5s" }}>{subtitle}</p>}
          {body && <p className="lede fade-up-in" style={{ animation: "fade-up 0.9s cubic-bezier(.2,.7,.2,1) 0.6s forwards" }}>{body}</p>}
          {ctaTo && <div className="fade-up-in" style={{ animationDelay: "0.75s" }}><BtnLime to={ctaTo}>{ctaLabel || "Book a free consultation"}</BtnLime></div>}
        </div>
        <div className="page-hero-figure">
          <MediaFrame
            slot="pageHero"
            ratio="16/9"
            matchHeight
            src={image || null}
            alt={imageAlt || eyebrow || ""}
            meta={!image && eyebrow ? eyebrow.toUpperCase() : undefined}
            className="page-hero-figure__media"
          />
          <span className="frame-corner tl" aria-hidden="true" />
          <span className="frame-corner tr" aria-hidden="true" />
          <span className="frame-corner bl" aria-hidden="true" />
          <span className="frame-corner br" aria-hidden="true" />
        </div>
      </div>
    </section>);

}
