export const CARD_WIDTH = 720;
export const H_STEP_X = 120;
export const FALLBACK_HEIGHT = 400;

export const DECK_ROTATE_Y_STEP = 8;
export const DECK_SCALE_STEP = 0.04;
export const DECK_Y_OFFSET_STEP = 6;
export const DECK_Z_INDEX_STEP = 10;
export const DECK_BASE_OPACITY = 0.9;
export const DECK_MIN_OPACITY = 0.5;
export const DECK_OPACITY_STEP = 0.15;
export const DECK_TOP_SHADOW = "var(--shadow-card-top)";
export const DECK_STACK_SHADOW = "var(--shadow-card-bg)";

export const DECK_CARD_SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};
