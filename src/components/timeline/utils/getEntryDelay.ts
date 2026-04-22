const STAGGER_STEP = 0.05;

export function getEntryDelay(
  index: number,
  isExpanded: boolean,
  maxTech: number,
) {
  const isNewlyRevealed = isExpanded && index >= maxTech;
  return isNewlyRevealed ? (index - maxTech) * STAGGER_STEP : 0;
}
