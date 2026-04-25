import { cn } from "../../../styles/cn";
import type { DotButtonProps, DotNavProps } from "./types";

const DotButton = ({ item, isActive, onSelect }: DotButtonProps) => {
  const selectItem = () => {
    onSelect(item.id);
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-label={`Go to publication: ${item.label}`}
      onClick={selectItem}
      className="min-w-11 min-h-11 flex items-center justify-center cursor-pointer focus-ring rounded-none"
    >
      <span
        className={cn(
          "rounded-none transition-all duration-300 pointer-events-none",
          isActive
            ? "w-6 h-2.5 bg-foreground border border-transparent"
            : "w-2.5 h-2.5 bg-muted/40 border border-border/60 hover:bg-muted/70 hover:border-border",
        )}
      />
    </button>
  );
};

export function DotNav({ items, activeIndex, onSelect }: DotNavProps) {
  return (
    <div
      role="tablist"
      aria-label="Publication navigation"
      className="flex items-center gap-4"
    >
      {items.map((item, idx) => (
        <DotButton
          key={item.id}
          item={item}
          isActive={idx === activeIndex}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
