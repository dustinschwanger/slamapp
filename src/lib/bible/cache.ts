interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// 30-day TTL for KJV (public domain, content never changes)
const DEFAULT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const cache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string, ttlMs: number = DEFAULT_TTL_MS): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const age = Date.now() - entry.timestamp;
  if (age > ttlMs) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

export function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export function clearCache(): void {
  cache.clear();
}
