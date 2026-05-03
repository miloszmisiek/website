import { type PropsWithChildren } from "react";
import { usePublicationAbstractDialogContext } from "./context";
import { Drawer } from "@hanzo/react-drawer";

export function Panel({ children }: PropsWithChildren) {
  const { dialogRef, isOpen, isDrawer, close, titleId } =
    usePublicationAbstractDialogContext();

  const toggleDrawer = (open: boolean) => {
    if (!open) close();
  };

  const toggleDialog = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  if (isDrawer) {
    return (
      <Drawer.Root open={isOpen} onOpenChange={toggleDrawer}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
          <Drawer.Content
            aria-labelledby={titleId}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-card-bg rounded-none max-h-[90dvh] pb-[env(safe-area-inset-bottom)] outline-none border border-border/50 overflow-hidden touch-auto pointer-events-auto"
          >
            <Drawer.Handle className="mx-auto mt-3 mb-1 flex-shrink-0 relative h-[5px] w-10 rounded-none bg-foreground/20 touch-none" />
            <div className="overflow-y-auto flex-1 min-h-0 flex flex-col">
              {children}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      className="publication-dialog"
      onClick={toggleDialog}
    >
      {children}
    </dialog>
  );
}
