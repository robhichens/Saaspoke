/**
 * The tape-measure motif: a hairline with measurement ticks.
 * Used as section dividers. `label` turns it into information
 * (e.g. measuring "30 MIN / WEEK" next to the time-savings claim).
 */
export function TapeRule({
  label,
  className = "",
  onPaper = false,
}: {
  label?: string;
  className?: string;
  onPaper?: boolean;
}) {
  const tickColor = onPaper ? "#c9bda3" : "#3a332b";
  const ticks = [];
  for (let i = 0; i <= 120; i++) {
    const major = i % 10 === 0;
    const mid = i % 5 === 0 && !major;
    ticks.push(
      <line
        key={i}
        x1={i * 10}
        y1={16}
        x2={i * 10}
        y2={major ? 4 : mid ? 8 : 12}
        stroke={major ? "#c8923d" : tickColor}
        strokeOpacity={major ? 0.7 : 1}
        strokeWidth={1}
      />,
    );
  }
  return (
    <div aria-hidden="true" className={`relative w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 17"
        preserveAspectRatio="none"
        className="block h-[17px] w-full min-w-[700px]"
      >
        <line x1="0" y1="16" x2="1200" y2="16" stroke={tickColor} strokeWidth={1} />
        {ticks}
      </svg>
      {label && (
        <span
          className={`absolute right-4 -top-1 px-2 font-mono text-[10px] tracking-[0.2em] uppercase ${
            onPaper ? "bg-oat text-slate" : "bg-ink text-brass"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
