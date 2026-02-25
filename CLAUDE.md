# SLAM App - Senior Living Alliance Ministry

## Project Overview

**SLAM** (Senior Living Alliance Ministry) is a Christian nursing home ministry coordination app used to plan, run, and coordinate nursing home ministry services and Bible lessons. The app serves volunteers who visit nursing homes/senior living communities to lead worship services, Bible studies, and prayer groups.

### Video Transcription Summary (Source of Truth)

The app consists of **6 main hubs** accessible from a central dashboard:

1. **Worship Hub** - Song library with pre-selection, play/pause controls, lyrics projection, daily playlists (3-4 songs)
2. **Reading Hub** - Bible reader (API-based), daily lesson display (server-hosted), past lesson archive, projection mode, pop-out Bible reader
3. **Group Hub** - Discord-like group chat, group directory with locations/directions, weekly conversation threads per group
4. **Prayer Request** - Per-room prayer requests, weekly prayer lists, ability to share requests to groups, prayer marking
5. **Volunteer Hub** - Calendar-based scheduling, volunteer directory, schedule management
6. **Admin Hub** - Community metrics, volunteer intake/applications, leadership notes, content creation pipeline, performance analytics, future planning

### Key Usage Context
- Volunteers bring tablets/laptops to nursing home rooms
- Content (lyrics, scripture, lessons) is **projected onto screens** for residents to see
- Residents are typically 70-95+ years old with varying vision/hearing/cognitive abilities
- Multiple nursing home locations ("rooms") across communities
- Groups of volunteers coordinate via the app throughout the week

---

## Tech Stack

### Core Framework
- **Next.js 15+** (App Router) with React 19
- **TypeScript** (strict mode)
- **Tailwind CSS 4** for styling
- **shadcn/ui** as component library base (will be heavily customized for senior accessibility)

### Authentication & Authorization
- **Clerk** - Best choice for this app because:
  - Built-in role-based access control (admin, leader, volunteer, member)
  - Easy Next.js integration with middleware
  - Organization/team support maps to ministry groups
  - Free tier generous enough for ministry use
  - Pre-built UI components reduce development time

### Database & Backend
- **Supabase** (PostgreSQL + Realtime + Storage) - Single platform providing:
  - **PostgreSQL** database with Row Level Security
  - **Supabase Realtime** for Group Hub chat (WebSocket-based, replaces need for Socket.io)
  - **Supabase Storage** for audio files, lesson content, images
  - **Edge Functions** for server-side logic
  - Free tier is generous; Pro tier ($25/mo) more than sufficient
  - **Prisma** as ORM for type-safe database access

### Real-Time Chat (Group Hub)
- **Supabase Realtime** for the Discord-like group chat
  - Channels map to ministry groups
  - Presence for online indicators
  - Broadcast for typing indicators
  - Message history stored in PostgreSQL

### Audio/Music (Worship Hub)
- **Howler.js** - Robust web audio library
  - HTML5 Audio + Web Audio API fallback
  - Playlist management, play/pause/skip/volume
  - Handles multiple audio formats (MP3, OGG, WAV)
  - Lightweight, no dependencies

### Calendar/Scheduling (Volunteer Hub)
- **FullCalendar** (React) - Most full-featured calendar component
  - Day/week/month views
  - Drag-and-drop scheduling
  - Event creation and management
  - Good accessibility support

### Bible API (Reading Hub)
- **API.Bible** (American Bible Society) - PRIMARY
  - 2,500+ Bible versions in 1,600+ languages
  - Free API key with generous rate limits
  - Multiple English translations: KJV (public domain), ASV, WEB
  - RESTful API with good documentation
  - Endpoint: `https://api.scripture.api.bible/v1/`
- **Fallback**: ESV API (Crossway) for ESV-specific needs
  - Free for non-commercial ministry use
  - 500 requests/day on free tier

### Push Notifications
- **OneSignal** - Free tier supports up to 10,000 subscribers
  - Web push + PWA support
  - Segment-based targeting (by group, by room)
  - Prayer request reminders, schedule notifications

### Deployment
- **Vercel** - Natural fit for Next.js
  - Free tier for hobby/ministry projects
  - Pro tier ($20/mo) if needed for team features
  - Automatic preview deployments for testing
  - Edge network for fast global delivery

### PWA Strategy
- Build as **Progressive Web App** (PWA), NOT native
  - Easier deployment on shared nursing home tablets
  - No App Store approval needed
  - Works offline with service worker caching
  - Add to home screen for app-like experience
  - Push notifications via Web Push API
  - `next-pwa` package for Next.js PWA support

---

## UI/UX Design System

### Design Philosophy
This app must be **radically accessible** for elderly users while remaining efficient for younger volunteers who operate it. The dual-audience approach:
- **Volunteer operators** (20-60 years old): Need efficient navigation, quick access to controls
- **Nursing home residents** (70-95+ years old): Need large projected text, high contrast, simple visuals

### Accessibility Standards
- **WCAG 2.2 Level AAA** compliance target
- Minimum contrast ratio: **7:1** for normal text, **4.5:1** for large text
- All interactive elements must be keyboard navigable
- Screen reader compatible with proper ARIA labels
- Focus indicators must be clearly visible (3px+ outline)
- No reliance on color alone to convey information

### Color Palette

