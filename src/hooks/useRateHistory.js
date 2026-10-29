import { useEffect, useState } from "react";

// Frankfurter (ECB data) gives free daily history for ~30 major currencies.
// For pairs it does not cover, status becomes "unavailable" and the UI says so.
const fmt = (d) => d.toISOString().slice(0, 10);

export default function useRateHistory(from, to, days = 30) {
  const [points, setPoints] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!from || !to || from === to) {
      setPoints([]);
      setStatus("idle");
      return;
    }
    const controller = new AbortController();
    setStatus("loading");
    const end = new Date();
    const start = new Date(Date.now() - days * 864e5);
    fetch(
      `https://api.frankfurter.app/${fmt(start)}..${fmt(end)}?from=${from}&to=${to}`,
      { signal: controller.signal }
    )
      .then((r) => {
        if (!r.ok) throw new Error("unsupported");
        return r.json();
      })
      .then((d) => {
        const pts = Object.entries(d.rates).map(([date, r]) => ({
          date,
          value: r[to],
        }));
        setPoints(pts);
        setStatus(pts.length > 1 ? "ok" : "unavailable");
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setPoints([]);
          setStatus("unavailable");
        }
      });
    return () => controller.abort();
  }, [from, to, days]);

  return { points, status };
}
