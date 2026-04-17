import { cn } from "../../../styles/cn";
import { usePublicationAbstractDialogContext } from "./context";

type BodyProps = {
  title: string;
  authors: string[];
  excerpt?: string;
};

export function Body({ title, authors, excerpt }: BodyProps) {
  const { isDrawer } = usePublicationAbstractDialogContext();
  return (
    <div
      className={cn(
        "px-6 sm:px-8 py-8 space-y-6",
        !isDrawer && "max-h-[70vh] overflow-y-auto",
      )}
    >
      <div>
        <h3
          id="pub-dialog-title"
          className="text-heading-md mb-4 text-foreground"
        >
          {title}
        </h3>
        {authors.length > 0 && (
          <p className="font-mono text-xs uppercase tracking-widest flex flex-wrap items-center gap-2">
            <span className="text-foreground/40">{"{ author(s): "}</span>
            <span className="text-foreground/80 tracking-wide">
              {authors.join(", ")}
            </span>
            <span className="text-foreground/40">{" }"}</span>
          </p>
        )}
      </div>
      {excerpt && (
        <p className="text-body text-muted/80 pl-4 border-l-2 border-border/70 leading-relaxed">
          {excerpt}
        </p>
      )}
    </div>
  );
}
