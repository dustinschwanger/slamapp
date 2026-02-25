// ============================================================
// Mock Data for SLAM App
// Realistic data for nursing home ministry context
// ============================================================

import type {
  Community,
  PrayerRequest,
  Group,
  ChatMessage,
  VolunteerRole,
  Shift,
  Volunteer,
} from "@/lib/types";
import { roleLabels, roleColors } from "@/lib/types";

// Re-export for backward compatibility
export { roleLabels, roleColors };
export type { VolunteerRole };

// --- Types ---

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "leader" | "volunteer" | "member";
  avatarUrl?: string;
  initials: string;
}

// --- Communities ---

export const mockCommunities: Community[] = [
  {
    id: "comm-1",
    name: "Sunrise Senior Living",
    address: "1200 Oak Valley Dr",
    city: "Dallas",
    state: "TX",
    rooms: ["Chapel Room", "Activity Room A", "Activity Room B"],
  },
  {
    id: "comm-2",
    name: "Grace Gardens",
    address: "450 Elm Street",
    city: "Fort Worth",
    state: "TX",
    rooms: ["Main Hall", "Prayer Room"],
  },
  {
    id: "comm-3",
    name: "Peaceful Pines Nursing Home",
    address: "789 Pine Ridge Rd",
    city: "Arlington",
    state: "TX",
    rooms: ["Fellowship Hall", "Room 12B"],
  },
  {
    id: "comm-4",
    name: "Heritage Place",
    address: "321 Heritage Blvd",
    city: "Plano",
    state: "TX",
    rooms: ["Community Room", "Library"],
  },
];

// --- Users ---

export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    name: "David Thompson",
    email: "david.t@slamministry.org",
    role: "admin",
    initials: "DT",
  },
  {
    id: "user-2",
    name: "Sarah Mitchell",
    email: "sarah.m@slamministry.org",
    role: "leader",
    initials: "SM",
  },
  {
    id: "user-3",
    name: "James Rodriguez",
    email: "james.r@slamministry.org",
    role: "volunteer",
    initials: "JR",
  },
  {
    id: "user-4",
    name: "Mary Johnson",
    email: "mary.j@slamministry.org",
    role: "volunteer",
    initials: "MJ",
  },
  {
    id: "user-5",
    name: "Robert Chen",
    email: "robert.c@slamministry.org",
    role: "volunteer",
    initials: "RC",
  },
  {
    id: "user-6",
    name: "Linda Williams",
    email: "linda.w@slamministry.org",
    role: "member",
    initials: "LW",
  },
  {
    id: "user-7",
    name: "Pastor Mark Davis",
    email: "pastor.mark@slamministry.org",
    role: "leader",
    initials: "MD",
  },
  {
    id: "user-8",
    name: "Emily Foster",
    email: "emily.f@slamministry.org",
    role: "volunteer",
    initials: "EF",
  },
];

// Current user for mock purposes
export const currentMockUser = mockUsers[0];

// --- Prayer Requests ---

