"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, BookOpen, Loader2, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { getBooks, getChapters, getChapter } from "@/lib/bible/api";
import type { BibleBook, BibleChapter } from "@/lib/bible/types";

interface BibleReaderProps {
  defaultBookId?: string;
  defaultChapterId?: string;
  onProjectRequest?: (chapter: BibleChapter) => void;
}

export function BibleReader({
  defaultBookId = "GEN",
  defaultChapterId = "GEN.1",
  onProjectRequest,
}: BibleReaderProps) {
  const [books, setBooks] = React.useState<BibleBook[]>([]);
  const [chapters, setChapters] = React.useState<
    Array<{ id: string; number: string; reference: string }>
  >([]);
  const [currentChapter, setCurrentChapter] = React.useState<BibleChapter | null>(null);
  const [selectedBookId, setSelectedBookId] = React.useState(defaultBookId);
  const [selectedChapterId, setSelectedChapterId] = React.useState(defaultChapterId);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [apiNotConfigured, setApiNotConfigured] = React.useState(false);
  const [showChapterGrid, setShowChapterGrid] = React.useState(false);

  const contentRef = React.useRef<HTMLDivElement>(null);

  // Load books on mount
  React.useEffect(() => {
    let cancelled = false;
    async function loadBooks() {
      try {
        const data = await getBooks();
        if (!cancelled) setBooks(data);
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error && err.message.includes("BIBLE_API_NOT_CONFIGURED")) {
            setApiNotConfigured(true);
          } else {
            setError("Failed to load Bible books. Please try again.");
          }
        }
        console.error(err);
      }
    }
    loadBooks();
    return () => { cancelled = true; };
  }, []);

  // Load chapters when book changes
  React.useEffect(() => {
    if (!selectedBookId) return;
    let cancelled = false;
    async function loadChapters() {
      try {
        const data = await getChapters(selectedBookId);
        // Filter out the "intro" chapter if present
        const filtered = data.filter((c) => c.number !== "intro");
        if (!cancelled) setChapters(filtered);
      } catch (err) {
        if (!cancelled && err instanceof Error && err.message.includes("BIBLE_API_NOT_CONFIGURED")) {
          setApiNotConfigured(true);
        }
        console.error(err);
      }
    }
    loadChapters();
    return () => { cancelled = true; };
  }, [selectedBookId]);

  // Load chapter content
  React.useEffect(() => {
    if (!selectedChapterId) return;
    let cancelled = false;
    async function loadChapter() {
      setLoading(true);
      setError(null);
      try {
        const data = await getChapter(selectedChapterId);
        if (!cancelled) {
          setCurrentChapter(data);
          setShowChapterGrid(false);
          // Scroll to top of content
          contentRef.current?.scrollTo(0, 0);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error && err.message.includes("BIBLE_API_NOT_CONFIGURED")) {
            setApiNotConfigured(true);
          } else {
            setError("Failed to load chapter. Please try again.");
          }
        }
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadChapter();
    return () => { cancelled = true; };
  }, [selectedChapterId]);

  function navigateChapter(direction: "prev" | "next") {
    const currentIndex = chapters.findIndex((c) => c.id === selectedChapterId);
    if (direction === "prev" && currentIndex > 0) {
      setSelectedChapterId(chapters[currentIndex - 1].id);
    } else if (direction === "next" && currentIndex < chapters.length - 1) {
      setSelectedChapterId(chapters[currentIndex + 1].id);
    } else if (direction === "next" && currentIndex === chapters.length - 1) {
      // Move to next book
      const bookIndex = books.findIndex((b) => b.id === selectedBookId);
      if (bookIndex < books.length - 1) {
        const nextBook = books[bookIndex + 1];
        setSelectedBookId(nextBook.id);
        setSelectedChapterId(`${nextBook.id}.1`);
      }
    } else if (direction === "prev" && currentIndex === 0) {
      // Move to previous book's last chapter
      const bookIndex = books.findIndex((b) => b.id === selectedBookId);
      if (bookIndex > 0) {
        const prevBook = books[bookIndex - 1];
        setSelectedBookId(prevBook.id);
        // We'll set the chapter to the last one after chapters load
        // For now set a placeholder, the effect will handle it
        setSelectedChapterId(`${prevBook.id}.LAST`);
      }
    }
  }

  // Handle navigating to last chapter of previous book
  React.useEffect(() => {
    if (selectedChapterId.endsWith(".LAST") && chapters.length > 0) {
      const lastChapter = chapters[chapters.length - 1];
      if (lastChapter) {
        setSelectedChapterId(lastChapter.id);
      }
    }
  }, [selectedChapterId, chapters]);

  function handleBookChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const bookId = e.target.value;
    setSelectedBookId(bookId);
    setSelectedChapterId(`${bookId}.1`);
    setShowChapterGrid(true);
  }

  const currentChapterIndex = chapters.findIndex((c) => c.id === selectedChapterId);
  const hasPrev = currentChapterIndex > 0 || books.findIndex((b) => b.id === selectedBookId) > 0;
  const hasNext =
    currentChapterIndex < chapters.length - 1 ||
    books.findIndex((b) => b.id === selectedBookId) < books.length - 1;

  return (
    <div className="flex flex-col h-full">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border bg-bg-card rounded-t-[var(--radius-lg)]">
        <BookOpen className="h-5 w-5 text-primary shrink-0" />

        {/* Book selector */}
        <select
          value={selectedBookId}
          onChange={handleBookChange}
          className="h-12 min-w-[180px] rounded-[var(--radius-md)] border-2 border-border bg-bg-card px-3 text-base text-text-primary cursor-pointer"
          aria-label="Select Bible book"
        >
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>

        {/* Chapter toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowChapterGrid((s) => !s)}
          aria-label="Toggle chapter selector"
        >
          Ch. {currentChapter?.number || "..."}
        </Button>

        <div className="flex-1" />

        {/* Project button */}
        {onProjectRequest && currentChapter && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onProjectRequest(currentChapter)}
            className="gap-2"
          >
            <Monitor className="h-4 w-4" />
            Project
          </Button>
        )}
      </div>

      {/* Chapter grid */}
      {showChapterGrid && (
        <div className="p-4 border-b border-border bg-bg-secondary">
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={cn(
                  "h-10 w-10 rounded-[var(--radius-sm)] text-sm font-medium transition-colors cursor-pointer",
                  ch.id === selectedChapterId
                    ? "bg-primary text-primary-foreground"
                    : "bg-bg-card border border-border text-text-primary hover:bg-bg-secondary"
                )}
                aria-label={`Chapter ${ch.number}`}
              >
                {ch.number}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chapter content */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-4 py-6 md:px-8 bg-bg-card"
      >
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {apiNotConfigured && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="max-w-md w-full bg-bg-secondary border border-border rounded-[var(--radius-lg)] p-8 text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">Bible API Not Configured</h3>
              <p className="text-text-secondary mb-6">
                To use the Bible reader, you need to configure your Bible API key.
              </p>
              <ol className="text-left text-text-secondary space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="font-bold text-primary shrink-0">1.</span>
                  <span>Get a free API key from <strong className="text-text-primary">api.scripture.api.bible</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary shrink-0">2.</span>
                  <span>Add <code className="bg-bg-card px-1.5 py-0.5 rounded text-text-primary text-xs">BIBLE_API_KEY=your_key</code> to your <strong className="text-text-primary">.env.local</strong> file</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary shrink-0">3.</span>
                  <span>Restart the development server</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {error && !apiNotConfigured && (
          <div className="text-center py-12">
            <p className="text-error text-lg mb-4">{error}</p>
            <Button
              variant="outline"
              onClick={() => setSelectedChapterId(selectedChapterId)}
            >
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && currentChapter && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              {currentChapter.reference}
            </h2>
            <div
              className="font-reading leading-relaxed text-lg text-text-primary bible-content"
              dangerouslySetInnerHTML={{ __html: currentChapter.content }}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-bg-card rounded-b-[var(--radius-lg)]">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigateChapter("prev")}
          disabled={!hasPrev}
          className="min-h-[48px] gap-2"
          aria-label="Previous chapter"
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </Button>

        <span className="text-sm text-text-tertiary">
          {currentChapter?.reference}
        </span>

        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigateChapter("next")}
          disabled={!hasNext}
          className="min-h-[48px] gap-2"
          aria-label="Next chapter"
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
