export const FADE_SLIDE_ANIMATION = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -10,
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
  },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
};
