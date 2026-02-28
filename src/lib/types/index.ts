export type UserRole = "super_admin" | "admin" | "leader" | "volunteer" | "member";

// --- Lesson Metadata & Study Plan Types ---

export interface LessonMeta {
  id: string;
  book: string;
  lessonNumber: number;
  priority: number;
  themes: string[];
  summary: string;
}

export interface StudyPlan {
  id: string;
  name: string;
  book: string;
  weekCount: number;
  lessonIds: string[];
  createdAt: string;
  customPrompt?: string;
}

export interface StudyPlanSummary {
  studyPlanId: string;
  name: string;
  book: string;
  weekCount: number;
  createdAt: string;
  progress: {
    draft: number;
    ready: number;
    completed: number;
  };
}

export type PrayerRequestStatus = "active" | "answered" | "ongoing";

export type MessageType = "text" | "prayer_share" | "image" | "system";

export type ShiftStatus = "confirmed" | "tentative" | "cancelled";

export type ApplicationStatus = "pending" | "approved" | "declined";

export type LessonBlockType =
  | "opening_prayer"
  | "context"
  | "scripture_reading"
  | "teaching"
  | "teacher_notes"
  | "video"
  | "discussion"
  | "application"
  | "closing_prayer";

export interface LessonBlock {
  type: LessonBlockType;
  content: string;
  reference?: string;
  version?: string;
  videoUrl?: string;
  projectable?: boolean;
}

export interface LessonContent {
  version: number;
  title: string;
  subtitle?: string;
  date: string;
  author: string;
  scripture: {
    primary: string;
    additional?: string[];
  };
  blocks: LessonBlock[];
  discussionQuestions: string[];
  notes?: string;
}

export type HubType = "worship" | "reading" | "groups" | "prayer" | "volunteer" | "admin" | "services";

// --- Song Types ---

export interface SongLyricSection {
  sectionType: "verse" | "chorus" | "bridge" | "tag";
  sectionNumber: number;
  lyrics: string;
  displayOrder: number;
}

export interface Song {
  id: string;
  title: string;
  author: string;
  composer: string;
  yearWritten: number;
  hymnNumber: number;
  isPublicDomain: boolean;
  audioUrl: string | null;
  sheetMusicUrl: string | null;
  smallChurchMusicId: number | null;
  audioDuration: number;
  tempo: "slow" | "moderate" | "upbeat";
  keySignature: string;
  tags: string[];
  lyrics: SongLyricSection[];
}

// --- Community / Group / User Types ---

export interface Community {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  rooms: string[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  meetingDay: string;
  meetingTime: string;
  communityName: string;
  communityAddress: string;
  leaderName: string;
  leaderId: string;
  memberCount: number;
  memberIds: string[];
}

export interface ChatMessage {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  type: "text" | "prayer_share" | "system";
}

// --- Prayer Types ---

export interface PrayerRequest {
  id: string;
  requesterName: string;
  requestText: string;
  communityId: string;
  communityName: string;
  room?: string;
  status: "active" | "answered" | "urgent";
  isAnonymous: boolean;
  prayingCount: number;
  prayingUserIds: string[];
  createdAt: string;
  answeredAt?: string;
}

// --- Volunteer Types ---

export type VolunteerRole =
  | "worship_leader"
  | "bible_reader"
  | "prayer_leader"
  | "tech_support"
  | "greeter";

export interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  communityName: string;
  room: string;
  role: VolunteerRole;
  roleLabel: string;
  maxVolunteers: number;
  signedUpIds: string[];
  signedUpNames: string[];
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: VolunteerRole;
  roleLabel: string;
  groups: string[];
  initials: string;
  joinedDate: string;
}

export const roleLabels: Record<VolunteerRole, string> = {
  worship_leader: "Worship Leader",
  bible_reader: "Bible Reader",
  prayer_leader: "Prayer Leader",
  tech_support: "Tech Support",
  greeter: "Greeter",
};

export const roleColors: Record<VolunteerRole, string> = {
  worship_leader: "var(--color-worship)",
  bible_reader: "var(--color-primary)",
  prayer_leader: "var(--color-prayer)",
  tech_support: "#2E7D6A",
  greeter: "var(--color-success)",
};

// --- Service Plan Types ---

export type ServicePlanItemType =
  | "song"
  | "scripture"
  | "lesson_block"
  | "prayer_time"
  | "announcement"
  | "custom";

export type ServicePlanStatus = "draft" | "ready" | "completed";

// Discriminated union for item-specific data
export interface SongItemData {
  songId: string;
}

export interface ScriptureItemData {
  reference: string;
  version: string;
  bookId: string;
  chapterId: string;
  content?: string; // cached scripture text
}

export interface LessonBlockItemData {
  lessonId: string;
  blockIndex: number;
}

export interface PrayerTimeItemData {
  communityId?: string;
  roomId?: string;
}

export interface AnnouncementItemData {
  content: string;
  projectable: boolean;
}

export interface CustomItemData {
  content: string;
  projectable: boolean;
}

export type ServiceItemData =
  | SongItemData
  | ScriptureItemData
  | LessonBlockItemData
  | PrayerTimeItemData
  | AnnouncementItemData
  | CustomItemData;

export interface ServicePlanItem {
  id: string;
  position: number;
  type: ServicePlanItemType;
  title: string;
  notes?: string;
  estimatedDurationSeconds: number;
  itemData: ServiceItemData;
}

export interface ServicePlan {
  id: string;
  name: string;
  description?: string;
  serviceDate?: string;
  communityId?: string;
  roomId?: string;
  groupId?: string;
  isTemplate: boolean;
  items: ServicePlanItem[];
  postServiceNotes?: string;
  status: ServicePlanStatus;
  studyPlanId?: string;
  studyPlanName?: string;
  studyPlanWeek?: number;
  createdAt: string;
  updatedAt: string;
  // Hydrated fields
  communityName?: string;
  roomName?: string;
  groupName?: string;
}
