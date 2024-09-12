import libQueryString from "querystring";

export function processString(str: string, type: string) {
  if (type === "queryString") return { result: libQueryString.escape(str) };
  return { result: str };
}

export function uuid(max: number = 100000) {
  return Math.floor(Math.random() * max).toString();
}