export const mockPrayerRequests: PrayerRequest[] = [
  {
    id: "prayer-1",
    requesterName: "Martha Reynolds",
    requestText:
      "Please pray for my husband George who is having hip replacement surgery next Tuesday. He is nervous but trusting in the Lord. We would appreciate prayers for a successful surgery and swift recovery.",
    communityId: "comm-1",
    communityName: "Sunrise Senior Living",
    room: "Chapel Room",
    status: "urgent",
    isAnonymous: false,
    prayingCount: 12,
    prayingUserIds: ["user-1", "user-2", "user-3", "user-4"],
    createdAt: "2026-02-22T10:30:00Z",
  },
  {
    id: "prayer-2",
    requesterName: "Helen Park",
    requestText:
      "Thanksgiving prayer - my granddaughter just got accepted into nursing school! God is so good. Please join me in praising Him for this blessing.",
    communityId: "comm-2",
    communityName: "Grace Gardens",
    status: "answered",
    isAnonymous: false,
    prayingCount: 8,
    prayingUserIds: ["user-1", "user-5"],
    createdAt: "2026-02-18T14:00:00Z",
    answeredAt: "2026-02-20T09:00:00Z",
  },
  {
    id: "prayer-3",
    requesterName: "Anonymous",
    requestText:
      "Please pray for a family member who is struggling with addiction. This has been a long battle and we need God's strength and healing.",
    communityId: "comm-1",
    communityName: "Sunrise Senior Living",
    room: "Activity Room A",
    status: "active",
    isAnonymous: true,
    prayingCount: 15,
    prayingUserIds: ["user-1", "user-2", "user-3", "user-6"],
    createdAt: "2026-02-21T08:15:00Z",
  },
  {
    id: "prayer-4",
    requesterName: "Walter Gibson",
    requestText:
      "Pray for our Tuesday Bible study group. We are studying the book of James and several residents are asking wonderful questions about faith and works.",
    communityId: "comm-3",
    communityName: "Peaceful Pines Nursing Home",
    room: "Fellowship Hall",
    status: "active",
    isAnonymous: false,
    prayingCount: 6,
    prayingUserIds: ["user-2"],
    createdAt: "2026-02-20T16:45:00Z",
  },
  {
    id: "prayer-5",
    requesterName: "Dorothy Martin",
    requestText:
      "Please remember our dear friend Edith who passed away last week. Pray for comfort for her family and for all of us here who miss her dearly. She was such a light in our community.",
    communityId: "comm-2",
    communityName: "Grace Gardens",
    room: "Main Hall",
    status: "active",
    isAnonymous: false,
    prayingCount: 22,
    prayingUserIds: ["user-1", "user-2", "user-3", "user-4", "user-5", "user-6"],
    createdAt: "2026-02-19T11:30:00Z",
  },
  {
    id: "prayer-6",
    requesterName: "Frank Olsen",
    requestText:
      "Praise report! After 3 months of physical therapy, I am walking again with just a cane. Thank you all for your faithful prayers. God is good!",
    communityId: "comm-4",
    communityName: "Heritage Place",
    status: "answered",
    isAnonymous: false,
    prayingCount: 18,
    prayingUserIds: ["user-1", "user-3", "user-7"],
    createdAt: "2026-02-15T09:00:00Z",
    answeredAt: "2026-02-22T10:00:00Z",
  },
  {
    id: "prayer-7",
    requesterName: "Ruth Campbell",
    requestText:
      "My daughter is expecting her first child in April. Please pray for a healthy pregnancy and safe delivery. I cannot wait to be a great-grandmother!",
    communityId: "comm-1",
    communityName: "Sunrise Senior Living",
    room: "Chapel Room",
    status: "active",
    isAnonymous: false,
    prayingCount: 10,
    prayingUserIds: ["user-2", "user-4"],
    createdAt: "2026-02-23T13:20:00Z",
  },
  {
    id: "prayer-8",
    requesterName: "Anonymous",
    requestText:
      "Please pray for peace and comfort. It has been a difficult season and I am feeling very alone. I know God is near but I need to feel His presence.",
    communityId: "comm-3",
    communityName: "Peaceful Pines Nursing Home",
    status: "urgent",
    isAnonymous: true,
    prayingCount: 19,
    prayingUserIds: ["user-1", "user-2", "user-5", "user-7", "user-8"],
    createdAt: "2026-02-23T07:00:00Z",
  },
];

// --- Groups ---

