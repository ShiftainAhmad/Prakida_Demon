import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const CHUNK_RELOAD_KEY = "prakida:chunk-reload";

// Recover from stale hashed chunks after a fresh deploy.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();

  const alreadyReloaded = sessionStorage.getItem(CHUNK_RELOAD_KEY) === "1";
  if (alreadyReloaded) {
    return;
  }

  sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
  window.location.reload();
});

sessionStorage.removeItem(CHUNK_RELOAD_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