```
Background (Light mode):
--color-bg-primary:    #FAFAF5  (Warm white/ivory - main background)
--color-bg-secondary:  #F0EDE6  (Warm cream - cards, sections)
--color-bg-card:       #FFFFFF  (White - card surfaces)
--color-bg-surface:    #F5F0EB  (Warm light - elevated surfaces)

Text (Light mode) - ALL verified WCAG AAA 7:1+:
--color-text-primary:  #1A1A2E  (Deep navy-black - 14.5:1 on #FAFAF5)
--color-text-secondary:#4A4458  (Muted purple-gray - 7.2:1 on #FAFAF5)
--color-text-tertiary: #6B6580  (Lighter purple-gray - 4.7:1 on #FAFAF5, large text only)

Accent Colors:
--color-primary:       #2D5A8E  (Calm blue - trust, faith, primary actions)
--color-secondary:     #7B5E3B  (Warm brown/gold - warmth, secondary actions)
--color-accent:        #D4A574  (Warm gold - highlights on dark backgrounds)
--color-prayer:        #8B6BAE  (Soft purple - prayer/spiritual items)
--color-worship:       #C68B59  (Warm gold - worship-related items)

Semantic:
--color-success:       #2E7D4F  (Forest Green - growth, hope, answered prayers)
--color-warning:       #B8860B  (Dark goldenrod - attention, gentle alert)
--color-error:         #C44536  (Muted red - errors, gentle)

Projection/Dark Mode:
--color-bg-dark:       #1A1A2E  (Deep navy - projection background)
--color-bg-dark-alt:   #16213E  (Dark blue - projection surface)
--color-text-on-dark:  #F5F0EB  (Warm white - 14.5:1 on #1A1A2E)
--color-accent-on-dark:#D4A574  (Warm gold - 7.8:1 on #1A1A2E)
--color-lyric-active:  #FFFFFF  (White - active lyric line)
--color-lyric-inactive:#A0A0B0  (Muted - upcoming/past lyrics)

Design Rationale:
- Warm whites/ivories feel welcoming, not clinical
- Deep navy is calming and trustworthy (common in church design)
- Avoiding pure black (#000) on pure white (#FFF) prevents eye strain
- All primary text combinations verified to exceed WCAG AAA 7:1 ratio
- Purple for prayer/spiritual elements is traditional
- Gold/brown accents add warmth without being too bright
```

### Typography

```
Font Stack:
--font-primary: 'Inter', system-ui, -apple-system, sans-serif
--font-reading: 'Merriweather', 'Georgia', serif  (Bible reading, lessons)
--font-display: 'Playfair Display', serif  (Headlines, projected lyrics)

Font Sizes (rem-based, 1rem = 16px base):
--text-xs:    0.875rem  (14px - metadata only)
--text-sm:    1rem      (16px - minimum for any body text)
--text-base:  1.125rem  (18px - default body text)
--text-lg:    1.25rem   (20px - emphasized text)
--text-xl:    1.5rem    (24px - section headers)
--text-2xl:   1.875rem  (30px - page titles)
--text-3xl:   2.25rem   (36px - hub titles)

Projection Mode Font Sizes:
--proj-lyrics:    4rem    (64px - projected song lyrics)
--proj-scripture: 3.5rem  (56px - projected scripture)
--proj-lesson:    3rem    (48px - projected lesson text)
--proj-title:     5rem    (80px - projected titles)

Line Heights:
--leading-normal: 1.6    (body text)
--leading-reading: 1.8   (Bible text, lessons - extra spacing for readability)
--leading-projection: 1.5 (projected content)
```

### Accessibility Font Options
- Offer font size adjustment: Small (16px) / Medium (18px) / Large (20px) / Extra Large (22px)
- Offer **OpenDyslexic** as alternative font (following YouVersion Bible App's approach)
- Offer serif vs sans-serif toggle for reading content
- Bible reader themes: Light / Sepia (#F5E6D0 bg, #3D2B1F text, ~10:1 contrast) / Dark

### Animation & Motion Guidelines
- **Honor `prefers-reduced-motion`** media query - disable all animations
- **Slow, gentle transitions**: 300-500ms (not 150ms snappy)
- **No parallax or complex animations** - causes disorientation in seniors
- **No auto-playing carousels** - confusing and disorienting
- **Simple fades and slides only**
- Lyrics scroll: `scroll-behavior: smooth` with 500ms opacity transition

### Touch Targets & Spacing

```
Minimum Touch Targets:
--touch-min:     48px   (absolute minimum per WCAG)
--touch-default: 56px   (default button height)
--touch-large:   64px   (primary actions, music controls)
--touch-xl:      72px   (projection mode controls)

Spacing Scale:
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

### Navigation Pattern
- **Dashboard-first**: Landing page shows all 6 hubs as large cards
- **Bottom tab bar** on mobile (5 items + "More" for Admin)
- **Sidebar navigation** on tablet/desktop
- Each hub card shows: icon, title, current status/count (e.g., "3 prayer requests")
- Breadcrumb navigation within hubs
- Large "Back" button always visible (56px+ touch target)

### Projection Mode
- Toggled via prominent "Project" button in Worship and Reading hubs
- **Full-screen dark background** (#1A1A2E) with warm white text (#FEFCF3)
- Large centered text with generous line spacing
- Simple forward/back navigation arrows (72px+)
- Auto-hide controls after 3 seconds, tap to show
- Lyrics display: verse-by-verse with smooth transitions
- Scripture display: verse numbers highlighted, paragraph format

### Component Patterns

#### Music Player (Worship Hub)
- Large play/pause button centered (72px)
- Previous/Next track buttons flanking (56px)
- Song title and artist displayed prominently (24px+)
- Simple progress bar (wide, easy to scrub)
- Volume slider (wide, easy to adjust)
- Playlist displayed as scrollable list below player
- "Project Lyrics" toggle button prominently placed

#### Prayer Request Cards
- Card-based layout with clear typography
- Requester name, date, request text
- "Praying" button (tap to mark you're praying - shows count)
- Status indicator (active, answered, ongoing)
- Color-coded left border using prayer purple (#7B2D8E)

#### Chat Messages (Group Hub)
- Simplified chat interface (not full Discord complexity)
- Large message text (18px+)
- Clear sender names with role badges
- Timestamps in relative format ("2 hours ago")
- Simple text input with large send button
- Support for prayer request sharing into chat

#### Calendar (Volunteer Hub)
- Month view default with clear day cells
- Color-coded events by type (worship, lesson, visit)
- Large "+" button to add availability
- Shift cards show: date, time, location, volunteers assigned
- Drag and drop for admins to assign volunteers

---

## Database Schema

### Core Tables

```sql
-- Users (synced from Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'volunteer', -- 'admin', 'leader', 'volunteer', 'member'
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Communities (Nursing Home Locations)
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  contact_name TEXT,
  contact_phone TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms (Within Communities)
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "Chapel", "Activity Room A"
  capacity INTEGER,
  has_projector BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Groups (Ministry Groups)
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  community_id UUID REFERENCES communities(id),
  room_id UUID REFERENCES rooms(id),
  meeting_day TEXT, -- 'monday', 'tuesday', etc.
  meeting_time TIME,
  leader_id UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group Members
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'leader', 'member'
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Songs (Hymn Catalog)
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  composer TEXT,
  year_written INTEGER,
  hymn_number INTEGER, -- Traditional hymnal number
  is_public_domain BOOLEAN DEFAULT true,
  license_info TEXT,
  audio_url TEXT, -- Supabase Storage URL
  audio_duration INTEGER, -- seconds
  tempo TEXT, -- 'slow', 'moderate', 'upbeat'
  key_signature TEXT,
  tags TEXT[], -- ['communion', 'praise', 'comfort', 'christmas', etc.]
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Song Lyrics (verse-by-verse for projection)
CREATE TABLE song_lyrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL, -- 'verse', 'chorus', 'bridge', 'tag'
  section_number INTEGER NOT NULL, -- verse 1, 2, 3...
  lyrics TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  UNIQUE(song_id, display_order)
);

-- Playlists
CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id),
  group_id UUID REFERENCES groups(id), -- optional group association
  service_date DATE, -- date this playlist is for
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Playlist Songs (ordered)
CREATE TABLE playlist_songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id),
  position INTEGER NOT NULL,
  UNIQUE(playlist_id, position)
);

