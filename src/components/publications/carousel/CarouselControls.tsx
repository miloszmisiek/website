import { cn } from "../../../styles/cn";
import { IconChevron } from "../../icons/IconChevron";
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
      <IconChevron direction={isPrev ? "left" : "right"} />
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
