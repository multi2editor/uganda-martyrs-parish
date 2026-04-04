'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    if (isRegister) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      })
      if (error) setError(error.message)
      else setError('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else window.location.href = '/'
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #e4e0d8',
    borderRadius: '3px',
    padding: '10px 13px',
    fontSize: '13.5px',
    fontFamily: 'Inter, sans-serif',
    color: '#1a1010',
    background: 'white',
    marginBottom: '1.1rem'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '500' as const,
    marginBottom: '5px',
    color: '#7a6e6e',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.3px'
  }

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '440px', margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
        <img src="/logo.webp" alt="logo" style={{width: '64px', height: '64px', borderRadius: '50%', objectFit: 'contain', background: '#fdf6e3', padding: '4px', border: '2px solid #c9a030'}} />
      </div>

      <div style={{background: 'white', borderRadius: '6px', padding: '2.5rem', border: '1.5px solid #e4e0d8'}}>
        <h2 style={{fontFamily: 'Georgia, serif', fontSize: '1.8rem', color: '#8b0e0e', marginBottom: '0.2rem'}}>
          {isRegister ? 'Create Account' : 'Member Login'}
        </h2>
        <p style={{fontSize: '13.5px', color: '#7a6e6e', marginBottom: '1.75rem'}}>
          {isRegister ? 'Join Uganda Martyrs Parish online.' : 'Sign in to access your profile and bookings.'}
        </p>

        {isRegister && (
  <div>
    <label style={labelStyle}>Full Name</label>
    <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={inputStyle} />
    <label style={labelStyle}>Phone Number</label>
<input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+27 00 000 0000" style={inputStyle} />
  </div>
)}

        <div>
          <label style={labelStyle}>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
        </div>

        {error && (
          <p style={{fontSize: '13px', color: error.includes('Check') ? '#1a7a3a' : '#8b0e0e', marginBottom: '1rem', padding: '8px 12px', background: error.includes('Check') ? '#eaf5ee' : '#fdeaea', borderRadius: '3px'}}>
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '13px', borderRadius: '3px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', width: '100%', marginBottom: '1rem', opacity: loading ? 0.7 : 1}}
        >
          {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
        </button>

        <p style={{textAlign: 'center', fontSize: '13px', color: '#7a6e6e'}}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => { setIsRegister(!isRegister); setError('') }} style={{color: '#8b0e0e', cursor: 'pointer', fontWeight: '500'}}>
            {isRegister ? 'Sign in' : 'Register here'}
          </span>
        </p>
      </div>
    </main>
  )
}