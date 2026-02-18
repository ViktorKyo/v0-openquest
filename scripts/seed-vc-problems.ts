/**
 * Seed script: Insert VC partner problems into the database.
 *
 * Usage:
 *   export $(grep -v '^#' .env.local | xargs) && npx tsx scripts/seed-vc-problems.ts
 *
 * Idempotent — safe to run multiple times.
 */

import postgres from 'postgres';
import { ycRfsProblems, ycAuthor } from '../data/yc-rfs-problems';
import { weekendFundProblems, weekendFundAuthor } from '../data/weekend-fund-problems';
import { convictionProblems, convictionAuthor } from '../data/conviction-problems';
import { arkInvestProblems, arkInvestAuthor } from '../data/ark-invest-problems';
import { pathlightProblems, pathlightAuthor } from '../data/pathlight-problems';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run with: export $(grep -v "^#" .env.local | xargs) && npx tsx scripts/seed-vc-problems.ts');
  process.exit(1);
}

const sql = postgres(DATABASE_URL);

// ---------------------------------------------------------------------------
// Category slug → display name mapping (from data/mock-problems.ts)
// ---------------------------------------------------------------------------
const CATEGORY_MAP: Record<string, string> = {
  'future-of-work': 'Future of Work',
  'ai-infrastructure': 'AI & Infrastructure',
  moonshots: 'Moonshots',
  'creator-economy': 'Creator Economy',
  longevity: 'Longevity',
  'rebuild-money': 'Rebuild Money',
  'climate-tech': 'Climate Tech',
  'world-of-atoms': 'World of Atoms',
  'niche-markets': 'Niche Markets',
  other: 'Other',
};

function normalizeCategory(raw: string): string {
  // If it's already a display name (has spaces or &), return as-is
  if (raw.includes(' ') || raw.includes('&')) return raw;
  return CATEGORY_MAP[raw] || raw;
}

// ---------------------------------------------------------------------------
// Institutional accounts
// ---------------------------------------------------------------------------
interface InstitutionalAccount {
  name: string;
  email: string;
}

const ACCOUNTS: InstitutionalAccount[] = [
  { name: 'Y Combinator', email: 'yc@openquest.internal' },
  { name: 'Weekend Fund', email: 'weekendfund@openquest.internal' },
  { name: 'Conviction', email: 'conviction@openquest.internal' },
  { name: 'ARK Invest', email: 'ark@openquest.internal' },
  { name: 'Pathlight Ventures', email: 'pathlight@openquest.internal' },
];

async function ensureUser(account: InstitutionalAccount): Promise<string> {
  // Check if user already exists
  const [existing] = await sql`
    SELECT id FROM users WHERE email = ${account.email} LIMIT 1
  `;
  if (existing) return existing.id;

  // Create new user
  const [created] = await sql`
    INSERT INTO users (email, name) VALUES (${account.email}, ${account.name}) RETURNING id
  `;
  console.log(`  Created user: ${account.name} (${created.id})`);
  return created.id;
}

// ---------------------------------------------------------------------------
// Problem insertion (idempotent — skips if title+author already exists)
// ---------------------------------------------------------------------------
interface ProblemRow {
  title: string;
  elevatorPitch: string;
  fullDescription: string;
  category: string;
  industryTags: string[];
  authorId: string;
  upvotes: number;
  commentCount: number;
  builderCount: number;
  investorCount: number;
  createdAt: Date;
  involvement: string;
}