-- Lessons (Bible Lessons)
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  scripture_reference TEXT NOT NULL, -- e.g., "John 3:16-21"
  scripture_version TEXT DEFAULT 'KJV',
  content JSONB NOT NULL, -- Rich lesson content (blocks-based)
  summary TEXT,
  discussion_questions TEXT[],
  created_by UUID REFERENCES users(id),
  scheduled_date DATE,
  is_published BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prayer Requests
CREATE TABLE prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id),
  group_id UUID REFERENCES groups(id),
  requested_by UUID REFERENCES users(id),
  requester_name TEXT NOT NULL, -- May be on behalf of a resident
  request_text TEXT NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'answered', 'ongoing'
  is_anonymous BOOLEAN DEFAULT false,
  answered_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prayer Markings (who is praying)
CREATE TABLE prayer_markings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prayer_request_id UUID REFERENCES prayer_requests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(prayer_request_id, user_id)
);

-- Chat Messages (Group Hub)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'prayer_share', 'image', 'system'
  reference_id UUID, -- ID of shared prayer request, lesson, etc.
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteer Schedules
CREATE TABLE volunteer_shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id),
  room_id UUID REFERENCES rooms(id),
  group_id UUID REFERENCES groups(id),
  shift_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  role_needed TEXT DEFAULT 'volunteer', -- 'worship_leader', 'teacher', 'volunteer'
  max_volunteers INTEGER DEFAULT 5,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteer Shift Signups
CREATE TABLE shift_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_id UUID REFERENCES volunteer_shifts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'confirmed', -- 'confirmed', 'tentative', 'cancelled'
  signed_up_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(shift_id, user_id)
);

-- Volunteer Applications
CREATE TABLE volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  church_name TEXT,
  experience TEXT,
  availability TEXT,
  references_info TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'declined'
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Notes
CREATE TABLE admin_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT, -- 'planning', 'content', 'general', 'urgent'
  created_by UUID REFERENCES users(id),
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Public Domain Hymns Catalog

### Starter Song Library (25 Essential Hymns)

All hymns below have public domain lyrics AND melodies (composed before 1927). These are the most recognized hymns for nursing home residents aged 70-95+.

