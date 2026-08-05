'use client'

import { useState } from 'react'

const SUBJECTS = [
  'General Inquiry',
  'Interested in Joining',
  'Event Question',
  'Sponsorship Inquiry',
  'Other',
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!name || !message || status === 'sending') return
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{
        background: 'rgba(200,168,75,0.1)',
        border: '1px solid rgba(200,168,75,0.35)',
        borderRadius: 8,
        padding: '36px 28px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--gold)',
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: 10,
        }}>Message Sent</p>
        <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.92rem', lineHeight: 1.7 }}>
          Thank you, {name}. A lodge member will be in touch with you soon.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(200,168,75,0.2)',
        borderRadius: 8,
        padding: '28px 24px',
      }}
    >
      <h3 style={{
        fontFamily: 'var(--font-display)',
        color: 'var(--cream)',
        fontSize: '1rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        marginBottom: 20,
      }}>
        Send Us a Message
      </h3>

      <div className="form-group">
        <label style={{ color: 'rgba(200,168,75,0.8)' }}>Your Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
          required
          style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)', borderColor: 'rgba(200,168,75,0.25)' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="form-group">
          <label style={{ color: 'rgba(200,168,75,0.8)' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@email.com"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)', borderColor: 'rgba(200,168,75,0.25)' }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'rgba(200,168,75,0.8)' }}>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(941) 000-0000"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)', borderColor: 'rgba(200,168,75,0.25)' }}
          />
        </div>
      </div>

      <div className="form-group">
        <label style={{ color: 'rgba(200,168,75,0.8)' }}>Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)', borderColor: 'rgba(200,168,75,0.25)' }}
        >
          {SUBJECTS.map((s) => <option key={s} value={s} style={{ background: '#1a2744', color: 'var(--cream)' }}>{s}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label style={{ color: 'rgba(200,168,75,0.8)' }}>Message *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          required
          style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--cream)', borderColor: 'rgba(200,168,75,0.25)', minHeight: 110 }}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: 12 }}>
          Something went wrong. Please try emailing englewoodlodge360@gmail.com directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || !name || !message}
        style={{
          width: '100%',
          background: 'var(--gold)',
          color: 'var(--navy)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.88rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          padding: '14px',
          border: 'none',
          borderRadius: 4,
          cursor: status === 'sending' ? 'wait' : 'pointer',
          minHeight: 50,
          opacity: status === 'sending' || !name || !message ? 0.65 : 1,
          transition: 'opacity 0.2s, background 0.2s',
        }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message →'}
      </button>
    </form>
  )
}
