/* About + Contact + Privacy/Terms stubs */

function AboutPage() {
  const { TEAM, VALUES, TESTIMONIALS, SERVICES_STATS } = window.SITE;
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We help brands enter a new season of growth"
        subtitle="OPUS Media Lab is built for companies that want clarity, momentum, and measurable performance from their marketing."
        body="A focused team that combines market research, paid media, creative strategy, and conversion optimization to build marketing systems that perform."
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

      {/* Team */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Team" title="The people behind the work" body="A senior team of strategists, marketers, and creatives — each operating as an extension of your in-house team." />
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div className="team-card" key={i}>
                <div className="avatar">
                  <span className="initials">{initials(m.name)}</span>
                </div>
                <h4>{m.name}</h4>
                <div className="role">{m.role}</div>
                <p className="bio">{m.bio}</p>
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

      <CtaStrip heading="Want to meet the team behind the work?" />
    </>
  );
}

function initials(name) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

// ---------------------------------------------------------------
// Contact
// ---------------------------------------------------------------
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", email: "", company: "", message: "", consent: false });
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.consent) return;
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact us"
        subtitle="Let's talk about your next stage of growth."
        body="Bring your vision. We'll help turn it into traction, campaigns, and measurable results."
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <aside className="contact-info">
              <div className="eyebrow">Get in touch</div>
              <h2 className="title-md">Three ways to start a conversation</h2>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>hello@opusmedialab.com</dd>
                </div>
                <div>
                  <dt>Office</dt>
                  <dd>Temecula, California</dd>
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
                <div style={{ padding: 48, border: "1px solid var(--lime)", background: "rgba(214,255,61,0.04)" }}>
                  <div className="eyebrow">Message received</div>
                  <h2 className="title-md">Thank you — we'll be in touch.</h2>
                  <p className="body" style={{ marginTop: 12 }}>We typically reply within one business day. In the meantime, feel free to explore our <Link to="/case-studies" style={{ color: "var(--lime)", borderBottom: "1px solid var(--lime)" }}>case studies</Link>.</p>
                </div>
              ) : (
                <form className="form" onSubmit={onSubmit}>
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
                    <label>Message</label>
                    <textarea required value={form.message} onChange={upd("message")} placeholder="A sentence or two about what you're working on…" />
                  </div>
                  <label className="checkbox-row">
                    <input type="checkbox" checked={form.consent} onChange={upd("consent")} required />
                    <span>I agree to the <Link to="/privacy" style={{ color: "var(--lime)" }}>privacy policy</Link> and consent to OPUS Media Lab contacting me about my inquiry.</span>
                  </label>
                  <div className="field-full">
                    <BtnLime onClick={() => { /* form submit handled by enter */ }} magnetic={false}>Send a message</BtnLime>
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
function LegalPage({ kind }) {
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

Object.assign(window, { AboutPage, ContactPage, LegalPage });
