const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time in whole minutes from raw Markdown body text.
 * Strips fenced code, inline code, and Markdown syntax noise before counting
 * so prose length drives the estimate. Always returns at least 1.
 */
export function getReadingTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/[#>*_~\-]/g, ' ') // common Markdown punctuation
    .replace(/\$\$[\s\S]*?\$\$/g, ' ') // display math
    .replace(/\$[^$]*\$/g, ' '); // inline math

  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
