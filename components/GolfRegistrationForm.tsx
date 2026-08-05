'use client'

import { useState } from 'react'

type Tab = 'player' | 'team' | 'sponsor'

export default function GolfRegistrationForm() {
  const [tab, setTab] = useState<Tab>('player')

  function openMailto(type: Tab) {
    let subject = 'Golf Tournament – '
    let body = '6TH ANNUAL DUFFERS GOLF TOURNAMENT — MAY 16, 2026\n'
    body += '==================================================\n\n'

    if (type === 'player') {
      const name = (document.getElementById('g-name') as HTMLInputElement)?.value.trim() ?? ''
      const phone = (document.getElementById('g-phone') as HTMLInputElement)?.value.trim() ?? ''
      subject += `Individual Registration – ${name || 'Player'}`
      body += `REGISTRATION TYPE: Individual ($95)\n\nName: ${name || '—'}\nPhone: ${phone || '—'}\n`
    } else if (type === 'team') {
      const team = (document.getElementById('g-team') as HTMLInputElement)?.value.trim() ?? ''
      const phone = (document.getElementById('g-tphone') as HTMLInputElement)?.value.trim() ?? ''
      const p1 = (document.getElementById('g-p1') as HTMLInputElement)?.value.trim() ?? ''
      const p2 = (document.getElementById('g-p2') as HTMLInputElement)?.value.trim() ?? ''
      const p3 = (document.getElementById('g-p3') as HTMLInputElement)?.value.trim() ?? ''
      const p4 = (document.getElementById('g-p4') as HTMLInputElement)?.value.trim() ?? ''
      subject += `Team Registration – ${team || 'Team'}`
      body += `REGISTRATION TYPE: Team ($380)\n\nTeam Name: ${team || '—'}\nContact Phone: ${phone || '—'}\n\nPlayers:\n`
      if (p1) body += `  Player 1: ${p1}\n`
      if (p2) body += `  Player 2: ${p2}\n`
      if (p3) body += `  Player 3: ${p3}\n`
      if (p4) body += `  Player 4: ${p4}\n`
    } else {
      const spName = (document.getElementById('g-spname') as HTMLInputElement)?.value.trim() ?? ''
      const contact = (document.getElementById('g-spcontact') as HTMLInputElement)?.value.trim() ?? ''
      const phone = (document.getElementById('g-spphone') as HTMLInputElement)?.value.trim() ?? ''
      const level = (document.getElementById('g-splevel') as HTMLSelectElement)?.value ?? ''
      subject += `Sponsorship – ${level}${spName ? ' – ' + spName : ''}`
      body += `REGISTRATION TYPE: ${level}\n\nSponsor: ${spName || '—'}\nContact: ${contact || '—'}\nPhone: ${phone || '—'}\n`
    }

    window.location.href =
      'mailto:englewoodlodge360@gmail.com' +
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
    border: tab === t ? '2px solid #1a2744' : '2px solid var(--border)',
    background: tab === t ? 'var(--navy)' : 'white',
    color: tab === t ? 'var(--gold)' : 'var(--text-light)',
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
        <button style={tabStyle('player')} onClick={() => setTab('player')}>Individual – $95</button>
        <button style={tabStyle('team')} onClick={() => setTab('team')}>Team – $380</button>
        <button style={tabStyle('sponsor')} onClick={() => setTab('sponsor')}>Sponsorship</button>
      </div>

      {tab === 'player' && (
        <>
          {field('g-name', 'Player Name', 'text', 'Full name')}
          {field('g-phone', 'Phone', 'tel', '(941) 000-0000')}
          <button
            className="btn btn-gold"
            onClick={() => openMailto('player')}
            style={{ width: '100%', marginTop: 8, minHeight: 50, fontSize: '0.88rem', letterSpacing: '0.06em' }}
          >
            📧 &nbsp;Email Registration ($95)
          </button>
        </>
      )}

      {tab === 'team' && (
        <>
          {field('g-team', 'Team Name', 'text', 'Team name')}
          {field('g-tphone', 'Contact Phone', 'tel', '(941) 000-0000')}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#2d5a27', margin: '16px 0 8px', paddingBottom: 6, borderBottom: '1px solid var(--border)', textTransform: 'uppercase' }}>
            Players (up to 4)
          </div>
          {field('g-p1', 'Player 1', 'text', 'Player 1 name')}
          {field('g-p2', 'Player 2', 'text', 'Player 2 name')}
          {field('g-p3', 'Player 3', 'text', 'Player 3 name')}
          {field('g-p4', 'Player 4', 'text', 'Player 4 name')}
          <button
            className="btn btn-gold"
            onClick={() => openMailto('team')}
            style={{ width: '100%', marginTop: 8, minHeight: 50, fontSize: '0.88rem', letterSpacing: '0.06em' }}
          >
            📧 &nbsp;Email Registration ($380)
          </button>
        </>
      )}

      {tab === 'sponsor' && (
        <>
          {field('g-spname', 'Sponsor Name / Organization', 'text', 'Business or individual name')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {field('g-spcontact', 'Contact Name', 'text', 'Contact person')}
            {field('g-spphone', 'Phone', 'tel', '(941) 000-0000')}
          </div>
          <div className="form-group">
            <label>Sponsorship Level</label>
            <select id="g-splevel">
              <option>Hole Sponsor – $150</option>
              <option>Supporting Sponsor – $500</option>
              <option>Title Sponsor – $1,000+</option>
            </select>
          </div>
          <button
            className="btn btn-gold"
            onClick={() => openMailto('sponsor')}
            style={{ width: '100%', marginTop: 8, minHeight: 50, fontSize: '0.88rem', letterSpacing: '0.06em' }}
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
