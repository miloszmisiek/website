import { getStore } from "@netlify/blobs";

const SEED = 0;

export default async (req) => {
  const store = getStore("retro");
  const raw = await store.get("hits_v2");
  const count = raw ? parseInt(raw, 10) : SEED;

  if (req.method === "POST") {
    const next = count + 1;
    await store.set("hits_v2", String(next));
    return Response.json({ count: next });
  }

  return Response.json({ count });
};

export const config = { path: "/api/hits" };
