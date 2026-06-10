import { useState } from "react";
import { SITE } from "../content.js";
import { submitConsultation } from "../lib/contact.js";
import {
  Link,
  PageHero,
  StatsRail,
  SectionHead,
  Testimonial,
  CtaStrip,
} from "../components.jsx";
export function AboutPage() {
  const { VALUES, TESTIMONIALS, SERVICES_STATS } = SITE;
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We help brands enter a new season of growth"
        subtitle="OPUS Media Lab is built for companies that want clarity, momentum, and measurable performance from their marketing."
        body="A focused team that combines market research, paid media, creative strategy, and conversion optimization to build marketing systems that perform."
        image="/assets/about_hero.png"
        imageAlt="Glitch-rendered team representing OPUS Media Lab"
      />

      <StatsRail stats={SERVICES_STATS} />

      {/* Who we are */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Who we are"
            title="A growth partner, not just a vendor"
            body="We help brands navigate competitive digital markets by turning challenges into growth opportunities. Our team combines market research, paid media, creative strategy, and conversion optimization to build marketing systems that perform."
          />
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Values" title="How we operate" />
          <div className="values-list">
            {VALUES.map((v, i) => (
              <div className="value-row" key={i}>
                <span className="vnum">{String(i + 1).padStart(2, "0")} / 0{VALUES.length}</span>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Words" title="What working with us feels like" />
          <div className="testimonials">
            {TESTIMONIALS.slice(3, 6).map((t, i) => <Testimonial key={i} t={t} />)}
          </div>
        </div>
      </section>

      <CtaStrip heading="Ready to work together?" />
    </>
  );
}

// ---------------------------------------------------------------
// Contact
// ---------------------------------------------------------------
const INITIAL_FORM = {
  first: "",
  last: "",
  email: "",
  company: "",
  website: "",
  message: "",
  consent: false,
  companyWebsite: "",
};

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const messageParts = [];
      if (form.last.trim()) messageParts.push(`Last name: ${form.last.trim()}`);
      if (form.message.trim()) messageParts.push(form.message.trim());
      const result = await submitConsultation({
        email: form.email,
        firstName: form.first,
        businessName: form.company,
        website: form.website,
        message: messageParts.join("\n\n"),
        companyWebsite: form.companyWebsite,
      });
      setSuccessMessage(
        result.message || "Thank you. Please check your email to schedule your consultation.",
      );
      setForm(INITIAL_FORM);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "We could not send your request. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="section contact-page">
        <div className="container">
          <div className="contact-grid">
            <aside className="contact-info">
              <div className="eyebrow">Get in touch</div>
              <h2 className="title-md">Let's start the conversation</h2>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>hello@opusmedialab.com</dd>
                </div>
                <div>
                  <dt>Office</dt>
                  <dd>Temecula / Orange County, California</dd>
                </div>
                <div>
                  <dt>Response time</dt>
                  <dd>Within one business day</dd>
                </div>
                <div>
                  <dt>Looking for a job?</dt>
                  <dd><Link to="/careers" className="btn-text" style={{ marginTop: 8 }}>See open roles<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></Link></dd>
                </div>
              </dl>
            </aside>

            <div>
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  style={{ padding: 48, border: "1px solid var(--lime)", background: "rgba(214,255,61,0.04)" }}
                >
                  <div className="eyebrow">Message received</div>
                  <h2 className="title-md">{successMessage}</h2>
                  <p className="body" style={{ marginTop: 12 }}>We typically reply within one business day. In the meantime, feel free to explore our <Link to="/case-studies" style={{ color: "var(--lime)", borderBottom: "1px solid var(--lime)" }}>case studies</Link>.</p>
                </div>
              ) : (
                <form className="form" onSubmit={onSubmit} noValidate>
                  <div className="field field-honeypot" aria-hidden="true">
                    <label htmlFor="companyWebsite">Company website</label>
                    <input
                      id="companyWebsite"
                      type="text"
                      name="companyWebsite"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.companyWebsite}
                      onChange={upd("companyWebsite")}
                    />
                  </div>
                  <div className="field">
                    <label>First name</label>
                    <input type="text" required value={form.first} onChange={upd("first")} />
                  </div>
                  <div className="field">
                    <label>Last name</label>
                    <input type="text" required value={form.last} onChange={upd("last")} />
                  </div>
                  <div className="field field-full">
                    <label>Email</label>
                    <input type="email" required value={form.email} onChange={upd("email")} />
                  </div>
                  <div className="field field-full">
                    <label>Company / Brand</label>
                    <input type="text" value={form.company} onChange={upd("company")} />
                  </div>
                  <div className="field field-full">
                    <label>Website <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
                    <input type="url" value={form.website} onChange={upd("website")} placeholder="https://" />
                  </div>
                  <div className="field field-full">
                    <label>Message</label>
                    <textarea required value={form.message} onChange={upd("message")} placeholder="A sentence or two about what you're working on…" />
                  </div>
                  <label className="checkbox-row">
                    <input type="checkbox" checked={form.consent} onChange={upd("consent")} required />
                    <span>I agree to the <Link to="/privacy" style={{ color: "var(--lime)" }}>privacy policy</Link> and consent to OPUS Media Lab contacting me about my inquiry.</span>
                  </label>
                  {error ? (
                    <p className="body" role="alert" style={{ color: "#ff6b6b", marginTop: 8 }}>{error}</p>
                  ) : null}
                  <div className="field-full">
                    <button type="submit" className="btn-lime" disabled={submitting} aria-busy={submitting}>
                      <span>{submitting ? "Sending…" : "Send a message"}</span>
                      <span className="arrow-circle">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------
// Privacy + Terms stubs (referenced from footer)
// ---------------------------------------------------------------
export function LegalPage({ kind }) {
  const isPrivacy = kind === "privacy";
  return (
    <>
      <PageHero
        eyebrow={isPrivacy ? "Privacy" : "Terms"}
        title={isPrivacy ? "Privacy Policy" : "Terms of Service"}
        subtitle={isPrivacy ? "How we collect, use, and protect data." : "The terms under which we work together."}
      />
      <section className="section">
        <div className="container narrow">
          <p className="body lg">This placeholder will be replaced with the full legal text. If you have a specific question in the meantime, please <Link to="/contact" style={{ color: "var(--lime)", borderBottom: "1px solid var(--lime)" }}>contact us</Link>.</p>
        </div>
      </section>
    </>
  );
}

