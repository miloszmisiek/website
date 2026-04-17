import { getTranslations } from "../../../i18n";
import { Button } from "../../button/Button";
import { usePublicationAbstractDialogContext } from "./context";

export function Trigger() {
  const { open } = usePublicationAbstractDialogContext();
  const t = getTranslations();

  const triggerOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="min-h-0"
      onClick={triggerOpen}
    >
      {t("publication.more")}
    </Button>
  );
}
