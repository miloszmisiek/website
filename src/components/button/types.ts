import { type ButtonVariantProps } from "./button-variants";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type BaseProps = ButtonVariantProps &
  Partial<{
    className: string;
    children: React.ReactNode;
  }>;
export type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
export type AsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export type ButtonProps = AsButton | AsAnchor;
