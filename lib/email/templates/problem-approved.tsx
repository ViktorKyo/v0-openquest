import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface ProblemApprovedEmailProps {
  authorName?: string;
  problemTitle: string;
  problemId: string;
}

export function ProblemApprovedEmail({
  authorName,
  problemTitle,
  problemId,
}: ProblemApprovedEmailProps) {
  const problemUrl = `${process.env.NEXT_PUBLIC_APP_URL}/problem/${problemId}`;

  return (
    <Html>
      <Head />
      <Preview>Great news! Your problem has been approved on OpenQuest</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎉 Your Problem is Live!</Heading>

          <Text style={text}>
            {authorName ? `Hi ${authorName},` : 'Hello,'}
          </Text>

          <Text style={text}>
            Congratulations! Your problem submission has been approved and is now live on OpenQuest.
          </Text>

          <Section style={problemSection}>
            <Text style={problemTitleText}>{problemTitle}</Text>
          </Section>

          <Text style={text}>
            Your problem is now visible to our community of builders and investors who are ready to help
            solve real-world challenges.
          </Text>

          <Section style={buttonContainer}>
            <Button href={problemUrl} style={button}>
              View Your Problem
            </Button>
          </Section>

          <Text style={text}>
            Next steps:
          </Text>
          <ul style={list}>
            <li>Engage with comments and feedback from the community</li>
            <li>Connect with potential builders interested in solving your problem</li>
            <li>Update your problem as it progresses</li>
          </ul>

          <Text style={footer}>
            Thank you for contributing to OpenQuest!
            <br />
            <br />
            Best regards,
            <br />
            The OpenQuest Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
  borderRadius: '8px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const problemSection = {
  backgroundColor: '#f8fafc',
  borderRadius: '6px',
  padding: '20px',
  margin: '24px 0',
  borderLeft: '4px solid #3b82f6',
};

const problemTitleText = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const list = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  marginLeft: '20px',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '32px',
  paddingTop: '24px',
  borderTop: '1px solid #e6ebf1',
};

export default ProblemApprovedEmail;
