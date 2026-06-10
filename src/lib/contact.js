import {
  submitConsultationUrl,
  supabasePublishableKey,
} from "../config/supabase.js";

export async function submitConsultation(payload) {
  if (!submitConsultationUrl || !supabasePublishableKey) {
    throw new Error(
      "Consultation form is not configured. Set VITE_SUPMIT_CONSULTATION_URL and VITE_SUPABASE_PUBLISHABLE_KEY, then restart the dev server or rebuild.",
    );
  }

  const res = await fetch(submitConsultationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supabasePublishableKey}`,
      apikey: supabasePublishableKey,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.ok === false) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}
