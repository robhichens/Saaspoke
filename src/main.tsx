import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { playIntro } from "./lib/intro";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The prerendered HTML is already on screen. If JS arrived late, hydrate in
// place — replacing the DOM would repaint everything (and set LCP) at mount
// time. If JS was fast, replace and play the load orchestration as designed.
if (container.hasChildNodes() && !playIntro) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
