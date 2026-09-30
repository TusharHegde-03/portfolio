import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { projectsData } from '../shared/projects.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

app.use(cors());
app.use(express.json());

// API Health Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Tushiro Portfolio API',
    resendConfigured: !!resend,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Projects Endpoint
app.get('/api/projects', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: projectsData.length,
    data: projectsData
  });
});

// Contact Submission Endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  // Input Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Message content cannot be empty.' });
  }

  console.log('----------------------------------------------------');
  console.log('[TUSHIRO API] New Contact Transmission Received:');
  console.log(`- Name:    ${name}`);
  console.log(`- Email:   ${email}`);
  console.log(`- Message: ${message}`);
  console.log('----------------------------------------------------');

  try {
    if (resend) {
      const recipient = process.env.CONTACT_RECIPIENT || 'tusharhegde.dev@gmail.com';
      console.log(`[TUSHIRO API] Dispatching email via Resend to ${recipient}...`);

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

      console.log('[TUSHIRO API] Resend email dispatched successfully:', emailResponse);
    } else {
      console.log('[TUSHIRO API] Resend API Key missing. Logged message to console.');
    }

    return res.status(200).json({
      success: true,
      message: 'Transmission successfully sent. Thank you for reaching out!'
    });
  } catch (err: any) {
    console.error('[TUSHIRO API] Resend Email Error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch email transmission.',
      details: err?.message || err
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ [Tushiro Server] Running on http://localhost:${PORT}`);
});
