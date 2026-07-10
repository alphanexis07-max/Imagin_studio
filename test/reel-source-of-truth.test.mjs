import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const storageSource = readFileSync(new URL("../src/lib/cms/storage.server.ts", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../src/routes/index.tsx", import.meta.url), "utf8");

test("reel listing does not merge fallback sources into MongoDB results", () => {
  const listReelDataBody = storageSource.match(/export async function listReelData\(\): Promise<Reel\[]> \{([\s\S]*?)\n\}/)?.[1] ?? "";

  assert.doesNotMatch(listReelDataBody, /mergeWithDefaultReels/);
  assert.doesNotMatch(listReelDataBody, /createMany/);
  assert.doesNotMatch(listReelDataBody, /instagramPosts|defaultInstagramReels/);
});

test("homepage renders an empty CMS reel list as empty instead of static Instagram fallback", () => {
  const normalizeReelsBody = indexSource.match(/function normalizeReels\(items: CmsItem\[]\) \{([\s\S]*?)\n\}/)?.[1] ?? "";

  assert.doesNotMatch(normalizeReelsBody, /filmReels/);
});
