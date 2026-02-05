import { pgTable, uuid, varchar, text, boolean, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';
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
// PROBLEMS TABLE
// ============================================
export const problems = pgTable('problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 500 }).notNull(),
  elevatorPitch: text('elevator_pitch').notNull(),
  fullDescription: text('full_description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  industryTags: jsonb('industry_tags').$type<string[]>(),

  // Author info
  authorId: uuid('author_id').references(() => users.id),
  isAnonymous: boolean('is_anonymous').default(false),

  // Status
  status: varchar('status', { length: 20 }).notNull().default('pending_review'),
  // Status values: 'pending_review', 'published', 'rejected', 'archived', 'being_built', 'solved'

  // Engagement metrics
  upvotes: integer('upvotes').default(0),
  commentCount: integer('comment_count').default(0),
  builderCount: integer('builder_count').default(0),
  investorCount: integer('investor_count').default(0),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
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
  createdBy: uuid('created_by').references(() => adminUsers.id),
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
export const usersRelations = relations(users, ({ many }) => ({
  problems: many(problems),
  comments: many(comments),
  commentUpvotes: many(commentUpvotes),
}));

export const problemsRelations = relations(problems, ({ one, many }) => ({
  author: one(users, {
    fields: [problems.authorId],
    references: [users.id],
  }),
  moderations: many(problemModeration),
  comments: many(comments),
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
