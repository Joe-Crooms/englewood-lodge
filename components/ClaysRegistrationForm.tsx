'use client'

import { useState } from 'react'

type Tab = 'individual' | 'team' | 'sponsor'

export default function ClaysRegistrationForm() {
  const [tab, setTab] = useState<Tab>('individual')

  function openMailto(type: Tab) {
    let subject = 'Clays for Vets – '
    let body = 'CLAYS FOR VETS — MARCH 21, 2026\n'
    body += '=================================\n\n'

    if (type === 'individual') {
      const name = (document.getElementById('c-name') as HTMLInputElement)?.value.trim() ?? ''
      const phone = (document.getElementById('c-phone') as HTMLInputElement)?.value.trim() ?? ''
      subject += `Individual Registration – ${name || 'Shooter'}`
      body += `REGISTRATION TYPE: Individual ($125)\n\nName: ${name || '—'}\nPhone: ${phone || '—'}\n`
    } else if (type === 'team') {
      const team = (document.getElementById('c-team') as HTMLInputElement)?.value.trim() ?? ''
      const phone = (document.getElementById('c-tphone') as HTMLInputElement)?.value.trim() ?? ''
      const p1 = (document.getElementById('c-p1') as HTMLInputElement)?.value.trim() ?? ''
      const p2 = (document.getElementById('c-p2') as HTMLInputElement)?.value.trim() ?? ''
      const p3 = (document.getElementById('c-p3') as HTMLInputElement)?.value.trim() ?? ''
      const p4 = (document.getElementById('c-p4') as HTMLInputElement)?.value.trim() ?? ''
      subject += `Team Registration – ${team || 'Team'}`
      body += `REGISTRATION TYPE: Team of 4 ($500)\n\nTeam Name: ${team || '—'}\nContact Phone: ${phone || '—'}\n\nShooters:\n`
      if (p1) body += `  Shooter 1: ${p1}\n`
      if (p2) body += `  Shooter 2: ${p2}\n`
      if (p3) body += `  Shooter 3: ${p3}\n`
      if (p4) body += `  Shooter 4: ${p4}\n`
    } else {
      const spName = (document.getElementById('c-spname') as HTMLInputElement)?.value.trim() ?? ''
      const contact = (document.getElementById('c-spcontact') as HTMLInputElement)?.value.trim() ?? ''
      const phone = (document.getElementById('c-spphone') as HTMLInputElement)?.value.trim() ?? ''
      const level = (document.getElementById('c-splevel') as HTMLSelectElement)?.value ?? ''
      subject += `Sponsorship – ${level}${spName ? ' – ' + spName : ''}`
      body += `REGISTRATION TYPE: ${level}\n\nSponsor: ${spName || '—'}\nContact: ${contact || '—'}\nPhone: ${phone || '—'}\n`
    }

    window.location.href =
      'mailto:claysforvets@gmail.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body)
  }

  const tabStyle = (t: Tab): React.CSSProperties => ({
    fontFamily: 'var(--font-display)',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    padding: '10px 16px',
    borderRadius: 4,
    border: tab === t ? '2px solid #4a1a4a' : '2px solid var(--border)',
    background: tab === t ? '#4a1a4a' : 'white',
    color: tab === t ? '#c8a84b' : 'var(--text-light)',
    cursor: 'pointer',
    minHeight: 44,
    WebkitTapHighlightColor: 'transparent',
  })

  const field = (id: string, label: string, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label>{label}</label>
      <input id={id} type={type} placeholder={placeholder} />
    </div>
  )

  return (
    <div style={{
      background: 'var(--cream)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      padding: '32px 28px',
      marginBottom: 8,
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <button style={tabStyle('individual')} onClick={() => setTab('individual')}>Individual – $125</button>
        <button style={tabStyle('team')} onClick={() => setTab('team')}>Team – $500</button>
        <button style={tabStyle('sponsor')} onClick={() => setTab('sponsor')}>Sponsorship</button>
      </div>

      {tab === 'individual' && (
        <>
          {field('c-name', 'Shooter Name', 'text', 'Full name')}
          {field('c-phone', 'Phone', 'tel', '(941) 000-0000')}
          <button
            className="btn"
            onClick={() => openMailto('individual')}
            style={{
              width: '100%', marginTop: 8, minHeight: 50,
              fontSize: '0.88rem', letterSpacing: '0.06em',
              background: '#4a1a4a', color: '#c8a84b',
              border: 'none', borderRadius: 4, cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 700,
            }}
          >
            📧 &nbsp;Email Registration ($125)
          </button>
        </>
      )}

      {tab === 'team' && (
        <>
          {field('c-team', 'Team Name', 'text', 'Team name')}
          {field('c-tphone', 'Contact Phone', 'tel', '(941) 000-0000')}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#6b2d6b', margin: '16px 0 8px', paddingBottom: 6, borderBottom: '1px solid var(--border)', textTransform: 'uppercase' }}>
            Shooters (up to 4)
          </div>
          {field('c-p1', 'Shooter 1', 'text', 'Shooter 1 name')}
          {field('c-p2', 'Shooter 2', 'text', 'Shooter 2 name')}
          {field('c-p3', 'Shooter 3', 'text', 'Shooter 3 name')}
          {field('c-p4', 'Shooter 4', 'text', 'Shooter 4 name')}
          <button
            className="btn"
            onClick={() => openMailto('team')}
            style={{
              width: '100%', marginTop: 8, minHeight: 50,
              fontSize: '0.88rem', letterSpacing: '0.06em',
              background: '#4a1a4a', color: '#c8a84b',
              border: 'none', borderRadius: 4, cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 700,
            }}
          >
            📧 &nbsp;Email Registration ($500)
          </button>
        </>
      )}

      {tab === 'sponsor' && (
        <>
          {field('c-spname', 'Sponsor Name / Organization', 'text', 'Business or individual name')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {field('c-spcontact', 'Contact Name', 'text', 'Contact person')}
            {field('c-spphone', 'Phone', 'tel', '(941) 000-0000')}
          </div>
          <div className="form-group">
            <label>Sponsorship Level</label>
            <select id="c-splevel">
              <option>Shooting Station Sponsor – $200</option>
              <option>Supporting Sponsor – $750</option>
              <option>Event Sponsor – $1,500</option>
            </select>
          </div>
          <button
            className="btn"
            onClick={() => openMailto('sponsor')}
            style={{
              width: '100%', marginTop: 8, minHeight: 50,
              fontSize: '0.88rem', letterSpacing: '0.06em',
              background: '#4a1a4a', color: '#c8a84b',
              border: 'none', borderRadius: 4, cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 700,
            }}
          >
            📧 &nbsp;Email Sponsorship Registration
          </button>
        </>
      )}

      <p style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
        Tapping the button opens your email app with your registration pre-filled.
      </p>
    </div>
  )
}
