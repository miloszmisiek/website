import { initDialup } from "./utils";
import { initRetroForm } from "./form-states";

console.log("Welcome to MILOSZ MISIEK v1.0 (1996 Edition)");

initDialup();

const hitsEl = document.getElementById("hits");
fetch("/api/hits", { method: "POST" })
  .then((r) => r.json())
  .then((d: { count: number }) => {
    if (hitsEl) hitsEl.textContent = String(d.count).padStart(7, "0");
  })
  .catch(() => {
    if (hitsEl) hitsEl.textContent = "-------";
  });

const midi = document.getElementById("midi-toggle");
if (midi) {
  let on = false;
  const audio = new Audio("/retro_tune.mp3");
  audio.loop = true;
  audio.volume = 0.6;
  midi.addEventListener("click", () => {
    on = !on;
    midi.textContent = `♪ MIDI: ${on ? "ON " : "OFF"}`;
    midi.setAttribute("aria-pressed", String(on));
    if (on) {
      audio.play().catch(() => {
        on = false;
        midi.textContent = "♪ MIDI: OFF";
      });
    } else {
      audio.pause();
    }
  });
  window.addEventListener("beforeunload", () => audio.pause());
}

const exitBtn = document.getElementById("exit-retro") as
  | (HTMLElement & { dataset: DOMStringMap })
  | null;
if (exitBtn) {
  exitBtn.addEventListener("click", () => {
    try {
      localStorage.removeItem("retro_mode");
    } catch {}
    window.location.href = exitBtn.dataset.home ?? "/";
  });
}

try {
  localStorage.setItem("retro_mode", "on");
} catch {
  console.warn("Could not set retro_mode in localStorage");
}

initRetroForm(
  "retro-contact-form",
  "retro-contact-submit",
  "retro-contact-status",
);
