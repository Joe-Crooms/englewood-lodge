import Link from 'next/link'
import { getUpcomingEvents, getPastFundraisers, formatEventDate } from '@/lib/events'

const EMBLEM = (
  <svg viewBox="0 0 200 210" width="80" height="84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M 93,14 C 88,10 80,13 80,20 L 22,178 L 30,182 L 100,30 Z" fill="#c8a84b"/>
    <path d="M 107,14 C 112,10 120,13 120,20 L 178,182 L 170,178 L 100,30 Z" fill="#c8a84b"/>
    <ellipse cx="100" cy="17" rx="9" ry="7" fill="#c8a84b"/>
    <line x1="100" y1="158" x2="34" y2="92" stroke="#c8a84b" strokeWidth="14" strokeLinecap="square"/>
    <line x1="100" y1="158" x2="166" y2="92" stroke="#c8a84b" strokeWidth="14" strokeLinecap="square"/>
    <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="#c8a84b" fontFamily="Cinzel,serif" fontSize="50" fontWeight="700">G</text>
  </svg>
)

const OFFICERS = [
  ['Worshipful Master', 'Darrell LaCourse'],
  ['Senior Warden', 'Jeffery McAlpine'],
  ['Junior Warden', 'Destrey Robbins'],
  ['Treasurer', 'Michael Harde'],
  ['Secretary', 'James Beamguard'],
  ['Chaplain', 'William Mullins'],
  ['Senior Deacon', 'Michael Collins'],
  ['Junior Deacon', 'Miguel Aguilar'],
  ['Marshal', 'Robert Gaitens'],
  ['Tyler', 'Denis Doome'],
]

const SCHOLARSHIP_RECIPIENTS = [
  { school: 'Lemon Bay High School', name: 'Jade Gorsky', program: 'Englewood Fire Academy — Certified EMT & Firefighter' },
  { school: 'North Port High School', name: 'Naima Metayer', program: 'Florida Southwestern State College, Punta Gorda — Nursing' },
  { school: 'North Port High School', name: 'Iryna Brazhnyk', program: 'State College of Florida — Dental Hygiene' },
  { school: 'North Port High School', name: 'Karla Valentin-Martinez', program: 'State College of Florida — Nursing' },
]

const MASON_CARDS = [
  { title: 'Brotherhood', body: 'Masons join together because they enjoy the company of men they like and respect — committed to honesty, integrity, and mutual support.' },
  { title: 'Charity & Service', body: 'Masonry spends more than $1.4 million every day across the U.S. helping people — the great majority of whom are not Masons.' },
  { title: 'Personal Growth', body: 'Through ritual, study, and fellowship, Masonry reminds its members of the importance of virtues like compassion, honesty, and knowledge.' },
  { title: 'A Rich History', body: 'Freemasonry traces its roots to the stonemason guilds of the Middle Ages. Franklin, Washington, Revere, and Hancock were all proud Masons.' },
]

const TYPE_LABELS: Record<string, string> = {
  fundraiser: 'FUNDRAISER',
  community: 'COMMUNITY EVENT',
  meeting: '',
  practice: '',
  other: '',
}

const TYPE_COLORS: Record<string, string> = {
  fundraiser: '#2d5a27',
  community: '#8b2020',
}

