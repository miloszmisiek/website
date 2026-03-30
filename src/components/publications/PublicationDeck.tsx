import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Publication } from '../../data/schema';
import type { Locale } from '../../i18n';
import { PublicationStackCard } from './PublicationStackCard';

// ─── Stack visual constants ───────────────────────────────────────────────────
const STACK_X_OFFSET = 10; // px per depth position (fans right)
const STACK_Y_OFFSET = 28; // px per depth position (fans down)
const STACK_ROTATION = 1.5; // degrees per depth position (slight tilt)
const FALLBACK_HEIGHT = 320; // px — shown before first measurement

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
  const topCardRef = useRef<HTMLDivElement | null>(null);
  const numCards = orderedIds.length;

  // Stable ref callback so the ResizeObserver always targets the current top card
  const measureTopCard = useCallback(() => {
    if (topCardRef.current) {
      const cardH = topCardRef.current.offsetHeight;
      setContainerHeight(cardH + (numCards - 1) * STACK_Y_OFFSET);
    }
  }, [numCards]);

  useLayoutEffect(() => {
    measureTopCard();
    const ro = new ResizeObserver(measureTopCard);
    if (topCardRef.current) ro.observe(topCardRef.current);
    return () => ro.disconnect();
  }, [measureTopCard, orderedIds]);

  const bringToFront = useCallback((id: string) => {
    setOrderedIds((prev) => [id, ...prev.filter((x) => x !== id)]);
  }, []);

  // Build a stable id → Publication lookup
  const pubMap = Object.fromEntries(publications.map((p) => [p.id, p]));

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 32 };

  return (
    <div className="w-full">
      {/* ── Stack container ────────────────────────────────────────────────── */}
      <div
        className="relative"
        style={{
          minHeight: `${containerHeight > 0 ? containerHeight : FALLBACK_HEIGHT}px`,
        }}
      >
        {/* Render top-first so top card is first in tab order */}
        {orderedIds.map((id) => {
          const stackPosition = orderedIds.indexOf(id);
          const pub = pubMap[id];
          if (!pub) return null;

          const isTop = stackPosition === 0;
          const x = stackPosition * STACK_X_OFFSET;
          const y = stackPosition * STACK_Y_OFFSET;
          const rotate = stackPosition * STACK_ROTATION;
          // z-index: top card gets highest value; use clean multiples of 10
          const zIndex = (numCards - stackPosition) * 10;
          // Opacity: top = 1, each card behind fades slightly
          const opacity =
            isTop ? 1 : Math.max(0.5, 0.9 - stackPosition * 0.15);

          return (
            <motion.div
              key={id}
              ref={isTop ? topCardRef : null}
              className="absolute top-0 left-0 w-full will-change-transform"
              animate={{ x, y, rotate, opacity }}
              transition={springTransition}
              style={{ zIndex }}
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
