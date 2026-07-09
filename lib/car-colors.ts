const KNOWN_COLORS: Record<string, string> = {
  "cosmos black": "#15171b",
  "atlantis grey": "#8b939c",
  "aurora white": "#f4f1ea",
  "coral pink": "#e6a2ab",
  "ski white": "#f1efe9",
  "skye blue": "#4d7ea8",
  "arctic blue": "#a9c6d8",
  "surf blue": "#2e6b8a",
  "racing grey": "#585d64",
  "shark grey": "#6b7178",
  "boston blue": "#345677",
  "parkour red": "#bd2a2f",
};

const KEYWORD_COLORS: [string, string][] = [
  ["black", "#17181c"],
  ["white", "#f3f1ea"],
  ["grey", "#7b828a"],
  ["gray", "#7b828a"],
  ["silver", "#b8bcc2"],
  ["blue", "#3f6f96"],
  ["red", "#bd2a2f"],
  ["pink", "#e2a3ab"],
  ["green", "#4c7a5e"],
  ["gold", "#b79a5f"],
  ["orange", "#c9702f"],
  ["yellow", "#d9b34a"],
  ["purple", "#6f5a8a"],
  ["brown", "#6e5647"],
];

/** Best-effort hex for a color name pulled from car data, so new names still render sensibly. */
export function getColorHex(name: string): string {
  const key = name.trim().toLowerCase();
  if (KNOWN_COLORS[key]) return KNOWN_COLORS[key];

  const match = KEYWORD_COLORS.find(([keyword]) => key.includes(keyword));
  return match ? match[1] : "#9a9a9a";
}

/** Relative luminance check so overlay UI (checkmarks, labels) stays legible on any swatch. */
export function isLightColor(hex: string): boolean {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
