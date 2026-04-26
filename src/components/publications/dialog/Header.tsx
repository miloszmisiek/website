import { Drawer } from "@hanzo/react-drawer";
import { getTranslations } from "../../../i18n";
import { Button } from "../../button/Button";
import { usePublicationAbstractDialogContext } from "./context";

export function Header() {
  const { isDrawer } = usePublicationAbstractDialogContext();
  const t = getTranslations();

  return (
    <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-border/70 flex-shrink-0">
      <span className="section-num">{t("publication.abstract")}</span>
      {isDrawer ? (
        <Drawer.Close asChild>
          <CloseButton />
        </Drawer.Close>
      ) : (
        <CloseButton />
      )}
    </div>
  );
}

function CloseButton() {
  const { close } = usePublicationAbstractDialogContext();

  return (
    <Button
      type="button"
      variant="secondary"
      size="compact"
      aria-label="Close"
      className="text-muted hover:text-foreground"
      onClick={close}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </Button>
  );
}
