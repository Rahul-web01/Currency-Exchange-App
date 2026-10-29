function TrendChart({ points, status, from, to, days }) {
  if (status === "idle") {
    return <p className="text-sm text-paper/60">Pick two different currencies to see a trend.</p>;
  }
  if (status === "loading") {
    return <div className="h-40 animate-pulse rounded-xl bg-paper/5" aria-label="Loading trend" />;
  }
  if (status === "unavailable") {
    return (
      <p className="text-sm text-paper/60">
        Trend history isn't available for {from} to {to}. Live conversion still works.
      </p>
    );
  }

  const W = 600;
  const H = 160;
  const pad = 8;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (i) => pad + (i * (W - pad * 2)) / (points.length - 1);
  const y = (v) => H - pad - ((v - min) / span) * (H - pad * 2);
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const area = `${line} L${x(points.length - 1)},${H} L${x(0)},${H} Z`;

  const first = values[0];
  const last = values[values.length - 1];
  const change = ((last - first) / first) * 100;
  const up = change >= 0;
  const digits = last < 1 ? 4 : 2;

  return (
    <figure>
      <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm text-paper/70">
          {from} to {to}, last {days} days
        </span>
        <span className={`num text-sm font-semibold ${up ? "text-up" : "text-down"}`}>
          {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
        </span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-40 w-full"
        role="img"
        aria-label={`${from} to ${to} moved ${up ? "up" : "down"} ${Math.abs(change).toFixed(2)} percent over ${days} days`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3B95B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E3B95B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#trendFill)" />
        <path d={line} fill="none" stroke="#E3B95B" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="num mt-2 flex justify-between text-xs text-paper/60">
        <span>Low {min.toFixed(digits)}</span>
        <span>High {max.toFixed(digits)}</span>
      </div>
    </figure>
  );
}

export default TrendChart;
