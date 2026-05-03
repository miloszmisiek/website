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
  titleId: string;
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
  const [isDrawer, setIsDrawer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    setIsDrawer(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDrawer(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const unlockScroll = () => {
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || isDrawer) return;
    dialog.addEventListener("close", unlockScroll);
    return () => dialog.removeEventListener("close", unlockScroll);
  }, [isDrawer]);

  const openDrawer = () => setIsOpen(true);
  const openDialog = () => {
    const scrollY = window.scrollY;
    dialogRef.current?.showModal();
    window.scrollTo(0, scrollY);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => setIsOpen(false);
  const closeDialog = () => {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  };

  const open = useCallback(
    () => (isDrawer ? openDrawer() : openDialog()),
    [isDrawer],
  );

  const close = useCallback(
    () => (isDrawer ? closeDrawer() : closeDialog()),
    [isDrawer],
  );

  const titleId = `pub-dialog-title-${publication.id}`;

  const ctx = useMemo(
    () => ({ dialogRef, isOpen, isDrawer, publication, titleId, open, close }),
    [isOpen, isDrawer, publication, titleId, open, close],
  );

  return (
    <PublicationAbstractDialogContext.Provider value={ctx}>
      {children}
    </PublicationAbstractDialogContext.Provider>
  );
}
