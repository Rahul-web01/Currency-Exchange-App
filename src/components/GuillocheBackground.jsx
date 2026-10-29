// Banknote-style guilloche: many rotated ellipses overlap into a rosette.
function Rosette({ cx, cy, rx, ry, count, stroke, opacity }) {
  return (
    <g transform={`translate(${cx} ${cy})`} fill="none" stroke={stroke} strokeOpacity={opacity} strokeWidth="0.8">
      {Array.from({ length: count }, (_, i) => (
        <ellipse key={i} rx={rx} ry={ry} transform={`rotate(${(i * 180) / count})`} />
      ))}
    </g>
  );
}

function GuillocheBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <Rosette cx={1050} cy={120} rx={420} ry={150} count={60} stroke="#4FA79A" opacity={0.22} />
        <Rosette cx={1050} cy={120} rx={260} ry={90} count={48} stroke="#E3B95B" opacity={0.14} />
        <Rosette cx={80} cy={760} rx={380} ry={130} count={54} stroke="#4FA79A" opacity={0.18} />
        <Rosette cx={80} cy={760} rx={220} ry={70} count={40} stroke="#4FA79A" opacity={0.12} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/30 to-ink/80" />
    </div>
  );
}

export default GuillocheBackground;