export default function HomePage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = getUpcomingEvents(today)
  const pastFundraisers = getPastFundraisers(today)

  return (
    <>
      {/* HERO */}
      <header style={{
        background: 'var(--navy)',
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 20px 56px',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(200,168,75,0.12) 0%, transparent 70%), repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(200,168,75,0.03) 40px, rgba(200,168,75,0.03) 41px)',
          pointerEvents: 'none',
        }} />
        <div style={{ margin: '0 auto 20px', width: 80, height: 84, position: 'relative' }}>
          {EMBLEM}
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--gold)',
          fontSize: 'clamp(1.7rem, 7vw, 3rem)',
          fontWeight: 700,
          letterSpacing: '0.03em',
          lineHeight: 1.15,
          marginBottom: 10,
          position: 'relative',
        }}>
          Englewood Masonic<br />Lodge No. 360
        </h1>
        <p style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--cream)',
          fontSize: 'clamp(0.75rem, 3vw, 0.95rem)',
          letterSpacing: '0.12em',
          opacity: 0.85,
          marginBottom: 18,
          position: 'relative',
        }}>
          Free &amp; Accepted Masons &nbsp;·&nbsp; Englewood, Florida
        </p>
        <div style={{
          width: 120, height: 2,
          background: 'linear-gradient(to right, transparent, var(--gold), transparent)',
          margin: '0 auto 20px',
        }} />
        <p style={{
          color: 'rgba(245,240,232,0.75)',
          fontStyle: 'italic',
          fontSize: 'clamp(0.9rem, 3vw, 1.05rem)',
          maxWidth: 480,
          margin: '0 auto 32px',
          position: 'relative',
          padding: '0 8px',
          fontFamily: 'var(--font-body)',
        }}>
          &ldquo;Making good men better &mdash; serving our community since time immemorial.&rdquo;
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
          <Link href="#events" className="btn btn-gold">Upcoming Events</Link>
          <Link href="#what-is-a-mason" className="btn btn-outline">What is a Mason?</Link>
        </div>
      </header>

      {/* MEETING BAR */}
      <div style={{
        background: 'var(--navy)',
        borderTop: '2px solid var(--gold)',
        borderBottom: '2px solid var(--gold)',
        padding: '14px 20px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--cream)',
          fontSize: 'clamp(0.72rem, 2.5vw, 0.85rem)',
          letterSpacing: '0.06em',
          lineHeight: 1.8,
        }}>
          Meetings: 1st &amp; 3rd Tuesday &nbsp;·&nbsp; 6:30 PM Dinner &nbsp;·&nbsp; 7:30 PM Meeting &nbsp;·&nbsp; 265 Pine St, Englewood, FL
        </p>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ background: 'var(--warm-white)' }}>
        <div className="section-inner">
          <div className="section-label">Our Lodge</div>
          <h2>Welcome to Lodge No. 360</h2>
          <div className="section-rule" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ lineHeight: 1.85, marginBottom: 18, fontSize: '0.98rem' }}>
              Englewood Masonic Lodge No. 360, Free &amp; Accepted Masons, is a proud fraternal organization serving the Englewood, Florida community. We meet on the 1st and 3rd Tuesday of each month — gathering first for dinner at 6:30 PM and then for our stated meeting at 7:30 PM.
            </p>
            <p style={{ lineHeight: 1.85, marginBottom: 18, fontSize: '0.98rem' }}>
              As Freemasons, we are bound by a commitment to Brotherhood, Relief, and Truth. We believe in making good men better, supporting our neighbors, and building a stronger community through service, charity, and fellowship.
            </p>
            <p style={{ lineHeight: 1.85, marginBottom: 28, fontSize: '0.98rem' }}>
              Whether you are a longtime member of the fraternity, a curious visitor, or someone exploring the possibility of joining, you are welcome here.
            </p>
            <Link href="#contact" className="btn btn-gold">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIP */}
      <div style={{ background: 'var(--navy)' }}>
        <section id="scholarship">
          <div className="section-inner">
            <div className="section-label" style={{ color: 'rgba(200,168,75,0.7)' }}>Community</div>
            <h2 style={{ color: 'var(--gold)' }}>Scholarship Foundation</h2>
            <div className="section-rule" style={{ background: 'rgba(200,168,75,0.5)' }} />
            <div style={{ maxWidth: 720, marginBottom: 36 }}>
              <p style={{ color: 'rgba(245,240,232,0.8)', lineHeight: 1.85, marginBottom: 18, fontSize: '0.98rem' }}>
                The <strong style={{ color: 'var(--cream)' }}>Englewood Masonic Lodge No. 360 Scholarship Foundation</strong>, established in January 2026, raises funds to provide scholarships to graduating seniors at <strong style={{ color: 'var(--cream)' }}>Lemon Bay High School</strong>, <strong style={{ color: 'var(--cream)' }}>North Port High School</strong>, and <strong style={{ color: 'var(--cream)' }}>Wellan Park High School</strong> who plan to attend a trade school, vocational or technical school, nursing program at a community college, or fire and police academies.
              </p>
              <p style={{ color: 'rgba(245,240,232,0.8)', lineHeight: 1.85, marginBottom: 18, fontSize: '0.98rem' }}>
                All applications are reviewed anonymously — no name, race, or gender is included — with each application identified only by a code provided by the school&rsquo;s guidance counselor. Scholarships are awarded each Spring, with the number and amount determined by funds raised during the prior year.
              </p>
              <p style={{ color: 'rgba(245,240,232,0.8)', lineHeight: 1.85, fontSize: '0.98rem' }}>
                The Foundation holds two <strong style={{ color: 'var(--cream)' }}>Brunswick Stew</strong> fundraisers annually, with all proceeds going directly to students. As a 501(c) organization, all donations are fully tax-deductible.
              </p>
            </div>

            {/* 2026 Recipients */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(200,168,75,0.25)',
              borderRadius: 8,
              padding: '32px 28px',
            }}>
              <p style={{
                color: 'rgba(200,168,75,0.7)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>2026 Academic Year</p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--cream)',
                fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                fontWeight: 700,
                marginBottom: 10,
                lineHeight: 1.2,
                textWrap: 'balance',
              }}>
                Congratulations to Our Scholarship Recipients
              </h3>
              <p style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--gold)',
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: 16,
              }}>Over $11,800 Raised</p>
              <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 28, maxWidth: 600 }}>
                Through one Brunswick Stew sale and generous donations from brothers, friends of the lodge, and the <strong style={{ color: 'var(--cream)' }}>Englewood Methodist Church Men</strong>, the Foundation is proud to announce four scholarship recipients for the 2026 academic year.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 16,
                marginBottom: 24,
              }}>
                {SCHOLARSHIP_RECIPIENTS.map((r) => (
                  <div key={r.name} style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(200,168,75,0.2)',
                    borderRadius: 6,
                    padding: '20px 18px',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'rgba(200,168,75,0.65)',
                      marginBottom: 7,
                    }}>{r.school}</p>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--cream)',
                      marginBottom: 7,
                    }}>{r.name}</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.6)', fontStyle: 'italic', lineHeight: 1.5 }}>
                      {r.program}
                    </p>
                  </div>
                ))}
              </div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.88rem',
                color: 'var(--gold)',
                textAlign: 'center',
                paddingTop: 16,
                borderTop: '1px solid rgba(200,168,75,0.22)',
                letterSpacing: '0.03em',
              }}>
                Each recipient receives a <strong>$2,500 scholarship</strong> for the 2026–27 academic year.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* EVENTS */}
      <div style={{ background: 'var(--cream)' }}>
        <section id="events">
          <div className="section-inner">
            <div className="section-label">Trestleboard</div>
            <h2>Upcoming Events</h2>
            <div className="section-rule" />
            {upcoming.length === 0 ? (
              <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No upcoming events listed at this time. Check back soon.</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {upcoming.map((evt, i) => {
                  const typeLabel = TYPE_LABELS[evt.type]
                  const accentColor = evt.accentColor ?? (evt.type === 'fundraiser' ? '#2d5a27' : evt.type === 'community' ? '#8b2020' : 'var(--gold)')
                  return (
                    <div key={i} style={{
                      background: 'white',
                      border: '1px solid var(--border)',
                      borderLeft: `4px solid ${accentColor}`,
                      borderRadius: '0 6px 6px 0',
                      padding: '18px 18px 16px',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--text-light)',
                        letterSpacing: '0.04em',
                        marginBottom: 6,
                      }}>
                        {formatEventDate(evt.date)}
                        {typeLabel && (
                          <span style={{ color: accentColor, marginLeft: 6 }}>&nbsp;·&nbsp; {typeLabel}</span>
                        )}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        marginBottom: 5,
                        lineHeight: 1.3,
                      }}>
                        {evt.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: 4 }}>{evt.time}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic' }}>{evt.note}</div>
                      {evt.link && (
                        <Link href={evt.link} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          marginTop: 12,
                          padding: '8px 14px',
                          background: accentColor,
                          color: 'white',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          borderRadius: 4,
                          textDecoration: 'none',
                        }}>
                          {evt.linkText}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* PAST FUNDRAISERS */}
      {pastFundraisers.length > 0 && (
        <div style={{ background: 'var(--warm-white)', borderTop: '1px solid var(--border)' }}>
          <section id="past-fundraisers">
            <div className="section-inner" style={{ paddingTop: 40, paddingBottom: 40 }}>
              <div className="section-label">Archive</div>
              <h2>Past Fundraisers</h2>
              <div className="section-rule" />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 14,
              }}>
                {pastFundraisers.map((evt, i) => {
                  const accentColor = evt.accentColor ?? '#2d5a27'
                  return (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.7)',
                      border: '1px solid var(--border)',
                      borderLeft: `4px solid ${accentColor}`,
                      borderRadius: '0 6px 6px 0',
                      padding: '16px 18px',
                      opacity: 0.75,
                    }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.68rem', color: 'var(--text-light)', marginBottom: 5 }}>
                        {formatEventDate(evt.date)}
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>
                        {evt.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic' }}>{evt.note}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* OFFICERS */}
      <section id="officers" style={{ background: 'var(--warm-white)' }}>
        <div className="section-inner">
          <div className="section-label">2026 Officers</div>
          <h2>Lodge Leadership</h2>
          <div className="section-rule" />
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              borderCollapse: 'collapse',
              width: '100%',
              maxWidth: 600,
              fontFamily: 'var(--font-body)',
            }}>
              <thead>
                <tr style={{ background: 'var(--navy)' }}>
                  <th style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    padding: '12px 18px',
                    textAlign: 'left',
                    fontWeight: 700,
                  }}>Title</th>
                  <th style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    padding: '12px 18px',
                    textAlign: 'left',
                    fontWeight: 700,
                  }}>Name</th>
                </tr>
              </thead>
              <tbody>
                {OFFICERS.map(([title, name], i) => (
                  <tr key={title} style={{
                    background: i === 0 ? 'rgba(200,168,75,0.08)' : i % 2 === 0 ? 'rgba(245,240,232,0.5)' : 'white',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <td style={{
                      padding: '11px 18px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.82rem',
                      fontWeight: i === 0 ? 700 : 600,
                      color: i === 0 ? 'var(--navy)' : 'var(--text)',
                      letterSpacing: '0.02em',
                    }}>{title}</td>
                    <td style={{
                      padding: '11px 18px',
                      fontSize: '0.95rem',
                      color: i === 0 ? 'var(--navy)' : 'var(--text)',
                      fontWeight: i === 0 ? 700 : 400,
                    }}>{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHAT IS A MASON */}
      <div style={{ background: 'var(--cream)' }}>
        <section id="what-is-a-mason">
          <div className="section-inner">
            <div className="section-label">The Fraternity</div>
            <h2>What is a Freemason?</h2>
            <div className="section-rule" />
            <p style={{ color: 'var(--text-light)', lineHeight: 1.85, maxWidth: 700, marginBottom: 28, fontSize: '0.98rem' }}>
              Freemasonry is the oldest and largest fraternity in the world. Members are united by a belief in making themselves better men — and through that, making the world a better place.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 18,
              marginBottom: 28,
            }}>
              {MASON_CARDS.map((card) => (
                <div key={card.title} style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderTop: '3px solid var(--gold)',
                  borderRadius: '0 0 6px 6px',
                  padding: '22px 20px',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: 10,
                    letterSpacing: '0.03em',
                  }}>{card.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: 1.7 }}>{card.body}</p>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--text-light)', fontStyle: 'italic', fontSize: '0.92rem' }}>
              Curious about joining?{' '}
              <Link href="#contact" style={{
                color: 'var(--gold)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}>
                Contact Us →
              </Link>
            </p>
          </div>
        </section>
      </div>

      {/* CONTACT */}
      <ContactSection />
    </>
  )
}

function ContactSection() {
  return (
    <div style={{ background: 'var(--navy)' }}>
      <section id="contact">
        <div className="section-inner">
          <div className="section-label" style={{ color: 'rgba(200,168,75,0.7)' }}>Find Us</div>
          <h2 style={{ color: 'var(--gold)' }}>Contact &amp; Location</h2>
          <div className="section-rule" style={{ background: 'rgba(200,168,75,0.5)' }} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40,
          }}>
            {/* Info column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                {
                  label: 'Address',
                  content: (
                    <a
                      href="https://maps.google.com/?q=265+Pine+St+Englewood+FL+34223"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--cream)', lineHeight: 1.7 }}
                    >
                      265 Pine Street<br />Englewood, Florida 34223
                    </a>
                  ),
                },
                {
                  label: 'Meeting Times',
                  content: <span style={{ color: 'var(--cream)', lineHeight: 1.7 }}>1st &amp; 3rd Tuesday<br />6:30 PM Dinner · 7:30 PM Meeting</span>,
                },
                {
                  label: 'Email',
                  content: (
                    <a href="mailto:englewood360@gmail.com" style={{ color: 'var(--gold)' }}>
                      englewood360@gmail.com
                    </a>
                  ),
                },
                {
                  label: 'District',
                  content: (
                    <a href="https://www.district23fl.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cream)' }}>
                      District 23 – Grand Lodge of Florida
                    </a>
                  ),
                },
              ].map(({ label, content }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(200,168,75,0.65)',
                    marginBottom: 5,
                  }}>{label}</p>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>{content}</div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}

// Isolated to a client component
import ContactForm from '@/components/ContactForm'
