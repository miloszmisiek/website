export const THEME = { DARK: "dark", LIGHT: "light" } as const;
export type Theme = (typeof THEME)[keyof typeof THEME];

export const THEME_STORAGE_KEY = "theme";

export const THEME_COLORS: Record<Theme, string> = {
  dark: "#050505",
  light: "#f8f5ef",
};
