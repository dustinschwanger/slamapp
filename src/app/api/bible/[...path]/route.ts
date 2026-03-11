import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.scripture.api.bible/v1";

// Server-side cache for Bible API responses (KJV is public domain, safe to cache long)
const serverCache = new Map<string, { data: string; timestamp: number }>();
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const MAX_CACHE_ENTRIES = 500;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const apiKey = process.env.BIBLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "not_configured", message: "Bible reader is currently unavailable" },
      { status: 503 }
    );
  }

  const { path } = await params;
  const pathStr = path.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const fullPath = searchParams ? `${pathStr}?${searchParams}` : pathStr;
  const cacheKey = fullPath;

  // Check server cache
  const cached = serverCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return new NextResponse(cached.data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const url = `${API_BASE}/${fullPath}`;
    const res = await fetch(url, {
      headers: {
        "api-key": apiKey,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `API.Bible responded with ${res.status}` },
        { status: res.status }
      );
    }

    const text = await res.text();

    // Cache the response (evict oldest entry if at capacity)
    if (serverCache.size >= MAX_CACHE_ENTRIES && !serverCache.has(cacheKey)) {
      const oldest = serverCache.keys().next().value;
      if (oldest !== undefined) serverCache.delete(oldest);
    }
    serverCache.set(cacheKey, { data: text, timestamp: Date.now() });

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch from Bible API: ${message}` },
      { status: 502 }
    );
  }
}
