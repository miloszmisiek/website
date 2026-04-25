import { useState, useEffect, useLayoutEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import type { Publication } from "../../../data/schema";

export function usePublicationCarousel(
  publications: Publication[],
  onHeightChange?: (height: number) => void,
) {
  const prefersReducedMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "keepSnaps",
    duration: prefersReducedMotion ? 0 : 25,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useLayoutEffect(() => {
    const el = activeCardRef.current;
    if (!el || !onHeightChange) return;
    const ro = new ResizeObserver(() => onHeightChange(el.offsetHeight));
    ro.observe(el);
    onHeightChange(el.offsetHeight);
    return () => ro.disconnect();
  }, [currentIndex, onHeightChange]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < publications.length - 1;

  const goPrev = () => {
    emblaApi?.scrollPrev();
  };

  const goNext = () => {
    emblaApi?.scrollNext();
  };

  const goToId = (id: string) => {
    const idx = publications.findIndex((pub) => pub.id === id);
    if (idx !== -1) emblaApi?.scrollTo(idx);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  const dotItems = publications.map((pub) => ({
    id: pub.id,
    label: pub.title,
  }));

  return {
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
  };
}
