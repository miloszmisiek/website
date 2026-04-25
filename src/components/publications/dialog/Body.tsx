import { cn } from "../../../styles/cn";
import { usePublicationAbstractDialogContext } from "./context";

export function Body() {
  const {
    isDrawer,
    publication: { title, authors, excerpt },
  } = usePublicationAbstractDialogContext();
  
  const paragraphs = excerpt ? excerpt.split('\n\n').filter(p => p.trim().length > 0) : [];

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
          <p className="text-mono-meta flex flex-wrap items-center gap-2">
            <span className="text-foreground/40">{"{ author(s): "}</span>
            <span className="text-foreground/80 tracking-wide">
              {authors.join(", ")}
            </span>
            <span className="text-foreground/40">{" }"}</span>
          </p>
        )}
      </div>
      {paragraphs.length > 0 && (
        <div className="space-y-4 pl-4 border-l-2 border-border/70">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-body text-muted/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
