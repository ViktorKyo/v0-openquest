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

interface ProblemRejectedEmailProps {
  authorName?: string;
  problemTitle: string;
  rejectionReason: string;
}

export function ProblemRejectedEmail({
  authorName,
  problemTitle,
  rejectionReason,
}: ProblemRejectedEmailProps) {
  const submitUrl = `${process.env.NEXT_PUBLIC_APP_URL}/submit`;

  return (
    <Html>
      <Head />
      <Preview>Update on your problem submission to OpenQuest</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Problem Submission Update</Heading>

          <Text style={text}>
            {authorName ? `Hi ${authorName},` : 'Hello,'}
          </Text>

          <Text style={text}>
            Thank you for submitting your problem to OpenQuest. After careful review, we're unable
            to approve your submission at this time.
          </Text>

          <Section style={problemSection}>
            <Text style={problemTitleText}>{problemTitle}</Text>
          </Section>

          <Section style={reasonSection}>
            <Text style={reasonLabel}>Reason for Rejection:</Text>
            <Text style={reasonText}>{rejectionReason}</Text>
          </Section>

          <Text style={text}>
            We encourage you to review our submission guidelines and consider resubmitting with
            revisions that address the feedback above.
          </Text>

          <Section style={buttonContainer}>
            <Button href={submitUrl} style={button}>
              Submit a New Problem
            </Button>
          </Section>

          <Text style={text}>
            Common reasons for rejection:
          </Text>
          <ul style={list}>
            <li>Problem description is too vague or unclear</li>
            <li>Not aligned with OpenQuest's focus areas</li>
            <li>Duplicate of an existing problem</li>
            <li>Insufficient detail or context provided</li>
          </ul>

          <Text style={footer}>
            We appreciate your interest in OpenQuest. If you have questions about this decision,
            please don't hesitate to reach out.
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
  borderLeft: '4px solid #ef4444',
};

const problemTitleText = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
};

const reasonSection = {
  backgroundColor: '#fef2f2',
  borderRadius: '6px',
  padding: '20px',
  margin: '24px 0',
  border: '1px solid #fee2e2',
};

const reasonLabel = {
  color: '#991b1b',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const reasonText = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '24px',
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

export default ProblemRejectedEmail;
