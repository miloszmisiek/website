import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer rounded-none transition-colors duration-300 min-h-11 short:min-h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "font-mono tracking-technical uppercase text-xs short:text-caption bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 short:px-4 short:py-2",
        secondary:
          "font-mono tracking-technical uppercase text-xs short:text-caption border border-foreground/25 text-foreground hover:bg-foreground/5 hover:border-foreground/40 px-5 py-2.5 short:px-4 short:py-2",
        icon: "transition-all font-mono tracking-widest text-xs text-foreground/90 hover:text-foreground border border-foreground/20 bg-white/5 backdrop-blur-sm hover:border-foreground/30 hover:bg-white/10 w-11 h-11 p-0",
        ghost:
          "inline-block text-xs tracking-widest text-foreground hover:text-foreground/70",
      },
      size: {
        md: "",
        sm: "!px-2.5 !py-1.5",
        compact: "!px-4 !py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
