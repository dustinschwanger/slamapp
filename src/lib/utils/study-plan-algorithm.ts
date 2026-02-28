import type { LessonMeta } from "@/lib/types";

/**
 * Sorts lessons by book order (preserving the input array's book ordering),
 * then by lessonNumber within each book.
 */
function sortByBookThenLesson(items: LessonMeta[], bookOrder: string[]): LessonMeta[] {
  return [...items].sort((a, b) => {
    const bookA = bookOrder.indexOf(a.book);
    const bookB = bookOrder.indexOf(b.book);
    if (bookA !== bookB) return bookA - bookB;
    return a.lessonNumber - b.lessonNumber;
  });
}

/**
 * Suggests lessons for a study plan based on priority scores.
 * Selects the top N by priority, then re-sorts by book order + lesson number.
 */
export function suggestLessons(
  metadata: LessonMeta[],
  weekCount: number
): string[] {
  // Derive book order from the input array (first occurrence wins)
  const bookOrder: string[] = [];
  for (const m of metadata) {
    if (!bookOrder.includes(m.book)) bookOrder.push(m.book);
  }

  if (weekCount >= metadata.length) {
    return sortByBookThenLesson(metadata, bookOrder).map((m) => m.id);
  }

  // Sort by priority desc, then by lessonNumber asc for tiebreaking
  const sorted = [...metadata].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.lessonNumber - b.lessonNumber;
  });

  // Take top N
  const selected = sorted.slice(0, weekCount);

  // Re-sort by book order + lesson number
  return sortByBookThenLesson(selected, bookOrder).map((m) => m.id);
}
