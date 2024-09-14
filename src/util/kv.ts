"use server";

import { kv } from "@vercel/kv";

// kv is vercel's built-in key-value persistent storage.

export async function kvSave(key: string, value: string) {
  const status = await kv.set(key, value);
  if (status !== "OK") throw Error("result not save");
}

export async function kvRead(key: string) {
  return await kv.get(key);
}
