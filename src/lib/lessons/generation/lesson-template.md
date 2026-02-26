# SLAM Lesson Template

## Overview

This template defines the structure for all Bible lessons in the SLAM (Senior Living Alliance Ministry) app. Every lesson follows this block structure and is stored as a TypeScript object conforming to the `LessonContent` interface.

## Target Audience

- Nursing home residents aged 70-95+
- Varying levels of cognitive ability, vision, and hearing
- Lifelong Christians with deep familiarity with hymns and Scripture
- Content is projected onto screens in nursing home rooms
- Lessons are ~20-30 minutes total

## Lesson Data Structure

Each lesson exports as a TypeScript object with these fields:

```typescript
{
  id: string,              // Unique identifier (e.g., "matthew-1", "john-5")
  version: 1,
  title: string,           // Lesson title (e.g., "The King Has Come")
  subtitle: string,        // Descriptive subtitle
  date: string,            // ISO date (e.g., "2026-09-05")
  scheduledDate: string,   // Same as date
  isPublished: true,
  author: "Ministry Team",
  scripture: {
    primary: string,       // Main passage (e.g., "Matthew 1:18-2:12")
    additional?: string[], // Optional cross-references
  },
  blocks: LessonBlock[],   // Content blocks (see below)
  discussionQuestions: string[], // All discussion questions collected
  notes: "",               // Private notes (usually empty for templates)
}
```

## Block Types & Order

Every lesson follows this block sequence:

| # | Block Type | Projectable | Purpose |
|---|-----------|-------------|---------|
| 1 | `context` | true | Sets the historical/cultural scene for the passage |
| 2 | `scripture_reading` | true | First Scripture passage (KJV, with `reference` and `version`) |
| 3 | `teaching` | true | Teaching on the first passage |
| 4 | `teacher_notes` | **false** | Deeper context for the teacher only |
| 5 | `discussion` | true | 2 personal discussion questions |
| 6 | `scripture_reading` | true | Second Scripture passage |
| 7 | `teaching` | true | Teaching on the second passage |
| 8 | `teacher_notes` | **false** | More teacher-only context |
| 9 | `discussion` | true | 2 more discussion questions |
| 10 | `application` | true | Practical, achievable application |

### Block Details

#### Context Block
- Sets the scene before reading Scripture
- Historical background, who wrote it, when, why
- 2-3 short paragraphs separated by `\n\n`
- Should make residents feel like they're being welcomed into the story

#### Scripture Reading Blocks
- Must quote KJV text **exactly** --- no paraphrasing
- Include `reference` field (e.g., "Matthew 3:1-12")
- Include `version: "KJV"` field
- Two per lesson, splitting the passage naturally

#### Teaching Blocks
- Explain and illuminate the Scripture passage
- 2-3 short paragraphs (3-4 sentences each)
- Connect to residents' lives naturally
- Never academic --- always warm and pastoral

#### Teacher Notes Blocks
- **Always `projectable: false`** --- never shown on screen
- Provide deeper context the teacher can use or share at their discretion
- Historical background, word studies, cross-references, theological depth
- Not a restatement of the teaching --- genuinely additional information
- Can include notes about sensitivity, common questions, etc.

#### Discussion Blocks
- Exactly 2 questions per block
- Questions are personal, inviting, with no wrong answers
- Never theological debates --- always personal reflection
- Format: two questions separated by `\n\n`

#### Application Block
- One practical thing residents can do this week
- Must be achievable for someone 75-95 with limited mobility
- Examples: pray a certain way, remember a truth, share with a visitor
- Warm, encouraging, not demanding

## Discussion Questions Array

The `discussionQuestions` field collects ALL discussion questions from the blocks into a single array for reference.

## Notes Field

Usually empty string `""` for templates. Can contain private reminders.
