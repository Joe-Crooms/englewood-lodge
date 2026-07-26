export default function Footer() {
  return (
    <footer style={{
      background: '#111b30',
      padding: '28px 20px',
      textAlign: 'center',
      borderTop: '1px solid rgba(200,168,75,0.2)',
      marginTop: 'auto',
    }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.72rem',
        letterSpacing: '0.08em',
        color: 'rgba(200,168,75,0.55)',
        lineHeight: 2,
      }}>
        Englewood Masonic Lodge No. 360, F.&amp;A.M.<br />
        265 Pine Street, Englewood, Florida 34223<br />
        Under the Grand Lodge of Florida &nbsp;·&nbsp; District 23
      </p>
    </footer>
  )
}
