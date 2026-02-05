import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ProblemApprovedEmail } from './templates/problem-approved';
import { ProblemRejectedEmail } from './templates/problem-rejected';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ModerationEmailParams {
  to: string;
  action: 'approve' | 'reject';
  problemTitle: string;
  problemId?: string;
  notes?: string;
  authorName?: string;
}

export async function sendModerationEmail({
  to,
  action,
  problemTitle,
  problemId,
  notes,
  authorName,
}: ModerationEmailParams) {
  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_api_key_here') {
      console.warn('Resend API key not configured. Email not sent.');
      return { success: false, error: 'Email service not configured' };
    }

    const subject =
      action === 'approve'
        ? '🎉 Your problem has been approved!'
        : 'Update on your problem submission';

    const html =
      action === 'approve'
        ? render(
            ProblemApprovedEmail({
              authorName,
              problemTitle,
              problemId: problemId || '',
            })
          )
        : render(
            ProblemRejectedEmail({
              authorName,
              problemTitle,
              rejectionReason: notes || 'No specific reason provided.',
            })
          );

    const data = await resend.emails.send({
      from: 'OpenQuest <notifications@openquest.app>',
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
