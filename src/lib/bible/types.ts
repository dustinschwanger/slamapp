export interface BibleBook {
  id: string;
  name: string;
  abbreviation: string;
}

export interface BibleChapter {
  id: string;
  number: string;
  bookId: string;
  reference: string;
  content: string; // HTML content from API
}

export interface BibleVerse {
  id: string;
  orgId: string;
  bookId: string;
  chapterId: string;
  reference: string;
  content: string;
}

export interface BibleSearchResult {
  query: string;
  verses: BibleVerse[];
  total: number;
}
