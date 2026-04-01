export default function Home() {
  return (
    <main className="min-h-screen" style={{fontFamily: 'Inter, sans-serif'}}>
      
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(90deg, rgba(139,14,14,0.95) 40%, rgba(139,14,14,0.7) 100%)',
        backgroundColor: '#8b0e0e',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        padding: '3rem 2rem'
      }}>
        <div style={{maxWidth: '580px'}}>
          <div style={{
            background: '#c9a030',
            color: '#8b0e0e',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            padding: '5px 14px',
            borderRadius: '2px',
            display: 'inline-block',
            marginBottom: '1.2rem',
            fontWeight: '600'
          }}>Welcome Home</div>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'white',
            lineHeight: '1.2',
            marginBottom: '0.75rem'
          }}>Faith. Martyrdom. <span style={{color: '#f0c84a'}}>Community.</span></h1>
          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.7', marginBottom: '1.75rem'}}>
            Rooted in the legacy of the Uganda Martyrs, we are a family united in worship, prayer and service. All are welcome.
          </p>
          <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
            <a href="/bookings" style={{
              background: '#c9a030',
              color: '#8b0e0e',
              padding: '11px 26px',
              borderRadius: '3px',
              fontSize: '13px',
              fontWeight: '500',
              textDecoration: 'none'
            }}>Book an Event</a>
            <a href="/streams" style={{
              background: 'transparent',
              color: 'white',
              border: '1.5px solid rgba(255,255,255,0.5)',
              padding: '11px 26px',
              borderRadius: '3px',
              fontSize: '13px',
              textDecoration: 'none'
            }}>Watch Live</a>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
        <p style={{fontSize: '11px', background: '#fff8e7', border: '1px solid #c9a030', color: '#8b0e0e', padding: '4px 12px', borderRadius: '2px', display: 'inline-block', marginBottom: '1.5rem'}}>Est. 1971 — Umlazi, South Africa</p>
        <h2 style={{fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Explore Our Parish</h2>
        <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '2rem', borderRadius: '2px'}}></div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem'}}>
          {[
            {icon: '📢', title: 'Announcements', sub: 'Latest parish news', href: '/announcements'},
            {icon: '🙏', title: 'Give & Donate', sub: 'Support our mission', href: '/donate'},
            {icon: '📅', title: 'Book Events', sub: 'Baptism, weddings & more', href: '/bookings'},
            {icon: '👥', title: 'Church Groups', sub: 'Find your community', href: '/groups'},
            {icon: '🎁', title: 'Giveaways', sub: 'Active competitions', href: '/giveaways'},
            {icon: '📍', title: 'Visit Us', sub: 'Umlazi G, South Africa', href: '/contact'},
          ].map((item) => (
            <a key={item.href} href={item.href} style={{
              background: '#8b0e0e',
              color: 'white',
              borderRadius: '6px',
              padding: '1.25rem',
              textDecoration: 'none',
              borderBottom: '3px solid #c9a030',
              display: 'block'
            }}>
              <div style={{fontSize: '22px', marginBottom: '0.5rem'}}>{item.icon}</div>
              <h4 style={{fontSize: '13.5px', fontWeight: '500', marginBottom: '2px'}}>{item.title}</h4>
              <p style={{fontSize: '11.5px', color: 'rgba(255,255,255,0.65)'}}>{item.sub}</p>
            </a>
          ))}
        </div>
      </section>

      {/* DAILY VERSE */}
      <section style={{padding: '0 2rem 3rem', maxWidth: '1100px', margin: '0 auto'}}>
        <div style={{
          background: '#8b0e0e',
          borderRadius: '6px',
          padding: '2.5rem',
          textAlign: 'center',
          borderTop: '4px solid #c9a030'
        }}>
          <p style={{fontFamily: 'Georgia, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'white', lineHeight: '1.7', marginBottom: '0.75rem'}}>
            "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you."
          </p>
          <p style={{color: '#f0c84a', fontSize: '13px', fontWeight: '500'}}>Jeremiah 29:11</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background: '#8b0e0e', borderTop: '3px solid #c9a030', color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '1.5rem', fontSize: '13px'}}>
        © 2025 <span style={{color: '#f0c84a'}}>Uganda Martyrs Parish</span> — Umlazi, South Africa | ugandamp@outlook.com
      </footer>

    </main>
  )
}