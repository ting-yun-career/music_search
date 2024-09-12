import libQueryString from "querystring";

export function processString(str: string, type: string) {
  try {
    if (type === "queryString") return { result: libQueryString.escape(str) };
  } catch (error) {
    return { error };
  }

  return { result: str };
}
