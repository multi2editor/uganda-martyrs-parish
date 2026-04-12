'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Catechesis() {
  const [announcements, setAnnouncements] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from('group_announcements')
      .select('*')
      .eq('group_name', 'Catechesis')
      .order('created_at', {ascending: false})
      .then(({data}) => {
        if (data) setAnnouncements(data)
      })
  }, [])

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Catechesis</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Faith formation and religious education for parishioners of all ages.</p>

      {announcements.length > 0 ? (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem'}}>
          {announcements.map((a, i) => (
            <div key={i} style={{background: 'white', borderRadius: '6px', padding: '1.5rem', border: '1px solid #e4e0d8', borderLeft: '4px solid #c9a030'}}>
              <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>{a.title}</h3>
              <p style={{fontSize: '13.5px', color: '#7a6e6e', lineHeight: '1.65', marginBottom: '0.75rem'}}>{a.body}</p>
              <p style={{fontSize: '11px', color: '#c9a030', fontWeight: '500'}}>{new Date(a.created_at).toLocaleDateString('en-ZA')}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{background: 'white', borderRadius: '6px', padding: '3rem', textAlign: 'center', border: '1px solid #e4e0d8'}}>
          <p style={{fontSize: '2rem', marginBottom: '0.75rem'}}>✝️</p>
          <p style={{fontSize: '14px', color: '#7a6e6e'}}>No updates yet. Check back soon!</p>
        </div>
      )}
    </main>
  )
}