export default function Streams() {
  const past = [
    {title: 'Easter Sunday Mass 2025', date: 'April 20, 2025', views: '2.4K views'},
    {title: 'Martyrs Day Commemoration 2024', date: 'June 3, 2024', views: '3.8K views'},
    {title: 'Christmas Midnight Mass 2024', date: 'December 25, 2024', views: '1.9K views'},
  ]

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Live & Past Streams</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Watch our Sunday masses and special programmes on YouTube.</p>

      {/* LIVE STREAM CARD */}
      <div style={{background: '#8b0e0e', borderRadius: '6px', overflow: 'hidden', marginBottom: '2rem', borderBottom: '3px solid #c9a030'}}>
        <div style={{height: '220px', background: '#6b0e0e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.75rem'}}>
          <div style={{width: '60px', height: '60px', background: '#c9a030', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <div style={{width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '18px solid #8b0e0e', marginLeft: '4px'}}></div>
          </div>
          <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px'}}>Live every Sunday at 9:00 AM</p>
        </div>
        <div style={{padding: '1.25rem'}}>
          <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: 'white', marginBottom: '0.25rem'}}>Sunday Mass — Live Stream</h3>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)'}}>YouTube link coming soon · Subscribe to get notified</p>
        </div>
      </div>

      {/* PAST STREAMS */}
      <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#8b0e0e', marginBottom: '1.25rem'}}>Past Streams</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem'}}>
        {past.map((s, i) => (
          <div key={i} style={{background: 'white', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e4e0d8', borderBottom: '3px solid #c9a030'}}>
            <div style={{height: '160px', background: '#8b0e0e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem'}}>
              <div style={{width: '48px', height: '48px', background: '#c9a030', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <div style={{width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '15px solid #8b0e0e', marginLeft: '3px'}}></div>
              </div>
              <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '11px'}}>Replay available</p>
            </div>
            <div style={{padding: '1.1rem'}}>
              <h4 style={{fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#8b0e0e', marginBottom: '0.25rem'}}>{s.title}</h4>
              <p style={{fontSize: '12.5px', color: '#7a6e6e'}}>{s.date} · {s.views}</p>
            </div>
          </div>
        ))}
      </div>

      {/* YOUTUBE SUBSCRIBE */}
      <div style={{background: 'white', borderRadius: '6px', padding: '1.25rem', border: '1px solid #e4e0d8', display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <div style={{width: '44px', height: '44px', background: '#FF0000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', fontSize: '16px'}}>▶</div>
        <div style={{flex: 1}}>
          <h4 style={{fontSize: '14px', color: '#8b0e0e', fontWeight: '500'}}>Subscribe on YouTube</h4>
          <p style={{fontSize: '13px', color: '#7a6e6e'}}>YouTube link coming soon — turn on notifications to never miss a service.</p>
        </div>
        <button style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0}}>Subscribe</button>
      </div>
    </main>
  )
}