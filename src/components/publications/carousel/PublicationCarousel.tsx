import { cn } from "../../../styles/cn";
import { PublicationStackCard } from "../card";
import { CarouselControls } from "./CarouselControls";
import { usePublicationCarousel } from "./usePublicationCarousel";
import type { PublicationCarouselProps } from "./types";

export function PublicationCarousel({
  publications,
  onHeightChange,
}: PublicationCarouselProps) {
  const {
    emblaRef,
    activeCardRef,
    currentIndex,
    canGoPrev,
    canGoNext,
    dotItems,
    goPrev,
    goNext,
    goToId,
    onKeyDown,
  } = usePublicationCarousel(publications, onHeightChange);

  return (
    <div className="w-full relative">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Showing publication ${currentIndex + 1} of ${publications.length}`}
      </div>

      <div
        ref={emblaRef}
        className={cn("overflow-hidden w-full", {
          "carousel-fade-both": canGoPrev && canGoNext,
          "carousel-fade-left": canGoPrev && !canGoNext,
          "carousel-fade-right": !canGoPrev && canGoNext,
        })}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Publications carousel"
      >
        <div className="flex sm:gap-4">
          {publications.map((pub, idx) => (
            <div
              key={pub.id}
              ref={idx === currentIndex ? activeCardRef : null}
              className="flex-[0_0_100%] sm:flex-[0_0_calc(100%-3.5rem)] md:flex-[0_0_calc(100%-5rem)] min-w-0"
            >
              <PublicationStackCard publication={pub} isTop />
            </div>
          ))}
        </div>
      </div>

      {publications.length > 1 && (
        <CarouselControls
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          currentIndex={currentIndex}
          dotItems={dotItems}
          onPrev={goPrev}
          onNext={goNext}
          onSelect={goToId}
        />
      )}
    </div>
  );
}
