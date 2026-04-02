export default function Announcements() {
  const announcements = [
    {
      title: 'Sunday Service Time Change',
      category: 'Urgent',
      date: 'March 28, 2026',
      body: 'Starting this Sunday, our main service will begin at 9:00 AM instead of 10:00 AM. Please plan accordingly and inform your family and friends.'
    },
    {
      title: 'Youth Camp Registration Open',
      category: 'Youth',
      date: 'March 25, 2026',
      body: 'Registration for the annual youth camp is now open. Limited slots available — register before 30th April. Contact the youth office for details.'
    },
    {
      title: 'Community Outreach — May 10',
      category: 'Community',
      date: 'March 22, 2026',
      body: 'We will be visiting a local shelter on May 10th. Volunteers are needed. Bring clothes, food and essentials to donate.'
    },
    {
      title: 'Parish Hall Renovation Update',
      category: 'Building',
      date: 'March 18, 2026',
      body: 'Phase 2 of the hall renovation has begun. We thank all contributors. Your generosity is building God\'s house.'
    },
  ]

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Announcements</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Stay up to date with everything happening at Uganda Martyrs Parish.</p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem'}}>
        {announcements.map((a, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '6px',
            padding: '1.5rem',
            borderLeft: '4px solid #8b0e0e',
            border: '1px solid #e4e0d8',
            borderLeftWidth: '4px',
            borderLeftColor: '#8b0e0e',
            borderLeftStyle: 'solid'
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
            <p style={{fontSize: '11px', color: '#c9a030', fontWeight: '500'}}>{a.date}</p>
          </div>
        ))}
      </div>
    </main>
  )
}