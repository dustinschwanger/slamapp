import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes HTML allowing formatting tags and Bible API USX attributes.
 * Strips scripts, event handlers, iframes, forms, etc.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "span",
      "a",
      "br",
      "div",
      "blockquote",
      "sup",
      "sub",
    ],
    ALLOWED_ATTR: [
      "class",
      "href",
      "target",
      "rel",
      "data-usfm",
      "data-vid",
      "style",
    ],
  });
}

/**
 * Strips ALL HTML tags, returning plain text.
 * Safe replacement for regex-based stripHtml.
 */
export function stripHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
}
