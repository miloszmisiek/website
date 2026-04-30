import { Drawer } from "@hanzo/react-drawer";
import { getTranslations } from "../../../i18n";
import { Button } from "../../button/Button";
import { IconClose } from "../../icons/IconClose";
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
      <IconClose />
    </Button>
  );
}
