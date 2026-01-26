import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL);

async function resetAdmins() {
  try {
    console.log('Checking for existing admin users...');

    const admins = await sql`SELECT admin_id, name, email, role FROM admin_users`;

    if (admins.length > 0) {
      console.log('\nFound existing admin users:');
      admins.forEach(admin => {
        console.log(`  - ${admin.admin_id} (${admin.role})`);
      });

      console.log('\nDeleting all admin users...');
      await sql`DELETE FROM admin_users`;
      console.log('✅ All admin users deleted. You can now run setup again.');
    } else {
      console.log('No admin users found. Setup page should work.');
    }

    await sql.end();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetAdmins();
