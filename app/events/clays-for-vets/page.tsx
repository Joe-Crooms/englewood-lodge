import type { Metadata } from 'next'
import Link from 'next/link'
import ClaysRegistrationForm from '@/components/ClaysRegistrationForm'

export const metadata: Metadata = {
  title: 'Clays for Vets — Englewood Lodge No. 360',
  description: 'March 21, 2026 at Sarasota Trap Skeet & Clays, Nokomis, FL. $125/individual, $500/team. Supporting veterans.',
}

const INCLUDED = [
  ['Ammunition', '12 & 20 gauge shells provided for all shooters'],
  ['Clays', 'All clay targets included — just show up and shoot'],
  ['Golf Cart', 'Shared golf cart transport across the course'],
  ['Lunch', 'Full meal included after the shoot'],
  ['Gun Raffle', 'One gun raffle ticket per shooter'],
  ['Pistol Drawing', 'Entry into the pistol drawing'],
]

const TROPHIES = [
  'Top Score', 'Top Team', 'Top Shooter', 'Top Female Shooter', 'Top Youth Shooter',
]

const SPONSORSHIPS = [
  {
    label: 'Shooting Station Sponsor',
    price: '$200',
    perks: ['Signage at a shooting station', 'Recognition at the event'],
    style: { background: '#f5f0e8', border: '2px solid #9b6b9b' } as React.CSSProperties,
    priceColor: '#4a1a4a',
    textColor: '#4a1a4a',
    perkColor: '#5a5a5a',
  },
  {
    label: 'Supporting Sponsor',
    price: '$750',
    perks: ['Shooting Station Sign', 'Logo on Event Banner', '4 Shooters Included'],
    style: { background: '#3a1a3a', border: '2px solid #9b6b9b' } as React.CSSProperties,
    priceColor: '#c8a84b',
    textColor: 'white',
    perkColor: 'rgba(255,255,255,0.8)',
  },
  {
    label: 'Event Sponsor',
    price: '$1,500',
    perks: ['Shooting Station Sign', 'Top Billing on Banner & Materials', '8 Shooters Included'],
    style: { background: '#4a1a4a', border: '2px solid #c8a84b' } as React.CSSProperties,
    priceColor: '#c8a84b',
    textColor: 'white',
    perkColor: 'rgba(255,255,255,0.8)',
  },
]

export default function ClaysForVetsPage() {
  return (
    <>
      {/* HERO */}
      <header style={{
        background: 'linear-gradient(160deg, #2a0a2a 0%, #4a1a4a 45%, #6b2d6b 100%)',
        padding: '60px 20px 56px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 120%, rgba(200,168,75,0.15) 0%, transparent 70%)',
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
          Veterans Fundraiser
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
          Clays for <span style={{ color: '#c8a84b' }}>Vets</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-display)',
          color: 'rgba(255,255,255,0.75)',
          fontSize: 'clamp(0.78rem, 3vw, 0.95rem)',
          letterSpacing: '0.14em',
          marginBottom: 20,
          position: 'relative',
        }}>
          Saturday, March 21, 2026
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
            ['Date', 'March 21, 2026'],
            ['Venue', 'Sarasota Trap Skeet & Clays'],
            ['Address', '3445 Rustic Rd, Nokomis, FL'],
            ['Registration', '8:00 AM'],
            ['Shotgun Start', '9:30 AM'],
            ['Individual', '$125'],
            ['Team of 4', '$500'],
          ].map(([label, value]) => (
            <div key={label} style={{
              textAlign: 'center',
              padding: '10px 18px',
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
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'white',
              }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '52px 20px' }}>

        {/* SCHEDULE */}
        <div className="section-label">Day of Event</div>
        <h2>Schedule</h2>
        <div className="section-rule" />
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
          {[
            ['8:00 AM', 'Registration Opens'],
            ['9:15 AM', 'Safety Briefing (mandatory for all shooters)'],
            ['9:30 AM', 'Shotgun Start'],
            ['11:30 AM', 'Lunch & Awards Ceremony'],
          ].map(([time, desc]) => (
            <div key={time} style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#c8a84b',
                minWidth: 110,
                padding: '14px 16px 14px 0',
                textAlign: 'right',
                borderRight: '2px solid #9b6b9b',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', right: -6, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#9b6b9b',
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

        {/* WHAT'S INCLUDED */}
        <div className="section-label">What You Get</div>
        <h2>Everything Included</h2>
        <div className="section-rule" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 14,
          marginBottom: 40,
        }}>
          {INCLUDED.map(([title, desc]) => (
            <div key={title} style={{
              background: 'white',
              border: '1px solid var(--border)',
              borderTop: '3px solid #6b2d6b',
              borderRadius: 4,
              padding: '18px 16px',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#4a1a4a',
                marginBottom: 6,
                letterSpacing: '0.04em',
              }}>{title}</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-light)', lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* TROPHIES */}
        <div style={{
          background: 'var(--navy)',
          border: '1px solid var(--gold)',
          borderRadius: 6,
          padding: '24px 28px',
          marginBottom: 40,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Trophy Categories
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TROPHIES.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'white',
                background: 'rgba(200,168,75,0.15)',
                border: '1px solid rgba(200,168,75,0.3)',
                padding: '6px 14px',
                borderRadius: 20,
              }}>
                🏆 {t}
              </span>
            ))}
          </div>
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
            ⚠️ Sponsor artwork deadline: March 6, 2026
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
          <ClaysRegistrationForm />
        </div>

        {/* PAYMENT */}
        <div style={{
          background: 'white',
          border: '1px solid var(--border)',
          borderLeft: '4px solid #6b2d6b',
          borderRadius: 4,
          padding: '22px 24px',
          marginTop: 32,
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>
            Payment Options
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 4 }}>
            <strong>Cash, Check, or Zelle:</strong>{' '}
            <span style={{ display: 'inline-block', background: '#4a1a4a', color: '#c8a84b', fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 12, marginLeft: 6, verticalAlign: 'middle' }}>
              Zelle 941-830-1249
            </span>
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 4 }}>
            <strong>Checks payable to:</strong> Phil Fessenden Memorial Fund
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 12 }}>
            <strong>Contact:</strong> Denis Doome &nbsp;·&nbsp; 941-830-1249 &nbsp;·&nbsp;
            <a href="mailto:claysforvets@gmail.com" style={{ color: '#6b2d6b' }}>claysforvets@gmail.com</a>
          </p>
          <a
            href="https://link.clover.com/urlshortener/qST8g7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#4a1a4a',
              color: '#c8a84b',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '12px 24px',
              borderRadius: 4,
              textDecoration: 'none',
            }}
          >
            Pay Online via Clover →
          </a>
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
