import { MotionConfig } from "framer-motion";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { ProductsParallaxDesktop } from "./Desktop";
import { ProductsMobileList } from "./MobileList";
import { BREAKPOINT_MLG as MOBILE_BREAKPOINT } from "../../../styles/breakpoints";
import type { ProductsListProps } from "./types";

export function ProductsParallax({ products }: ProductsListProps) {
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  return (
    <MotionConfig reducedMotion="user">
      {isMobile ? (
        <ProductsMobileList products={products} />
      ) : (
        <ProductsParallaxDesktop products={products} />
      )}
    </MotionConfig>
  );
}
