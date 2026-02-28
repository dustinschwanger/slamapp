import { NextRequest, NextResponse } from "next/server";
import type { LessonMeta } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      metadata,
      weekCount,
      customPrompt,
    }: {
      metadata: LessonMeta[];
      weekCount: number;
      customPrompt?: string;
    } = body;

    if (!metadata || !weekCount) {
      return NextResponse.json(
        { error: "metadata and weekCount are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI suggestions not configured" },
        { status: 503 }
      );
    }

    const metadataSummary = metadata
      .map(
        (m) =>
          `ID:${m.id} | Lesson ${m.lessonNumber} | Priority:${m.priority} | Themes:[${m.themes.join(", ")}] | ${m.summary}`
      )
      .join("\n");

    const userInstruction = customPrompt
      ? `\n\nThe user has a specific request: "${customPrompt}". Honor this request when selecting and ordering lessons, while still maintaining good chronological flow.`
      : "";

    const systemPrompt = `You are a Bible study plan builder for a senior living ministry. You help create multi-week study plans by selecting lessons from a catalog.

Rules:
- Select exactly ${weekCount} lessons from the available catalog below
- Use priority scores (1-10, where 10 = essential) as a baseline for selection
- Ensure selected lessons maintain chronological order through the book
- Balance themes - avoid selecting too many lessons on the same theme consecutively
- Higher priority lessons should be strongly preferred unless the user's request suggests otherwise
- Return valid JSON only, no other text

Available lessons:
${metadataSummary}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Select ${weekCount} lessons for a study plan.${userInstruction}\n\nRespond with JSON only: { "lessonIds": ["id1", "id2", ...], "reasoning": "Brief explanation of your selection" }`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", errorText);
      return NextResponse.json(
        { error: "AI suggestion failed" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 502 }
      );
    }

    // Parse the JSON from the response (handle markdown code blocks)
    let parsed;
    try {
      const jsonStr = content.replace(/```json?\s*\n?/g, "").replace(/```\s*$/g, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", content);
      return NextResponse.json(
        { error: "Could not parse AI response" },
        { status: 502 }
      );
    }

    // Validate that all returned IDs exist in the metadata
    const validIds = new Set(metadata.map((m) => m.id));
    const lessonIds = (parsed.lessonIds as string[]).filter((id) =>
      validIds.has(id)
    );

    return NextResponse.json({
      lessonIds,
      reasoning: parsed.reasoning || "",
    });
  } catch (error) {
    console.error("Study plan suggest error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
