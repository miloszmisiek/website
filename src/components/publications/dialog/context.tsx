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

type DialogContextValue = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  isDrawer: boolean;
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
  children,
}: {
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

  const ctx = { dialogRef, isOpen, isDrawer, open, close };

  return (
    <PublicationAbstractDialogContext.Provider value={ctx}>
      {children}
    </PublicationAbstractDialogContext.Provider>
  );
}
