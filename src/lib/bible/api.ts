import { getCached, setCache } from "./cache";
import type { BibleBook, BibleChapter, BibleVerse, BibleSearchResult } from "./types";

const DEFAULT_BIBLE_ID = "de4e12af7f28f599-02"; // KJV

/**
 * Fetches from the Bible API proxy route.
 * All requests go through /api/bible/... which adds the API key server-side.
 */
async function apiFetch<T>(path: string): Promise<T> {
  const cacheKey = path;
  const cached = getCached<T>(cacheKey);
  if (cached) return cached;

  const res = await fetch(`/api/bible/${path}`);
  const json = await res.json();

  if (json.error === "not_configured") {
    throw new Error("BIBLE_API_NOT_CONFIGURED");
  }

  if (!res.ok) {
    throw new Error(`Bible API error: ${res.status} ${res.statusText}`);
  }

  const data = json.data as T;
  setCache(cacheKey, data);
  return data;
}

export async function getBooks(bibleId: string = DEFAULT_BIBLE_ID): Promise<BibleBook[]> {
  const raw = await apiFetch<Array<{ id: string; name: string; abbreviation: string }>>(
    `bibles/${bibleId}/books`
  );
  return raw.map(({ id, name, abbreviation }) => ({ id, name, abbreviation }));
}

export async function getChapters(
  bookId: string,
  bibleId: string = DEFAULT_BIBLE_ID
): Promise<Array<{ id: string; number: string; reference: string }>> {
  return apiFetch(`bibles/${bibleId}/books/${bookId}/chapters`);
}

export async function getChapter(
  chapterId: string,
  bibleId: string = DEFAULT_BIBLE_ID
): Promise<BibleChapter> {
  const raw = await apiFetch<{
    id: string;
    number: string;
    bookId: string;
    reference: string;
    content: string;
  }>(`bibles/${bibleId}/chapters/${chapterId}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`);

  return {
    id: raw.id,
    number: raw.number,
    bookId: raw.bookId,
    reference: raw.reference,
    content: raw.content,
  };
}

export async function getVerse(
  verseId: string,
  bibleId: string = DEFAULT_BIBLE_ID
): Promise<BibleVerse> {
  return apiFetch(`bibles/${bibleId}/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`);
}

export async function searchBible(
  query: string,
  bibleId: string = DEFAULT_BIBLE_ID
): Promise<BibleSearchResult> {
  const raw = await apiFetch<{
    query: string;
    verses: BibleVerse[];
    total: number;
  }>(`bibles/${bibleId}/search?query=${encodeURIComponent(query)}`);

  return {
    query: raw.query,
    verses: raw.verses ?? [],
    total: raw.total ?? 0,
  };
}

export { DEFAULT_BIBLE_ID };
