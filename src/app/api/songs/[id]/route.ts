import { NextRequest, NextResponse } from "next/server";
import { mockSongs } from "@/lib/data/mock-songs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const song = mockSongs.find((s) => s.id === id);

  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }

  return NextResponse.json(song);
}
