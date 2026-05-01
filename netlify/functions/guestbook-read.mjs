export default async () => {
  const { NETLIFY_TOKEN, NETLIFY_FORM_ID } = process.env;

  if (!NETLIFY_TOKEN || !NETLIFY_FORM_ID) {
    return Response.json([]);
  }

  const res = await fetch(
    `https://api.netlify.com/api/v1/forms/${NETLIFY_FORM_ID}/submissions?per_page=50`,
    { headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` } }
  );

  if (!res.ok) return Response.json([]);

  const raw = await res.json();
  const entries = raw
    .filter((s) => s.state !== "spam")
    .map((s) => ({
      name: s.data.name,
      location: s.data.location || "—",
      message: s.data.message,
      date: s.created_at,
    }));

  return Response.json(entries);
};

export const config = { path: "/api/guestbook" };
