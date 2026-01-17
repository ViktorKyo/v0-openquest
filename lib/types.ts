/**
 * OpenQuest Type Definitions
 * Centralized type definitions for the entire application
 */

// ===== ENUMS & CONSTANTS =====

export const CATEGORIES = [
  "Moonshots",
  "Niche markets",
  "Future of work",
  "Creator economy",
  "Longevity",
  "Rebuild money",
  "Climate tech",
  "AI & infrastructure",
  "World of atoms",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PROBLEM_STATUS = [
  "pending_review",
  "published",
  "being_built",
  "solved",
] as const;

export type ProblemStatus = (typeof PROBLEM_STATUS)[number];

export const AUTHOR_INVOLVEMENT = [
  "want_to_build",
  "already_building",
  "just_sharing",
] as const;

export type AuthorInvolvement = (typeof AUTHOR_INVOLVEMENT)[number];

// ===== USER TYPES =====

export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  twitterHandle?: string;
  linkedinUrl?: string;
  reputation: number;
  createdAt: Date;
}

export interface Author {
  id: string;
  username: string;
  avatarUrl: string;
}

// ===== PROBLEM TYPES =====

export interface Problem {
  id: string;
  title: string;
  elevatorPitch: string;
  fullDescription: string;
  category: Category;
  industryTags: string[];
  isAnonymous: boolean;
  author: Author | null;
  authorInvolvement?: AuthorInvolvement;
  upvotes: number;
  commentCount: number;
  builderCount: number;
  investorCount: number;
  followerCount: number;
  status: ProblemStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Simplified version for card displays
export interface ProblemCardData {
  id: string;
  title: string;
  elevatorPitch: string;
  category: Category;
  upvotes: number;
  commentCount: number;
  builderCount: number;
  investorCount: number;
  author?: Author;
  isAnonymous: boolean;
  createdAt: Date;
}

// ===== ENGAGEMENT TYPES =====

export interface Engagement {
  id: string;
  problemId: string;
  userId: string;
  type: "building" | "investing" | "following";
  isAnonymous: boolean;
  note?: string;
  createdAt: Date;
}

export interface BuilderEngagement extends Engagement {
  type: "building";
  status: "interested" | "in_progress" | "completed";
  publicProfile: boolean;
}

export interface InvestorEngagement extends Engagement {
  type: "investing";
  investmentRange?: string;
  publicProfile: boolean;
}

// ===== COMMENT TYPES =====

export interface Comment {
  id: string;
  problemId: string;
  author: Author | null;
  isAnonymous: boolean;
  content: string;
  upvotes: number;
  parentCommentId: string | null;
  replies?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

// ===== UPVOTE TYPES =====

export interface Upvote {
  id: string;
  userId: string;
  problemId?: string;
  commentId?: string;
  createdAt: Date;
}

// ===== FORM TYPES =====

export interface SubmitProblemFormData {
  title: string;
  elevatorPitch: string;
  fullDescription: string;
  category: Category;
  industryTags: string[];
  isAnonymous: boolean;
  authorInvolvement: AuthorInvolvement;
}

export interface EngagementFormData {
  type: "building" | "investing";
  isAnonymous: boolean;
  note?: string;
  status?: "interested" | "in_progress" | "completed";
  investmentRange?: string;
}

// ===== FILTER & SORT TYPES =====

export type SortOption = "trending" | "new" | "top_week" | "top_month" | "top_all_time";

export interface FeedFilters {
  category?: Category;
  sortBy: SortOption;
  searchQuery?: string;
}

// ===== CATEGORY METADATA =====

export interface CategoryMetadata {
  slug: string;
  name: Category;
  description: string;
  color: string;
  icon?: string;
}

export const CATEGORY_METADATA: Record<Category, CategoryMetadata> = {
  "Moonshots": {
    slug: "moonshots",
    name: "Moonshots",
    description: "Change the trajectory of humanity",
    color: "bg-purple-500",
  },
  "Niche markets": {
    slug: "niche-markets",
    name: "Niche markets",
    description: "Small markets that desperately need champions",
    color: "bg-blue-500",
  },
  "Future of work": {
    slug: "future-of-work",
    name: "Future of work",
    description: "Reimagining how we work and collaborate",
    color: "bg-indigo-500",
  },
  "Creator economy": {
    slug: "creator-economy",
    name: "Creator economy",
    description: "Empowering creators to monetize their work",
    color: "bg-pink-500",
  },
  "Longevity": {
    slug: "longevity",
    name: "Longevity",
    description: "Extending healthspan and improving quality of life",
    color: "bg-green-500",
  },
  "Rebuild money": {
    slug: "rebuild-money",
    name: "Rebuild money",
    description: "Fixing financial systems and infrastructure",
    color: "bg-yellow-500",
  },
  "Climate tech": {
    slug: "climate-tech",
    name: "Climate tech",
    description: "Solutions for climate change and sustainability",
    color: "bg-emerald-500",
  },
  "AI & infrastructure": {
    slug: "ai-infrastructure",
    name: "AI & infrastructure",
    description: "Building the future of AI and developer tools",
    color: "bg-cyan-500",
  },
  "World of atoms": {
    slug: "world-of-atoms",
    name: "World of atoms",
    description: "Physical products, hardware, and manufacturing",
    color: "bg-orange-500",
  },
  "Other": {
    slug: "other",
    name: "Other",
    description: "Problems that don't fit neatly into other categories",
    color: "bg-gray-500",
  },
};

// ===== UTILITY FUNCTIONS =====

export function getCategoryColor(category: Category): string {
  const colorMap: Record<Category, string> = {
    "Moonshots": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Niche markets": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Future of work": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "Creator economy": "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "Longevity": "bg-green-500/10 text-green-400 border-green-500/20",
    "Rebuild money": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Climate tech": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "AI & infrastructure": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    "World of atoms": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Other": "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return colorMap[category] || colorMap["Other"];
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}
