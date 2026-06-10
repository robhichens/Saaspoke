/**
 * Build-time prerender: renders the app to static HTML and injects it into
 * dist/index.html so real content paints before any JavaScript loads.
 *
 * useReduceMotion() returns true during this render, so the snapshot is the
 * fully-resolved, motion-free variant — no opacity-0 placeholders. The client
 * bundle then mounts over it and plays the load orchestration as usual.
 * Lazy (below-the-fold) sections render their null fallbacks and stay
 * client-only, keeping the document small.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const file = resolve(root, "dist", "index.html");

let html = readFileSync(file, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  throw new Error("Could not find the #root marker in dist/index.html");
}

// Inline the stylesheet — it's ~7 KiB gzipped, and removing the
// render-blocking fetch is worth more than the cacheability.
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = readFileSync(resolve(root, "dist", "." + cssLink[1]), "utf8");
  html = html.replace(cssLink[0], `<style>${css}</style>`);
  console.log(`Inlined ${(css.length / 1024).toFixed(1)} KiB of CSS`);
}

const app = renderToString(createElement(App));
writeFileSync(file, html.replace(marker, `<div id="root">${app}</div>`), "utf8");
console.log(`Prerendered ${(app.length / 1024).toFixed(1)} KiB of static HTML into dist/index.html`);
