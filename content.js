/* OPUS Media Lab — site content
   All page copy, services, case studies, team, blog, etc.
   Edit this file to update content site-wide.
*/

window.SITE = (function () {

  const TICKER = [
    "Boosting Sales",
    "Increasing Brand Awareness",
    "Entering New Markets",
    "Growing Revenue",
    "Improving Conversion Rates",
    "Scaling Customer Acquisition",
  ];

  const NAV = {
    primary: [
      {
        label: "Services",
        to: "/services",
        children: [
          { label: "International Expansion", to: "/services/international-expansion" },
          { label: "German Market Expansion", to: "/services/german-market-expansion" },
          { label: "Social Media Ads",        to: "/services/social-media-ads" },
          { label: "Google Ads",              to: "/services/google-ads" },
          { label: "Content Marketing",       to: "/services/content-marketing" },
          { label: "Email Marketing",         to: "/services/email-marketing" },
          { label: "Digital Marketing",       to: "/services/digital-marketing" },
          { label: "PPC",                     to: "/services/ppc" },
          { label: "CRO",                     to: "/services/cro" },
        ],
      },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Portfolio",    to: "/portfolio" },
      { label: "About",        to: "/about" },
      { label: "Blog",         to: "/blog" },
      { label: "Careers",      to: "/careers" },
      { label: "Contact",      to: "/contact" },
    ],
    ctaLabel: "Book a Free Consultation",
    ctaTo: "/contact",
  };

  const FOOTER = {
    brand: "OPUS Media Lab",
    description:
      "A performance-driven digital marketing agency helping ambitious brands grow through strategy, creative, paid media, and conversion optimization.",
    office: {
      label: "California Office",
      address: "Temecula / Orange County, California",
    },
    columns: [
      {
        title: "Company",
        links: [
          { label: "About",        to: "/about" },
          { label: "Careers",      to: "/careers" },
          { label: "Blog",         to: "/blog" },
          { label: "Contact",      to: "/contact" },
        ],
      },
      {
        title: "Work",
        links: [
          { label: "Case Studies", to: "/case-studies" },
          { label: "Portfolio",    to: "/portfolio" },
          { label: "Services",     to: "/services" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy",   to: "/privacy" },
          { label: "Terms of Service", to: "/terms" },
        ],
      },
    ],
    newsletter: {
      heading: "Subscribe to our newsletter",
      placeholder: "Enter your email",
      cta: "Subscribe",
    },
  };

  // -----------------------------------------------------------
  // Service categories (used on home + services hub)
  // -----------------------------------------------------------
  const SERVICE_CATEGORIES = [
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      body: "Full-funnel marketing campaigns built around your customer journey, growth stage, and revenue goals.",
      bullets: ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "Native Ads", "Amazon Ads"],
    },
    {
      id: "content-creation",
      title: "Content Creation",
      body: "Creative content that earns attention, builds trust, and gives campaigns the emotional edge they need to convert.",
      bullets: ["Copywriting", "UGC", "Email Content", "Social Content", "Graphic Design", "Video Editing"],
    },
    {
      id: "digital-strategy",
      title: "Digital Strategy",
      body: "Market-backed strategy that clarifies where to compete, what to say, and how to scale.",
      bullets: ["GTM Strategy", "Brand Positioning", "Localization", "Market Strategy", "Consulting"],
    },
    {
      id: "research-audits",
      title: "Research & Audits",
      body: "Deep analysis that uncovers friction, opportunities, and clear next steps for growth.",
      bullets: ["Market Entry Analysis", "Website Audit", "Competitive Analysis", "Analytics Audit", "Ad Account Audit"],
    },
  ];

  // -----------------------------------------------------------
  // Service detail pages
  // -----------------------------------------------------------
  const SERVICES = [
    {
      slug: "international-expansion",
      title: "International Expansion",
      subtitle: "Launch your business in new markets with confidence.",
      intro:
        "Expanding internationally creates opportunities for stronger revenue, more resilient growth, and a broader brand presence. Success requires more than translation; it requires market intelligence, cultural insight, and local execution.",
      services: [
        "Market Entry Analysis",
        "Market Entry Strategy",
        "Communication Strategy",
        "Content Localization",
        "Channel Strategy",
        "Launch Planning",
      ],
      whatYouGet: [
        "Growth strategist and project manager",
        "Market research and competitive analysis",
        "Localized messaging and funnel recommendations",
        "Channel strategy by market",
        "Audience insights and segmentation",
        "Performance review cadence",
      ],
      process: [
        { title: "Free consultation",            body: "We align on goals, target markets, and growth assumptions before any work begins." },
        { title: "Personalized offer",           body: "A scoped engagement based on the markets, channels, and outcomes that matter most." },
        { title: "Market entry analysis",        body: "Competitive landscape, audience research, regulatory considerations, and positioning recs." },
        { title: "Launch blueprint and execution", body: "Channel plan, creative, and campaign setup mapped to launch milestones." },
        { title: "Performance reviews and scaling", body: "Reporting cadence, testing roadmap, and budget reallocation for compounding growth." },
      ],
      faqs: [
        { q: "Why expand internationally?",        a: "New markets unlock fresh demand, reduce dependence on a single economy, and increase the long-term valuation of your brand." },
        { q: "How do you select the right market?", a: "We weigh demand, buying power, channel maturity, competition, and operational fit before recommending where to invest." },
        { q: "Do you localize content?",           a: "Yes — copy, creative, landing pages, and ad messaging are adapted for cultural context, not just translated." },
        { q: "Can you manage campaigns after launch?", a: "Absolutely. We run the media, the creative iteration, and the reporting so your internal team can stay focused on the business." },
      ],
    },
    {
      slug: "german-market-expansion",
      title: "German Market Expansion",
      subtitle: "Enter and grow in Germany with a strategy built for local trust.",
      intro:
        "Germany is one of Europe's strongest digital and e-commerce markets, but it requires careful positioning, strong trust signals, localized messaging, and respect for consumer expectations.",
      services: [
        "German Market Entry Analysis",
        "German GTM Strategy",
        "German Content Localization",
        "Performance Marketing for Germany",
        "Organic Social for Germany",
        "Local Competitive Research",
      ],
      whatYouGet: [
        "Dedicated project manager",
        "Local market insights",
        "German-focused messaging framework",
        "Channel recommendations",
        "Campaign launch support",
        "Reporting and optimization",
      ],
      process: [
        { title: "Free consultation",   body: "Scope the opportunity, current readiness, and timeline for entering the German market." },
        { title: "Personalized offer",  body: "A focused engagement built around your category, audience, and revenue ambitions." },
        { title: "Market entry analysis", body: "Local competitors, search demand, regulatory considerations, and trust expectations." },
        { title: "Launch blueprint",    body: "Localized creative, channel mix, landing pages, and a sequenced go-to-market plan." },
        { title: "Performance reviews", body: "Weekly reporting, optimization loops, and quarterly strategy reviews to scale spend." },
      ],
      faqs: [
        { q: "Why enter the German market?",          a: "Germany has high purchasing power, strong digital adoption, and meaningful demand across most categories." },
        { q: "What challenges do brands face in Germany?", a: "Trust expectations are high. Brands need credible reviews, clear policies, and locally-resonant messaging to convert." },
        { q: "Do you support German localization?",   a: "Yes — native-quality copy, design, and creative that feels built for Germany rather than translated to it." },
        { q: "Which industries work well in Germany?", a: "Beauty, wellness, renewable energy, B2B SaaS, fashion, and home goods are particularly strong fits." },
      ],
    },
    {
      slug: "social-media-ads",
      title: "Social Media Ads",
      subtitle: "Turn attention into action with paid social campaigns.",
      intro:
        "Social platforms allow brands to reach specific audiences based on interests, behavior, and intent signals. We build paid social campaigns that stop the scroll and move users toward conversion.",
      services: [
        "Facebook Ads", "Instagram Ads", "TikTok Ads", "LinkedIn Ads", "Pinterest Ads",
        "X Ads", "Reddit and Quora Ads", "E-commerce Campaigns", "Lead Generation Campaigns",
      ],
      whatYouGet: [
        "Dedicated paid social specialist",
        "Creative testing roadmap",
        "Audience research",
        "Campaign setup and optimization",
        "Custom reporting",
        "Direct account transparency",
      ],
      process: [
        { title: "Free consultation",   body: "Align on audiences, products, current performance, and where the biggest gains live." },
        { title: "Personalized offer",  body: "A scope tuned to your platforms, budget, creative needs, and reporting cadence." },
        { title: "Account audit & setup", body: "Tracking, account structure, and creative library reviewed before any spend." },
        { title: "Launch & creative testing", body: "Structured creative tests to find the angles, formats, and hooks that scale." },
        { title: "Optimize & scale",    body: "Weekly performance reviews and creative refreshes to keep CACs trending down." },
      ],
      faqs: [
        { q: "What businesses benefit from social ads?",   a: "Any brand with a visual story, a defined audience, or a need for consistent demand — B2C and B2B." },
        { q: "Can you manage Facebook and Instagram together?", a: "Yes. We run them as a unified Meta program and break out reporting where it matters." },
        { q: "Which platforms do you recommend?",          a: "We start where your audience already spends attention and where creative-market fit is strongest." },
        { q: "Do you create ad creatives?",                a: "Yes — static, motion, and UGC-style creative built specifically for paid performance." },
      ],
    },
    {
      slug: "google-ads",
      title: "Google Ads",
      subtitle: "Reach people already searching for what you offer.",
      intro:
        "Google Ads connects your business with high-intent users across Search, Shopping, YouTube, Display, Gmail, and partner placements. We build campaigns focused on qualified conversions, not vanity clicks.",
      services: [
        "Google Search Ads", "Performance Max", "Demand Gen", "Google Shopping",
        "YouTube Campaigns", "Google Display Network",
      ],
      whatYouGet: [
        "Account audit",
        "Campaign strategy",
        "Keyword and intent research",
        "Bidding and budget optimization",
        "Conversion tracking",
        "Reporting dashboards",
      ],
      process: [
        { title: "Free consultation",   body: "Clarify offers, margins, and the conversions that actually move the business." },
        { title: "Personalized offer",  body: "A scoped engagement with clear deliverables, campaign types, and reporting." },
        { title: "Account audit",       body: "Account structure, conversion tracking, keyword waste, and landing pages all reviewed." },
        { title: "Build & launch",      body: "Campaigns, keyword themes, bidding strategies, and creative built around qualified intent." },
        { title: "Optimize monthly",    body: "Search query mining, budget reallocation, and asset refreshes that compound results." },
      ],
      faqs: [
        { q: "How much should I spend on Google Ads?", a: "Enough to learn quickly. We size budget against demand, competition, and your target cost per acquisition." },
        { q: "What businesses benefit from Google Ads?", a: "Almost any business with a defined customer outcome — services, e-commerce, B2B SaaS, lead gen." },
        { q: "How do you measure success?",            a: "By qualified conversions, blended CAC, and revenue contribution — not clicks or impressions." },
        { q: "Why choose OPUS for Google Ads?",        a: "We focus on the conversions you can bank, with full account transparency and weekly reporting." },
      ],
    },
    {
      slug: "content-marketing",
      title: "Content Marketing",
      subtitle: "Create stories that build trust and drive action.",
      intro:
        "Content marketing shapes how people discover, remember, and trust your brand. We create copy, visuals, social content, email content, and UGC-style assets that support every stage of the funnel.",
      services: [
        "Content Strategy", "SEO Copywriting", "Organic Social Media", "Email Content",
        "UGC Scripts", "Graphic Design", "Video Post-Production", "2D Animation",
      ],
      whatYouGet: [
        "Content strategist",
        "Messaging framework",
        "Content audit",
        "SEO-ready copy",
        "Social content calendar",
        "Repurposing plan",
      ],
      process: [
        { title: "Free consultation",   body: "Identify the audiences, channels, and conversion points content needs to support." },
        { title: "Personalized offer",  body: "A scope built around the content types, cadence, and channels with the highest ROI." },
        { title: "Strategy & framework", body: "Messaging pillars, voice, audience map, and a content engine designed to compound." },
        { title: "Produce & publish",   body: "A consistent cadence of high-quality assets across owned and paid placements." },
        { title: "Measure & iterate",   body: "Performance reviews tied to engagement, traffic, leads, and revenue." },
      ],
      faqs: [
        { q: "How do you develop a content strategy?", a: "We start with audience pains, search intent, and your offer, then map content to specific funnel jobs." },
        { q: "Can you optimize existing content?",     a: "Yes — refreshing existing assets is often the highest-leverage place to start." },
        { q: "Can content be repurposed across platforms?", a: "Absolutely. Every asset is built to repurpose across blog, social, email, and paid." },
        { q: "How do you distribute content?",         a: "Owned channels, organic social, email, partnerships, and paid amplification where it makes sense." },
      ],
    },
    {
      slug: "email-marketing",
      title: "Email Marketing",
      subtitle: "Emails built to convert, convince, and retain.",
      intro:
        "Email is one of the strongest owned channels for predictable revenue. We build campaigns, newsletters, lifecycle automations, and retention flows that make every subscriber relationship more valuable.",
      services: [
        "Email Campaign Strategy", "Lifecycle Automation", "Sales Flows", "Email Design",
        "Copywriting", "Segmentation", "Transactional Email Optimization", "Reporting",
      ],
      whatYouGet: [
        "Email marketing expert",
        "Flow audit",
        "Segmentation strategy",
        "High-converting templates",
        "Automation setup",
        "Performance reporting",
      ],
      process: [
        { title: "Free consultation",   body: "Review existing email performance, list health, and revenue contribution." },
        { title: "Personalized offer",  body: "A scoped engagement focused on the flows and campaigns that move revenue fastest." },
        { title: "Audit & strategy",    body: "Segmentation, flow architecture, and a campaign calendar tuned to your audience." },
        { title: "Design & build",      body: "High-converting templates, automation logic, and copy that earns the open." },
        { title: "Measure & optimize",  body: "Per-flow reporting, list growth tracking, and ongoing creative iteration." },
      ],
      faqs: [
        { q: "What email flows should we start with?", a: "Welcome, abandoned cart or lead, post-purchase, win-back, and a strong weekly campaign cadence." },
        { q: "Can you improve existing newsletters?",  a: "Yes — copy, structure, segmentation, and design improvements typically lift performance quickly." },
        { q: "Do you design email templates?",         a: "Yes. On-brand, mobile-first templates designed to convert and easy for your team to update." },
        { q: "How do you measure email performance?",  a: "By revenue, conversions, deliverability, list growth, and engagement — not just opens." },
      ],
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing Solutions",
      subtitle: "Marketing strategies engineered for measurable impact.",
      intro:
        "Digital marketing moves fast. We help brands stay focused on the channels, messages, and campaigns most likely to drive growth.",
      services: [
        "Google and Bing Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads",
        "Pinterest Ads", "Amazon Ads", "Reddit and Quora Ads", "Native Advertising",
      ],
      whatYouGet: [
        "Digital strategist",
        "Full-funnel plan",
        "Campaign setup",
        "Local audience research",
        "A/B testing",
        "Reporting dashboard",
      ],
      process: [
        { title: "Free consultation",   body: "Goals, current state, and the constraints that shape your growth plan." },
        { title: "Personalized offer",  body: "A scope shaped around the channels and creative needs with the most upside." },
        { title: "Build & launch",      body: "Tracking, accounts, creative, and campaigns spun up across your priority channels." },
        { title: "Test & optimize",     body: "Structured tests to find the audiences, creative, and offers that scale." },
        { title: "Review & scale",      body: "Monthly strategy reviews and budget reallocation toward what's working." },
      ],
      faqs: [
        { q: "Why invest in digital marketing?", a: "It's the most measurable, scalable way to acquire customers and build category presence." },
        { q: "How do you choose the right channels?", a: "By matching audience behavior, creative-market fit, and the speed at which each channel pays back." },
        { q: "Can you support existing campaigns?", a: "Yes — we can step in to manage, optimize, or rebuild existing programs without a full reset." },
        { q: "How soon can we see results?",       a: "Paid channels typically show signal in 2–4 weeks; meaningful compounding in 60–90 days." },
      ],
    },
    {
      slug: "ppc",
      title: "Pay Per Click Marketing",
      subtitle: "Fuel growth with high-intent paid campaigns.",
      intro:
        "PPC campaigns help you reach users actively searching or shopping. We manage strategy, keywords, bidding, ad copy, tracking, and optimization to make every dollar work harder.",
      services: [
        "Search Ads", "Display Ads", "Shopping Ads", "Dynamic Remarketing",
        "PPC Audits", "Bid Management", "Conversion Tracking", "Analytics Reporting",
      ],
      whatYouGet: [
        "PPC specialist",
        "Account audit",
        "Keyword research",
        "Bid strategy",
        "Ad copy testing",
        "Performance dashboards",
      ],
      process: [
        { title: "Free consultation",   body: "Understand your conversions, margins, and current spend efficiency." },
        { title: "Personalized offer",  body: "A scope tied to campaign types, networks, and reporting expectations." },
        { title: "Audit & restructure", body: "Account hygiene, tracking, and a campaign architecture built for scale." },
        { title: "Launch & test",       body: "Ad copy, audiences, and bidding tested in a structured roadmap." },
        { title: "Optimize monthly",    body: "Bid management, search term mining, and creative refreshes month over month." },
      ],
      faqs: [
        { q: "Which PPC platforms do you manage?", a: "Google, Microsoft, Meta, TikTok, LinkedIn, Pinterest, Amazon, and other intent-based networks." },
        { q: "How quickly can PPC produce results?", a: "Signal usually within 2–3 weeks; meaningful scale once we have enough conversion data." },
        { q: "Will we have access to ad accounts?", a: "Always. You own every account; we operate inside yours with full transparency." },
        { q: "Can you run retargeting campaigns?", a: "Yes — retargeting and lookalike audiences are part of nearly every program we run." },
      ],
    },
    {
      slug: "cro",
      title: "Conversion Rate Optimization",
      subtitle: "Turn more visitors into customers.",
      intro:
        "CRO improves the percentage of visitors who take action. We use data, user behavior, testing, and UX improvements to remove friction and increase revenue from existing traffic.",
      services: [
        "E-commerce CRO", "Landing Page Optimization", "A/B Testing", "UX Improvements",
        "Funnel Optimization", "CRO Consulting", "Analytics Reporting",
      ],
      whatYouGet: [
        "CRO audit",
        "User behavior analysis",
        "Testing roadmap",
        "Landing page recommendations",
        "Funnel improvements",
        "Performance tracking",
      ],
      process: [
        { title: "Free consultation",   body: "Identify the highest-impact pages and flows to start with." },
        { title: "Personalized offer",  body: "A scope based on traffic volume, test velocity, and revenue impact." },
        { title: "Audit & insights",    body: "Heatmaps, session review, analytics deep dives, and qualitative research." },
        { title: "Test & build",        body: "A prioritized roadmap of design, copy, and structural tests." },
        { title: "Iterate & scale",     body: "Wins rolled into the site permanently; the testing engine keeps producing." },
      ],
      faqs: [
        { q: "What is CRO?",                       a: "A disciplined process of testing changes to your site to lift the rate at which visitors take action." },
        { q: "What elements should we test?",      a: "We prioritize headlines, hero offers, pricing, social proof, form friction, and checkout flow first." },
        { q: "Do we need more traffic first?",     a: "Not always. Many sites have enough traffic to test on the pages that matter most." },
        { q: "How long does CRO take?",            a: "Most clean tests reach significance in 2–4 weeks, depending on traffic and effect size." },
      ],
    },
  ];

  // -----------------------------------------------------------
  // Case studies
  // -----------------------------------------------------------
  const CASE_STUDIES = [
    {
      featured: true,
      slug: "northbloom-wellness",
      title: "Wellness brand improves lead quality with localized paid media",
      client: "Northbloom Wellness",
      industry: "Wellness",
      services: ["Google Ads", "Social Ads", "GTM"],
      segment: "B2C",
      summary: "A nationwide expansion that swapped broad reach for high-intent paid media built around three regional buyer profiles.",
      result: "+42% qualified leads",
    },
    {
      featured: true,
      slug: "alurie-beauty",
      title: "Beauty e-commerce brand grows revenue across two European markets",
      client: "Alurie Beauty",
      industry: "Beauty",
      services: ["Content Creation", "Google Ads", "Social Media Ads"],
      segment: "B2C",
      summary: "Localized creative, search, and lifecycle email lifted revenue in DACH and France within two quarters.",
      result: "+38% YoY revenue",
    },
    {
      featured: true,
      slug: "helios-clean-energy",
      title: "Clean energy company increases off-season demand",
      client: "Helios Clean Energy",
      industry: "Renewable Energy",
      services: ["Google Ads", "Social Media Ads", "Content Creation"],
      segment: "B2C",
      summary: "Off-season demand creation paired with a localized funnel kept the pipeline full through traditionally quiet months.",
      result: "+35% off-season leads",
    },
    {
      slug: "atelier-norden",
      title: "Fashion label scales DTC with structured creative testing",
      client: "Atelier Norden",
      industry: "Fashion",
      services: ["Social Media Ads", "Content Creation"],
      segment: "B2C",
      summary: "A creative-led paid social engine doubled monthly DTC orders without raising blended CAC.",
      result: "2.1× DTC orders",
    },
    {
      slug: "northpoint-capital",
      title: "Finance firm modernizes lead generation pipeline",
      client: "Northpoint Capital",
      industry: "Finance",
      services: ["Google Ads", "Content Creation"],
      segment: "B2B",
      summary: "A new content engine and SEM strategy lifted qualified opportunities through Q3 and Q4.",
      result: "+58% SQLs",
    },
    {
      slug: "rooted-foodco",
      title: "F&B brand enters new region with full-funnel launch",
      client: "Rooted Food Co.",
      industry: "Food and Beverage",
      services: ["GTM", "Social Media Ads", "Organic Social"],
      segment: "B2C",
      summary: "A coordinated launch across paid, organic, and influencer reached profitability inside 90 days.",
      result: "Break-even in 90 days",
    },
    {
      slug: "harbor-and-co-law",
      title: "Legal services firm doubles qualified consultations",
      client: "Harbor & Co. Legal",
      industry: "Legal Services",
      services: ["Google Ads", "CRO"],
      segment: "B2B",
      summary: "Search restructure and landing page CRO doubled qualified consultations within one quarter.",
      result: "2× consultations",
    },
    {
      slug: "stillpoint-mh",
      title: "Mental health platform grows subscriber base sustainably",
      client: "Stillpoint",
      industry: "Mental Health",
      services: ["Social Media Ads", "Content Creation"],
      segment: "B2C",
      summary: "Refined positioning and a measured paid social ramp grew subscribers while improving retention.",
      result: "+47% subscribers",
    },
    {
      slug: "meridian-realty",
      title: "Real estate investment platform refines its funnel",
      client: "Meridian Realty",
      industry: "Real Estate",
      services: ["Google Ads", "CRO", "Content Creation"],
      segment: "B2C",
      summary: "Landing page architecture and search restructuring lifted investor sign-ups significantly.",
      result: "+62% sign-ups",
    },
    {
      slug: "lumen-technology",
      title: "B2B SaaS shortens sales cycle with content-led demand",
      client: "Lumen Technology",
      industry: "Technology",
      services: ["Content Creation", "Google Ads"],
      segment: "B2B",
      summary: "Demand-gen content and middle-of-funnel search shortened time-to-close by nearly a month.",
      result: "−26 days time-to-close",
    },
    {
      slug: "verdure-wellness",
      title: "Wellness brand enters DACH with localized creative",
      client: "Verdure",
      industry: "Wellness",
      services: ["GTM", "Content Creation", "Social Media Ads"],
      segment: "B2C",
      summary: "Localized creative and a new GTM playbook produced profitable DACH launches.",
      result: "ROAS 3.4×",
    },
    {
      slug: "civic-renew",
      title: "Renewable energy startup builds repeatable demand engine",
      client: "Civic Renew",
      industry: "Renewable Energy",
      services: ["Google Ads", "Content Creation"],
      segment: "B2C",
      summary: "A repeatable acquisition funnel paired with educational content lifted lead-to-customer rates.",
      result: "+31% lead-to-customer",
    },
  ];

  // -----------------------------------------------------------
  // Portfolio
  // -----------------------------------------------------------
  const PORTFOLIO = [
    { id: "p1",  title: "Product photoshoot for social media", client: "Alurie Beauty",      category: "Photography",  description: "Editorial product photography series shot for paid social and DTC PDPs." },
    { id: "p2",  title: "Localized Meta campaign",             client: "Verdure",            category: "Paid Social",   description: "DACH-focused Meta campaign with locally-shot creative and tailored hooks." },
    { id: "p3",  title: "Summer beauty campaign",              client: "Alurie Beauty",      category: "Campaign",      description: "A seasonal campaign system spanning paid, organic, and email." },
    { id: "p4",  title: "Comparison campaign",                 client: "Lumen Technology",   category: "Performance",   description: "Side-by-side comparison creative that lifted CTR and CVR." },
    { id: "p5",  title: "Fall B2B campaign",                   client: "Northpoint Capital", category: "B2B",           description: "Account-targeted creative built around a seasonal positioning shift." },
    { id: "p6",  title: "Black Friday early access campaign",  client: "Atelier Norden",     category: "Campaign",      description: "Pre-BFCM campaign creating early-access urgency for VIP segments." },
    { id: "p7",  title: "Agency self-rebrand",                 client: "OPUS Media Lab",     category: "Branding",      description: "An internal rebrand exploring type, identity, and motion principles." },
    { id: "p8",  title: "Real estate investment campaign",     client: "Meridian Realty",    category: "Lead Gen",      description: "A premium investor acquisition funnel with bespoke creative." },
    { id: "p9",  title: "Solar energy campaign",               client: "Helios Clean Energy", category: "Campaign",     description: "Educational-first campaign creative tuned to off-season demand." },
    { id: "p10", title: "Certified product trust campaign",    client: "Rooted Food Co.",    category: "Branding",      description: "Trust-led campaign elevating certifications, sourcing, and provenance." },
  ];

  // -----------------------------------------------------------
  // Team
  // -----------------------------------------------------------
  const TEAM = [
    { name: "Maren Volker",    role: "Founder & Strategy Lead",         bio: "Leads positioning, go-to-market, and the systems that turn strategy into measurable results." },
    { name: "Idris Okafor",    role: "Co-Founder & Operations Lead",    bio: "Runs operations, finance, and the partner experience that keeps teams in motion." },
    { name: "Selma Hartley",   role: "Performance Marketing Lead",      bio: "Oversees paid programs across Google, Meta, TikTok, and B2B channels." },
    { name: "Caleb Marín",     role: "Google Ads Specialist",           bio: "Builds intent-driven Search, Shopping, and YouTube programs that compound." },
    { name: "Noor Adel",       role: "Paid Social Specialist",          bio: "Designs creative testing systems and audience strategies built for scale." },
    { name: "Wren Kapoor",     role: "Content Strategist",              bio: "Owns the messaging framework, content engine, and editorial standards." },
    { name: "Theo Linde",      role: "Brand Strategist",                bio: "Sharpens positioning, naming, and brand systems that resonate in market." },
    { name: "Aiyana Bekele",   role: "Project Manager",                 bio: "Keeps timelines, deliverables, and team rhythm working in sync." },
    { name: "Jonas Eberhardt", role: "Email Marketing Specialist",      bio: "Builds lifecycle programs, segmentation, and high-converting templates." },
    { name: "Sienna Rao",      role: "CRO Specialist",                  bio: "Runs the experiment roadmap, on-site research, and funnel optimization." },
    { name: "Aki Tanabe",      role: "Graphic Designer",                bio: "Designs creative for campaigns, landing pages, and brand systems." },
    { name: "Ruairi Lennox",   role: "SEO/GEO Specialist",              bio: "Owns search visibility, technical SEO, and answer-engine optimization." },
  ];

  // -----------------------------------------------------------
  // Blog
  // -----------------------------------------------------------
  const BLOG = [
    { id: "b1", title: "2026 Digital Marketing Trends for Growth-Focused Brands", tags: ["Marketing Fundamentals", "Analytics"], excerpt: "A working playbook for the channels, creative formats, and measurement habits that will matter most in 2026.", read: "8 min read" },
    { id: "b2", title: "German Market Entry Checklist for Ambitious Companies",   tags: ["Market Entry", "German Market"], excerpt: "Everything a brand should validate before launching paid spend or campaigns in Germany.", read: "10 min read" },
    { id: "b3", title: "How to Build a Paid Social Testing System",                tags: ["Paid Social"], excerpt: "A repeatable creative testing framework that compounds learning instead of guessing.", read: "7 min read" },
    { id: "b4", title: "What Is Lead Generation in Real Estate?",                  tags: ["Lead Generation"], excerpt: "How modern real estate teams build qualified-pipeline programs without burning leads.", read: "6 min read" },
    { id: "b5", title: "How to Create a Winning Marketing Strategy",               tags: ["Marketing Fundamentals"], excerpt: "Five practical inputs that produce a marketing strategy your team can actually execute.", read: "9 min read" },
    { id: "b6", title: "How to Localize Your Brand for Europe",                    tags: ["Market Entry"], excerpt: "Localization isn't translation. A framework for trust, tone, and channel fit across European markets.", read: "8 min read" },
    { id: "b7", title: "Google Ads Metrics That Actually Matter",                  tags: ["Google Ads", "Analytics"], excerpt: "Cut through the noise — the handful of metrics worth defending in a Google Ads program.", read: "6 min read" },
    { id: "b8", title: "Email Automation Flows Every Brand Should Build",          tags: ["E-commerce"], excerpt: "The lifecycle flows that produce predictable revenue once you build them once." , read: "7 min read" },
    { id: "b9", title: "CRO Checklist for Landing Pages",                          tags: ["Marketing Fundamentals"], excerpt: "A pragmatic CRO audit you can run on any landing page before your next campaign.", read: "5 min read" },
  ];

  const BLOG_FILTERS = [
    "B2B Marketing","Content Marketing","E-commerce","German Market","Google Ads",
    "Analytics","Lead Generation","Market Entry","Marketing Fundamentals","Paid Social",
  ];

  // -----------------------------------------------------------
  // Testimonials, FAQs, Stats, Values, Jobs, Goals
  // -----------------------------------------------------------
  const TESTIMONIALS = [
    { quote: "The team helped us turn scattered marketing efforts into a clear growth system.", author: "VP Marketing", company: "B2B SaaS" },
    { quote: "They are strategic, fast, and incredibly easy to work with.",                       author: "Founder",       company: "DTC Brand" },
    { quote: "We finally understood which channels were actually driving revenue.",               author: "Head of Growth", company: "E-commerce" },
    { quote: "Their creative testing process changed how we think about performance marketing.",  author: "Brand Director", company: "Beauty" },
    { quote: "They adapted quickly to our workflow and felt like part of our internal team.",     author: "COO",            company: "Wellness" },
    { quote: "Every meeting gave us practical next steps, not vague marketing theory.",           author: "CEO",            company: "Renewable Energy" },
  ];

  const HOME_FAQS = [
    { q: "What does OPUS Media Lab do differently?",                a: "We operate as an in-house growth team — strategy, creative, paid, and analytics under one roof — focused on revenue, not deliverables." },
    { q: "What industries do you work with?",                       a: "Wellness, beauty, fashion, renewable energy, fintech, real estate, B2B SaaS, food and beverage, and more." },
    { q: "Can we schedule a consultation before committing?",       a: "Yes. A free 30-minute call is the right starting point for almost every engagement." },
    { q: "Do you work with both B2B and B2C companies?",            a: "Yes — and our team is structured to specialize on the playbook that fits your model." },
  ];

  const VALUES = [
    { title: "Future-ready",            body: "We invest in the tools, channels, and habits that compound over time, not the trend of the week." },
    { title: "Creativity fuels success", body: "Strategy makes the chart move; creative makes the audience care. Both matter." },
    { title: "Clear communication",     body: "Plain language, honest reporting, and the kind of meetings that produce decisions." },
    { title: "Strong teamwork",         body: "We treat client teams like teammates and operate with the rhythm of an internal department." },
    { title: "Growth is in our nature", body: "Curiosity is our default. We test, we measure, we adjust — and we never stop learning." },
  ];

  const JOBS = [
    { title: "Performance Marketing Manager",    type: "Full-time · Remote", summary: "Own multi-channel paid programs for a portfolio of growth-stage brands." },
    { title: "Digital Marketing Graphic Designer", type: "Full-time · Remote", summary: "Design static and motion creative for paid social, landing pages, and campaigns." },
    { title: "Content Strategist",                type: "Full-time · Remote", summary: "Shape messaging frameworks, content engines, and editorial standards." },
  ];

  const BENEFITS = [
    "Annual training budget",
    "Access to learning platforms",
    "Challenging projects",
    "Bonus opportunities",
    "Flexible schedule",
    "Remote-first culture",
  ];

  const GOALS = [
    { title: "Increasing Brand Awareness", body: "We help brands build memorable presence through coordinated creative, paid amplification, organic distribution, and PR moments that compound." },
    { title: "Boosting Sales",             body: "Revenue-focused campaigns built around intent, offer, and creative — measured against blended CAC and revenue growth, not vanity metrics." },
    { title: "Entering a New Market",      body: "Market entry plans that combine research, localized creative, and channel-by-channel launch sequences designed for traction." },
    { title: "Driving Revenue Growth",     body: "Full-funnel systems that pair acquisition with lifecycle, retention, and conversion optimization — the compounding levers." },
  ];

  const HOME_STATS = [
    { value: "150+", label: "Growth projects launched" },
    { value: "22",   label: "Markets supported" },
    { value: "4.9",  label: "Average client satisfaction" },
    { value: "75%",  label: "Long-term client retention" },
  ];

  const SERVICES_STATS = [
    { value: "4.9",    label: "Average client rating" },
    { value: "22",     label: "Markets supported" },
    { value: "150+",   label: "Growth projects" },
    { value: "$120M+", label: "Managed media influence" },
  ];

  return {
    TICKER, NAV, FOOTER,
    SERVICE_CATEGORIES, SERVICES,
    CASE_STUDIES, PORTFOLIO, TEAM,
    BLOG, BLOG_FILTERS,
    TESTIMONIALS, HOME_FAQS, VALUES, JOBS, BENEFITS, GOALS,
    HOME_STATS, SERVICES_STATS,
  };
})();
