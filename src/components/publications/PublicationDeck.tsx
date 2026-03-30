import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Publication } from '../../data/schema';
import type { Locale } from '../../i18n';
import { PublicationStackCard } from './PublicationStackCard';

// ─── Layout constants ─────────────────────────────────────────────────────────
const CARD_WIDTH = 480;       // px — fixed card width on desktop
const H_STEP_X   = 160;       // px — horizontal peek strip width per position

// Mobile vertical-stack fallback constants
const STACK_Y_OFFSET  = 28;   // px per depth position
const STACK_ROTATION  = 1.5;  // degrees per depth position

const MOBILE_BREAKPOINT = 640; // px — matches Tailwind `sm`
const FALLBACK_HEIGHT   = 320; // px — shown before first measurement

// ─── Types ────────────────────────────────────────────────────────────────────
interface PublicationDeckProps {
  publications: Publication[];
  lang: Locale;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function PublicationDeck({ publications, lang }: PublicationDeckProps) {
  const prefersReducedMotion = useReducedMotion();

  const [orderedIds, setOrderedIds] = useState<string[]>(
    publications.map((p) => p.id)
  );
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const topCardRef = useRef<HTMLDivElement | null>(null);
  const numCards = orderedIds.length;

  // ── Responsive breakpoint detection ────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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
    : { type: 'spring' as const, stiffness: 380, damping: 32 };

  // ── Container sizing ───────────────────────────────────────────────────────
  const containerWidth = isMobile
    ? '100%'
    : `${CARD_WIDTH + (numCards - 1) * H_STEP_X}px`;

  const minHeight = containerHeight > 0 ? containerHeight : FALLBACK_HEIGHT;

  return (
    <div className="w-full">
      {/* ── Stack / Spread container ──────────────────────────────────────── */}
      <div
        className="relative"
        style={{ width: containerWidth, minHeight: `${minHeight}px` }}
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
          const animY = isMobile ? stackPos * STACK_Y_OFFSET : 0;
          const animRotate = isMobile ? stackPos * STACK_ROTATION : 0;

          // Card width: fixed on desktop, full-width on mobile
          const cardWidth = isMobile ? '100%' : `${CARD_WIDTH}px`;

          return (
            <motion.div
              key={id}
              ref={isTop ? topCardRef : null}
              className="absolute top-0 left-0 will-change-transform"
              animate={{ x: animX, y: animY, rotate: animRotate, opacity }}
              transition={springTransition}
              style={{ zIndex, width: cardWidth }}
            >
              <PublicationStackCard
                publication={pub}
                lang={lang}
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
          className="flex items-center justify-center gap-3 mt-6"
          role="tablist"
          aria-label="Publication navigation"
        >
          {orderedIds.map((id, idx) => {
            const pub = pubMap[id];
            const isActive = idx === 0;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to publication: ${pub?.title ?? id}`}
                onClick={() => bringToFront(id)}
                className={[
                  'rounded-full transition-all duration-300 cursor-pointer focus-ring',
                  isActive
                    ? 'w-4 h-2 bg-foreground'
                    : 'w-2 h-2 bg-border hover:bg-muted',
                ].join(' ')}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
