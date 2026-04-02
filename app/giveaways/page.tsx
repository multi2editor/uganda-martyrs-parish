export default function Giveaways() {
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
      desc: 'Congratulations to the winner! Thank you all for participating. Watch out for our next giveaway.',
      ends: 'December 25, 2024',
      entries: 87,
      status: 'closed',
      winner: 'Grace Nakalembe'
    },
  ]

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
            position: 'relative' as const,
            overflow: 'hidden'
          }}>
            {/* STATUS BADGE */}
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
              <p style={{fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', marginBottom: '1.1rem'}}>{g.entries} entries so far</p>
            )}

            {g.winner && (
              <p style={{fontSize: '12px', color: '#c9a030', marginBottom: '1rem', fontWeight: '500'}}>🏆 Winner: {g.winner}</p>
            )}

            <button
              disabled={g.status === 'closed'}
              style={{
                background: g.status === 'active' ? 'white' : 'rgba(255,255,255,0.2)',
                color: g.status === 'active' ? '#8b0e0e' : 'rgba(255,255,255,0.5)',
                border: 'none',
                padding: '9px 20px',
                borderRadius: '3px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: g.status === 'active' ? 'pointer' : 'default',
                fontFamily: 'Inter, sans-serif'
              }}
            >{g.status === 'active' ? 'Enter Giveaway' : 'Closed'}</button>
          </div>
        ))}
      </div>
    </main>
  )
}