export const mockGroups: Group[] = [
  {
    id: "group-1",
    name: "Chapel Group - Sunrise Senior Living",
    description:
      "Weekly chapel service coordination for Sunrise Senior Living. We plan worship songs, scripture readings, and fellowship activities.",
    meetingDay: "Tuesday",
    meetingTime: "10:00 AM",
    communityName: "Sunrise Senior Living",
    communityAddress: "1200 Oak Valley Dr, Dallas, TX",
    leaderName: "Sarah Mitchell",
    leaderId: "user-2",
    memberCount: 8,
    memberIds: ["user-1", "user-2", "user-3", "user-4", "user-5", "user-6", "user-7", "user-8"],
  },
  {
    id: "group-2",
    name: "Bible Study - Grace Gardens",
    description:
      "Mid-week Bible study group at Grace Gardens. Currently studying the Gospel of John together with residents.",
    meetingDay: "Wednesday",
    meetingTime: "2:00 PM",
    communityName: "Grace Gardens",
    communityAddress: "450 Elm Street, Fort Worth, TX",
    leaderName: "Pastor Mark Davis",
    leaderId: "user-7",
    memberCount: 5,
    memberIds: ["user-2", "user-5", "user-7", "user-8", "user-6"],
  },
  {
    id: "group-3",
    name: "Prayer Warriors - Peaceful Pines",
    description:
      "Dedicated prayer group that meets to lift up the needs of residents and families at Peaceful Pines Nursing Home.",
    meetingDay: "Thursday",
    meetingTime: "11:00 AM",
    communityName: "Peaceful Pines Nursing Home",
    communityAddress: "789 Pine Ridge Rd, Arlington, TX",
    leaderName: "David Thompson",
    leaderId: "user-1",
    memberCount: 6,
    memberIds: ["user-1", "user-3", "user-4", "user-6", "user-7", "user-8"],
  },
  {
    id: "group-4",
    name: "Worship Team - Heritage Place",
    description:
      "Worship and hymn singing group for Heritage Place. We bring joy through music to residents every Friday afternoon.",
    meetingDay: "Friday",
    meetingTime: "3:00 PM",
    communityName: "Heritage Place",
    communityAddress: "321 Heritage Blvd, Plano, TX",
    leaderName: "James Rodriguez",
    leaderId: "user-3",
    memberCount: 4,
    memberIds: ["user-1", "user-3", "user-5", "user-8"],
  },
];

// --- Messages ---

export const mockMessages: ChatMessage[] = [
  {
    id: "msg-1",
    groupId: "group-1",
    senderId: "user-2",
    senderName: "Sarah Mitchell",
    senderInitials: "SM",
    content:
      "Good morning everyone! Just a reminder that we have chapel service tomorrow at 10 AM. Please arrive by 9:30 to set up.",
    timestamp: "2026-02-23T08:00:00Z",
    type: "text",
  },
  {
    id: "msg-2",
    groupId: "group-1",
    senderId: "user-3",
    senderName: "James Rodriguez",
    senderInitials: "JR",
    content: "I will be there! Do we need the portable speaker this week?",
    timestamp: "2026-02-23T08:15:00Z",
    type: "text",
  },
  {
    id: "msg-3",
    groupId: "group-1",
    senderId: "user-2",
    senderName: "Sarah Mitchell",
    senderInitials: "SM",
    content:
      "Yes, please bring it. The chapel room speaker was having issues last week. Also, we are singing Amazing Grace, How Great Thou Art, and Blessed Assurance.",
    timestamp: "2026-02-23T08:22:00Z",
    type: "text",
  },
  {
    id: "msg-4",
    groupId: "group-1",
    senderId: "user-4",
    senderName: "Mary Johnson",
    senderInitials: "MJ",
    content:
      "Wonderful song choices! Mrs. Reynolds asked if we could also do It Is Well. It is her favorite.",
    timestamp: "2026-02-23T09:00:00Z",
    type: "text",
  },
  {
    id: "msg-5",
    groupId: "group-1",
    senderId: "user-1",
    senderName: "David Thompson",
    senderInitials: "DT",
    content:
      "Absolutely, we can add that. Also, please keep Martha Reynolds in your prayers - her husband George is having surgery next week.",
    timestamp: "2026-02-23T09:10:00Z",
    type: "text",
  },
  {
    id: "msg-6",
    groupId: "group-1",
    senderId: "user-5",
    senderName: "Robert Chen",
    senderInitials: "RC",
    content:
      "Praying for them. I will bring the large-print lyric sheets. Last time some residents mentioned they could not read the projected text.",
    timestamp: "2026-02-23T10:30:00Z",
    type: "text",
  },
  {
    id: "msg-7",
    groupId: "group-1",
    senderId: "user-7",
    senderName: "Pastor Mark Davis",
    senderInitials: "MD",
    content:
      "Great idea, Robert. I have the devotional prepared on Psalm 23. Looking forward to sharing with everyone tomorrow.",
    timestamp: "2026-02-23T11:45:00Z",
    type: "text",
  },
  {
    id: "msg-8",
    groupId: "group-1",
    senderId: "user-8",
    senderName: "Emily Foster",
    senderInitials: "EF",
    content:
      "I can bring cookies for fellowship time after the service! Is that okay?",
    timestamp: "2026-02-23T12:30:00Z",
    type: "text",
  },
];

