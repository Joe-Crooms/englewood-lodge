import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_ADDRESS, LODGE_EMAIL, ADMIN_EMAIL } from '@/lib/email'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; phone?: string; subject?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { name, email, phone, subject, message } = body
  if (!name || !message) {
    return NextResponse.json({ ok: false, error: 'Name and message are required' }, { status: 400 })
  }

  const emailSubject = `Lodge inquiry — ${subject ?? 'General'} — ${name}`

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:580px;margin:0 auto;color:#2c2c2c;">
      <div style="background:#1a2744;padding:20px 28px;border-radius:8px 8px 0 0;border-bottom:2px solid #c8a84b;">
        <p style="color:#c8a84b;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 4px;font-family:Georgia,serif;">Lodge Inquiry</p>
        <h2 style="color:#fff;margin:0;font-size:18px;font-family:Georgia,serif;">Englewood Lodge No. 360</h2>
        <p style="color:rgba(255,255,255,0.45);margin:6px 0 0;font-size:12px;">
          ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' })} ET
        </p>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px 28px;background:#fff;">
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr>
            <td style="padding:6px 0;font-size:13px;font-weight:700;color:#1a2744;width:90px;vertical-align:top;">Name</td>
            <td style="padding:6px 0;font-size:13px;color:#2c2c2c;">${esc(name)}</td>
          </tr>
          ${email ? `<tr><td style="padding:6px 0;font-size:13px;font-weight:700;color:#1a2744;vertical-align:top;">Email</td><td style="padding:6px 0;font-size:13px;"><a href="mailto:${esc(email)}" style="color:#1d4ed8;">${esc(email)}</a></td></tr>` : ''}
          ${phone ? `<tr><td style="padding:6px 0;font-size:13px;font-weight:700;color:#1a2744;vertical-align:top;">Phone</td><td style="padding:6px 0;font-size:13px;color:#2c2c2c;">${esc(phone)}</td></tr>` : ''}
          <tr>
            <td style="padding:6px 0;font-size:13px;font-weight:700;color:#1a2744;vertical-align:top;">Subject</td>
            <td style="padding:6px 0;font-size:13px;color:#2c2c2c;">${esc(subject ?? 'General Inquiry')}</td>
          </tr>
        </table>
        <div style="background:#f5f0e8;border:1px solid #d4c4a0;border-radius:6px;padding:16px;font-size:13px;line-height:1.7;color:#2c2c2c;white-space:pre-wrap;">${esc(message)}</div>
      </div>
    </div>`

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: [LODGE_EMAIL, ADMIN_EMAIL],
      replyTo: email ?? undefined,
      subject: emailSubject,
      html,
    })
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
