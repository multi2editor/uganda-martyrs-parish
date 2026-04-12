'use client'
import { useEffect, useState } from 'react'

export default function NotificationPrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        setTimeout(() => setShow(true), 3000)
      }
    }
  }, [])

  const handleAllow = async () => {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      setShow(false)
      new Notification('Uganda Martyrs Parish', {
        body: 'You will now receive parish updates and announcements!',
        icon: '/logo.webp'
      })
    } else {
      setShow(false)
    }
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      padding: '1.25rem',
      border: '1.5px solid #e4e0d8',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      maxWidth: '320px',
      zIndex: 1000
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem'}}>
        <img src="/logo.webp" alt="logo" style={{width: '36px', height: '36px', borderRadius: '50%', objectFit: 'contain'}} />
        <div>
          <p style={{fontSize: '13.5px', fontWeight: '500', color: '#8b0e0e'}}>Stay connected!</p>
          <p style={{fontSize: '11.5px', color: '#7a6e6e'}}>Uganda Martyrs Parish</p>
        </div>
      </div>
      <p style={{fontSize: '13px', color: '#7a6e6e', marginBottom: '1rem', lineHeight: '1.6'}}>
        Allow notifications to receive announcements, booking updates and service reminders.
      </p>
      <div style={{display: 'flex', gap: '0.5rem'}}>
        <button onClick={handleAllow} style={{
          background: '#8b0e0e', color: 'white', border: 'none',
          padding: '8px 16px', borderRadius: '3px', fontSize: '12.5px',
          fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', flex: 1
        }}>Allow</button>
        <button onClick={() => setShow(false)} style={{
          background: 'transparent', color: '#7a6e6e',
          border: '1.5px solid #e4e0d8', padding: '8px 16px',
          borderRadius: '3px', fontSize: '12.5px', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif'
        }}>Later</button>
      </div>
    </div>
  )
}