// --- Volunteer Shifts ---

function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export const mockShifts: Shift[] = [
  {
    id: "shift-1",
    date: getDateOffset(1),
    startTime: "9:30 AM",
    endTime: "11:30 AM",
    communityName: "Sunrise Senior Living",
    room: "Chapel Room",
    role: "worship_leader",
    roleLabel: "Worship Leader",
    maxVolunteers: 2,
    signedUpIds: ["user-3"],
    signedUpNames: ["James Rodriguez"],
  },
  {
    id: "shift-2",
    date: getDateOffset(1),
    startTime: "9:30 AM",
    endTime: "11:30 AM",
    communityName: "Sunrise Senior Living",
    room: "Chapel Room",
    role: "tech_support",
    roleLabel: "Tech Support",
    maxVolunteers: 1,
    signedUpIds: ["user-5"],
    signedUpNames: ["Robert Chen"],
  },
  {
    id: "shift-3",
    date: getDateOffset(3),
    startTime: "1:30 PM",
    endTime: "3:00 PM",
    communityName: "Grace Gardens",
    room: "Main Hall",
    role: "bible_reader",
    roleLabel: "Bible Reader",
    maxVolunteers: 2,
    signedUpIds: ["user-7"],
    signedUpNames: ["Pastor Mark Davis"],
  },
  {
    id: "shift-4",
    date: getDateOffset(4),
    startTime: "10:30 AM",
    endTime: "12:00 PM",
    communityName: "Peaceful Pines Nursing Home",
    room: "Fellowship Hall",
    role: "prayer_leader",
    roleLabel: "Prayer Leader",
    maxVolunteers: 2,
    signedUpIds: ["user-1", "user-4"],
    signedUpNames: ["David Thompson", "Mary Johnson"],
  },
  {
    id: "shift-5",
    date: getDateOffset(7),
    startTime: "2:30 PM",
    endTime: "4:00 PM",
    communityName: "Heritage Place",
    room: "Community Room",
    role: "greeter",
    roleLabel: "Greeter",
    maxVolunteers: 3,
    signedUpIds: ["user-8"],
    signedUpNames: ["Emily Foster"],
  },
  {
    id: "shift-6",
    date: getDateOffset(8),
    startTime: "9:30 AM",
    endTime: "11:30 AM",
    communityName: "Sunrise Senior Living",
    room: "Chapel Room",
    role: "worship_leader",
    roleLabel: "Worship Leader",
    maxVolunteers: 2,
    signedUpIds: [],
    signedUpNames: [],
  },
  {
    id: "shift-7",
    date: getDateOffset(10),
    startTime: "1:30 PM",
    endTime: "3:00 PM",
    communityName: "Grace Gardens",
    room: "Main Hall",
    role: "bible_reader",
    roleLabel: "Bible Reader",
    maxVolunteers: 2,
    signedUpIds: ["user-7"],
    signedUpNames: ["Pastor Mark Davis"],
  },
  {
    id: "shift-8",
    date: getDateOffset(12),
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    communityName: "Heritage Place",
    room: "Library",
    role: "prayer_leader",
    roleLabel: "Prayer Leader",
    maxVolunteers: 2,
    signedUpIds: [],
    signedUpNames: [],
  },
];

// --- Volunteers ---

