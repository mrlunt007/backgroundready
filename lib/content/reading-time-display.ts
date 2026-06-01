import readingTime from "reading-time";

/** Display a slightly shorter read time so long estimates feel less intimidating. */
export function formatReadingTime(minutes: number): string {
  const adjusted = Math.max(1, Math.round(minutes * 0.75));
  return `${adjusted} min read`;
}

export function readingTimeFromText(content: string): string {
  const stats = readingTime(content);
  return formatReadingTime(Math.ceil(stats.minutes));
}
