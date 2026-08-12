const keepaliveUrl =
  "https://odpdrcpazjqmmhwdvqnz.supabase.co/functions/v1/keepalive";

export default async () => {
  const keepaliveSecret = process.env.SUPABASE_KEEPALIVE_SECRET;

  if (!keepaliveSecret) {
    throw new Error("SUPABASE_KEEPALIVE_SECRET is not configured");
  }

  const response = await fetch(keepaliveUrl, {
    method: "POST",
    headers: {
      "x-keepalive-secret": keepaliveSecret,
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase keepalive failed with status ${response.status}`);
  }

  console.log("Supabase keepalive completed successfully");
};

export const config = {
  schedule: "23 2,10,18 * * *",
};
