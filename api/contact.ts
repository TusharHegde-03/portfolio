import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  if (!resendApiKey) {
    return res.status(500).json({ success: false, error: 'RESEND_API_KEY environment variable is not configured.' });
  }

  const resend = new Resend(resendApiKey);
  const { name, email, message } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Message content cannot be empty.' });
  }

  try {
    const recipient = process.env.CONTACT_RECIPIENT || 'tusharhegde.dev@gmail.com';
    const emailResponse = await resend.emails.send({
      from: 'Tushiro Portfolio <onboarding@resend.dev>',
      to: [recipient],
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #00f0ff; background: #050a14; padding: 12px 18px; border-radius: 8px;">New Contact Message Received</h2>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message Content:</strong></p>
          <blockquote style="background: #f4f6f8; border-left: 4px solid #00f0ff; padding: 15px; margin: 10px 0; border-radius: 4px;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      message: 'Transmission successfully sent. Thank you for reaching out!',
      data: emailResponse
    });
  } catch (err: any) {
    console.error('Vercel Resend Error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch email transmission.',
      details: err?.message || err
    });
  }
}
