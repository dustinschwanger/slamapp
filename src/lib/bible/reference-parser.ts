export interface ParsedReference {
  bookId: string;
  chapterId: string;
  startVerse?: number;
  endVerse?: number;
  displayReference: string;
}

// Map of lowercase abbreviations/names to API.Bible 3-letter book IDs
const BOOK_MAP: Record<string, { id: string; name: string }> = {
  // Old Testament
  genesis: { id: "GEN", name: "Genesis" },
  gen: { id: "GEN", name: "Genesis" },
  exodus: { id: "EXO", name: "Exodus" },
  ex: { id: "EXO", name: "Exodus" },
  exod: { id: "EXO", name: "Exodus" },
  leviticus: { id: "LEV", name: "Leviticus" },
  lev: { id: "LEV", name: "Leviticus" },
  numbers: { id: "NUM", name: "Numbers" },
  num: { id: "NUM", name: "Numbers" },
  deuteronomy: { id: "DEU", name: "Deuteronomy" },
  deut: { id: "DEU", name: "Deuteronomy" },
  joshua: { id: "JOS", name: "Joshua" },
  josh: { id: "JOS", name: "Joshua" },
  judges: { id: "JDG", name: "Judges" },
  judg: { id: "JDG", name: "Judges" },
  ruth: { id: "RUT", name: "Ruth" },
  "1samuel": { id: "1SA", name: "1 Samuel" },
  "1sam": { id: "1SA", name: "1 Samuel" },
  "1 samuel": { id: "1SA", name: "1 Samuel" },
  "1 sam": { id: "1SA", name: "1 Samuel" },
  "2samuel": { id: "2SA", name: "2 Samuel" },
  "2sam": { id: "2SA", name: "2 Samuel" },
  "2 samuel": { id: "2SA", name: "2 Samuel" },
  "2 sam": { id: "2SA", name: "2 Samuel" },
  "1kings": { id: "1KI", name: "1 Kings" },
  "1kgs": { id: "1KI", name: "1 Kings" },
  "1 kings": { id: "1KI", name: "1 Kings" },
  "1 kgs": { id: "1KI", name: "1 Kings" },
  "2kings": { id: "2KI", name: "2 Kings" },
  "2kgs": { id: "2KI", name: "2 Kings" },
  "2 kings": { id: "2KI", name: "2 Kings" },
  "2 kgs": { id: "2KI", name: "2 Kings" },
  "1chronicles": { id: "1CH", name: "1 Chronicles" },
  "1chr": { id: "1CH", name: "1 Chronicles" },
  "1 chronicles": { id: "1CH", name: "1 Chronicles" },
  "1 chr": { id: "1CH", name: "1 Chronicles" },
  "2chronicles": { id: "2CH", name: "2 Chronicles" },
  "2chr": { id: "2CH", name: "2 Chronicles" },
  "2 chronicles": { id: "2CH", name: "2 Chronicles" },
  "2 chr": { id: "2CH", name: "2 Chronicles" },
  ezra: { id: "EZR", name: "Ezra" },
  nehemiah: { id: "NEH", name: "Nehemiah" },
  neh: { id: "NEH", name: "Nehemiah" },
  esther: { id: "EST", name: "Esther" },
  est: { id: "EST", name: "Esther" },
  job: { id: "JOB", name: "Job" },
  psalms: { id: "PSA", name: "Psalm" },
  psalm: { id: "PSA", name: "Psalm" },
  ps: { id: "PSA", name: "Psalm" },
  psa: { id: "PSA", name: "Psalm" },
  proverbs: { id: "PRO", name: "Proverbs" },
  prov: { id: "PRO", name: "Proverbs" },
  ecclesiastes: { id: "ECC", name: "Ecclesiastes" },
  eccl: { id: "ECC", name: "Ecclesiastes" },
  "song of solomon": { id: "SNG", name: "Song of Solomon" },
  song: { id: "SNG", name: "Song of Solomon" },
  isaiah: { id: "ISA", name: "Isaiah" },
  isa: { id: "ISA", name: "Isaiah" },
  jeremiah: { id: "JER", name: "Jeremiah" },
  jer: { id: "JER", name: "Jeremiah" },
  lamentations: { id: "LAM", name: "Lamentations" },
  lam: { id: "LAM", name: "Lamentations" },
  ezekiel: { id: "EZK", name: "Ezekiel" },
  ezek: { id: "EZK", name: "Ezekiel" },
  daniel: { id: "DAN", name: "Daniel" },
  dan: { id: "DAN", name: "Daniel" },
  hosea: { id: "HOS", name: "Hosea" },
  hos: { id: "HOS", name: "Hosea" },
  joel: { id: "JOL", name: "Joel" },
  amos: { id: "AMO", name: "Amos" },
  obadiah: { id: "OBA", name: "Obadiah" },
  obad: { id: "OBA", name: "Obadiah" },
  jonah: { id: "JON", name: "Jonah" },
  micah: { id: "MIC", name: "Micah" },
  mic: { id: "MIC", name: "Micah" },
  nahum: { id: "NAM", name: "Nahum" },
  nah: { id: "NAM", name: "Nahum" },
  habakkuk: { id: "HAB", name: "Habakkuk" },
  hab: { id: "HAB", name: "Habakkuk" },
  zephaniah: { id: "ZEP", name: "Zephaniah" },
  zeph: { id: "ZEP", name: "Zephaniah" },
  haggai: { id: "HAG", name: "Haggai" },
  hag: { id: "HAG", name: "Haggai" },
  zechariah: { id: "ZEC", name: "Zechariah" },
  zech: { id: "ZEC", name: "Zechariah" },
  malachi: { id: "MAL", name: "Malachi" },
  mal: { id: "MAL", name: "Malachi" },

  // New Testament
  matthew: { id: "MAT", name: "Matthew" },
  matt: { id: "MAT", name: "Matthew" },
  mt: { id: "MAT", name: "Matthew" },
  mark: { id: "MRK", name: "Mark" },
  mk: { id: "MRK", name: "Mark" },
  luke: { id: "LUK", name: "Luke" },
  lk: { id: "LUK", name: "Luke" },
  john: { id: "JHN", name: "John" },
  jn: { id: "JHN", name: "John" },
  acts: { id: "ACT", name: "Acts" },
  romans: { id: "ROM", name: "Romans" },
  rom: { id: "ROM", name: "Romans" },
  "1corinthians": { id: "1CO", name: "1 Corinthians" },
  "1cor": { id: "1CO", name: "1 Corinthians" },
  "1 corinthians": { id: "1CO", name: "1 Corinthians" },
  "1 cor": { id: "1CO", name: "1 Corinthians" },
  "2corinthians": { id: "2CO", name: "2 Corinthians" },
  "2cor": { id: "2CO", name: "2 Corinthians" },
  "2 corinthians": { id: "2CO", name: "2 Corinthians" },
  "2 cor": { id: "2CO", name: "2 Corinthians" },
  galatians: { id: "GAL", name: "Galatians" },
  gal: { id: "GAL", name: "Galatians" },
  ephesians: { id: "EPH", name: "Ephesians" },
  eph: { id: "EPH", name: "Ephesians" },
  philippians: { id: "PHP", name: "Philippians" },
  phil: { id: "PHP", name: "Philippians" },
  colossians: { id: "COL", name: "Colossians" },
  col: { id: "COL", name: "Colossians" },
  "1thessalonians": { id: "1TH", name: "1 Thessalonians" },
  "1thess": { id: "1TH", name: "1 Thessalonians" },
  "1 thessalonians": { id: "1TH", name: "1 Thessalonians" },
  "1 thess": { id: "1TH", name: "1 Thessalonians" },
  "2thessalonians": { id: "2TH", name: "2 Thessalonians" },
  "2thess": { id: "2TH", name: "2 Thessalonians" },
  "2 thessalonians": { id: "2TH", name: "2 Thessalonians" },
  "2 thess": { id: "2TH", name: "2 Thessalonians" },
  "1timothy": { id: "1TI", name: "1 Timothy" },
  "1tim": { id: "1TI", name: "1 Timothy" },
  "1 timothy": { id: "1TI", name: "1 Timothy" },
  "1 tim": { id: "1TI", name: "1 Timothy" },
  "2timothy": { id: "2TI", name: "2 Timothy" },
  "2tim": { id: "2TI", name: "2 Timothy" },
  "2 timothy": { id: "2TI", name: "2 Timothy" },
  "2 tim": { id: "2TI", name: "2 Timothy" },
  titus: { id: "TIT", name: "Titus" },
  philemon: { id: "PHM", name: "Philemon" },
  philem: { id: "PHM", name: "Philemon" },
  hebrews: { id: "HEB", name: "Hebrews" },
  heb: { id: "HEB", name: "Hebrews" },
  james: { id: "JAS", name: "James" },
  jas: { id: "JAS", name: "James" },
  "1peter": { id: "1PE", name: "1 Peter" },
  "1pet": { id: "1PE", name: "1 Peter" },
  "1 peter": { id: "1PE", name: "1 Peter" },
  "1 pet": { id: "1PE", name: "1 Peter" },
  "2peter": { id: "2PE", name: "2 Peter" },
  "2pet": { id: "2PE", name: "2 Peter" },
  "2 peter": { id: "2PE", name: "2 Peter" },
  "2 pet": { id: "2PE", name: "2 Peter" },
  "1john": { id: "1JN", name: "1 John" },
  "1jn": { id: "1JN", name: "1 John" },
  "1 john": { id: "1JN", name: "1 John" },
  "1 jn": { id: "1JN", name: "1 John" },
  "2john": { id: "2JN", name: "2 John" },
  "2jn": { id: "2JN", name: "2 John" },
  "2 john": { id: "2JN", name: "2 John" },
  "2 jn": { id: "2JN", name: "2 John" },
  "3john": { id: "3JN", name: "3 John" },
  "3jn": { id: "3JN", name: "3 John" },
  "3 john": { id: "3JN", name: "3 John" },
  "3 jn": { id: "3JN", name: "3 John" },
  jude: { id: "JUD", name: "Jude" },
  revelation: { id: "REV", name: "Revelation" },
  rev: { id: "REV", name: "Revelation" },
};

