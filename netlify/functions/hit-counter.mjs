import { getStore } from "@netlify/blobs";

const SEED = 1336521;

export default async (req) => {
  const store = getStore("retro");
  const raw = await store.get("hits");
  const count = raw ? parseInt(raw, 10) : SEED;

  if (req.method === "POST") {
    const next = count + 1;
    await store.set("hits", String(next));
    return Response.json({ count: next });
  }

  return Response.json({ count });
};

export const config = { path: "/api/hits" };
