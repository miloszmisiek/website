// GOOD
import { useState, useEffect } from "react";

export function useIsMobile(breakpoint: number): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(check, 150);
    };
    window.addEventListener("resize", debouncedCheck);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedCheck);
    };
  }, [breakpoint]);

  return isMobile;
}
