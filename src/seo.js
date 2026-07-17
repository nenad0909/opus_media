import { useEffect } from "react";

export const SITE_URL = "https://opusmedialab.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const MAX_JSONLD_SLOTS = 6;

function setMetaByAttr(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!value) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLdSlot(index, data) {
  const id = `seo-jsonld-${index}`;
  let el = document.getElementById(id);
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

// Updates document.title, meta description, canonical, Open Graph / Twitter
// tags, and page-specific JSON-LD blocks whenever the route changes. Runs
// client-side only (no SSR in this app), but Google renders JS before
// evaluating title/canonical/structured data, so this is sufficient for
// modern crawling and indexing.
export function useSeo({ title, description, path, image, noindex, jsonLd }) {
  useEffect(() => {
    const url = `${SITE_URL}${path || "/"}`;
    const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_OG_IMAGE;

    if (title) document.title = title;
    setMetaByAttr("name", "description", description);
    setLink("canonical", url);

    setMetaByAttr("property", "og:title", title);
    setMetaByAttr("property", "og:description", description);
    setMetaByAttr("property", "og:url", url);
    setMetaByAttr("property", "og:image", ogImage);

    setMetaByAttr("name", "twitter:title", title);
    setMetaByAttr("name", "twitter:description", description);
    setMetaByAttr("name", "twitter:image", ogImage);

    setMetaByAttr("name", "robots", noindex ? "noindex, nofollow" : null);

    const blocks = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : [];
    for (let i = 0; i < MAX_JSONLD_SLOTS; i++) {
      setJsonLdSlot(i, blocks[i] || null);
    }
  }, [title, description, path, image, noindex, JSON.stringify(jsonLd)]);
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceJsonLd({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "MarketingAgency",
      name: "OPUS Media Lab",
      url: SITE_URL,
    },
    areaServed: [
      "Temecula, CA", "Murrieta, CA", "Riverside, CA", "San Bernardino, CA",
      "Ontario, CA", "Rancho Cucamonga, CA", "Corona, CA", "Escondido, CA",
      "San Diego, CA", "Los Angeles, CA", "Orange County, CA",
    ],
  };
}

export function faqJsonLd(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
