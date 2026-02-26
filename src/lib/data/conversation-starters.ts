import type { LucideIcon } from "lucide-react";
import {
  BookHeart,
  History,
  Heart,
  Briefcase,
  Smile,
  Sparkles,
  Leaf,
  HeartHandshake,
} from "lucide-react";

export interface ConversationCategory {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
  starters: string[];
  /** Extra tips shown below starters (used by memory-loss category) */
  tips?: string[];
}

export const generalTips: string[] = [
  "Ask open-ended questions — \"Tell me about...\" beats \"Did you...?\"",
  "Listen more than you talk — aim for 80/20.",
  "Follow their lead — if they change topics, go with it.",
  "Use their name — it shows respect and helps residents with memory issues.",
  "Don't rush — give them time to process and respond.",
  "Affirm and validate — \"That's a wonderful story\" goes a long way.",
  "It's okay to sit in silence — your presence is the gift.",
  "Don't correct misremembered details — enter their reality.",
  "Note what works — remember topics a resident lights up about.",
  "Pray before you enter — ask God to guide the conversation.",
];

export const categories: ConversationCategory[] = [
  {
    id: "faith",
    title: "Faith & Spiritual Life",
    description: "Church memories, hymns, scripture, spiritual journey",
    color: "#8B6BAE",
    icon: BookHeart,
    starters: [
      "Tell me about the church you grew up in. What was it like?",
      "Do you have a favorite hymn? What does it mean to you?",
      "Is there a Bible verse that has carried you through hard times?",
      "What's one thing you'd want a young person to know about faith?",
      "Tell me about a time you really felt God's presence.",
      "Was there a pastor or Sunday school teacher who made a big impact on you?",
    ],
  },
  {
    id: "life-stories",
    title: "Life Stories & Memories",
    description: "Childhood, hometown, school — taps long-term memory",
    color: "#C68B59",
    icon: History,
    starters: [
      "Where did you grow up? What was your town like back then?",
      "What's your earliest memory?",
      "Tell me about your school days — did you have a favorite subject or teacher?",
      "What did your family do on weekends when you were a kid?",
      "What was the biggest news event you remember from growing up?",
      "Did your family have any traditions that were special to you?",
    ],
  },
  {
    id: "family",
    title: "Family & Relationships",
    description: "Children, grandchildren, parents, friends",
    color: "#2E7D6A",
    icon: Heart,
    starters: [
      "Tell me about your family. Do you have children or grandchildren?",
      "How did you meet your spouse? (If applicable)",
      "What's something your mother or father used to say all the time?",
      "Who was your best friend growing up? What did you two get into?",
      "What's one of your favorite memories with your grandchildren?",
      "Is there someone who had a big influence on the person you became?",
    ],
  },
  {
    id: "work-hobbies",
    title: "Work & Hobbies",
    description: "Career, crafts, passions, accomplishments",
    color: "#2D5A8E",
    icon: Briefcase,
    starters: [
      "What kind of work did you do? What did you enjoy most about it?",
      "Did you have a hobby or craft you were passionate about?",
      "What's something you made or built that you were really proud of?",
      "If you could go back and try any job, what would it be?",
      "Did you ever have a garden? What did you like to grow?",
      "Tell me about something you learned to do that took a long time to master.",
    ],
  },
  {
    id: "fun",
    title: "Fun & Lighthearted",
    description: "Favorites, food, travel, funny stories",
    color: "#B8860B",
    icon: Smile,
    starters: [
      "What's the best meal you've ever had? Who made it?",
      "If you could visit any place again, where would you go?",
      "Do you have a funny story from when you were younger?",
      "What's your favorite time of year, and why?",
      "Did you ever have a pet that had a big personality?",
      "What's something that always makes you laugh?",
    ],
  },
  {
    id: "wisdom",
    title: "Wisdom & Reflection",
    description: "Life lessons, advice, gratitude, legacy",
    color: "#003B71",
    icon: Sparkles,
    starters: [
      "What's the best advice you've ever been given?",
      "If you could tell your younger self one thing, what would it be?",
      "What are you most grateful for in your life?",
      "What do you think makes a good life?",
      "What's a lesson that took you a long time to learn?",
      "What do you hope people remember about you?",
    ],
  },
  {
    id: "seasonal",
    title: "Seasonal & Holidays",
    description: "Christmas, Easter, Thanksgiving, seasons",
    color: "#2E7D4F",
    icon: Leaf,
    starters: [
      "What did Christmas look like in your family growing up?",
      "Do you have a favorite Easter memory?",
      "What was Thanksgiving dinner like at your house?",
      "What's your favorite thing about this time of year?",
      "Did your family have any special holiday traditions?",
      "What's the best gift you've ever given or received?",
    ],
  },
  {
    id: "memory-loss",
    title: "Connecting with Residents Experiencing Memory Loss",
    description:
      "Sensory prompts, statements, and presence-based approaches",
    color: "#6B8AAE",
    icon: HeartHandshake,
    starters: [
      "\"This music is so beautiful.\" (Play a familiar hymn and sit together.)",
      "\"These flowers smell wonderful.\" (Bring something to touch or smell.)",
      "\"I love your smile.\" (Simple, warm affirmations.)",
      "\"Let's look at these pictures together.\" (Use a photo book or magazine.)",
      "\"You have such kind eyes.\" (Speak to who they are, not what they remember.)",
      "\"I'm glad to be here with you.\" (Your presence is enough.)",
    ],
    tips: [
      "Use statements, not questions — questions can cause frustration when memory fails.",
      "Speak slowly and clearly, one thought at a time.",
      "Don't correct or quiz — enter their reality with grace.",
      "Music often reaches people when words can't — hum or sing familiar hymns.",
      "Sit at eye level and use gentle touch if appropriate.",
      "Silence is okay — a calm, loving presence is deeply comforting.",
    ],
  },
];

/** Get a random starter from any category */
export function getRandomStarter(): {
  text: string;
  category: ConversationCategory;
} {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const text =
    category.starters[Math.floor(Math.random() * category.starters.length)];
  return { text, category };
}
