export function uuid(max: number = 100000) {
  return Math.floor(Math.random() * max).toString();
}
