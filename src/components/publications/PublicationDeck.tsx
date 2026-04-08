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

// ─── Layout constants ─────────────────────────────────────────────────────────
const CARD_WIDTH = 720; // px — increased for wider content
const H_STEP_X = 120; // px — tighter overlap

// Desktop 3D depth constants
const ROTATE_Y_PER_STEP = 8; // degrees of Y-rotation per depth position
const SCALE_PER_STEP = 0.04; // scale reduction per depth position
const Y_SINK_PER_STEP = 6; // px — subtle vertical drop per depth

// Mobile vertical-stack fallback constants
const STACK_Y_OFFSET = 28; // px per depth position
const STACK_ROTATION = 1.5; // degrees per depth position

const MOBILE_BREAKPOINT = 1024; // px — stack vertically on tablet and smaller
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

  // ── Container height — tracks active (top) card height ─────────────────────
  const measureTopCard = useCallback(() => {
    if (!topCardRef.current) return;
    const cardH = topCardRef.current.offsetHeight;
    // Mobile: account for vertical stack peek below active card
    const extra = isMobile ? (numCards - 1) * STACK_Y_OFFSET : 0;
    setContainerHeight(cardH + extra);
  }, [isMobile, numCards]);

  useLayoutEffect(() => {
    measureTopCard();
    const ro = new ResizeObserver(measureTopCard);
    if (topCardRef.current) ro.observe(topCardRef.current);
    return () => ro.disconnect();
  }, [measureTopCard, orderedIds]);

  // ── State ──────────────────────────────────────────────────────────────────
  const bringToFront = useCallback((id: string) => {
    setOrderedIds((prev) => [id, ...prev.filter((x) => x !== id)]);
  }, []);

  const pubMap = Object.fromEntries(publications.map((p) => [p.id, p]));

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 32 };

  // ── Container sizing ───────────────────────────────────────────────────────
  const containerWidth = isMobile
    ? "100%"
    : `${CARD_WIDTH + (numCards - 1) * H_STEP_X}px`;

  const minHeight = containerHeight > 0 ? containerHeight : FALLBACK_HEIGHT;

  return (
    <div className="w-full overflow-hidden lg:overflow-visible">
      {/* ── Stack / Spread container ──────────────────────────────────────── */}
      <div
        className="relative"
        style={{
          width: containerWidth,
          minHeight: `${minHeight}px`,
          perspective: isMobile ? undefined : "1200px",
        }}
      >
        {orderedIds.map((id) => {
          const stackPos = orderedIds.indexOf(id);
          const pub = pubMap[id];
          if (!pub) return null;

          const isTop = stackPos === 0;
          const zIndex = (numCards - stackPos) * 10;
          const opacity = isTop ? 1 : Math.max(0.5, 0.9 - stackPos * 0.15);

          // Horizontal spread (desktop) vs. vertical stack (mobile)
          const animX = isMobile ? 0 : stackPos * H_STEP_X;
          const animY = isMobile
            ? stackPos * STACK_Y_OFFSET
            : stackPos * Y_SINK_PER_STEP;
          const animRotate = isMobile ? stackPos * STACK_ROTATION : 0;
          const animRotateY = isMobile ? 0 : stackPos * -ROTATE_Y_PER_STEP;
          const animScale = isMobile ? 1 : 1 - stackPos * SCALE_PER_STEP;

          // Card width: fixed on desktop, full-width on mobile
          const cardWidth = isMobile ? "100%" : `${CARD_WIDTH}px`;

          // Shadow: active card gets strong drop + right-edge lift; background cards recede
          const boxShadow = isMobile
            ? undefined
            : isTop
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
                rotate: animRotate,
                rotateY: animRotateY,
                scale: animScale,
                opacity,
              }}
              transition={springTransition}
              style={{ zIndex, width: cardWidth, boxShadow }}
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

      {/* ── Dot navigation ────────────────────────────────────────────────── */}
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
                className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus-ring rounded-sm"
              >
                <span
                  className={[
                    "rounded-sm transition-all duration-300 pointer-events-none",
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
    </div>
  );
}
