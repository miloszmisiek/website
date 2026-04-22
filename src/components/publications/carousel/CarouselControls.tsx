// GOOD
import { cn } from "../../../styles/cn";
import { DotNav } from "./DotNav";
import type { CarouselArrowButtonProps, CarouselControlsProps } from "./types";

const CarouselArrowButton = ({
  direction,
  disabled,
  onClick,
}: CarouselArrowButtonProps) => {
  const isPrev = direction === "prev";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous publication" : "Next publication"}
      className={cn(
        "flex items-center justify-center w-11 h-11 p-0 rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "cursor-pointer text-foreground/70 hover:text-foreground hover:bg-foreground/5",
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
        {isPrev ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
};

export const CarouselControls = ({
  canGoPrev,
  canGoNext,
  currentIndex,
  dotItems,
  onPrev,
  onNext,
  onSelect,
}: CarouselControlsProps) => {
  return (
    <div
      className="flex items-center justify-center gap-3 mt-8"
      role="group"
      aria-label="Carousel controls"
    >
      <CarouselArrowButton
        direction="prev"
        disabled={!canGoPrev}
        onClick={onPrev}
      />

      <DotNav items={dotItems} activeIndex={currentIndex} onSelect={onSelect} />

      <CarouselArrowButton
        direction="next"
        disabled={!canGoNext}
        onClick={onNext}
      />
    </div>
  );
};
