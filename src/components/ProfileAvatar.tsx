import { useCallback, useEffect, useRef, useState } from "react";

export function ProfileAvatar() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) close();
    },
    [close],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = () => setIsOpen(false);
    dialog.addEventListener("close", handleCancel);
    return () => dialog.removeEventListener("close", handleCancel);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="View profile photo"
        className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
      >
        <img
          src="/profile.webp"
          alt="Milosz Misiek"
          width={32}
          height={32}
          loading="lazy"
          decoding="async"
          className="rounded-full object-cover w-8 h-8 grayscale contrast-110 hover:grayscale-0 hover:contrast-100 transition-[filter] duration-500 ring-1 ring-muted/30 hover:ring-muted/60 cursor-pointer"
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Profile photo"
        aria-modal="true"
        className="profile-dialog"
        onClick={handleBackdropClick}
      >
        {isOpen && (
          <img
            src="/profile.webp"
            alt="Milosz Misiek"
            className="block rounded-sm object-contain max-w-[90vw] max-h-[85dvh]"
          />
        )}
      </dialog>
    </>
  );
}
