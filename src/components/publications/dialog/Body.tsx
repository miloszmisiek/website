import { cn } from "../../../styles/cn";
import { usePublicationAbstractDialogContext } from "./context";

export function Body() {
  const {
    isDrawer,
    titleId,
    publication: { title, authors, excerpt },
  } = usePublicationAbstractDialogContext();
  
  const paragraphs = excerpt ? excerpt.split('\n\n').filter(p => p.trim().length > 0) : [];

  return (
    <div
      className={cn(
        "px-5 sm:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6",
        !isDrawer && "flex-1 min-h-0 overflow-y-auto",
      )}
    >
      <div>
        <h3
          id={titleId}
          className="text-heading-md text-2xl md:text-3xl mb-4"
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
            <p key={index} className="text-body text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