| # | Title | Author | Year | Hymnal # |
|---|-------|--------|------|----------|
| 1 | Amazing Grace | John Newton | 1779 | 188 |
| 2 | I Need Thee Every Hour | Annie Hawks / Robert Lowry | 1872 | 428 |
| 3 | The Old Rugged Cross | George Bennard | 1912 | 141 |
| 4 | Blessed Assurance | Fanny Crosby / Phoebe Knapp | 1873 | 345 |
| 5 | What a Friend We Have in Jesus | Joseph Scriven / Charles Converse | 1855 | 435 |
| 6 | It Is Well with My Soul | Horatio Spafford / Philip Bliss | 1876 | 493 |
| 7 | Rock of Ages | Augustus Toplady / Thomas Hastings | 1763 | 342 |
| 8 | A Mighty Fortress Is Our God | Martin Luther | 1529 | 26 |
| 9 | Holy, Holy, Holy | Reginald Heber / John B. Dykes | 1826 | 1 |
| 10 | Abide with Me | Henry Lyte / William Monk | 1847 | 50 |
| 11 | Nearer, My God, to Thee | Sarah Adams / Lowell Mason | 1841 | 474 |
| 12 | Jesus Loves Me | Anna Warner / William Bradbury | 1862 | 191 |
| 13 | Be Thou My Vision | Irish hymn / Mary Byrne | ~8th c. | 382 |
| 14 | Come, Thou Fount of Every Blessing | Robert Robinson / John Wyeth | 1758 | 2 |
| 15 | All Hail the Power of Jesus' Name | Edward Perronet / Oliver Holden | 1779 | 42 |
| 16 | Fairest Lord Jesus | Anonymous (Silesian) | 1677 | 73 |
| 17 | Joyful, Joyful, We Adore Thee | Henry van Dyke / Beethoven | 1907 | 12 |
| 18 | In the Garden | C. Austin Miles | 1912 | 487 |
| 19 | Just As I Am | Charlotte Elliott / William Bradbury | 1835 | 307 |
| 20 | Softly and Tenderly | Will Thompson | 1880 | 289 |
| 21 | His Eye Is on the Sparrow | Civilla Martin / Charles Gabriel | 1905 | 441 |
| 22 | Sweet Hour of Prayer | William Walford / William Bradbury | 1845 | 433 |
| 23 | When the Roll Is Called Up Yonder | James Black | 1893 | 543 |
| 24 | Leaning on the Everlasting Arms | Elisha Hoffman / Anthony Showalter | 1887 | 471 |
| 25 | Standing on the Promises | Russell Carter | 1886 | 368 |

### Extended Hymn Library (Additional 50 Hymns)

