import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Publication } from "../../data/schema";
import { PublicationStackCard } from "./PublicationStackCard";
import { PublicationCarousel } from "./PublicationCarousel";

// ─── Layout constants ─────────────────────────────────────────────────────────
const CARD_WIDTH = 720; // px — increased for wider content
const H_STEP_X = 120; // px — tighter overlap

// Desktop 3D depth constants
const ROTATE_Y_PER_STEP = 8; // degrees of Y-rotation per depth position
const SCALE_PER_STEP = 0.04; // scale reduction per depth position
const Y_SINK_PER_STEP = 6; // px — subtle vertical drop per depth

const MOBILE_BREAKPOINT = 960; // px — carousel on tablet and smaller
const FALLBACK_HEIGHT = 400; // px — shown before first measurement

// ─── Types ────────────────────────────────────────────────────────────────────
interface PublicationDeckProps {
  publications: Publication[];
}

// ─── Component ───────────────────────────────────────────────────────────────
export function PublicationDeck({ publications }: PublicationDeckProps) {
  const prefersReducedMotion = useReducedMotion();

  const [orderedIds, setOrderedIds] = useState<string[]>(
    publications.map((p) => p.id),
  );
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const topCardRef = useRef<HTMLDivElement | null>(null);
  const numCards = orderedIds.length;

  // ── Responsive breakpoint detection ────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Container height — desktop only (mobile height reported by carousel) ───
  const measureTopCard = useCallback(() => {
    if (!topCardRef.current) return;
    setContainerHeight(topCardRef.current.offsetHeight);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return;
    measureTopCard();
    const ro = new ResizeObserver(measureTopCard);
    if (topCardRef.current) ro.observe(topCardRef.current);
    return () => ro.disconnect();
  }, [measureTopCard, isMobile, orderedIds]);

  // ── State ──────────────────────────────────────────────────────────────────
  const bringToFront = useCallback((id: string) => {
    setOrderedIds((prev) => [id, ...prev.filter((x) => x !== id)]);
  }, []);

  const pubMap = Object.fromEntries(publications.map((p) => [p.id, p]));

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 32 };

  // ── Container sizing (desktop) ─────────────────────────────────────────────
  const containerWidth = `${CARD_WIDTH + (numCards - 1) * H_STEP_X}px`;
  const minHeight = containerHeight > 0 ? containerHeight : FALLBACK_HEIGHT;

  return (
    <div className={`w-full ${isMobile ? "overflow-hidden" : "overflow-visible"}`}>
      {isMobile ? (
        /* ── Mobile / Tablet Carousel ─────────────────────────────────────── */
        <PublicationCarousel
          publications={publications}
          onHeightChange={(h) => setContainerHeight(h)}
        />
      ) : (
        /* ── Desktop 3D Deck ──────────────────────────────────────────────── */
        <>
          <div
            className="relative"
            style={{
              width: containerWidth,
              minHeight: `${minHeight}px`,
              perspective: "1200px",
            }}
          >
            {orderedIds.map((id) => {
              const stackPos = orderedIds.indexOf(id);
              const pub = pubMap[id];
              if (!pub) return null;

              const isTop = stackPos === 0;
              const zIndex = (numCards - stackPos) * 10;
              const opacity = isTop ? 1 : Math.max(0.5, 0.9 - stackPos * 0.15);

              const animX = stackPos * H_STEP_X;
              const animY = stackPos * Y_SINK_PER_STEP;
              const animRotateY = stackPos * -ROTATE_Y_PER_STEP;
              const animScale = 1 - stackPos * SCALE_PER_STEP;
              const boxShadow = isTop
                ? "var(--shadow-card-top)"
                : "var(--shadow-card-bg)";

              return (
                <motion.div
                  key={id}
                  ref={isTop ? topCardRef : null}
                  className="absolute top-0 left-0 will-change-transform"
                  animate={{
                    x: animX,
                    y: animY,
                    rotate: 0,
                    rotateY: animRotateY,
                    scale: animScale,
                    opacity,
                  }}
                  transition={springTransition}
                  style={{
                    zIndex,
                    width: `${CARD_WIDTH}px`,
                    boxShadow,
                  }}
                >
                  <PublicationStackCard
                    publication={pub}
                    isTop={isTop}
                    onClick={() => bringToFront(id)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* ── Desktop dot navigation ────────────────────────────────────── */}
          {numCards > 1 && (
            <div
              className="flex items-center justify-center gap-4 mt-12"
              role="tablist"
              aria-label="Publication navigation"
            >
              {publications.map((pub) => {
                const isActive = orderedIds[0] === pub.id;
                return (
                  <button
                    key={pub.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to publication: ${pub.title}`}
                    onClick={() => bringToFront(pub.id)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus-ring rounded-none"
                  >
                    <span
                      className={[
                        "rounded-none transition-all duration-300 pointer-events-none",
                        isActive
                          ? "w-6 h-2.5 bg-foreground border border-transparent"
                          : "w-2.5 h-2.5 bg-muted/40 border border-border/60 hover:bg-muted/70 hover:border-border",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
