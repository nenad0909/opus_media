const DEFAULT_SUPABASE_URL = "https://odpdrcpazjqmmhwdvqnz.supabase.co";
const DEFAULT_PUBLISHABLE_KEY = "sb_publishable_pnFvD8qblnhgfXqk8A2RgQ_aRmsJ_TK";

export const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;

export const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_PUBLISHABLE_KEY;

export const submitConsultationUrl =
  import.meta.env.VITE_SUBMIT_CONSULTATION_URL ||
  `${supabaseUrl}/functions/v1/submit-consultation`;