export const mockVolunteers: Volunteer[] = [
  {
    id: "user-1",
    name: "David Thompson",
    email: "david.t@slamministry.org",
    phone: "(214) 555-0101",
    role: "prayer_leader",
    roleLabel: "Prayer Leader",
    groups: ["Chapel Group - Sunrise Senior Living", "Prayer Warriors - Peaceful Pines"],
    initials: "DT",
    joinedDate: "2024-06-15",
  },
  {
    id: "user-2",
    name: "Sarah Mitchell",
    email: "sarah.m@slamministry.org",
    phone: "(214) 555-0102",
    role: "worship_leader",
    roleLabel: "Worship Leader",
    groups: ["Chapel Group - Sunrise Senior Living", "Bible Study - Grace Gardens"],
    initials: "SM",
    joinedDate: "2024-03-10",
  },
  {
    id: "user-3",
    name: "James Rodriguez",
    email: "james.r@slamministry.org",
    phone: "(214) 555-0103",
    role: "worship_leader",
    roleLabel: "Worship Leader",
    groups: ["Chapel Group - Sunrise Senior Living", "Worship Team - Heritage Place"],
    initials: "JR",
    joinedDate: "2024-08-22",
  },
  {
    id: "user-4",
    name: "Mary Johnson",
    email: "mary.j@slamministry.org",
    phone: "(214) 555-0104",
    role: "greeter",
    roleLabel: "Greeter",
    groups: ["Chapel Group - Sunrise Senior Living", "Prayer Warriors - Peaceful Pines"],
    initials: "MJ",
    joinedDate: "2025-01-05",
  },
  {
    id: "user-5",
    name: "Robert Chen",
    email: "robert.c@slamministry.org",
    phone: "(214) 555-0105",
    role: "tech_support",
    roleLabel: "Tech Support",
    groups: ["Chapel Group - Sunrise Senior Living", "Worship Team - Heritage Place"],
    initials: "RC",
    joinedDate: "2024-11-18",
  },
  {
    id: "user-7",
    name: "Pastor Mark Davis",
    email: "pastor.mark@slamministry.org",
    phone: "(214) 555-0107",
    role: "bible_reader",
    roleLabel: "Bible Reader",
    groups: ["Bible Study - Grace Gardens", "Prayer Warriors - Peaceful Pines"],
    initials: "MD",
    joinedDate: "2023-09-01",
  },
  {
    id: "user-8",
    name: "Emily Foster",
    email: "emily.f@slamministry.org",
    phone: "(214) 555-0108",
    role: "greeter",
    roleLabel: "Greeter",
    groups: ["Chapel Group - Sunrise Senior Living", "Worship Team - Heritage Place"],
    initials: "EF",
    joinedDate: "2025-06-12",
  },
];

// --- Admin Stats ---

export const mockAdminStats = {
  totalCommunities: mockCommunities.length,
  activeVolunteers: mockVolunteers.length,
  prayerRequestsThisWeek: mockPrayerRequests.filter((p) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(p.createdAt) >= oneWeekAgo;
  }).length,
  upcomingShifts: mockShifts.length,
};

export const mockRecentActivity = [
  {
    id: "act-1",
    description: "Sarah Mitchell created a new worship playlist for Sunrise Senior Living",
    timestamp: "2026-02-24T08:30:00Z",
    type: "worship" as const,
  },
  {
    id: "act-2",
    description: "New prayer request submitted for George Reynolds (surgery)",
    timestamp: "2026-02-22T10:30:00Z",
    type: "prayer" as const,
  },
  {
    id: "act-3",
    description: "James Rodriguez signed up for Worship Leader shift on Tuesday",
    timestamp: "2026-02-22T14:00:00Z",
    type: "volunteer" as const,
  },
  {
    id: "act-4",
    description: "Pastor Mark Davis uploaded new lesson: The Good Shepherd (John 10)",
    timestamp: "2026-02-21T16:15:00Z",
    type: "reading" as const,
  },
  {
    id: "act-5",
    description: "Frank Olsen's prayer request marked as answered - praise report",
    timestamp: "2026-02-22T10:00:00Z",
    type: "prayer" as const,
  },
  {
    id: "act-6",
    description: "Emily Foster joined Worship Team - Heritage Place group",
    timestamp: "2026-02-20T09:45:00Z",
    type: "groups" as const,
  },
];
