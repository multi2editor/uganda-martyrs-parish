export default function Navbar() {
  return (
    <nav style={{
      background: '#8b0e0e',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '68px',
      borderBottom: '3px solid #c9a030',
      position: 'sticky',
      top: '0',
      zIndex: 100
    }}>
      {/* LOGO + NAME */}
      <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
        <img 
          src="/logo.webp" 
          alt="Uganda Martyrs Parish Logo"
          style={{width: '44px', height: '44px', borderRadius: '50%', objectFit: 'contain', background: 'white', padding: '2px'}}
        />
        <div>
          <p style={{color: 'white', fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: '600', lineHeight: '1.2'}}>Uganda Martyrs Parish</p>
          <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase'}}>Umlazi G, South Africa</p>
        </div>
      </a>

      {/* NAV LINKS */}
      <div style={{display: 'flex', gap: '1.2rem', alignItems: 'center'}}>
        {[
          {label: 'Home', href: '/'},
          {label: 'News', href: '/announcements'},
          {label: 'Give', href: '/donate'},
          {label: 'Events', href: '/bookings'},
          {label: 'Groups', href: '/groups'},
          {label: 'Live', href: '/streams'},
          {label: 'Gallery', href: '/gallery'},
        ].map((link) => (
          <a key={link.href} href={link.href} style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '12.5px',
            letterSpacing: '0.3px'
          }}>{link.label}</a>
        ))}
        <a href="/login" style={{
          background: '#c9a030',
          color: '#8b0e0e',
          padding: '8px 18px',
          borderRadius: '3px',
          fontSize: '12.5px',
          fontWeight: '500'
        }}>Sign In</a>
      </div>
    </nav>
  )
}