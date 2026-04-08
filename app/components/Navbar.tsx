'use client'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    {label: 'Home', href: '/'},
    {label: 'News', href: '/announcements'},
    {label: 'Give', href: '/donate'},
    {label: 'Events', href: '/bookings'},
    {label: 'Groups', href: '/groups'},
    {label: 'Live', href: '/streams'},
    {label: 'Gallery', href: '/gallery'},
    {label: 'Shop', href: '/shop'},
    {label: 'Contact', href: '/contact'},
    {label: 'Calendar', href: '/calendar'},
  ]

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

      {/* DESKTOP NAV LINKS */}
      <div style={{display: 'flex', gap: '1.2rem', alignItems: 'center'}} className="desktop-nav">
        {links.map((link) => (
          <a key={link.href} href={link.href} style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '12.5px',
            letterSpacing: '0.3px',
            textDecoration: 'none'
          }}>{link.label}</a>
        ))}
        <a href="/login" style={{
          background: '#c9a030',
          color: '#8b0e0e',
          padding: '8px 18px',
          borderRadius: '3px',
          fontSize: '12.5px',
          fontWeight: '500',
          textDecoration: 'none'
        }}>Sign In</a>
      </div>

      {/* HAMBURGER BUTTON - mobile only */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px'
        }}
      >
        <span style={{width: '24px', height: '2px', background: 'white', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none'}}></span>
        <span style={{width: '24px', height: '2px', background: 'white', display: 'block', opacity: menuOpen ? 0 : 1}}></span>
        <span style={{width: '24px', height: '2px', background: 'white', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'}}></span>
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '68px',
          left: 0,
          right: 0,
          background: '#8b0e0e',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '3px solid #c9a030',
          padding: '1rem',
          zIndex: 99
        }}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '14px',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none'
            }}>{link.label}</a>
          ))}
          <a href="/login" onClick={() => setMenuOpen(false)} style={{
            display: 'block',
            background: '#c9a030',
            color: '#8b0e0e',
            padding: '10px 18px',
            borderRadius: '3px',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none',
            marginTop: '0.75rem',
            textAlign: 'center'
          }}>Sign In</a>
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