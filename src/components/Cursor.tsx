import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Custom cursor: a small crosshair / measurement reticle (drafting motif).
 * Desktop fine-pointer only; native cursor under reduced motion or touch.
 * Grows + shows a label over elements carrying [data-cursor="label"].
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-reticle");

    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea, [role='button'], [role='option']");
      if (target) {
        setGrown(true);
        setLabel(target.dataset.cursor ?? null);
      } else {
        setGrown(false);
        setLabel(null);
      }
    };

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.35;
      cur.y += (pos.y - cur.y) * 0.35;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-reticle");
    };
  }, [reduce]);

  if (!enabled) return null;

  const size = grown ? 44 : 22;
  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ willChange: "transform" }}
    >
      <div
        className="relative -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-150 ease-out"
        style={{ width: size, height: size }}
      >
        {/* crosshair reticle: four corner strokes + center dot */}
        <span className="absolute left-1/2 top-0 h-[6px] w-px -translate-x-1/2 bg-chalk/80" />
        <span className="absolute left-1/2 bottom-0 h-[6px] w-px -translate-x-1/2 bg-chalk/80" />
        <span className="absolute top-1/2 left-0 h-px w-[6px] -translate-y-1/2 bg-chalk/80" />
        <span className="absolute top-1/2 right-0 h-px w-[6px] -translate-y-1/2 bg-chalk/80" />
        <span
          className={`absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full ${
            grown ? "bg-brass" : "bg-chalk/80"
          }`}
        />
        {label && (
          <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.2em] uppercase text-brass">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
