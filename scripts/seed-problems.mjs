import postgres from 'postgres';
import { randomUUID } from 'crypto';

const sql = postgres(process.env.DATABASE_URL);

async function seedProblems() {
  try {
    console.log('Seeding problems...\n');

    // First, create a sample user (author)
    const userId = randomUUID();
    await sql`
      INSERT INTO users (id, email, name, created_at)
      VALUES (
        ${userId},
        'demo@openquest.app',
        'Demo User',
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET id = EXCLUDED.id
      RETURNING id
    `;

    const problems = [
      {
        id: randomUUID(),
        title: 'YC Request for Startups: AI-Powered Developer Tools',
        elevatorPitch: 'Build next-generation AI tools that help developers write, debug, and optimize code more efficiently. Y Combinator is specifically looking for companies in this space.',
        fullDescription: 'Y Combinator is actively seeking startups building AI-powered developer tools. The focus is on tools that significantly improve developer productivity through intelligent code completion, automated debugging, code review assistance, and optimization suggestions. These tools should leverage modern LLMs and machine learning models to understand code context and provide meaningful assistance.',
        category: 'AI & Machine Learning',
        status: 'looking_for_builders',
        authorId: userId,
        upvotes: 45,
        commentCount: 12,
      },
      {
        id: randomUUID(),
        title: 'Weekend Fund: Sustainable Consumer Products',
        elevatorPitch: 'Create eco-friendly consumer products that replace everyday items with sustainable alternatives. Weekend Fund backs early-stage consumer companies making a positive environmental impact.',
        fullDescription: 'Weekend Fund is looking for consumer product companies focused on sustainability. This includes products made from recycled or biodegradable materials, reusable alternatives to single-use items, and innovative solutions that reduce environmental impact. The products should be both sustainable and commercially viable, with clear paths to market and customer adoption.',
        category: 'Consumer Products',
        status: 'looking_for_builders',
        authorId: userId,
        upvotes: 32,
        commentCount: 8,
      },
      {
        id: randomUUID(),
        title: 'YC Request for Startups: Climate Tech Solutions',
        elevatorPitch: 'Develop innovative technologies to combat climate change, including carbon capture, renewable energy, or sustainable agriculture solutions.',
        fullDescription: 'Y Combinator is seeking climate tech startups working on breakthrough technologies to address climate change. This includes carbon capture and storage, renewable energy innovations, sustainable agriculture technologies, green transportation solutions, and other technologies that can make a significant impact on reducing greenhouse gas emissions or adapting to climate change.',
        category: 'Climate & Energy',
        status: 'approved',
        authorId: userId,
        upvotes: 67,
        commentCount: 23,
      },
      {
        id: randomUUID(),
        title: 'Better Remote Work Collaboration Tools',
        elevatorPitch: 'Current remote work tools are fragmented and lack seamless integration. Build a unified platform that combines video, messaging, and project management in one intuitive interface.',
        fullDescription: 'Remote teams struggle with context switching between multiple tools for video calls, messaging, file sharing, and project management. There is an opportunity to build a unified platform that integrates these essential features into a seamless experience. The platform should reduce cognitive overhead, improve team communication, and increase productivity for distributed teams.',
        category: 'Productivity',
        status: 'pending_review',
        authorId: userId,
        upvotes: 28,
        commentCount: 5,
      },
      {
        id: randomUUID(),
        title: 'Healthcare Data Interoperability Platform',
        elevatorPitch: 'Enable seamless sharing of patient data between different healthcare providers and systems while maintaining HIPAA compliance and patient privacy.',
        fullDescription: 'Healthcare systems are often siloed, making it difficult to share patient data between providers, hospitals, and clinics. This creates inefficiencies, duplicated tests, and potentially dangerous gaps in patient care. A platform that enables secure, HIPAA-compliant data sharing while maintaining patient privacy could significantly improve healthcare outcomes and reduce costs.',
        category: 'Healthcare',
        status: 'approved',
        authorId: userId,
        upvotes: 51,
        commentCount: 15,
      },
    ];

    for (const problem of problems) {
      await sql`
        INSERT INTO problems (
          id, title, elevator_pitch, full_description, category, status,
          author_id, upvotes, comment_count, created_at
        )
        VALUES (
          ${problem.id},
          ${problem.title},
          ${problem.elevatorPitch},
          ${problem.fullDescription},
          ${problem.category},
          ${problem.status},
          ${problem.authorId},
          ${problem.upvotes},
          ${problem.commentCount},
          NOW()
        )
        ON CONFLICT (id) DO NOTHING
      `;

      console.log(`✓ Added: ${problem.title}`);
    }

    console.log(`\n✅ Successfully seeded ${problems.length} problems`);

    await sql.end();
  } catch (error) {
    console.error('Error seeding problems:', error);
    process.exit(1);
  }
}

seedProblems();
