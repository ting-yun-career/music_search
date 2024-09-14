"use server";

import { kv } from "@vercel/kv";

export async function kvSave(key: string, value: string | object) {
  const status = await kv.set(key, value);
  if (status !== "OK") throw Error("result not save");
}

export async function kvRead(key: string) {
  return await kv.get(key);
}
