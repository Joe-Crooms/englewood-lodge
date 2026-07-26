'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#scholarship', label: 'Scholarship' },
  { href: '/#events', label: 'Events' },
  { href: '/#officers', label: 'Officers' },
  { href: '/#what-is-a-mason', label: 'What is a Mason?' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      background: 'var(--navy)',
      borderBottom: '2px solid var(--gold)',
      position: 'sticky',
      top: 0,
      zIndex: 200,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: 58,
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--gold)',
          fontSize: '0.88rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          lineHeight: 1.2,
        }}>
          Englewood Lodge No. 360
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: 'flex',
          gap: 4,
          listStyle: 'none',
        }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--cream)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                padding: '8px 9px',
                borderRadius: 3,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
                display: 'block',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = 'var(--gold)'
                e.currentTarget.style.background = 'rgba(200,168,75,0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = 'var(--cream)'
                e.currentTarget.style.background = 'transparent'
              }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            WebkitTapHighlightColor: 'transparent',
          }}
          className="hamburger"
        >
          <span style={{
            display: 'block', width: 24, height: 2,
            background: 'var(--gold)', borderRadius: 2,
            transition: 'all 0.3s',
            transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: 24, height: 2,
            background: 'var(--gold)', borderRadius: 2,
            transition: 'all 0.3s',
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 24, height: 2,
            background: 'var(--gold)', borderRadius: 2,
            transition: 'all 0.3s',
            transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--navy)',
          borderTop: '1px solid rgba(200,168,75,0.3)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                color: 'var(--cream)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                padding: '17px 24px',
                borderBottom: '1px solid rgba(200,168,75,0.15)',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
