import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer rounded-none transition-colors duration-300 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "font-mono tracking-[0.2em] uppercase text-xs bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5",
        secondary:
          "font-mono tracking-[0.2em] uppercase text-xs border border-border text-foreground hover:bg-foreground/5 hover:border-foreground/30 px-5 py-2.5",
        icon: "transition-all font-mono tracking-widest text-xs text-foreground/90 hover:text-foreground border border-border bg-white/5 backdrop-blur-sm hover:border-foreground/30 hover:bg-white/10 w-11 h-11 p-0",
        ghost:
          "inline-block text-xs tracking-widest text-foreground hover:text-foreground/70",
      },
      size: {
        md: "",
        sm: "!px-2.5 !py-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
