import { useEffect, useState } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { playIntro } from "./intro";

const isServer = typeof window === "undefined";

/**
 * Like framer's useReducedMotion, with two extra rules that keep the
 * build-time prerender and client hydration in lockstep:
 *
 * - During the build-time render it returns true, so the static HTML is the
 *   fully-resolved, motion-free variant — real content paints before JS.
 * - When JS arrived late (!playIntro), main.tsx hydrates the prerendered DOM
 *   instead of replacing it. The first client render must match the server
 *   exactly, so it also returns true, then flips after mount. Entrance
 *   reveals don't replay on that path — the content has been visible for
 *   seconds already and re-hiding it would be a regression.
 */
export function useReduceMotion(): boolean {
  const reduce = useFramerReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (isServer) return true;
  if (!playIntro && !mounted) return true;
  return !!reduce;
}
