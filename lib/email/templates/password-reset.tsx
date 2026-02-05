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

interface PasswordResetEmailProps {
  userName?: string;
  resetUrl: string;
}

export function PasswordResetEmail({
  userName,
  resetUrl,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your OpenQuest password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset Your Password</Heading>

          <Text style={text}>
            {userName ? `Hi ${userName},` : 'Hello,'}
          </Text>

          <Text style={text}>
            We received a request to reset your password for your OpenQuest account.
            Click the button below to choose a new password.
          </Text>

          <Section style={buttonContainer}>
            <Button href={resetUrl} style={button}>
              Reset Password
            </Button>
          </Section>

          <Section style={warningSection}>
            <Text style={warningText}>
              This link will expire in 1 hour for security reasons.
            </Text>
          </Section>

          <Text style={text}>
            If you didn't request a password reset, you can safely ignore this email.
            Your password will remain unchanged.
          </Text>

          <Text style={footer}>
            For security reasons, we recommend:
          </Text>
          <ul style={list}>
            <li>Using a strong, unique password</li>
            <li>Not sharing your password with anyone</li>
            <li>Logging out from shared devices</li>
          </ul>

          <Text style={footer}>
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

const warningSection = {
  backgroundColor: '#fffbeb',
  borderRadius: '6px',
  padding: '12px 16px',
  margin: '24px 0',
  borderLeft: '4px solid #f59e0b',
};

const warningText = {
  color: '#92400e',
  fontSize: '14px',
  margin: '0',
};

const list = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '22px',
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

export default PasswordResetEmail;
