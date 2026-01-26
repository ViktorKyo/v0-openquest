import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL);

async function checkProblems() {
  try {
    console.log('Checking for problems in database...\n');

    const problemsList = await sql`
      SELECT id, title, status, created_at
      FROM problems
      ORDER BY created_at DESC
      LIMIT 10
    `;

    console.log(`Found ${problemsList.length} problems:\n`);

    problemsList.forEach((problem, index) => {
      console.log(`${index + 1}. ${problem.title}`);
      console.log(`   ID: ${problem.id}`);
      console.log(`   Status: ${problem.status}`);
      console.log(`   Created: ${problem.created_at}`);
      console.log('');
    });

    const [countResult] = await sql`SELECT COUNT(*)::int as total FROM problems`;
    console.log(`\nTotal problems in database: ${countResult.total}`);

    await sql.end();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkProblems();