/**
 * Parse a human-readable Bible reference into API.Bible IDs.
 *
 * Supports: "John 3:16", "John 3:16-21", "Psalm 23", "1 Corinthians 13:4-8", "Genesis 1"
 */
export function parseReference(input: string): ParsedReference | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Pattern: optional number prefix + book name + chapter + optional :verse(-verse)
  // e.g. "1 Corinthians 13:4-8", "John 3:16", "Psalm 23", "Genesis 1"
  const match = trimmed.match(
    /^(\d?\s*[A-Za-z\s]+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/
  );

  if (!match) return null;

  const bookInput = match[1].trim().toLowerCase();
  const chapter = parseInt(match[2], 10);
  const startVerse = match[3] ? parseInt(match[3], 10) : undefined;
  const endVerse = match[4] ? parseInt(match[4], 10) : undefined;

  const book = BOOK_MAP[bookInput];
  if (!book) return null;

  const bookId = book.id;
  const chapterId = `${bookId}.${chapter}`;

  let displayReference = `${book.name} ${chapter}`;
  if (startVerse !== undefined) {
    displayReference += `:${startVerse}`;
    if (endVerse !== undefined) {
      displayReference += `-${endVerse}`;
    }
  }

  return {
    bookId,
    chapterId,
    startVerse,
    endVerse,
    displayReference,
  };
}

/**
 * Estimate how long it takes to read a verse range aloud.
 * ~30 seconds per verse, minimum 30s, default 60s if no verses specified.
 */
export function estimateVerseDuration(
  startVerse?: number,
  endVerse?: number
): number {
  if (startVerse === undefined) return 60;
  if (endVerse === undefined) return 30;
  const count = Math.max(1, endVerse - startVerse + 1);
  return Math.max(30, count * 30);
}
