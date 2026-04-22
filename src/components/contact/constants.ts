// GOOD
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const FORM_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;
export const INPUT_BASE = `
  w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-base font-sans text-foreground
  placeholder:text-foreground/40
  transition-[border-color] duration-200
  focus-visible:outline-none focus-visible:border-foreground/50
  hover:border-foreground/30
  disabled:opacity-40 disabled:cursor-not-allowed
`;
