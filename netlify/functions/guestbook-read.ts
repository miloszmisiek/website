import type { Config } from "@netlify/functions";

const PER_PAGE = 10;

type RawSubmission = {
  state: string;
  data: { name: string; location?: string; message: string };
  created_at: string;
};

export type GuestbookEntry = {
  name: string;
  location: string;
  message: string;
  date: string;
};

export type GuestbookResponse = {
  entries: GuestbookEntry[];
  hasMore: boolean;
};

export default async (req: Request): Promise<Response> => {
  const { NETLIFY_TOKEN, NETLIFY_FORM_ID } = process.env;

  if (!NETLIFY_TOKEN || !NETLIFY_FORM_ID) {
    return Response.json({ entries: [], hasMore: false } satisfies GuestbookResponse);
  }

  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));

  const res = await fetch(
    `https://api.netlify.com/api/v1/forms/${NETLIFY_FORM_ID}/submissions?per_page=${PER_PAGE + 1}&page=${page}`,
    { headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` } }
  );

  if (!res.ok) return Response.json({ entries: [], hasMore: false } satisfies GuestbookResponse);

  const raw: RawSubmission[] = await res.json();
  const filtered: GuestbookEntry[] = raw
    .filter((s) => s.state !== "spam")
    .map((s) => ({
      name: s.data.name,
      location: s.data.location || "—",
      message: s.data.message,
      date: s.created_at,
    }));

  const result: GuestbookResponse = {
    entries: filtered.slice(0, PER_PAGE),
    hasMore: filtered.length > PER_PAGE,
  };

  return Response.json(result);
};

export const config: Config = { path: "/api/guestbook" };
