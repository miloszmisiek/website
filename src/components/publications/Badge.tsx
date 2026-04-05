import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const badge = cva(
  "text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-sm border",
  {
    variants: {
      status: {
        published: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        underreview: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        preprint: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      },
    },
    defaultVariants: {
      status: "published",
    },
  },
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {}

export function Badge({ status, className, children, ...rest }: BadgeProps) {
  return (
    <span className={badge({ status, className })} {...rest}>
      {children}
    </span>
  );
}
