import type { Publication } from "../../../data/schema";

export type DotNavItem = {
  id: string;
  label: string;
};

export type CarouselControlsProps = {
  canGoPrev: boolean;
  canGoNext: boolean;
  currentIndex: number;
  dotItems: DotNavItem[];
  onPrev: () => void;
  onNext: () => void;
  onSelect: (id: string) => void;
};

export type CarouselArrowButtonProps = {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
};

export type PublicationCarouselProps = {
  publications: Publication[];
  onHeightChange?: (height: number) => void;
};

export type DotNavProps = {
  items: DotNavItem[];
  activeIndex: number;
  onSelect: (id: string) => void;
};

export type DotButtonProps = {
  item: DotNavItem;
  isActive: boolean;
  onSelect: (id: string) => void;
};
