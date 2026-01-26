import postgres from 'postgres';
import { randomUUID } from 'crypto';
import { ycRfsProblems } from '../data/yc-rfs-problems.ts';
import { weekendFundProblems } from '../data/weekend-fund-problems.ts';

const sql = postgres(process.env.DATABASE_URL);

async function seedAllProblems() {
  try {
    console.log('Seeding all problems from YC and Weekend Fund...\n');

    // Create YC author
    const ycAuthorId = randomUUID();
    await sql`
      INSERT INTO users (id, email, name, created_at)
      VALUES (
        ${ycAuthorId},
        'contact@ycombinator.com',
        'Y Combinator',
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET id = EXCLUDED.id
      RETURNING id
    `;
    console.log('✓ Created YC author\n');

    // Create Weekend Fund author
    const wfAuthorId = randomUUID();
    await sql`
      INSERT INTO users (id, email, name, created_at)
      VALUES (
        ${wfAuthorId},
        'hello@weekend.fund',
        'Weekend Fund',
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET id = EXCLUDED.id
      RETURNING id
    `;
    console.log('✓ Created Weekend Fund author\n');

    // Seed YC RFS problems
    console.log(`Seeding ${ycRfsProblems.length} YC RFS problems...`);
    for (const problem of ycRfsProblems) {
      await sql`
        INSERT INTO problems (
          id, title, elevator_pitch, full_description, category, status,
          author_id, upvotes, comment_count, created_at
        )
        VALUES (
          gen_random_uuid(),
          ${problem.title},
          ${problem.elevatorPitch},
          ${problem.fullDescription},
          ${problem.category},
          'approved',
          ${ycAuthorId},
          ${Math.floor(Math.random() * 100)},
          ${Math.floor(Math.random() * 30)},
          NOW()
        )
        ON CONFLICT (id) DO NOTHING
      `;
      console.log(`  ✓ ${problem.title.substring(0, 60)}...`);
    }

    // Seed Weekend Fund problems
    console.log(`\nSeeding ${weekendFundProblems.length} Weekend Fund problems...`);
    for (const problem of weekendFundProblems) {
      await sql`
        INSERT INTO problems (
          id, title, elevator_pitch, full_description, category, status,
          author_id, upvotes, comment_count, created_at
        )
        VALUES (
          gen_random_uuid(),
          ${problem.title},
          ${problem.elevatorPitch},
          ${problem.fullDescription},
          ${problem.category},
          'approved',
          ${wfAuthorId},
          ${Math.floor(Math.random() * 100)},
          ${Math.floor(Math.random() * 30)},
          NOW()
        )
        ON CONFLICT (id) DO NOTHING
      `;
      console.log(`  ✓ ${problem.title.substring(0, 60)}...`);
    }

    const [countResult] = await sql`SELECT COUNT(*)::int as total FROM problems`;
    console.log(`\n✅ Successfully seeded problems!`);
    console.log(`Total problems in database: ${countResult.total}`);

    await sql.end();
  } catch (error) {
    console.error('Error seeding problems:', error);
    process.exit(1);
  }
}

seedAllProblems();