| # | Title | Author | Year |
|---|-------|--------|------|
| 26 | Great Is Thy Faithfulness | Thomas Chisholm / William Runyan | 1923 |
| 27 | Turn Your Eyes Upon Jesus | Helen Lemmel | 1922 |
| 28 | Love Lifted Me | James Rowe / Howard Smith | 1912 |
| 29 | Since Jesus Came into My Heart | Rufus McDaniel / Charles Gabriel | 1914 |
| 30 | I Surrender All | Judson Van DeVenter / Winfield Weeden | 1896 |
| 31 | 'Tis So Sweet to Trust in Jesus | Louisa Stead / William Kirkpatrick | 1882 |
| 32 | Pass Me Not, O Gentle Savior | Fanny Crosby / William Doane | 1868 |
| 33 | I Need Thee Every Hour | Annie Hawks / Robert Lowry | 1872 |
| 34 | Near the Cross | Fanny Crosby / William Doane | 1869 |
| 35 | Shall We Gather at the River | Robert Lowry | 1864 |
| 36 | When We All Get to Heaven | Eliza Hewitt / Emily Wilson | 1898 |
| 37 | At Calvary | William Newell / Daniel Towner | 1895 |
| 38 | Power in the Blood | Lewis Jones | 1899 |
| 39 | Nothing but the Blood of Jesus | Robert Lowry | 1876 |
| 40 | O Happy Day | Philip Doddridge / Edward Rimbault | 1755 |
| 41 | Have Thine Own Way, Lord | Adelaide Pollard / George Stebbins | 1907 |
| 42 | Onward, Christian Soldiers | Sabine Baring-Gould / Arthur Sullivan | 1871 |
| 43 | Crown Him with Many Crowns | Matthew Bridges / George Elvey | 1851 |
| 44 | Faith of Our Fathers | Frederick Faber / Henri Hemy | 1849 |
| 45 | To God Be the Glory | Fanny Crosby / William Doane | 1875 |
| 46 | Revive Us Again | William Mackay / John Husband | 1863 |
| 47 | Are You Washed in the Blood | Elisha Hoffman | 1878 |
| 48 | My Faith Looks Up to Thee | Ray Palmer / Lowell Mason | 1830 |
| 49 | I Love to Tell the Story | Katherine Hankey / William Fischer | 1866 |
| 50 | Precious Memories | J.B.F. Wright | 1925 |
| 51 | The Lily of the Valley | Charles Fry | 1881 |
| 52 | Savior, Like a Shepherd Lead Us | Dorothy Thrupp / William Bradbury | 1836 |
| 53 | Bringing in the Sheaves | Knowles Shaw / George Minor | 1874 |
| 54 | O Come, All Ye Faithful (Adeste Fideles) | John Wade | 1751 |
| 55 | Silent Night | Joseph Mohr / Franz Gruber | 1818 |
| 56 | Joy to the World | Isaac Watts / Lowell Mason | 1719 |
| 57 | Away in a Manger | Anonymous / James Murray | 1882 |
| 58 | Christ the Lord Is Risen Today | Charles Wesley | 1739 |
| 59 | He Leadeth Me | Joseph Gilmore / William Bradbury | 1862 |
| 60 | My Hope Is Built on Nothing Less | Edward Mote / William Bradbury | 1834 |
| 61 | We Gather Together | Anonymous (Dutch) / Eduard Kremser | 1597 |
| 62 | Doxology (Praise God from Whom All Blessings Flow) | Thomas Ken / Louis Bourgeois | 1674 |
| 63 | Amazing Love (And Can It Be) | Charles Wesley / Thomas Campbell | 1738 |
| 64 | How Firm a Foundation | "K" (Rippon's) / Traditional | 1787 |
| 65 | O for a Thousand Tongues to Sing | Charles Wesley / Carl Glaser | 1739 |
| 66 | Beneath the Cross of Jesus | Elizabeth Clephane / Frederick Maker | 1868 |
| 67 | Rescue the Perishing | Fanny Crosby / William Doane | 1870 |
| 68 | In the Sweet By and By | S. Fillmore Bennett / Joseph Webster | 1868 |
| 69 | Count Your Blessings | Johnson Oatman Jr. / Edwin Excell | 1897 |
| 70 | Dwelling in Beulah Land | C. Austin Miles | 1911 |
| 71 | Swing Low, Sweet Chariot | Traditional Spiritual | ~1862 |
| 72 | Go Tell It on the Mountain | John Wesley Work Jr. | 1865 |
| 73 | This Little Light of Mine | Harry Dixon Loes | 1920 |
| 74 | Down at the Cross (Glory to His Name) | Elisha Hoffman / John Stockton | 1878 |
| 75 | I'll Fly Away | Albert Brumley | 1929 |

### IMPORTANT: Hymns That Are NOT Public Domain (Common Misconceptions)

| Title | Why NOT PD | Copyright Holder |
|-------|-----------|-----------------|
| How Great Thou Art (English) | Stuart Hine English translation 1949 | Stuart Hine Trust / Capitol CMG |
| Because He Lives | Written 1971 by Bill & Gloria Gaither | William J. Gaither |
| Victory in Jesus | E.M. Bartlett, 1939 | Albert E. Brumley & Sons |
| In Christ Alone | Keith Getty & Stuart Townend, 2001 | Thankyou Music |
| Here I Am, Lord | Dan Schutte, 1981 | OCP Publications |
| On Eagle's Wings | Michael Joncas, 1979 | OCP Publications |

**Note**: Even if original lyrics/melody are PD, modern ARRANGEMENTS may be copyrighted. Only use original/traditional arrangements.

### Music Sources for Public Domain Hymns

#### Primary Audio Sources (Best for SLAM)
- **Spiritual Eldercare** (spiritualeldercare.com) - **IDEAL**: 110+ hymn recordings specifically arranged for elderly/dementia care. Slower tempo, lower key, shorter arrangements. Includes large-print hymnals. FREE.
- **Hymns Without Words** (play.hymnswithoutwords.com) - Professional organ/piano hymn recordings without vocals. Designed for congregational sing-along. FREE.
- **Small Church Music** (smallchurchmusic.com) - ~14,891 public domain MP3s in multiple styles (pipe organ, piano, band). FREE.
- **Sarah Bereza** (sarah-bereza.com) - 57 high-quality piano hymn accompaniments with intros. FREE for worship use.

#### Secondary Audio/Data Sources
- **The Cyber Hymnal** (hymntime.com/tch) - 16,500+ hymns with lyrics, sheet music, MIDI, and audio. FREE.
- **Hymnary.org** - Largest hymn database (1M+ texts). Lyrics, historical info, Scripture API. Use for metadata and lyrics.
- **IMSLP (Petrucci Music Library)** - Free sheet music scores for public domain hymns
- **Open Hymnal Project** (openhymnal.org) - Freely distributable hymn scores + MIDI files
- **Internet Archive** - Historical hymn recordings, out-of-copyright recordings
- **Hymnal Library** (hymnallibrary.org) - Lyrics, sheet music, MIDI downloads. FREE.

#### Lyrics APIs and Data Sources
- **Hymnary.org API**: `hymnary.org/api/scripture?passage=John+3:16` - retrieves hymns by Scripture reference (up to 100 results). CSV export: append `&export=csv` to any search.
- **Gospel Hymns API**: `https://gospel-hymns.onrender.com/api/v1` - REST + GraphQL. Free/open source.
- **GitHub song-data**: `github.com/josmithua/song-data` - Hymn book JSON data, ready-to-use structured data.

### Licensing Notes
- **Public Domain**: Hymns with BOTH lyrics AND melody published before 1927 (US) are public domain
- **Arrangements**: Modern arrangements of PD hymns may be copyrighted - only use the original/traditional arrangements
- **Recordings**: Even if a hymn is PD, a specific RECORDING may be copyrighted. Need either PD recordings, CC0 recordings, or self-produced recordings
- **CCLI License**: NOT needed for truly public domain hymns, but would be needed if adding any modern worship songs later
- **Recommendation**: Start with the 25 essential hymns above using only confirmed PD material. Consider producing original simple piano/organ accompaniment recordings to ensure clean licensing.

---

## Bible API Integration Plan

### Primary: API.Bible (api.scripture.api.bible)
```
Base URL: https://api.scripture.api.bible/v1/
Auth: API Key in header (api-key: YOUR_KEY)

Key Endpoints:
GET /bibles                           - List available Bibles
GET /bibles/{bibleId}/books           - List books in a Bible
GET /bibles/{bibleId}/books/{bookId}/chapters  - List chapters
GET /bibles/{bibleId}/chapters/{chapterId}     - Get chapter text
GET /bibles/{bibleId}/verses/{verseId}         - Get specific verse
GET /bibles/{bibleId}/search?query={query}     - Search scripture

Recommended Bible IDs:
- KJV: de4e12af7f28f599-02  (King James Version - fully public domain)
- ASV: 06125adad2d5898a-01  (American Standard Version - public domain)
- WEB: 9879dbb7cfe39e4d-04  (World English Bible - public domain)

Rate Limits: 5,000 queries/day, max 500 consecutive verses per request
Caching: Allowed up to 500 verses; must refresh cache every 30 days
FUMS: Fair Use Management System tracking required (anonymous usage stats)
Styling: Install `scripture-styles` npm package for official CSS
Output: HTML with USX-based class names (.s, .q1, .q2, .nd, .wj, .v, .p)
```

### Fallback: wldeh/bible-api (github.com/wldeh/bible-api)
```
200+ versions including KJV (public domain)
No API key required, no rate limits, MIT License
JSON responses via CDN endpoints
Self-hostable - can cache KJV locally without restrictions
```

### Bible Reader Component Architecture
```
BibleReader/
├── BibleReaderProvider.tsx    -- Context for current book/chapter/verse
├── BibleNavigation.tsx        -- Book > Chapter > Verse navigation
├── BibleChapterView.tsx       -- Main chapter text display
├── BibleVerseHighlight.tsx    -- Tap/click to highlight verse
├── BibleSearch.tsx            -- Search across scripture
├── BibleBookmark.tsx          -- Save bookmarks
└── BibleProjectionMode.tsx    -- Large-format verse display
```

### Lesson Content Structure (JSONB)
```json
{
  "version": 1,
  "title": "The Good Shepherd",
  "subtitle": "Finding Rest in God's Care",
  "date": "2026-03-01",
  "author": "Pastor John Smith",
  "scripture": {
    "primary": "Psalm 23:1-6",
    "additional": ["John 10:11-18", "Isaiah 40:11"]
  },
  "blocks": [
    {
      "type": "opening_prayer",
      "content": "Lord, as we gather today..."
    },
    {
      "type": "scripture_reading",
      "reference": "Psalm 23:1-6",
      "version": "KJV",
      "projectable": true
    },
    {
      "type": "teaching",
      "content": "David, who wrote this psalm, was himself a shepherd...",
      "projectable": true
    },
    {
      "type": "discussion",
      "question": "When have you felt God leading you like a shepherd?",
      "projectable": true
    },
    {
      "type": "application",
      "content": "This week, when you feel anxious...",
      "projectable": true
    },
    {
      "type": "closing_prayer",
      "content": "Father, we thank You for Your care..."
    }
  ],
  "discussion_questions": [
    "What does it mean to you that 'The Lord is my shepherd'?",
    "How has God provided for you in a time of need?",
    "What 'green pastures' has God led you to recently?"
  ],
  "notes": "Remember: Mrs. Johnson's birthday this week. Pray for Mr. Williams' surgery."
}
```

---

## Project File Structure

```
/app
├── (auth)/
│   ├── sign-in/[[...sign-in]]/page.tsx
│   ├── sign-up/[[...sign-up]]/page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── layout.tsx                    -- Main app layout with navigation
│   ├── page.tsx                      -- Dashboard (hub cards)
│   ├── worship/
│   │   ├── page.tsx                  -- Worship Hub main (song library)
│   │   ├── player/page.tsx           -- Active music player
│   │   ├── playlists/
│   │   │   ├── page.tsx              -- Playlist management
│   │   │   └── [id]/page.tsx         -- Single playlist
│   │   ├── songs/
│   │   │   ├── page.tsx              -- Song catalog
│   │   │   └── [id]/page.tsx         -- Song detail/lyrics
│   │   └── project/page.tsx          -- Lyrics projection mode
│   ├── reading/
│   │   ├── page.tsx                  -- Reading Hub main
│   │   ├── bible/
│   │   │   ├── page.tsx              -- Bible reader
│   │   │   └── [book]/[chapter]/page.tsx
│   │   ├── lessons/
│   │   │   ├── page.tsx              -- Lesson list
│   │   │   ├── [id]/page.tsx         -- Lesson view
│   │   │   └── create/page.tsx       -- Lesson creator (admin)
│   │   └── project/page.tsx          -- Lesson projection mode
│   ├── groups/
│   │   ├── page.tsx                  -- Group Hub main (group list)
│   │   ├── [id]/
│   │   │   ├── page.tsx              -- Group detail
│   │   │   ├── chat/page.tsx         -- Group chat
│   │   │   └── members/page.tsx      -- Group members
│   │   └── directory/page.tsx        -- Group directory with locations
│   ├── prayer/
│   │   ├── page.tsx                  -- Prayer Request main
│   │   ├── [roomId]/page.tsx         -- Room-specific prayer requests
│   │   ├── create/page.tsx           -- Create prayer request
│   │   └── my-prayers/page.tsx       -- Personal prayer list
│   ├── volunteer/
│   │   ├── page.tsx                  -- Volunteer Hub main (calendar)
│   │   ├── schedule/page.tsx         -- Full schedule view
│   │   ├── directory/page.tsx        -- Volunteer directory
│   │   └── availability/page.tsx     -- Set availability
│   └── admin/
│       ├── page.tsx                  -- Admin Hub main (dashboard)
│       ├── communities/
│       │   ├── page.tsx              -- Community management
│       │   └── [id]/page.tsx         -- Community detail
│       ├── applications/page.tsx     -- Volunteer applications
│       ├── content/
│       │   ├── page.tsx              -- Content creation hub
│       │   ├── lessons/page.tsx      -- Lesson management
│       │   └── songs/page.tsx        -- Song management
│       ├── analytics/page.tsx        -- Performance metrics
│       └── notes/page.tsx            -- Leadership notes
├── api/
│   ├── webhooks/
│   │   └── clerk/route.ts            -- Clerk webhook handler
│   ├── bible/
│   │   └── [...path]/route.ts        -- Bible API proxy
│   ├── songs/
│   │   └── route.ts                  -- Song CRUD
│   ├── lessons/
│   │   └── route.ts                  -- Lesson CRUD
│   ├── prayer/
│   │   └── route.ts                  -- Prayer request CRUD
│   └── chat/
│       └── route.ts                  -- Chat message handling
├── layout.tsx                        -- Root layout
├── globals.css                       -- Global styles + CSS variables
└── manifest.ts                       -- PWA manifest

/components
├── ui/                               -- shadcn/ui base components (customized)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
├── layout/
│   ├── Sidebar.tsx
│   ├── BottomNav.tsx
│   ├── Header.tsx
│   └── DashboardCard.tsx
├── worship/
│   ├── MusicPlayer.tsx
│   ├── SongCard.tsx
│   ├── PlaylistBuilder.tsx
│   ├── LyricsDisplay.tsx
│   └── LyricsProjection.tsx
├── reading/
│   ├── BibleReader.tsx
│   ├── LessonViewer.tsx
│   ├── LessonEditor.tsx
│   ├── ScriptureProjection.tsx
│   └── LessonProjection.tsx
├── groups/
│   ├── GroupCard.tsx
│   ├── ChatWindow.tsx
│   ├── MessageBubble.tsx
│   ├── GroupDirectory.tsx
│   └── LocationMap.tsx
├── prayer/
│   ├── PrayerRequestCard.tsx
│   ├── PrayerRequestForm.tsx
│   ├── PrayerList.tsx
│   └── PrayingButton.tsx
├── volunteer/
│   ├── VolunteerCalendar.tsx
│   ├── ShiftCard.tsx
│   ├── AvailabilityPicker.tsx
│   └── VolunteerDirectory.tsx
└── admin/
    ├── AnalyticsDashboard.tsx
    ├── ApplicationReview.tsx
    ├── ContentManager.tsx
    └── LeadershipNotes.tsx

/lib
├── supabase/
│   ├── client.ts                     -- Supabase browser client
│   ├── server.ts                     -- Supabase server client
│   └── middleware.ts                  -- Supabase auth middleware
├── bible/
│   ├── api.ts                        -- Bible API client
│   ├── cache.ts                      -- Bible text caching
│   └── types.ts                      -- Bible API types
├── audio/
│   ├── player.ts                     -- Howler.js audio player wrapper
│   └── playlist.ts                   -- Playlist management logic
├── utils/
│   ├── cn.ts                         -- Class name utility (clsx + twMerge)
│   ├── dates.ts                      -- Date formatting
│   └── projection.ts                 -- Projection mode utilities
└── types/
    ├── database.ts                   -- Generated Supabase types
    ├── lesson.ts                     -- Lesson content types
    └── index.ts                      -- Shared types

/prisma
├── schema.prisma                     -- Database schema
└── migrations/                       -- Migration files

/public
├── icons/                            -- PWA icons
├── audio/                            -- Hymn audio files (served statically)
└── images/                           -- Static images

/hooks
├── useAudioPlayer.ts                 -- Audio player hook
├── useBibleReader.ts                 -- Bible API hook
├── useProjection.ts                  -- Projection mode hook
├── useChat.ts                        -- Real-time chat hook
├── usePrayerRequests.ts              -- Prayer request hook
└── useVolunteerSchedule.ts           -- Schedule hook
```

---

## Build Plan (Phased)

### Phase 1: Foundation (Weeks 1-2)
**Goal**: Project setup, auth, database, and dashboard shell

1. Initialize Next.js 15 project with TypeScript + Tailwind CSS 4
2. Install and configure shadcn/ui with custom SLAM theme (colors, fonts, spacing)
3. Set up Clerk authentication (sign-in, sign-up, role-based middleware)
4. Set up Supabase project (database, storage buckets)
5. Set up Prisma with Supabase PostgreSQL connection
6. Create database schema (run migrations)
7. Build root layout with responsive sidebar/bottom nav
8. Build dashboard page with 6 hub cards
9. Configure PWA manifest and service worker (next-pwa)
10. Set up Clerk webhook to sync users to Supabase

**Deliverable**: Working app shell with auth, navigation, and empty hub pages

### Phase 2: Worship Hub (Weeks 3-4)
**Goal**: Fully functional music player with lyrics projection

1. Seed database with 25 starter hymns (lyrics, metadata)
2. Source/produce public domain audio recordings for starter hymns
3. Build song catalog page (searchable, filterable by tag)
4. Build song detail page (lyrics view)
5. Build MusicPlayer component with Howler.js (play, pause, skip, volume)
6. Build playlist builder (create, edit, reorder songs)
7. Build daily playlist selection feature
8. Build LyricsProjection component (full-screen, dark mode, verse-by-verse)
9. Implement projection controls (advance, go back, auto-scroll)
10. Upload audio files to Supabase Storage

**Deliverable**: Working Worship Hub with music playback and lyrics projection

### Phase 3: Reading Hub (Weeks 5-6)
**Goal**: Bible reader and lesson system with projection

1. Set up API.Bible integration with API key
2. Build Bible API proxy route (cache responses)
3. Build BibleReader component (book/chapter navigation, verse display)
4. Build scripture search functionality
5. Build lesson content editor (rich text, blocks-based)
6. Build lesson viewer with projection mode
7. Build lesson list page with past lesson archive
8. Build ScriptureProjection component (large text, navigation)
9. Implement lesson scheduling (assign lesson to date)
10. Build "pop-out" Bible reader mode

**Deliverable**: Working Reading Hub with Bible reader, lessons, and projection

### Phase 4: Group Hub & Chat (Weeks 7-8)
**Goal**: Group directory and real-time chat

1. Set up Supabase Realtime channels for group chat
2. Build group directory page (cards with location info)
3. Build group detail page (info, members, meeting schedule)
4. Build ChatWindow component with real-time messaging
5. Build message UI (sender avatar, name, timestamp, content)
6. Implement chat message persistence (store in PostgreSQL)
7. Add prayer request sharing into chat
8. Build group member management (add/remove, roles)
9. Add location/directions display for each group's meeting place
10. Implement typing indicators and online presence

**Deliverable**: Working Group Hub with chat and group management

### Phase 5: Prayer Request System (Weeks 9-10)
**Goal**: Per-room prayer tracking with sharing

1. Build prayer request creation form
2. Build prayer request card component (with "Praying" button)
3. Build room-specific prayer request list
4. Build personal "My Prayers" tracking page
5. Implement prayer request sharing to groups
6. Build prayer request status management (active, answered, ongoing)
7. Add prayer count display (how many are praying)
8. Set up push notifications for new prayer requests (OneSignal)
9. Build weekly prayer digest feature
10. Implement answered prayer celebrations

**Deliverable**: Working Prayer Request hub with sharing and notifications

### Phase 6: Volunteer Hub (Weeks 11-12)
**Goal**: Calendar-based volunteer scheduling

1. Set up FullCalendar with SLAM theme
2. Build volunteer shift creation (admin)
3. Build shift signup for volunteers
4. Build availability picker for volunteers
5. Build volunteer directory
6. Build schedule view (by community, by week, by volunteer)
7. Implement schedule conflict detection
8. Add schedule reminder notifications
9. Build volunteer application form (public-facing)
10. Build application review for admins

**Deliverable**: Working Volunteer Hub with scheduling and applications

### Phase 7: Admin Hub & Analytics (Weeks 13-14)
**Goal**: Admin dashboard, analytics, and content management

1. Build admin dashboard with key metrics overview
2. Build community management (add/edit nursing home locations)
3. Build analytics dashboard (attendance, volunteer hours, prayer counts)
4. Build content creation pipeline (lesson drafts, review, publish)
5. Build song management (add songs, edit lyrics, upload audio)
6. Build leadership notes system
7. Build volunteer application review workflow
8. Add performance metrics and trend charts
9. Build admin notification management
10. Build data export functionality

**Deliverable**: Full Admin Hub with all management features

### Phase 8: Polish & Launch (Weeks 15-16)
**Goal**: Testing, optimization, and deployment

1. Comprehensive accessibility audit (screen reader, keyboard nav)
2. Performance optimization (lazy loading, code splitting, image optimization)
3. Offline mode testing and service worker refinement
4. Cross-browser testing (Chrome, Safari, Firefox on tablets)
5. Tablet-specific optimizations (iPad, Android tablets)
6. Projection mode testing on actual projectors
7. User acceptance testing with volunteer team
8. Security audit (RLS policies, API security, auth flows)
9. Deploy to Vercel production
10. Create user guide documentation

**Deliverable**: Production-ready SLAM App

---

## Key Architectural Decisions

### 1. PWA Over Native App
- Nursing homes often use shared tablets; PWA installs without app stores
- Easier to update (no app review process)
- Single codebase serves all devices
- Offline support via service worker handles spotty nursing home WiFi

### 2. Supabase as All-in-One Backend
- Single platform reduces complexity and cost
- PostgreSQL with RLS provides enterprise-grade security
- Realtime subscriptions power the chat feature
- Storage handles audio files and media
- Edge functions handle server-side logic
- Generous free tier for ministry/non-profit use

### 3. Clerk for Auth (Not Supabase Auth)
- Better pre-built UI components
- Superior role-based access control
- Organization support for multi-church deployments
- Better Next.js App Router integration

### 4. Blocks-Based Lesson Content (JSONB)
- Flexible content structure (scripture, teaching, discussion, prayer)
- Each block can be marked "projectable" individually
- Easy to render different block types with different styling
- Supports lesson templates for consistency
- Versioned for future schema evolution

### 5. Verse-by-Verse Lyrics Storage
- Enables karaoke-style projection (one verse/chorus at a time)
- Supports song leader advancing through lyrics manually
- Different from storing all lyrics as one text blob
- Projection can show current section highlighted

### 6. Bible API Proxy
- Cache Bible text server-side to reduce API calls
- Transform API responses to consistent format
- Handle rate limiting gracefully
- Fallback between Bible API providers
- KJV text can be cached permanently (public domain)

### 7. Per-Room Prayer Requests
- Nursing home rooms have different residents with different needs
- Volunteers see relevant prayers for where they're serving
- Aggregation at community level for leadership overview
- Sharing mechanism bridges rooms to group chat

---

## Environment Variables Required

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Bible API
BIBLE_API_KEY=

# OneSignal (Push Notifications)
NEXT_PUBLIC_ONESIGNAL_APP_ID=
ONESIGNAL_REST_API_KEY=

# Database (Prisma)
DATABASE_URL=
DIRECT_URL=
```

---

## Development Conventions

### Code Style
- Use TypeScript strict mode throughout
- Prefer Server Components by default; use 'use client' only when needed
- Use Zod for all form validation and API input validation
- Use React Hook Form for all forms
- Use TanStack Query (React Query) for client-side data fetching
- Supabase queries on server use the service role client; client-side uses the anon client with RLS

### Component Naming
- PascalCase for component files and exports
- `page.tsx` for route pages (Next.js convention)
- `layout.tsx` for route layouts
- Prefix hooks with `use` (e.g., `useAudioPlayer`)

### Styling
- Tailwind CSS utility classes as primary styling method
- CSS variables for theme values (defined in globals.css)
- `cn()` utility for conditional class merging
- Mobile-first responsive design
- Minimum 48px touch targets everywhere

### Accessibility Checklist (Every Component)
- [ ] Proper semantic HTML elements
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigable (Tab, Enter, Escape)
- [ ] Focus visible styles (3px+ outline)
- [ ] Color contrast meets 7:1 ratio
- [ ] No information conveyed by color alone
- [ ] Screen reader tested
- [ ] Touch target minimum 48px
- [ ] Text scalable without breaking layout

---

## Notes for Future Consideration
- **Multi-language support**: Some nursing homes have Spanish-speaking residents
- **Audio recording**: Allow recording of live worship sessions for homebound members
- **Video integration**: Optional video call feature for remote volunteers
- **Resident profiles**: Track individual residents' preferences and spiritual journey (with privacy considerations)
- **Integration with church management systems**: Planning Center, Church Community Builder APIs
- **Print mode**: Generate printable hymn sheets, lesson outlines, prayer lists for residents who prefer paper
