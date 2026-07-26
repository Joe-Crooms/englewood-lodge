import type { Metadata } from 'next'
import Link from 'next/link'
import GolfRegistrationForm from '@/components/GolfRegistrationForm'

export const metadata: Metadata = {
  title: '6th Annual Duffers Golf Tournament — Englewood Lodge No. 360',
  description: 'May 16, 2026 at Long Marsh Golf Club, Rotonda West. $95/player. 4-person scramble benefiting Lodge No. 360.',
}

const SPONSORSHIPS = [
  {
    label: 'Hole Sponsor',
    price: '$150',
    perks: ['Sign placed at a golf hole'],
    style: { background: '#f0ece0', border: '2px solid #d4c4a0' } as React.CSSProperties,
    priceColor: '#1a2744',
    textColor: '#1a2744',
    perkColor: '#5a5a5a',
  },
  {
    label: 'Supporting Sponsor',
    price: '$500',
    perks: ['Hole Sponsor Sign', 'Logo on Event Banner', 'Registration for 4 Players'],
    style: { background: '#1e3a1e', border: '2px solid #4a8b4a' } as React.CSSProperties,
    priceColor: '#c8a84b',
    textColor: 'white',
    perkColor: 'rgba(255,255,255,0.8)',
  },
  {
    label: 'Title Sponsor',
    price: '$1,000+',
    perks: ['Hole Sponsor Sign', 'Top Billing on Event Banner', 'Registration for 8 Players (2 Teams)'],
    style: { background: '#1a2744', border: '2px solid #c8a84b' } as React.CSSProperties,
    priceColor: '#c8a84b',
    textColor: 'white',
    perkColor: 'rgba(255,255,255,0.8)',
  },
]

