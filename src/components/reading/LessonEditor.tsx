"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Loader2,
  BookOpen,
  Monitor,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { BLOCK_TYPE_LABELS } from "@/lib/constants/lessons";
import { getEmbedUrl, isValidVideoUrl } from "@/lib/utils/video";
import { toast } from "sonner";
import type { LessonBlock, LessonBlockType } from "@/lib/types";

interface LessonEditorProps {
  lessonId: string;
}

interface LessonFormData {
  title: string;
  subtitle: string;
  scriptureReference: string;
  scriptureVersion: string;
  blocks: LessonBlock[];
  discussionQuestions: string[];
  notes: string;
  scheduledDate: string;
}

const BLOCK_TYPES: LessonBlockType[] = [
  "opening_prayer",
  "context",
  "scripture_reading",
  "teaching",
  "video",
  "discussion",
  "application",
  "closing_prayer",
];

export function LessonEditor({ lessonId }: LessonEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [formData, setFormData] = React.useState<LessonFormData>({
    title: "",
    subtitle: "",
    scriptureReference: "",
    scriptureVersion: "KJV",
    blocks: [],
    discussionQuestions: [],
    notes: "",
    scheduledDate: "",
  });

  React.useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await fetch(`/api/lessons/${lessonId}`);
        if (!res.ok) {
          toast.error("Failed to load lesson");
          return;
        }
        const data = await res.json();
        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          scriptureReference: data.scripture?.primary || "",
          scriptureVersion: "KJV",
          blocks: data.blocks || [],
          discussionQuestions: data.discussionQuestions || [],
          notes: data.notes || "",
          scheduledDate: data.scheduledDate || "",
        });
      } catch {
        toast.error("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [lessonId]);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.scriptureReference.trim()) {
      toast.error("Scripture reference is required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/lessons/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          subtitle: formData.subtitle,
          scriptureReference: formData.scriptureReference,
          scriptureVersion: formData.scriptureVersion,
          blocks: formData.blocks,
          discussionQuestions: [],
          notes: formData.notes,
          scheduledDate: formData.scheduledDate || null,
        }),
      });

      if (res.ok) {
        toast.success("Lesson saved");
        router.push(`/reading/lessons?tab=my-lessons&id=${lessonId}`);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save lesson");
      }
    } catch {
      toast.error("Failed to save lesson");
    } finally {
      setSaving(false);
    }
  };

  const addBlock = (type: LessonBlockType) => {
    setFormData((prev) => ({
      ...prev,
      blocks: [
        ...prev.blocks,
        {
          type,
          content: "",
          projectable: type !== "video",
          ...(type === "scripture_reading"
            ? { reference: "", version: "KJV" }
            : {}),
          ...(type === "video" ? { videoUrl: "" } : {}),
        },
      ],
    }));
  };

  const updateBlock = (index: number, updates: Partial<LessonBlock>) => {
    setFormData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b, i) =>
        i === index ? { ...b, ...updates } : b
      ),
    }));
  };

  const removeBlock = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index),
    }));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.blocks.length) return;
    setFormData((prev) => {
      const blocks = [...prev.blocks];
      [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
      return { ...prev, blocks };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/reading/lessons?tab=my-lessons"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover min-h-[48px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Lessons
        </Link>
        <Button
          variant="default"
          onClick={handleSave}
          disabled={saving}
          className="gap-2"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Lesson
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2D5A8E18]">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Edit Lesson</h2>
      </div>

      {/* Basic Info */}
      <Card className="mb-6">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Lesson title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Subtitle
            </label>
            <Input
              value={formData.subtitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
              }
              placeholder="Optional subtitle"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Scripture Reference *
              </label>
              <Input
                value={formData.scriptureReference}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    scriptureReference: e.target.value,
                  }))
                }
                placeholder="e.g., John 3:16-21"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Scheduled Date
              </label>
              <Input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    scheduledDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blocks */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">
          Content Blocks
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {BLOCK_TYPES.map((type) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              onClick={() => addBlock(type)}
              className="gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              {BLOCK_TYPE_LABELS[type]}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {formData.blocks.map((block, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-0.5 pt-1">
                    <button
                      onClick={() => moveBlock(index, "up")}
                      disabled={index === 0}
                      className="p-1 text-text-tertiary hover:text-text-primary disabled:opacity-30"
                      aria-label="Move block up"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => moveBlock(index, "down")}
                      disabled={index === formData.blocks.length - 1}
                      className="p-1 text-text-tertiary hover:text-text-primary disabled:opacity-30"
                      aria-label="Move block down"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <select
                        value={block.type}
                        onChange={(e) =>
                          updateBlock(index, {
                            type: e.target.value as LessonBlockType,
                          })
                        }
                        className="h-10 rounded-[var(--radius-md)] border border-border bg-bg-card px-3 text-sm text-text-primary"
                      >
                        {BLOCK_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {BLOCK_TYPE_LABELS[type]}
                          </option>
                        ))}
                      </select>
                      <Badge
                        variant={block.projectable ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() =>
                          updateBlock(index, {
                            projectable: !block.projectable,
                          })
                        }
                      >
                        <Monitor className="h-3 w-3 mr-1" />
                        {block.projectable ? "Projectable" : "Not Projectable"}
                      </Badge>
                      <div className="flex-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBlock(index)}
                        className="text-text-tertiary hover:text-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {block.type === "scripture_reading" && (
                      <Input
                        value={block.reference || ""}
                        onChange={(e) =>
                          updateBlock(index, { reference: e.target.value })
                        }
                        placeholder="Scripture reference (e.g., John 3:16-21)"
                      />
                    )}
                    {block.type === "video" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-text-tertiary shrink-0" />
                          <Input
                            value={block.videoUrl || ""}
                            onChange={(e) =>
                              updateBlock(index, { videoUrl: e.target.value })
                            }
                            placeholder="YouTube or Vimeo URL"
                          />
                        </div>
                        {block.videoUrl && isValidVideoUrl(block.videoUrl) && (
                          <div className="rounded-[var(--radius-md)] overflow-hidden border border-border aspect-video">
                            <iframe
                              src={getEmbedUrl(block.videoUrl) || ""}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Video preview"
                            />
                          </div>
                        )}
                        {block.videoUrl && !isValidVideoUrl(block.videoUrl) && block.videoUrl.trim() !== "" && (
                          <p className="text-sm text-error">
                            Please enter a valid YouTube or Vimeo URL
                          </p>
                        )}
                      </div>
                    )}
                    <RichTextEditor
                      content={block.content}
                      onChange={(html) =>
                        updateBlock(index, { content: html })
                      }
                      placeholder="Block content..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      {/* Notes */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <label className="block text-sm font-medium text-text-primary mb-1">
            Notes (private, not projected)
          </label>
          <Textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
            placeholder="Private notes for this lesson..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Save button bottom */}
      <div className="flex justify-end pb-8">
        <Button
          variant="default"
          onClick={handleSave}
          disabled={saving}
          className="gap-2"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Lesson
        </Button>
      </div>
    </div>
  );
}
