import { getStore } from "@netlify/blobs";

const SEED = 0;

export default async (req) => {
  const store = getStore("retro");
  const raw = await store.get("hits_v2");
  const count = raw ? parseInt(raw, 10) : SEED;

  if (req.method === "POST") {
    const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
    const allowed = ["https://miloszmisiek.com", "https://www.miloszmisiek.com"];
    if (origin && !allowed.some((o) => origin.startsWith(o))) {
      return new Response("Forbidden", { status: 403 });
    }
    const next = count + 1;
    await store.set("hits_v2", String(next));
    return Response.json({ count: next });
  }

  return Response.json({ count });
};

export const config = { path: "/api/hits" };
