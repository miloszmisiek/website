import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { MotionConfig } from "framer-motion";
import { PublicationCarousel, DotNav } from "../carousel";
import { PublicationDeckCard } from "./PublicationDeckCard";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { cn } from "../../../styles/cn";
import { BREAKPOINT_MLG as MOBILE_BREAKPOINT } from "../../../styles/breakpoints";
import { CARD_WIDTH, FALLBACK_HEIGHT, H_STEP_X } from "./constants";
import type { PublicationDeckProps } from "./types";

export function PublicationDeck({ publications }: PublicationDeckProps) {
  const [orderedPublications, setOrderedPublications] = useState(publications);
  const [containerHeight, setContainerHeight] = useState(0);
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const topCardRef = useRef<HTMLDivElement | null>(null);
  const numCards = orderedPublications.length;
  const containerWidth = `${CARD_WIDTH + H_STEP_X * (numCards - 1)}px`;
  const minHeight = `${containerHeight > 0 ? containerHeight : FALLBACK_HEIGHT}px`;

  const measureTopCard = useCallback(() => {
    if (!topCardRef.current) return;
    setContainerHeight(topCardRef.current.offsetHeight);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return;
    measureTopCard();
    const resizeObserver = new ResizeObserver(measureTopCard);
    if (topCardRef.current) resizeObserver.observe(topCardRef.current);
    return () => resizeObserver.disconnect();
  }, [measureTopCard, isMobile, orderedPublications]);

  const bringToFront = useCallback((id: string) => {
    setOrderedPublications((prev) => {
      const publication = prev.find((pub) => pub.id === id);
      if (!publication) return prev;
      return [publication, ...prev.filter((pub) => pub.id !== id)];
    });
  }, []);

  const dotItems = publications.map((pub) => ({
    id: pub.id,
    label: pub.title,
  }));
  const dotActiveIndex = publications.findIndex(
    (pub) => pub.id === orderedPublications[0]?.id,
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn(
          "w-full",
          isMobile ? "overflow-hidden" : "overflow-visible",
        )}
      >
        {isMobile ? (
          <PublicationCarousel
            publications={publications}
            onHeightChange={setContainerHeight}
          />
        ) : (
          <>
            <div
              className="relative"
              style={{
                width: containerWidth,
                minHeight,
                perspective: "1200px",
              }}
            >
              {orderedPublications.map((publication, stackPos) => (
                <PublicationDeckCard
                  key={publication.id}
                  publication={publication}
                  stackPos={stackPos}
                  numCards={numCards}
                  cardRef={stackPos === 0 ? topCardRef : null}
                  onBringToFront={bringToFront}
                />
              ))}
            </div>

            {numCards > 1 && (
              <div className="flex items-center justify-center mt-12">
                <DotNav
                  items={dotItems}
                  activeIndex={dotActiveIndex}
                  onSelect={bringToFront}
                />
              </div>
            )}
          </>
        )}
      </div>
    </MotionConfig>
  );
}
