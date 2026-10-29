import { useCallback, useEffect, useRef, useState } from "react";

// Keyless API with 160+ currencies. Swap this URL (and the parse step) for a
// paid intraday provider (Twelve Data, Alpha Vantage, etc.) for true tick data.
const API = (base) => `https://open.er-api.com/v6/latest/${base.toUpperCase()}`;

/**
 * Fetches live rates for `base` and re-polls every `intervalMs`.
 * Returns { rates, lastUpdated, loading, error, refresh, nextRefreshIn }.
 */
function useCurrencyInfo(base, intervalMs = 60000) {
  const [rates, setRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextRefreshIn, setNextRefreshIn] = useState(intervalMs / 1000);
  const abortRef = useRef(null);

  const refresh = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const res = await fetch(API(base), { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.result !== "success") throw new Error("API error");
      setRates(data.rates);
      setLastUpdated(new Date());
      setError(null);
      setNextRefreshIn(intervalMs / 1000);
    } catch (e) {
      if (e.name !== "AbortError") setError("Could not fetch live rates. Retrying...");
    } finally {
      setLoading(false);
    }
  }, [base, intervalMs]);

  // fetch on base change + poll
  useEffect(() => {
    refresh();
    const id = setInterval(refresh, intervalMs);
    return () => {
      clearInterval(id);
      abortRef.current?.abort();
    };
  }, [refresh, intervalMs]);

  // countdown for the UI
  useEffect(() => {
    const id = setInterval(() => setNextRefreshIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  return { rates, lastUpdated, loading, error, refresh, nextRefreshIn };
}

export default useCurrencyInfo;
