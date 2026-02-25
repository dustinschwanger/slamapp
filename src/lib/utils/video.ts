/**
 * Video URL utilities for YouTube and Vimeo embed support.
 * Uses youtube-nocookie.com for privacy on shared nursing home tablets.
 */

const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
const VIMEO_REGEX = /vimeo\.com\/(\d+)/;

/** Extract a YouTube or Vimeo video ID from a URL. */
export function getVideoId(url: string): { provider: "youtube" | "vimeo"; id: string } | null {
  const ytMatch = url.match(YOUTUBE_REGEX);
  if (ytMatch) return { provider: "youtube", id: ytMatch[1] };

  const vimeoMatch = url.match(VIMEO_REGEX);
  if (vimeoMatch) return { provider: "vimeo", id: vimeoMatch[1] };

  return null;
}

/** Convert a YouTube/Vimeo URL to its embeddable form. Returns null for invalid URLs. */
export function getEmbedUrl(url: string): string | null {
  const video = getVideoId(url);
  if (!video) return null;

  if (video.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${video.id}`;
  }
  return `https://player.vimeo.com/video/${video.id}`;
}

/** Check whether a URL is a supported YouTube or Vimeo link. */
export function isValidVideoUrl(url: string): boolean {
  return getVideoId(url) !== null;
}