export default function GolfTournamentPage() {
  return (
    <>
      {/* HERO */}
      <header style={{
        background: 'linear-gradient(160deg, #1e3a1e 0%, #2d5a27 50%, #1a2744 100%)',
        padding: '60px 20px 56px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 120%, rgba(200,168,75,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          display: 'inline-block',
          background: '#c8a84b',
          color: '#1a2744',
          fontFamily: 'var(--font-display)',
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          padding: '7px 18px',
          borderRadius: 2,
          marginBottom: 20,
          position: 'relative',
        }}>
          Lodge Fundraiser
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          color: 'white',
          fontSize: 'clamp(1.9rem, 7vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 8,
          position: 'relative',
        }}>
          6th Annual Duffers<br /><span style={{ color: '#c8a84b' }}>Golf Tournament</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-display)',
          color: 'rgba(255,255,255,0.75)',
          fontSize: 'clamp(0.78rem, 3vw, 0.95rem)',
          letterSpacing: '0.14em',
          marginBottom: 20,
          position: 'relative',
        }}>
          Saturday, May 16, 2026
        </p>
        <div style={{ width: 120, height: 2, background: 'linear-gradient(to right, transparent, #c8a84b, transparent)', margin: '0 auto 32px' }} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
          <a href="#register" className="btn btn-gold">Register Now</a>
          <a href="#sponsorships" className="btn btn-outline">Become a Sponsor</a>
        </div>
      </header>

      {/* DETAILS STRIP */}
      <div style={{
        background: 'var(--navy)',
        borderTop: '2px solid var(--gold)',
        borderBottom: '2px solid var(--gold)',
        padding: '18px 20px',
      }}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {[
            ['Date', 'May 16, 2026'],
            ['Venue', 'Long Marsh Golf Club'],
            ['Address', '20 White Marsh Rd, Rotonda West, FL'],
            ['Registration', '7:00 AM'],
            ['Shotgun Start', '8:00 AM'],
            ['Entry Fee', '$95 / Player'],
          ].map(([label, value]) => (
            <div key={label} style={{
              textAlign: 'center',
              padding: '10px 24px',
              borderRight: '1px solid rgba(200,168,75,0.3)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                opacity: 0.8,
                marginBottom: 4,
                textTransform: 'uppercase',
              }}>{label}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'white',
              }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '52px 20px' }}>

        {/* FORMAT */}
        <div className="section-label">Format</div>
        <h2>4-Person Scramble</h2>
        <div className="section-rule" />
        <div style={{
          background: '#1e3a1e',
          borderRadius: 6,
          padding: '24px 28px',
          marginBottom: 40,
          textAlign: 'center',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: '#c8a84b', fontSize: '1rem', marginBottom: 6 }}>Entry Fee</h3>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 7vw, 2.8rem)', fontWeight: 700, color: 'white', lineHeight: 1 }}>
            $95
            <small style={{ fontSize: '0.45em', color: 'rgba(255,255,255,0.6)', display: 'block', marginTop: 4, letterSpacing: '0.12em' }}>
              PER PLAYER · $380 TEAM OF 4
            </small>
          </div>
        </div>

        {/* SCHEDULE */}
        <div className="section-label">Day of Event</div>
        <h2>Schedule</h2>
        <div className="section-rule" />
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
          {[
            ['7:00 AM', 'Registration Opens'],
            ['8:00 AM', 'Shotgun Start'],
            ['After Round', 'BBQ Lunch & Awards Ceremony'],
            ['During Round', 'Hole-in-One Contest (courtesy Englewood Ford)'],
          ].map(([time, desc]) => (
            <div key={time} style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#c8a84b',
                minWidth: 130,
                padding: '14px 16px 14px 0',
                textAlign: 'right',
                borderRight: '2px solid #c8a84b',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', right: -6, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#c8a84b',
                  display: 'block',
                }} />
                {time}
              </div>
              <div style={{ padding: '14px 0 14px 20px', color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                <strong>{desc}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* SPONSORSHIPS */}
        <div id="sponsorships">
          <div className="section-label">Support the Cause</div>
          <h2>Sponsorship Opportunities</h2>
          <div className="section-rule" />
          <div style={{
            background: 'rgba(200,168,75,0.15)',
            border: '1px solid rgba(200,168,75,0.4)',
            borderRadius: 4,
            padding: '12px 16px',
            marginBottom: 28,
            fontFamily: 'var(--font-display)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#c8a84b',
            letterSpacing: '0.08em',
            textAlign: 'center',
          }}>
            ⚠️ Sponsor artwork deadline: May 2, 2026
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 16,
            marginBottom: 40,
          }}>
            {SPONSORSHIPS.map((s) => (
              <div key={s.label} style={{ borderRadius: 6, padding: '24px 20px', ...s.style }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: s.priceColor, marginBottom: 4 }}>
                  {s.price}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', color: s.textColor, marginBottom: 12 }}>
                  {s.label}
                </div>
                <ul style={{ listStyle: 'none' }}>
                  {s.perks.map((perk) => (
                    <li key={perk} style={{ fontSize: '0.85rem', padding: '4px 0', paddingLeft: 16, position: 'relative', color: s.perkColor }}>
                      <span style={{ position: 'absolute', left: 0, color: '#c8a84b', fontWeight: 700 }}>✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* REGISTRATION */}
        <div id="register">
          <div className="section-label">Sign Up</div>
          <h2>Registration</h2>
          <div className="section-rule" />
          <GolfRegistrationForm />
        </div>

        {/* PAYMENT */}
        <div style={{
          background: 'white',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--gold)',
          borderRadius: 4,
          padding: '22px 24px',
          marginTop: 32,
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>
            Payment &amp; Submission
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 4 }}>
            <strong>Cash, Check, or Zelle:</strong>{' '}
            <span style={{ display: 'inline-block', background: '#1a2744', color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 12, marginLeft: 6, verticalAlign: 'middle' }}>
              Zelle 941-830-1249
            </span>
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 4 }}>
            <strong>Checks payable to:</strong> Englewood Lodge No. 360
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: 1.8 }}>
            <strong>Contact:</strong> Secretary James Beamguard &nbsp;·&nbsp;
            <a href="mailto:englewood360@gmail.com" style={{ color: 'var(--gold)' }}>englewood360@gmail.com</a>
          </p>
        </div>

      </div>

      {/* Back link */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 48px' }}>
        <Link href="/" style={{ color: 'var(--text-light)', fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.08em' }}>
          ← Back to Lodge Home
        </Link>
      </div>
    </>
  )
}
