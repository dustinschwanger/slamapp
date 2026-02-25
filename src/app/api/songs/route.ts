import { NextRequest, NextResponse } from "next/server";
import { mockSongs } from "@/lib/data/mock-songs";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search")?.toLowerCase();
  const tag = searchParams.get("tag");

  let songs = mockSongs;

  if (search) {
    songs = songs.filter(
      (s) =>
        s.title.toLowerCase().includes(search) ||
        s.author.toLowerCase().includes(search) ||
        s.composer.toLowerCase().includes(search)
    );
  }

  if (tag && tag !== "all") {
    songs = songs.filter((s) => s.tags.includes(tag));
  }

  return NextResponse.json({ songs });
}
