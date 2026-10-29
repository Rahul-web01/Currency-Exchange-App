// Indian grouping (1,00,00,000) for INR, international grouping for everything else.
export const localeFor = (code) => (code === "INR" ? "en-IN" : "en-US");

// Keep only digits and one decimal point, so any size of number can be typed.
export const cleanAmount = (value) => {
  const stripped = String(value).replace(/,/g, "").replace(/[^\d.]/g, "");
  const [whole, ...rest] = stripped.split(".");
  return rest.length ? `${whole}.${rest.join("")}` : whole;
};

export const formatMoney = (n, code, maxFraction = 4) => {
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString(localeFor(code), { maximumFractionDigits: maxFraction });
};

// Plain digits with no grouping or exponent, used when swapping amounts.
export const plainNumber = (n) =>
  Number.isFinite(n)
    ? n.toLocaleString("fullwide", { useGrouping: false, maximumFractionDigits: 4 })
    : "";

// "1.5 lakh", "12.34 crore" for INR; "1.5 million" etc. for other currencies.
export const inWords = (n, code) => {
  if (!Number.isFinite(n) || n < 1e5) return "";
  if (code === "INR") {
    const fmt = (v) => v.toLocaleString("en-IN", { maximumFractionDigits: 2 });
    if (n >= 1e7) return `${fmt(n / 1e7)} crore`;
    return `${fmt(n / 1e5)} lakh`;
  }
  return new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "long", maximumFractionDigits: 2 }).format(n);
};
