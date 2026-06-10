import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReduceMotion } from "../lib/useReduceMotion";
import { VERTICALS } from "../lib/verticals";

const C = 320; // center
const R_HUB = 56;
const R_SPOKE = 230;
const R_LABEL = 258;
const R_RING = 248;

type SpokePos = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
};

function spokeAt(angleDeg: number): SpokePos {
  const a = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return {
    x1: C + R_HUB * cos,
    y1: C + R_HUB * sin,
    x2: C + R_SPOKE * cos,
    y2: C + R_SPOKE * sin,
    lx: C + R_LABEL * cos,
    ly: C + R_LABEL * sin,
    anchor: cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle",
  };
}

const baseAngle = (i: number) => -90 + (360 / VERTICALS.length) * i;

/** Shortest-path angle delta in degrees. */
function shortestDelta(from: number, to: number) {
  return ((to - from + 540) % 360) - 180;
}

export function Wheel({
  mode,
  selected = 0,
  onSelect,
  className = "",
}: {
  mode: "hero" | "interactive" | "rest";
  selected?: number;
  onSelect?: (i: number) => void;
  className?: string;
}) {
  const reduce = useReduceMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // --- interactive rotation: spring the selected spoke to 12 o'clock ---
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (mode !== "interactive") return;
    const target = targetRef.current + shortestDelta(baseAngle(selected) + targetRef.current, -90);
    targetRef.current = target;
    if (reduce) {
      offsetRef.current = target;
      setOffset(target);
      return;
    }
    cancelAnimationFrame(rafRef.current);
    const step = () => {
      const d = targetRef.current - offsetRef.current;
      if (Math.abs(d) < 0.05) {
        offsetRef.current = targetRef.current;
        setOffset(targetRef.current);
        return;
      }
      offsetRef.current += d * 0.12;
      setOffset(offsetRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [selected, mode, reduce]);

  // --- hero parallax tilt toward cursor (≤5°, lerped) ---
  useEffect(() => {
    if (mode !== "hero" || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = wrapRef.current;
    if (!el) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      target.x = Math.max(-1, Math.min(1, dx * 2)) * 5;
      target.y = Math.max(-1, Math.min(1, dy * 2)) * -5;
    };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      el.style.transform = `perspective(900px) rotateY(${cur.x}deg) rotateX(${cur.y}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mode, reduce]);

  const interactive = mode === "interactive";
  const hero = mode === "hero";
  const drawIn = hero && !reduce;

  const handleKey = (e: React.KeyboardEvent) => {
    if (!interactive || !onSelect) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onSelect((selected + 1) % VERTICALS.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onSelect((selected - 1 + VERTICALS.length) % VERTICALS.length);
    }
  };

  return (
    <div ref={wrapRef} className={className} style={{ willChange: hero ? "transform" : undefined }}>
      <svg
        viewBox="0 0 640 640"
        role={interactive ? "group" : "img"}
        aria-label={
          interactive
            ? `Verticals wheel. ${VERTICALS[selected].name} selected. Use arrow keys to rotate through verticals.`
            : "Hub-and-spoke wheel: Saaspoke at the hub, a spoke for each kind of family business. Childcare is live; the rest are in the workshop."
        }
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={handleKey}
        className="block h-auto w-full select-none"
      >
        <defs>
          <linearGradient id="brassGrad" gradientUnits="userSpaceOnUse" x1="90" y1="90" x2="550" y2="550">
            <stop offset="0%" stopColor="#a87527" />
            <stop offset="50%" stopColor="#e0b264" />
            <stop offset="100%" stopColor="#c8923d" />
          </linearGradient>
        </defs>

        {/* outer dashed ring — slow idle rotation in hero only */}
        <g className={hero ? "ring-idle" : undefined}>
          <circle
            cx={C}
            cy={C}
            r={R_RING}
            fill="none"
            stroke="#3a332b"
            strokeWidth="1"
            strokeDasharray="2 9"
          />
        </g>

        {/* spokes */}
        {VERTICALS.map((v, i) => {
          const isSelected = interactive && i === selected;
          const isLive = v.status === "live";
          const lit = isSelected || (!interactive && isLive);
          const angle = baseAngle(i) + (interactive ? offset : 0);
          const p = spokeAt(angle);
          const showLabel = hero || interactive;
          return (
            <g
              key={v.id}
              onClick={interactive ? () => onSelect?.(i) : undefined}
              data-cursor={interactive ? "select" : undefined}
              className={interactive ? "cursor-pointer" : undefined}
              role={interactive ? "button" : undefined}
              aria-label={interactive ? `${v.name} — ${v.status === "live" ? "live" : "in the workshop"}` : undefined}
            >
              {/* generous invisible hit area along the spoke */}
              {interactive && (
                <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="transparent" strokeWidth="32" />
              )}
              <motion.line
                x1={p.x1}
                y1={p.y1}
                x2={p.x2}
                y2={p.y2}
                stroke={lit ? "url(#brassGrad)" : "#3a332b"}
                strokeWidth={lit ? 2 : 1.25}
                initial={drawIn ? { pathLength: 0, opacity: 0 } : undefined}
                animate={drawIn ? { pathLength: 1, opacity: 1 } : undefined}
                transition={drawIn ? { duration: 0.7, delay: 0.35 + i * 0.05, ease: [0.22, 1, 0.36, 1] } : undefined}
              />
              <motion.circle
                cx={p.x2}
                cy={p.y2}
                r={lit ? 7 : 4.5}
                fill={lit ? "#c8923d" : "#14110e"}
                stroke={lit ? "#c8923d" : "#3a332b"}
                strokeWidth="1.5"
                initial={drawIn ? { scale: 0, opacity: 0 } : undefined}
                animate={drawIn ? { scale: 1, opacity: 1 } : undefined}
                transition={drawIn ? { duration: 0.4, delay: 0.85 + i * 0.05 } : undefined}
                style={{ transformOrigin: `${p.x2}px ${p.y2}px` }}
              />
              {/* live indicator on the childcare spoke */}
              {isLive && (
                <circle cx={p.x2} cy={p.y2} r={2.5} fill="#d9603b" className="live-pulse" />
              )}
              {showLabel && (
                <motion.text
                  x={p.lx}
                  y={p.ly}
                  textAnchor={p.anchor}
                  dominantBaseline="middle"
                  className={hero ? "max-md:hidden" : "max-sm:hidden"}
                  fill={lit ? "#c8923d" : "#f2ede3"}
                  fillOpacity={lit ? 1 : 0.5}
                  style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                  initial={drawIn ? { opacity: 0 } : undefined}
                  animate={drawIn ? { opacity: 1 } : undefined}
                  transition={drawIn ? { duration: 0.5, delay: 1.0 + i * 0.04 } : undefined}
                >
                  {v.shortName}
                  {isLive ? " ●" : ""}
                </motion.text>
              )}
            </g>
          );
        })}

        {/* hub */}
        <motion.g
          initial={drawIn ? { scale: 0.6, opacity: 0 } : undefined}
          animate={drawIn ? { scale: 1, opacity: 1 } : undefined}
          transition={drawIn ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] } : undefined}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          <circle cx={C} cy={C} r={R_HUB} fill="#14110e" stroke="url(#brassGrad)" strokeWidth="1.5" />
          <circle cx={C} cy={C} r={5} fill="#c8923d" />
          <text
            x={C}
            y={C + 26}
            textAnchor="middle"
            fill="#f2ede3"
            fillOpacity="0.55"
            style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.3em" }}
          >
            HUB
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
