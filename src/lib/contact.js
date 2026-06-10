const SUBMIT_CONSULTATION_URL = import.meta.env.VITE_SUBMIT_CONSULTATION_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function submitConsultation(payload) {
  if (!SUBMIT_CONSULTATION_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error(
      "Consultation form is not configured. Add VITE_SUBMIT_CONSULTATION_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env",
    );
  }

  const res = await fetch(SUBMIT_CONSULTATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      apikey: SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.ok === false) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}
