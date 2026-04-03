import { supabase } from '../lib/supabase.js'

export default async function Announcements() {
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Announcements</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Stay up to date with everything happening at Uganda Martyrs Parish.</p>

      {announcements && announcements.length > 0 ? (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem'}}>
          {announcements.map((a: any) => (
            <div key={a.id} style={{
              background: 'white',
              borderRadius: '6px',
              padding: '1.5rem',
              border: '1px solid #e4e0d8',
              borderLeft: '4px solid #8b0e0e',
            }}>
              <span style={{
                fontSize: '10px',
                background: a.category === 'Urgent' ? '#c9a030' : '#8b0e0e',
                color: a.category === 'Urgent' ? '#8b0e0e' : 'white',
                padding: '3px 10px',
                borderRadius: '2px',
                display: 'inline-block',
                marginBottom: '0.6rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>{a.category}</span>
              <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.15rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>{a.title}</h3>
              <p style={{fontSize: '13.5px', color: '#7a6e6e', lineHeight: '1.65', marginBottom: '0.75rem'}}>{a.body}</p>
              <p style={{fontSize: '11px', color: '#c9a030', fontWeight: '500'}}>
                {new Date(a.created_at).toLocaleDateString('en-ZA', {day: 'numeric', month: 'long', year: 'numeric'})}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '3rem', color: '#7a6e6e'}}>
          <p style={{fontSize: '2rem', marginBottom: '0.75rem'}}>📢</p>
          <p style={{fontSize: '14px'}}>No announcements yet. Check back soon!</p>
        </div>
      )}
    </main>
  )
}