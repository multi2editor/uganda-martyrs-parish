export default function Gallery() {
  const categories = ['All', 'Sunday Mass', 'Outreach', 'Youth', 'Special Events']

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Parish Gallery</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2rem'}}>Moments from our services, events and community life.</p>

      {/* CATEGORY FILTER */}
      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
        {categories.map((cat, i) => (
          <button key={i} style={{
            background: i === 0 ? '#8b0e0e' : 'white',
            color: i === 0 ? 'white' : '#8b0e0e',
            border: '1.5px solid #8b0e0e',
            padding: '6px 16px',
            borderRadius: '3px',
            fontSize: '12.5px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif'
          }}>{cat}</button>
        ))}
      </div>

      {/* GALLERY GRID */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginBottom: '2rem'}}>
        {[
          {bg: '#8b0e0e', icon: '✝', label: 'Sunday Mass'},
          {bg: '#6b0e0e', icon: '🙏', label: 'Prayer Service'},
          {bg: '#a01515', icon: '🎵', label: 'Choir'},
          {bg: '#7a1010', icon: '📖', label: 'Bible Study'},
          {bg: '#b01e1e', icon: '👥', label: 'Community'},
          {bg: '#c02020', icon: '🕊', label: 'Special Event'},
          {bg: '#6b0e0e', icon: '👶', label: "Children's Ministry"},
          {bg: '#8b0e0e', icon: '🌿', label: 'Outreach'},
          {bg: '#a01515', icon: '🎁', label: 'Giveaway'},
        ].map((item, i) => (
          <div key={i} style={{
            background: item.bg,
            borderRadius: '6px',
            aspectRatio: '4/3',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            position: 'relative' as const,
            overflow: 'hidden'
          }}>
            <span style={{fontSize: '2rem'}}>{item.icon}</span>
            <span style={{fontSize: '11px', color: 'rgba(255,255,255,0.7)'}}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* UPLOAD NOTE */}
      <div style={{background: 'white', borderRadius: '6px', padding: '1.5rem', border: '1.5px dashed #e4e0d8', textAlign: 'center'}}>
        <p style={{fontSize: '14px', color: '#8b0e0e', fontWeight: '500', marginBottom: '4px'}}>📸 Real photos coming soon</p>
        <p style={{fontSize: '13px', color: '#7a6e6e'}}>Photos from our masses, outreach and events will be uploaded here by our admin team.</p>
      </div>
    </main>
  )
}