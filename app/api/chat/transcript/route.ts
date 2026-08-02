import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_ADDRESS, LODGE_EMAIL, ADMIN_EMAIL } from '@/lib/email'
import type { ChatMessage, LeadData } from '@/lib/chat'

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  let body: { messages: ChatMessage[]; lead?: LeadData; page?: string; formSubmitted?: boolean }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { messages, lead, page, formSubmitted } = body
  if (!Array.isArray(messages) || messages.length < 2) {
    return NextResponse.json({ ok: true })
  }

  const name = lead?.name ?? 'Anonymous visitor'
  const hasLead = !!(lead && (lead.name || lead.email || lead.phone))
  const subject = `Lodge chat — ${name}${hasLead ? ' ✓ contact captured' : ''}${page ? ` [${page}]` : ''}`

  const transcript = messages
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Lodge Bot'}: ${m.content}`)
    .join('\n\n')

  const leadHtml = hasLead
    ? `<div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#166534;">Contact Captured</p>
        ${lead!.name ? `<p style="margin:4px 0;font-size:14px;"><strong>Name:</strong> ${escHtml(lead!.name)}</p>` : ''}
        ${lead!.email ? `<p style="margin:4px 0;font-size:14px;"><strong>Email:</strong> <a href="mailto:${escHtml(lead!.email)}" style="color:#1d4ed8;">${escHtml(lead!.email)}</a></p>` : ''}
        ${lead!.phone ? `<p style="margin:4px 0;font-size:14px;"><strong>Phone:</strong> ${escHtml(lead!.phone)}</p>` : ''}
        ${lead!.subject ? `<p style="margin:4px 0;font-size:14px;"><strong>Interest:</strong> ${escHtml(lead!.subject)}</p>` : ''}
        ${lead!.message ? `<p style="margin:4px 0;font-size:14px;"><strong>Message:</strong> ${escHtml(lead!.message)}</p>` : ''}
      </div>`
    : ''

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;color:#111;">
      <div style="background:#1a2744;padding:20px 28px;border-radius:8px 8px 0 0;border-bottom:2px solid #c8a84b;">
        <p style="color:#c8a84b;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 4px;">Chat Transcript</p>
        <h2 style="color:#fff;margin:0;font-size:18px;font-family:Georgia,serif;">Englewood Lodge No. 360</h2>
        <p style="color:rgba(255,255,255,0.45);margin:6px 0 0;font-size:12px;">
          ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' })} ET
          ${page ? ` · ${escHtml(page)}` : ''}
          · ${messages.length} message${messages.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px 28px;">
        ${leadHtml}
        <pre style="white-space:pre-wrap;word-break:break-word;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;line-height:1.75;color:#374151;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:6px;padding:16px;margin:0;">${escHtml(transcript)}</pre>
      </div>
    </div>`

  try {
    await resend.emails.send(
      formSubmitted
        ? { from: FROM_ADDRESS, to: [LODGE_EMAIL], bcc: [ADMIN_EMAIL], subject, html }
        : { from: FROM_ADDRESS, to: [ADMIN_EMAIL], subject, html }
    )
  } catch {
    // fire-and-forget
  }

  return NextResponse.json({ ok: true })
}