async function insertProblems(problems: ProblemRow[]): Promise<number> {
  let inserted = 0;
  for (const p of problems) {
    // Check for existing problem with same title and author
    const [existing] = await sql`
      SELECT id FROM problems WHERE title = ${p.title} AND author_id = ${p.authorId} LIMIT 1
    `;
    if (existing) continue;

    await sql`
      INSERT INTO problems (
        title, elevator_pitch, full_description, category, industry_tags,
        author_id, is_anonymous, status, involvement,
        upvotes, comment_count, builder_count, investor_count,
        created_at, published_at, updated_at
      ) VALUES (
        ${p.title}, ${p.elevatorPitch}, ${p.fullDescription},
        ${p.category}, ${JSON.stringify(p.industryTags)}::jsonb,
        ${p.authorId}, false, 'approved', ${p.involvement},
        ${p.upvotes}, ${p.commentCount}, ${p.builderCount}, ${p.investorCount},
        ${p.createdAt}, ${p.createdAt}, ${p.createdAt}
      )
    `;
    inserted++;
  }
  return inserted;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Seeding VC partner problems...\n');

  // 1. Create institutional user accounts
  console.log('Step 1: Ensuring institutional user accounts...');
  const userIds: Record<string, string> = {};
  for (const account of ACCOUNTS) {
    userIds[account.name] = await ensureUser(account);
  }
  console.log('  User IDs:', userIds, '\n');

  const DAY = 24 * 60 * 60 * 1000;

  // 2. Seed YC problems
  console.log('Step 2: Seeding Y Combinator problems...');
  const ycRows: ProblemRow[] = ycRfsProblems.map((p, i) => ({
    title: p.title,
    elevatorPitch: p.elevatorPitch,
    fullDescription: p.fullDescription,
    category: normalizeCategory(p.category),
    industryTags: p.industryTags,
    authorId: userIds['Y Combinator'],
    upvotes: 150 + i * 20,
    commentCount: 10 + i * 3,
    builderCount: 5 + i * 2,
    investorCount: 8 + i,
    createdAt: new Date(Date.now() - (i + 1) * DAY),
    involvement: 'just-sharing',
  }));
  const ycInserted = await insertProblems(ycRows);
  console.log(`  Inserted ${ycInserted}/${ycRfsProblems.length} YC problems\n`);

  // 3. Seed Weekend Fund problems
  console.log('Step 3: Seeding Weekend Fund problems...');
  const wfRows: ProblemRow[] = weekendFundProblems.map((p, i) => ({
    title: p.title,
    elevatorPitch: p.elevatorPitch,
    fullDescription: p.fullDescription,
    category: normalizeCategory(p.category),
    industryTags: p.industryTags,
    authorId: userIds['Weekend Fund'],
    upvotes: 120 + i * 15,
    commentCount: 8 + i * 2,
    builderCount: 3 + i,
    investorCount: 6 + i,
    createdAt: new Date(p.publishedDate),
    involvement: 'just-sharing',
  }));
  const wfInserted = await insertProblems(wfRows);
  console.log(`  Inserted ${wfInserted}/${weekendFundProblems.length} Weekend Fund problems\n`);

  // 4. Seed Conviction problems
  console.log('Step 4: Seeding Conviction problems...');
  const convRows: ProblemRow[] = convictionProblems.map((p, i) => ({
    title: p.title,
    elevatorPitch: p.elevatorPitch,
    fullDescription: p.fullDescription,
    category: normalizeCategory(p.category),
    industryTags: p.industryTags,
    authorId: userIds['Conviction'],
    upvotes: 100 + i * 12,
    commentCount: 6 + i * 2,
    builderCount: 2 + i,
    investorCount: 4 + i,
    createdAt: new Date(p.publishedDate),
    involvement: 'just-sharing',
  }));
  const convInserted = await insertProblems(convRows);
  console.log(`  Inserted ${convInserted}/${convictionProblems.length} Conviction problems\n`);

  // 5. Seed ARK Invest problems
  console.log('Step 5: Seeding ARK Invest problems...');
  const arkRows: ProblemRow[] = arkInvestProblems.map((p, i) => ({
    title: p.title,
    elevatorPitch: p.elevatorPitch,
    fullDescription: p.fullDescription,
    category: normalizeCategory(p.category),
    industryTags: p.industryTags,
    authorId: userIds['ARK Invest'],
    upvotes: 90 + i * 10,
    commentCount: 5 + i * 2,
    builderCount: 2 + i,
    investorCount: 5 + i,
    createdAt: new Date(p.publishedDate),
    involvement: 'just-sharing',
  }));
  const arkInserted = await insertProblems(arkRows);
  console.log(`  Inserted ${arkInserted}/${arkInvestProblems.length} ARK Invest problems\n`);

  // 6. Seed Pathlight problems
  console.log('Step 6: Seeding Pathlight Ventures problems...');
  const plRows: ProblemRow[] = pathlightProblems.map((p, i) => ({
    title: p.title,
    elevatorPitch: p.elevatorPitch,
    fullDescription: p.fullDescription,
    category: normalizeCategory(p.category),
    industryTags: p.industryTags,
    authorId: userIds['Pathlight Ventures'],
    upvotes: 80 + i * 8,
    commentCount: 4 + i * 2,
    builderCount: 1 + i,
    investorCount: 3 + i,
    createdAt: new Date(p.publishedDate),
    involvement: 'just-sharing',
  }));
  const plInserted = await insertProblems(plRows);
  console.log(`  Inserted ${plInserted}/${pathlightProblems.length} Pathlight problems\n`);

  // Summary
  const total = ycInserted + wfInserted + convInserted + arkInserted + plInserted;
  console.log(`Done! Inserted ${total} total problems.`);

  await sql.end();
}

main().catch((err) => {
  console.error('Seed script failed:', err);
  sql.end().then(() => process.exit(1));
});
