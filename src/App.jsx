import { useEffect, useMemo, useState } from "react";
import InputBox from "./components/InputBox";
import TrendChart from "./components/TrendChart";
import GuillocheBackground from "./components/GuillocheBackground";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import useRateHistory from "./hooks/useRateHistory";
import { cleanAmount, formatMoney, inWords, plainNumber } from "./utils/format";

const REFRESH_MS = 60000;
const TREND_DAYS = 30;
const QUICK_PAIRS = [
  ["USD", "INR"],
  ["EUR", "USD"],
  ["GBP", "INR"],
  ["USD", "JPY"],
  ["AED", "INR"],
];

const load = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable, ignore */
  }
};

function App() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState(() => load("cc_from", "USD"));
  const [to, setTo] = useState(() => load("cc_to", "INR"));

  const { rates, lastUpdated, loading, error, refresh, nextRefreshIn } =
    useCurrencyInfo(from, REFRESH_MS);
  const { points, status } = useRateHistory(from, to, TREND_DAYS);

  useEffect(() => save("cc_from", from), [from]);
  useEffect(() => save("cc_to", to), [to]);

  const options = useMemo(() => Object.keys(rates).sort(), [rates]);
  const list = options.length ? options : [from, to];

  const names = useMemo(() => {
    try {
      const dn = new Intl.DisplayNames(["en"], { type: "currency" });
      return Object.fromEntries(list.map((c) => [c, dn.of(c)]));
    } catch {
      return {};
    }
  }, [list]);

  const rate = rates[to];
  const numeric = parseFloat(amount);
  const result = rate && Number.isFinite(numeric) ? numeric * rate : NaN;
  const tooLarge = numeric === Infinity;
  const converted = Number.isFinite(result) ? formatMoney(result, to) : tooLarge ? "Number too large" : "";

  const swap = () => {
    setFrom(to);
    setTo(from);
    if (Number.isFinite(result)) setAmount(plainNumber(result));
  };

  const updatedText = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "—";

  return (
    <>
      <GuillocheBackground />
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-8 sm:py-16">
        <header className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-paper sm:text-5xl">
            Convert at today's market rate
          </h1>
          <p className="mt-3 text-paper/70">
            Rates refresh every minute. Pick two currencies, type an amount, and see what it's worth right now.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="lg:col-span-3" aria-label="Converter">
            <div className="rounded-3xl border border-paper/10 bg-ink2/80 p-3 shadow-2xl backdrop-blur sm:p-4">
              <InputBox
                label="You send"
                amount={amount}
                onAmountChange={(v) => setAmount(cleanAmount(v))}
                hint={Number.isFinite(numeric) && amount !== "" ? [formatMoney(numeric, from), inWords(numeric, from)].filter(Boolean).join(" · ") : ""}
                currency={from}
                currencyOptions={list}
                onCurrencyChange={setFrom}
                names={names}
              />

              <div className="relative z-10 -my-3 flex justify-center">
                <button
                  type="button"
                  onClick={swap}
                  className="rounded-full border-4 border-ink2 bg-foil px-5 py-2 text-sm font-semibold text-ink hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
                >
                  Swap currencies
                </button>
              </div>

              <InputBox
                label="They receive"
                amount={converted}
                currency={to}
                currencyOptions={list}
                onCurrencyChange={setTo}
                readOnly
                hint={inWords(result, to)}
                names={names}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-paper/75">
              <p className="num" aria-live="polite">
                {rate ? `1 ${from} = ${rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${to}` : "Loading rate…"}
              </p>
              <div className="flex items-center gap-3">
                <span className="num">
                  Updated {updatedText} · next in {nextRefreshIn}s
                </span>
                <button
                  type="button"
                  onClick={refresh}
                  disabled={loading}
                  className="rounded-lg border border-paper/25 px-3 py-1.5 font-medium text-paper hover:bg-paper/10 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foil"
                >
                  {loading ? "Refreshing…" : "Refresh now"}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-3 rounded-lg bg-down/20 px-4 py-2 text-sm text-paper">
                {error}
              </p>
            )}

            <div className="mt-6">
              <p className="mb-2 text-sm text-paper/60">Common pairs</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PAIRS.map(([a, b]) => {
                  const active = a === from && b === to;
                  return (
                    <button
                      key={a + b}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setFrom(a);
                        setTo(b);
                      }}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-foil ${
                        active
                          ? "border-foil bg-foil text-ink"
                          : "border-paper/25 text-paper hover:bg-paper/10"
                      }`}
                    >
                      {a} to {b}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            className="rounded-3xl border border-paper/10 bg-ink2/80 p-5 backdrop-blur sm:p-6 lg:col-span-2"
            aria-label="Rate trend"
          >
            <h2 className="mb-4 text-lg font-semibold text-paper">How the rate has moved</h2>
            <TrendChart points={points} status={status} from={from} to={to} days={TREND_DAYS} />
          </section>
        </div>

        <footer className="mt-auto text-xs text-paper/50">
          Live rates from open.er-api.com. Trend data from the European Central Bank via frankfurter.app. Rates are
          mid-market and for information only.
        </footer>
      </main>
    </>
  );
}

export default App;
