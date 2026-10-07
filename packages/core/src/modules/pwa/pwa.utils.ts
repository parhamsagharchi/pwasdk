export function getUA(): string {
  return typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
}
