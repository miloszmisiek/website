import { cn } from "../../styles/cn";
import { buttonVariants } from "./button-variants";
import type { ButtonProps } from "./types";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
} from "react";

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = "disabled" in rest && rest.disabled;
  const isLink = "href" in rest && rest.href !== undefined;
  const classes = cn(
    buttonVariants({ variant, size }),
    isDisabled && "opacity-50 cursor-not-allowed",
    className,
  );

  if (isLink) {
    return (
      <a
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

Button.Icon = function ButtonIcon({
  children,
  className,
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span className={cn("flex-shrink-0 flex items-center", className)}>
      {children}
    </span>
  );
};
