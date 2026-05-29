/** Canonical aspect ratios for every image slot on the site. */
export const MEDIA_SLOTS = {
  homeHero: { ratio: "5/7", label: "Home hero" },
  pageHero: { ratio: "16/9", label: "Page hero" },
  caseStudy: { ratio: "16/9", label: "Case study card" },
  portfolioWide: { ratio: "16/9", label: "Portfolio tile (wide)" },
  portfolioTall: { ratio: "5/7", label: "Portfolio tile (tall)" },
  teamPhoto: { ratio: "5/7", label: "Team headshot" },
  blogThumb: { ratio: "16/9", label: "Blog thumbnail" },
};

/** Per-route page hero ratio (all use pageHero unless noted). */
export const PAGE_MEDIA = [
  { page: "Home", route: "/", slot: "homeHero", ratio: "5/7" },
  { page: "Services hub", route: "/services", slot: "pageHero", ratio: "16/9" },
  { page: "Service detail (×10)", route: "/services/*", slot: "pageHero", ratio: "16/9" },
  { page: "Case studies", route: "/case-studies", slot: "pageHero", ratio: "16/9" },
  { page: "Portfolio", route: "/portfolio", slot: "pageHero", ratio: "16/9" },
  { page: "About", route: "/about", slot: "pageHero", ratio: "16/9" },
  { page: "Blog", route: "/blog", slot: "pageHero", ratio: "16/9" },
  { page: "Careers", route: "/careers", slot: "pageHero", ratio: "16/9" },
  { page: "Contact", route: "/contact", slot: "pageHero", ratio: "16/9" },
  { page: "Privacy / Terms", route: "/privacy, /terms", slot: "pageHero", ratio: "16/9" },
];

export function ratioLabel(ratio) {
  return String(ratio).replace("/", ":");
}
