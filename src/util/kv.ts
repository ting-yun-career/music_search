"use server";

import { unstable_noStore as noStore } from "next/cache";
import { kv } from "@vercel/kv";

// kv is vercel's built-in key-value persistent storage.

export async function kvSave(key: string, value: string) {
  const status = await kv.set(key, value);
  if (status !== "OK") throw Error("result not save");
}

export async function kvRead(key: string) {
  noStore(); // required because NextJS does aggresive caching that sometimes returns stale value
  return await kv.get(key);
}
