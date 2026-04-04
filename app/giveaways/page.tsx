'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Giveaways() {
  const [entering, setEntering] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const giveaways = [
    {
      title: 'Easter Hamper Giveaway',
      desc: 'Win a family food hamper. Open to all registered members. Winner announced during Sunday mass.',
      ends: 'May 15, 2026',
      entries: 42,
      status: 'active'
    },
    {
      title: "Children's Bible Pack",
      desc: '3 lucky children will each receive a Bible, devotional and stationery pack. Parents enter on behalf of your child.',
      ends: 'May 31, 2026',
      entries: 18,
      status: 'active'
    },
    {
      title: 'Christmas Gift Basket 2024',
      desc: 'Congratulations to the winner! Thank you all for participating.',
      ends: 'December 25, 2024',
      entries: 87,
      status: 'closed',
      winner: 'Grace Nakalembe'
    },
  ]

  const handleEnter = async (title: string) => {
    if (!name || !phone) return
    setLoading(true)
    const { error } = await supabase.from('giveaway_entries').insert([{
      giveaway_title: title,
      full_name: name,
      phone: phone
    }])
    if (!error) {
      setSuccess(title)
      setEntering(null)
      setName('')
      setPhone('')
    }
    setLoading(false)
  }

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Giveaways</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Blessings shared with our congregation and community.</p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem'}}>
        {giveaways.map((g, i) => (
          <div key={i} style={{
            background: g.status === 'active' ? 'linear-gradient(135deg, #8b0e0e, #cc1b1b)' : 'linear-gradient(135deg, #6b0e0e, #8b0e0e)',
            borderRadius: '6px',
            padding: '1.75rem',
            color: 'white',
            borderBottom: '3px solid #c9a030',
            opacity: g.status === 'closed' ? 0.8 : 1,
          }}>
            <span style={{
              fontSize: '10px',
              background: g.status === 'active' ? '#c9a030' : 'rgba(255,255,255,0.2)',
              color: g.status === 'active' ? '#8b0e0e' : 'white',
              padding: '4px 10px',
              borderRadius: '2px',
              display: 'inline-block',
              marginBottom: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase' as const
            }}>{g.status === 'active' ? `Active — Ends ${g.ends}` : 'Closed'}</span>

            <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.2rem', marginBottom: '0.5rem'}}>{g.title}</h3>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '1rem', lineHeight: '1.6'}}>{g.desc}</p>

            {g.status === 'active' && (
              <p style={{fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem'}}>{g.entries} entries so far</p>
            )}

            {g.winner && (
              <p style={{fontSize: '12px', color: '#c9a030', marginBottom: '1rem', fontWeight: '500'}}>🏆 Winner: {g.winner}</p>
            )}

            {success === g.title && (
              <p style={{fontSize: '12.5px', background: 'rgba(255,255,255,0.15)', padding: '8px 12px', borderRadius: '3px', marginBottom: '1rem'}}>
                ✅ You're entered! Good luck!
              </p>
            )}

            {entering === g.title && (
              <div style={{marginBottom: '1rem'}}>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  style={{width: '100%', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 12px', borderRadius: '3px', fontSize: '13px', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif'}}
                />
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  style={{width: '100%', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 12px', borderRadius: '3px', fontSize: '13px', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif'}}
                />
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <button onClick={() => handleEnter(g.title)} disabled={loading} style={{background: 'white', color: '#8b0e0e', border: 'none', padding: '8px 16px', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                    {loading ? 'Entering...' : 'Submit Entry'}
                  </button>
                  <button onClick={() => setEntering(null)} style={{background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', padding: '8px 16px', borderRadius: '3px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {g.status === 'active' && entering !== g.title && success !== g.title && (
              <button onClick={() => setEntering(g.title)} style={{background: 'white', color: '#8b0e0e', border: 'none', padding: '9px 20px', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                Enter Giveaway
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}