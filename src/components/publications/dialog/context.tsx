// GOOD
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { Publication } from "../../../data/schema";

type DialogContextValue = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  isDrawer: boolean;
  publication: Publication;
  open: () => void;
  close: () => void;
};

const PublicationAbstractDialogContext =
  createContext<DialogContextValue | null>(null);

export function usePublicationAbstractDialogContext(): DialogContextValue {
  const ctx = useContext(PublicationAbstractDialogContext);
  if (!ctx)
    throw new Error("Must be used inside <PublicationAbstractDialogProvider>");
  return ctx;
}

export function PublicationAbstractDialog({
  publication,
  children,
}: {
  publication: Publication;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false); // false = SSR-safe default

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    setIsDrawer(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDrawer(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const open = useCallback(
    () => (isDrawer ? setIsOpen(true) : dialogRef.current?.showModal()),
    [isDrawer],
  );

  const close = useCallback(
    () => (isDrawer ? setIsOpen(false) : dialogRef.current?.close()),
    [isDrawer],
  );

  const ctx = useMemo(
    () => ({ dialogRef, isOpen, isDrawer, publication, open, close }),
    [isOpen, isDrawer, publication, open, close],
  );

  return (
    <PublicationAbstractDialogContext.Provider value={ctx}>
      {children}
    </PublicationAbstractDialogContext.Provider>
  );
}
