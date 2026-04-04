'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Groups() {
  const [joining, setJoining] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const groups = [
    {
      icon: '🙏',
      title: "Men's Fellowship",
      schedule: 'Every Saturday at 7:00 AM',
      desc: 'A brotherhood committed to prayer, accountability and scripture. All men of the parish are welcome to join.'
    },
    {
      icon: '🌸',
      title: "Women's Ministry",
      schedule: 'Every Friday at 5:00 PM',
      desc: 'Empowering women through faith, mentorship and community service. A safe space for growth and sisterhood.'
    },
    {
      icon: '✝️',
      title: 'Youth Group',
      schedule: 'Sundays after Mass',
      desc: 'For ages 13–25. Music, faith formation, games and leadership development. Come as you are.'
    },
    {
      icon: '📖',
      title: 'Bible Study',
      schedule: 'Every Wednesday at 6:00 PM',
      desc: 'Deep dive into scripture with pastor-led discussions and devotionals. Open to all members.'
    },
    {
      icon: '🎵',
      title: 'Choir & Worship',
      schedule: 'Every Thursday at 6:00 PM',
      desc: 'Join our praise team. All musical talents welcome — voice or instrument.'
    },
    {
      icon: '👶',
      title: "Children's Ministry",
      schedule: 'Sundays during Mass',
      desc: 'Fun, age-appropriate Bible stories and activities for ages 3–12.'
    },
  ]

  const handleJoin = async (groupTitle: string) => {
    if (!name || !phone) return
    setLoading(true)
    const { error } = await supabase.from('group_members').insert([{
      group_name: groupTitle,
      full_name: name,
      phone: phone
    }])
    if (!error) {
      setSuccess(groupTitle)
      setJoining(null)
      setName('')
      setPhone('')
    }
    setLoading(false)
  }

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Parish Groups</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Find your community and grow together in faith.</p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem'}}>
        {groups.map((g, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '6px',
            padding: '1.75rem',
            border: '1px solid #e4e0d8',
            borderTop: '4px solid #8b0e0e',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '0.75rem'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{width: '52px', height: '52px', background: '#8b0e0e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0}}>{g.icon}</div>
              <div>
                <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#8b0e0e'}}>{g.title}</h3>
                <p style={{fontSize: '11.5px', color: '#c9a030', fontWeight: '500'}}>{g.schedule}</p>
              </div>
            </div>
            <p style={{fontSize: '13.5px', color: '#7a6e6e', lineHeight: '1.65'}}>{g.desc}</p>

            {success === g.title && (
              <p style={{fontSize: '13px', background: '#eaf5ee', color: '#1a7a3a', padding: '8px 12px', borderRadius: '3px'}}>
                ✅ Request sent! We'll be in touch soon.
              </p>
            )}

            {joining === g.title && (
              <div>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif'}}
                />
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif'}}
                />
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <button onClick={() => handleJoin(g.title)} disabled={loading} style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                    {loading ? 'Sending...' : 'Send Request'}
                  </button>
                  <button onClick={() => setJoining(null)} style={{background: 'transparent', color: '#7a6e6e', border: '1.5px solid #e4e0d8', padding: '8px 16px', borderRadius: '3px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {joining !== g.title && success !== g.title && (
              <button onClick={() => setJoining(g.title)} style={{background: 'transparent', border: '1.5px solid #8b0e0e', color: '#8b0e0e', padding: '8px 18px', borderRadius: '3px', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', alignSelf: 'flex-start' as const}}>
                Join this group
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}