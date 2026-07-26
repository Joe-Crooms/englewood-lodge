import type { Metadata } from 'next'
import Link from 'next/link'
import { EVENTS, formatEventDate } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Monthly Chicken BBQ — Englewood Lodge No. 360',
  description: 'Monthly chicken BBQ fundraiser at Englewood Lodge No. 360. $15 donation, 11:30 AM–1:00 PM, 265 Pine St.',
}

function getBbqDates(today: Date) {
  const bbqEvents = EVENTS.filter((e) => e.type === 'community' && e.title.toLowerCase().includes('bbq'))
  const cutoffMs = 24 * 60 * 60 * 1000
  const todayMs = today.getTime()

  const upcoming = bbqEvents.filter((e) => {
    const d = new Date(e.date + 'T00:00:00')
    return d.getTime() - todayMs > cutoffMs
  })

  const past = bbqEvents.filter((e) => {
    const d = new Date(e.date + 'T00:00:00')
    return d.getTime() - todayMs <= cutoffMs
  })

  return { next: upcoming[0] ?? null, upcoming, past: past.reverse() }
}

export default function ChickenBBQPage() {
  const today = new Date()
  const { next, past } = getBbqDates(today)

  return (
    <>
      {/* HERO */}
      <header style={{
        background: 'linear-gradient(160deg, #5a0a0a 0%, #8b2020 50%, #1a2744 100%)',
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
          Monthly<br /><span style={{ color: '#c8a84b' }}>Chicken BBQ</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-display)',
          color: 'rgba(255,255,255,0.75)',
          fontSize: 'clamp(0.78rem, 3vw, 0.95rem)',
          letterSpacing: '0.14em',
          marginBottom: 20,
          position: 'relative',
        }}>
          11:30 AM – 1:00 PM &nbsp;·&nbsp; 265 Pine Street, Englewood
        </p>
        <div style={{ width: 120, height: 2, background: 'linear-gradient(to right, transparent, #c8a84b, transparent)', margin: '0 auto 32px' }} />
        {next && (
          <a href="#register" className="btn btn-gold" style={{ position: 'relative' }}>
            Register for Next BBQ
          </a>
        )}
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
            ['Time', '11:30 AM – 1:00 PM'],
            ['Location', '265 Pine Street'],
            ['City', 'Englewood, FL 34223'],
            ['Donation', '$15 per person'],
            ['Frequency', 'Monthly'],
          ].map(([label, value]) => (
            <div key={label} style={{
              textAlign: 'center',
              padding: '10px 22px',
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

        {/* ABOUT */}
        <div className="section-label">About</div>
        <h2>A Lodge Tradition</h2>
        <div className="section-rule" />
        <p style={{ color: 'var(--text)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 40, maxWidth: 640 }}>
          Each month, Lodge No. 360 hosts a community chicken BBQ at our lodge on Pine Street. For a suggested
          donation of $15, you enjoy a full plate of BBQ chicken with sides — and you support the ongoing charitable
          work of the lodge. Everyone is welcome. Stop by, grab a plate, and meet your neighbors.
        </p>

        {/* NEXT BBQ / REGISTRATION */}
        <div id="register">
          {next ? (
            <>
              <div className="section-label">Next Date</div>
              <h2>{formatEventDate(next.date)}</h2>
              <div className="section-rule" />
              <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 28 }}>
                Pre-register below so we can have the right amount of food ready. Walk-ins are always welcome.
              </p>
              <div style={{
                borderRadius: 6,
                overflow: 'hidden',
                border: '2px solid var(--border)',
                background: 'var(--cream)',
                marginBottom: 40,
              }}>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSeJRgaOaURbWlUFXYHxZwKoJZyXv0ErqikgERUtiYb6rYV8MQ/viewform?embedded=true"
                  width="100%"
                  height="620"
                  style={{ border: 'none', display: 'block' }}
                  title="Chicken BBQ Registration Form"
                >
                  Loading form…
                </iframe>
              </div>
            </>
          ) : (
            <div style={{
              background: 'var(--cream)',
              border: '1px solid var(--border)',
              borderLeft: '4px solid var(--gold)',
              borderRadius: 4,
              padding: '28px 24px',
              marginBottom: 40,
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>
                Registration Opens Soon
              </h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                Our next BBQ date hasn&apos;t been announced yet. Check back soon or{' '}
                <a href="/#contact" style={{ color: 'var(--gold)' }}>contact the lodge</a>{' '}
                to be notified when registration opens.
              </p>
            </div>
          )}
        </div>

        {/* PAST DATES */}
        {past.length > 0 && (
          <>
            <div className="section-label">Archive</div>
            <h2>Past BBQ Dates</h2>
            <div className="section-rule" />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 40,
            }}>
              {past.map((e) => (
                <span key={e.date} style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--text-light)',
                  background: 'white',
                  border: '1px solid var(--border)',
                  padding: '6px 14px',
                  borderRadius: 20,
                }}>
                  {formatEventDate(e.date)}
                </span>
              ))}
            </div>
          </>
        )}

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
