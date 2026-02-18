import { pgTable, uuid, varchar, text, boolean, timestamp, integer, jsonb, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// USERS TABLE
// ============================================
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at'),

  // Authentication fields
  passwordHash: varchar('password_hash', { length: 255 }),
  passwordResetToken: varchar('password_reset_token', { length: 255 }),
  passwordResetExpires: timestamp('password_reset_expires'),

  // Moderation fields
  isSuspended: boolean('is_suspended').default(false),
  isBanned: boolean('is_banned').default(false),
  banReason: text('ban_reason'),
  suspendedAt: timestamp('suspended_at'),
  suspendedUntil: timestamp('suspended_until'),
  suspensionReason: text('suspension_reason'),
  bannedAt: timestamp('banned_at'),
});

// ============================================
// USER PROFILES TABLE
// ============================================
export const userProfiles = pgTable('user_profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  headline: varchar('headline', { length: 120 }),
  bio: text('bio'),
  location: varchar('location', { length: 120 }),
  timezone: varchar('timezone', { length: 64 }),
  linkedinUrl: text('linkedin_url'),
  twitterUrl: text('twitter_url'),
  websiteUrl: text('website_url'),
  profileVisibilityDefault: varchar('profile_visibility_default', { length: 10 }).notNull().default('public'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// USER SESSIONS TABLE (DB-backed sessions)
// ============================================
export const userSessions = pgTable('user_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  sessionTokenHash: varchar('session_token_hash', { length: 128 }).notNull().unique(),
  rememberMe: boolean('remember_me').notNull().default(false),
  ipAddress: varchar('ip_address', { length: 64 }),
  userAgent: text('user_agent'),
  expiresAt: timestamp('expires_at').notNull(),
  revokedAt: timestamp('revoked_at'),
  lastSeenAt: timestamp('last_seen_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// PROBLEMS TABLE
// ============================================
export const problems = pgTable('problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 500 }).notNull(),
  elevatorPitch: text('elevator_pitch').notNull(),
  fullDescription: text('full_description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  industryTags: jsonb('industry_tags').$type<string[]>(),
  forkedFromProblemId: text('forked_from_problem_id'),

  // Author info
  authorId: uuid('author_id').references(() => users.id),
  isAnonymous: boolean('is_anonymous').default(false),

  // Status
  status: varchar('status', { length: 20 }).notNull().default('pending_review'),
  // Status values: 'draft', 'pending_review', 'approved', 'published', 'rejected', 'archived', 'being_built', 'solved'

  // Submission intent metadata
  involvement: varchar('involvement', { length: 30 }),
  wantBuildBlocker: jsonb('want_build_blocker').$type<string[]>(),
  alreadyBuildingSupport: jsonb('already_building_support').$type<string[]>(),
  wantToWorkInvolvement: jsonb('want_to_work_involvement').$type<string[]>(),

  // Deck metadata
  deckType: varchar('deck_type', { length: 10 }),
  deckLink: text('deck_link'),

  // Creator launch context comment (required for non-anonymous submissions)
  creatorLaunchCommentDraft: text('creator_launch_comment_draft'),
  creatorLaunchCommentRequired: boolean('creator_launch_comment_required').default(false),
  creatorLaunchCommentPostedAt: timestamp('creator_launch_comment_posted_at'),
  creatorLaunchCommentId: uuid('creator_launch_comment_id').references((): AnyPgColumn => comments.id),

  // Engagement metrics
  upvotes: integer('upvotes').default(0),
  commentCount: integer('comment_count').default(0),
  builderCount: integer('builder_count').default(0),
  investorCount: integer('investor_count').default(0),

  // Curated tweet URLs
  tweetUrls: jsonb('tweet_urls').$type<string[]>(),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  draftUpdatedAt: timestamp('draft_updated_at'),
  submittedAt: timestamp('submitted_at'),
  submissionVersion: integer('submission_version').default(1).notNull(),
  publishedAt: timestamp('published_at'),
  moderatedAt: timestamp('moderated_at'),
});

// ============================================
// COMMENTS TABLE
// ============================================
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  problemId: uuid('problem_id').references(() => problems.id).notNull(),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  parentId: uuid('parent_id'), // Self-reference for replies (null = top-level comment)

  content: text('content').notNull(),

  // Engagement
  upvotes: integer('upvotes').default(0),

  // Edit window (2 hours from creation)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),

  // Soft delete (can only delete if no replies)
  isDeleted: boolean('is_deleted').default(false),
  deletedAt: timestamp('deleted_at'),

  // Moderation
  isHidden: boolean('is_hidden').default(false),
  hiddenReason: text('hidden_reason'),
  isLaunchComment: boolean('is_launch_comment').default(false),
});

// ============================================
// COMMENT UPVOTES TABLE (track who upvoted)
// ============================================
export const commentUpvotes = pgTable('comment_upvotes', {
  id: uuid('id').primaryKey().defaultRandom(),
  commentId: uuid('comment_id').references(() => comments.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// USER SAVED PROBLEMS TABLE (bookmarks)
// ============================================
export const userSavedProblems = pgTable('user_saved_problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  problemId: uuid('problem_id').references(() => problems.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// PROBLEM UPVOTES TABLE
// ============================================
export const problemUpvotes = pgTable('problem_upvotes', {
  id: uuid('id').primaryKey().defaultRandom(),
  problemId: uuid('problem_id').references(() => problems.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// PROBLEM ENGAGEMENTS TABLE
// ============================================
export const problemEngagements = pgTable('problem_engagements', {
  id: uuid('id').primaryKey().defaultRandom(),
  problemId: uuid('problem_id').references(() => problems.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 20 }).notNull(),
  visibility: varchar('visibility', { length: 10 }).notNull().default('public'),
  payload: jsonb('payload'),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// SOURCE INSTITUTIONS TABLE
// ============================================
export const sourceInstitutions = pgTable('source_institutions', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 64 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  sourceType: varchar('source_type', { length: 30 }).notNull().default('community'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================
// PROBLEM SOURCES TABLE (many-to-many, supports one primary source for now)
// ============================================
export const problemSources = pgTable('problem_sources', {
  id: uuid('id').primaryKey().defaultRandom(),
  problemId: uuid('problem_id').references(() => problems.id, { onDelete: 'cascade' }).notNull(),
  sourceInstitutionId: uuid('source_institution_id').references(() => sourceInstitutions.id, { onDelete: 'cascade' }).notNull(),
  isPrimary: boolean('is_primary').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// ADMIN USERS TABLE
// ============================================
export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminId: varchar('admin_id', { length: 32 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  role: varchar('role', { length: 20 }).notNull(),
  // Role values: 'super_admin', 'moderator', 'analyst'

  isActive: boolean('is_active').default(true),
  createdBy: uuid('created_by').references((): AnyPgColumn => adminUsers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastLogin: timestamp('last_login'),
});

// ============================================
// ADMIN ACTIONS TABLE (Audit Log)
// ============================================
export const adminActions = pgTable('admin_actions', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminId: uuid('admin_id').references(() => adminUsers.id).notNull(),
  actionType: varchar('action_type', { length: 50 }).notNull(),
  targetType: varchar('target_type', { length: 20 }).notNull(),
  targetId: uuid('target_id').notNull(),
  notes: text('notes'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================
// PROBLEM MODERATION TABLE
// ============================================
export const problemModeration = pgTable('problem_moderation', {
  id: uuid('id').primaryKey().defaultRandom(),
  problemId: uuid('problem_id').references(() => problems.id).notNull(),
  reviewedBy: uuid('reviewed_by').references(() => adminUsers.id).notNull(),
  status: varchar('status', { length: 20 }).notNull(),
  // Status values: 'approved', 'rejected'

  adminNotes: text('admin_notes'),
  rejectionReason: text('rejection_reason'),
  reviewedAt: timestamp('reviewed_at').defaultNow().notNull(),
});

// ============================================
// RELATIONS
// ============================================
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  sessions: many(userSessions),
  problems: many(problems),
  comments: many(comments),
  commentUpvotes: many(commentUpvotes),
  savedProblems: many(userSavedProblems),
  profileEngagements: many(problemEngagements),
  profileUpvotes: many(problemUpvotes),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

export const problemsRelations = relations(problems, ({ one, many }) => ({
  author: one(users, {
    fields: [problems.authorId],
    references: [users.id],
  }),
  moderations: many(problemModeration),
  comments: many(comments),
  savedBy: many(userSavedProblems),
  upvotes: many(problemUpvotes),
  engagements: many(problemEngagements),
  sources: many(problemSources),
}));

export const sourceInstitutionsRelations = relations(sourceInstitutions, ({ many }) => ({
  problems: many(problemSources),
}));

export const problemSourcesRelations = relations(problemSources, ({ one }) => ({
  problem: one(problems, {
    fields: [problemSources.problemId],
    references: [problems.id],
  }),
  sourceInstitution: one(sourceInstitutions, {
    fields: [problemSources.sourceInstitutionId],
    references: [sourceInstitutions.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  problem: one(problems, {
    fields: [comments.problemId],
    references: [problems.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: 'commentReplies',
  }),
  replies: many(comments, { relationName: 'commentReplies' }),
  upvotedBy: many(commentUpvotes),
}));

export const commentUpvotesRelations = relations(commentUpvotes, ({ one }) => ({
  comment: one(comments, {
    fields: [commentUpvotes.commentId],
    references: [comments.id],
  }),
  user: one(users, {
    fields: [commentUpvotes.userId],
    references: [users.id],
  }),
}));

export const userSavedProblemsRelations = relations(userSavedProblems, ({ one }) => ({
  user: one(users, {
    fields: [userSavedProblems.userId],
    references: [users.id],
  }),
  problem: one(problems, {
    fields: [userSavedProblems.problemId],
    references: [problems.id],
  }),
}));

export const problemUpvotesRelations = relations(problemUpvotes, ({ one }) => ({
  user: one(users, {
    fields: [problemUpvotes.userId],
    references: [users.id],
  }),
  problem: one(problems, {
    fields: [problemUpvotes.problemId],
    references: [problems.id],
  }),
}));

export const problemEngagementsRelations = relations(problemEngagements, ({ one }) => ({
  user: one(users, {
    fields: [problemEngagements.userId],
    references: [users.id],
  }),
  problem: one(problems, {
    fields: [problemEngagements.problemId],
    references: [problems.id],
  }),
}));

export const adminUsersRelations = relations(adminUsers, ({ one, many }) => ({
  createdByAdmin: one(adminUsers, {
    fields: [adminUsers.createdBy],
    references: [adminUsers.id],
  }),
  actions: many(adminActions),
  moderations: many(problemModeration),
}));

export const problemModerationRelations = relations(problemModeration, ({ one }) => ({
  problem: one(problems, {
    fields: [problemModeration.problemId],
    references: [problems.id],
  }),
  admin: one(adminUsers, {
    fields: [problemModeration.reviewedBy],
    references: [adminUsers.id],
  }),
}));

export const adminActionsRelations = relations(adminActions, ({ one }) => ({
  admin: one(adminUsers, {
    fields: [adminActions.adminId],
    references: [adminUsers.id],
  }),
}));
