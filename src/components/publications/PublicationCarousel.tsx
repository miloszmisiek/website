import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import type { Publication } from "../../data/schema";
import { cn } from "../../styles/cn";
import { PublicationStackCard } from "./PublicationStackCard";

interface PublicationCarouselProps {
  publications: Publication[];
  onHeightChange?: (height: number) => void;
}

export function PublicationCarousel({
  publications,
  onHeightChange,
}: PublicationCarouselProps) {
  const prefersReducedMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "keepSnaps",
    duration: prefersReducedMotion ? 0 : 25,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeCardRef = useRef<HTMLDivElement>(null);

  // ── Sync index from Embla ─────────────────────────────────────────────────
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // ── Report active card height to parent ───────────────────────────────────
  useLayoutEffect(() => {
    const el = activeCardRef.current;
    if (!el || !onHeightChange) return;
    const ro = new ResizeObserver(() => onHeightChange(el.offsetHeight));
    ro.observe(el);
    onHeightChange(el.offsetHeight);
    return () => ro.disconnect();
  }, [currentIndex, onHeightChange]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const goNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goToIndex = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < publications.length - 1;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    },
    [goPrev, goNext],
  );

  return (
    <div className="w-full relative">
      {/* ARIA live region — must be outside the Embla viewport */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Showing publication ${currentIndex + 1} of ${publications.length}`}
      </div>

      {/* ── Right fade — fades the peeking next card only (sm+ where peek is active) */}
      <div
        className="hidden sm:block absolute inset-y-0 right-0 w-10 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, transparent, rgb(var(--color-background)))" }}
        aria-hidden="true"
      />

      {/* ── Viewport ────────────────────────────────────────────────────────── */}
      <div
        ref={emblaRef}
        className="overflow-hidden w-full"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Publications carousel"
      >
        {/* Track — must be the first and only child of the viewport */}
        <div className="flex sm:gap-4">
          {publications.map((pub, idx) => (
            <div
              key={pub.id}
              ref={idx === currentIndex ? activeCardRef : null}
              className="flex-[0_0_100%] sm:flex-[0_0_calc(100%-3.5rem)] min-w-0"
            >
              <PublicationStackCard
                publication={pub}
                isTop={true}
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Controls: prev · dots · next ─────────────────────────────────── */}
      {publications.length > 1 && (
        <div
          className="flex items-center justify-center gap-3 mt-8"
          role="group"
          aria-label="Carousel controls"
        >
          {/* Prev */}
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous publication"
            className={cn(
              "min-w-[44px] min-h-[44px] flex items-center justify-center focus-ring rounded-none transition-opacity duration-200",
              !canGoPrev ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
            )}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div
            className="flex items-center gap-4"
            role="tablist"
            aria-label="Publication navigation"
          >
            {publications.map((pub, idx) => (
              <button
                key={pub.id}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to publication: ${pub.title}`}
                onClick={() => goToIndex(idx)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus-ring rounded-none"
              >
                <span
                  className={cn(
                    "rounded-none transition-all duration-300 pointer-events-none",
                    idx === currentIndex
                      ? "w-6 h-2.5 bg-foreground border border-transparent"
                      : "w-2.5 h-2.5 bg-muted/40 border border-border/60 hover:bg-muted/70 hover:border-border",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next publication"
            className={cn(
              "min-w-[44px] min-h-[44px] flex items-center justify-center focus-ring rounded-none transition-opacity duration-200",
              !canGoNext ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
            )}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
