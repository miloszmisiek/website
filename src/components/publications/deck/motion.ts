import {
  CARD_WIDTH,
  DECK_BASE_OPACITY,
  DECK_MIN_OPACITY,
  DECK_OPACITY_STEP,
  DECK_ROTATE_Y_STEP,
  DECK_SCALE_STEP,
  DECK_STACK_SHADOW,
  DECK_TOP_SHADOW,
  DECK_Y_OFFSET_STEP,
  DECK_Z_INDEX_STEP,
  H_STEP_X,
} from "./constants";
import type { DeckCardAnimationState, DeckCardVisualState } from "./types";

export const getDeckCardVisualState = (
  stackPos: number,
  numCards: number,
  cardWidth: number = CARD_WIDTH,
): DeckCardVisualState => {
  const isTop = stackPos === 0;
  const zIndex = (numCards - stackPos) * DECK_Z_INDEX_STEP;
  const boxShadow = isTop ? DECK_TOP_SHADOW : DECK_STACK_SHADOW;
  const visualStyle = {
    zIndex,
    width: `${cardWidth}px`,
    boxShadow,
  };
  return {
    isTop,
    opacity: isTop
      ? 1
      : Math.max(
          DECK_MIN_OPACITY,
          DECK_BASE_OPACITY - stackPos * DECK_OPACITY_STEP,
        ),
    visualStyle,
  };
};

export const getDeckCardAnimationState = (
  stackPos: number,
  opacity: number,
  stepX: number = H_STEP_X,
): DeckCardAnimationState => {
  return {
    x: stackPos * stepX,
    y: stackPos * DECK_Y_OFFSET_STEP,
    rotate: 0,
    rotateY: stackPos * -DECK_ROTATE_Y_STEP,
    scale: 1 - stackPos * DECK_SCALE_STEP,
    opacity,
  };
};
