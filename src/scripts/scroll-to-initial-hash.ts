// GOOD
// Initial hash load is unreliable: the browser jumps before fonts, images,
// and React island hydration settle. Upstream sections (Publications deck
// remeasures via ResizeObserver, useIsMobile swaps Desktop→Mobile layouts,
// images load without reserved space) keep shifting the target downward
// after we land. Strategy: land instantly, then keep correcting until layout
// has been quiet for QUIET_MS or the hard ceiling is reached.

const SETTLE_MS = 3000;
const QUIET_MS = 250;
const POLL_MS = 64;
const SCROLL_TOLERANCE_PX = 1;

const SCROLL_KEYS = new Set([
  " ",
  "PageDown",
  "PageUp",
  "ArrowDown",
  "ArrowUp",
  "Home",
  "End",
]);

type Options = {
  getHeaderHeight: () => number;
  hashOffset: number;
};

export function scrollToInitialHash({ getHeaderHeight, hashOffset }: Options) {
  if (!location.hash) return;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  whenReady(() => settle(location.hash, getHeaderHeight, hashOffset));
}

function whenReady(run: () => void) {
  const afterFonts = () => {
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => requestAnimationFrame(() => requestAnimationFrame(run)));
  };

  if (document.readyState === "complete") {
    afterFonts();
  } else {
    window.addEventListener("load", afterFonts, { once: true });
  }
}

function settle(
  hash: string,
  getHeaderHeight: () => number,
  hashOffset: number,
) {
  const target = document.querySelector(hash);
  if (!(target instanceof HTMLElement)) return;

  const computeTop = () =>
    target.getBoundingClientRect().top +
    window.scrollY -
    getHeaderHeight() -
    hashOffset;

  const deadline = performance.now() + SETTLE_MS;
  let lastChangeAt = performance.now();
  let cancelled = false;
  let timeoutId: number | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const correct = () => {
    if (cancelled) return;
    const desired = computeTop();
    if (Math.abs(window.scrollY - desired) > SCROLL_TOLERANCE_PX) {
      window.scrollTo({ top: desired, behavior: "instant" as ScrollBehavior });
      lastChangeAt = performance.now();
    }
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (SCROLL_KEYS.has(e.key)) cancel();
  };

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    if (timeoutId !== null) clearTimeout(timeoutId);
    resizeObserver?.disconnect();
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchmove", cancel);
    window.removeEventListener("keydown", onKeydown);
  };

  const poll = () => {
    if (cancelled) return;
    correct();
    const now = performance.now();
    if (now >= deadline || now - lastChangeAt >= QUIET_MS) {
      cancel();
      return;
    }
    timeoutId = window.setTimeout(poll, POLL_MS);
  };

  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchmove", cancel, { passive: true, once: true });
  window.addEventListener("keydown", onKeydown);

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => {
      if (cancelled) return;
      lastChangeAt = performance.now();
      correct();
    });
    resizeObserver.observe(document.body);
  }

  correct();
  timeoutId = window.setTimeout(poll, POLL_MS);
}
