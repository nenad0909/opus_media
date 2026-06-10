const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function submitContactInquiry(form) {
  if (!CONTACT_API_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Contact form is not configured. Add VITE_CONTACT_API_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env");
  }

  const res = await fetch(CONTACT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      apikey: SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify(form),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}
