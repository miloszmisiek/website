import type { RefObject } from "react";
import type { Publication } from "../../../data/schema";

export type PublicationDeckProps = {
  publications: Publication[];
};

export type PublicationDeckCardProps = {
  publication: Publication;
  stackPos: number;
  numCards: number;
  cardRef: RefObject<HTMLDivElement | null> | null;
  onBringToFront: (id: string) => void;
  cardWidth: number;
  stepX: number;
};

export type DeckCardVisualState = {
  isTop: boolean;
  opacity: number;
  visualStyle: React.CSSProperties;
};

export type DeckCardAnimationState = {
  x: number;
  y: number;
  rotate: number;
  rotateY: number;
  scale: number;
  opacity: number;
};
