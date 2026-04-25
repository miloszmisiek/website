import { motion } from "framer-motion";
import { PublicationStackCard } from "../card";
import { DECK_CARD_SPRING_TRANSITION } from "./constants";
import { getDeckCardAnimationState, getDeckCardVisualState } from "./motion";
import type { PublicationDeckCardProps } from "./types";

export function PublicationDeckCard({
  publication,
  stackPos,
  numCards,
  cardRef,
  onBringToFront,
  cardWidth,
  stepX,
}: PublicationDeckCardProps) {
  const { isTop, opacity, visualStyle } = getDeckCardVisualState(
    stackPos,
    numCards,
    cardWidth,
  );
  const animationState = getDeckCardAnimationState(stackPos, opacity, stepX);

  const movePublicationToFront = () => {
    onBringToFront(publication.id);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute top-0 left-0 will-change-transform"
      animate={animationState}
      transition={DECK_CARD_SPRING_TRANSITION}
      style={visualStyle}
    >
      <PublicationStackCard
        publication={publication}
        isTop={isTop}
        onClick={movePublicationToFront}
      />
    </motion.div>
  );
}
