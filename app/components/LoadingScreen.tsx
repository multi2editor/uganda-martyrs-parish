'use client'
import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 600)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#8b0e0e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s ease',
    }}>
      {/* GOLD TOP BORDER */}
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#c9a030'}}></div>

      {/* LOGO */}
      <div style={{
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        border: '3px solid #c9a030',
        marginBottom: '1.5rem',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>
        <img src="/logo.webp" alt="Uganda Martyrs Parish" style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%'}} />
      </div>

      {/* CHURCH NAME */}
      <h1 style={{
        fontFamily: 'Georgia, serif',
        fontSize: 'clamp(1.1rem, 5vw, 1.5rem)',
        color: 'white',
        marginBottom: '0.25rem',
        letterSpacing: '0.5px'
      }}>Uganda Martyrs Parish</h1>
      <p style={{
        fontSize: '11px',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        marginBottom: '2.5rem'
      }}>Umlazi G, South Africa</p>

      {/* LOADING DOTS */}
      <div style={{display: 'flex', gap: '8px'}}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#c9a030',
            animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`
          }}></div>
        ))}
      </div>

      {/* GOLD BOTTOM BORDER */}
      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: '#c9a030'}}></div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}