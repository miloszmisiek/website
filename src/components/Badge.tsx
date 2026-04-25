import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";

const badge = cva(
  "inline-flex items-center whitespace-nowrap font-mono text-micro short:text-[8.5px] tracking-widest short:tracking-normal uppercase px-2.5 py-1 short:px-1.5 short:py-0.5 rounded-none border border-solid transition-colors",
  {
    variants: {
      variant: {
        neutral:
          "bg-foreground/[0.02] text-foreground/60 dark:bg-white/[0.02] dark:text-white/40 border-foreground/15 dark:border-white/10",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        info: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>;

export function Badge({ variant, className, children, ...rest }: BadgeProps) {
  return (
    <span className={badge({ variant, className })} {...rest}>
      {children}
    </span>
  );
}
