export default function Bookings() {
  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Book an Event</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Fill in the form below to request a booking. We will confirm via email within 2 working days.</p>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem'}}>
        
        {/* BOOKING FORM */}
        <div>
          <div style={{marginBottom: '1.1rem'}}>
            <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '5px', color: '#7a6e6e', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Event Type</label>
            <select style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010', background: 'white'}}>
              <option>Baptism</option>
              <option>Wedding Ceremony</option>
              <option>Baby Dedication</option>
              <option>First Holy Communion</option>
              <option>Funeral Service</option>
              <option>Confirmation</option>
              <option>Special Prayer Session</option>
            </select>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem'}}>
            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '5px', color: '#7a6e6e', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Full Name</label>
              <input placeholder="Your full name" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010'}} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '5px', color: '#7a6e6e', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Phone Number</label>
              <input placeholder="+27 00 000 0000" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010'}} />
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem'}}>
            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '5px', color: '#7a6e6e', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Preferred Date</label>
              <input type="date" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010'}} />
            </div>
            <div>
              <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '5px', color: '#7a6e6e', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Time Preference</label>
              <select style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010', background: 'white'}}>
                <option>Morning (8am–12pm)</option>
                <option>Afternoon (12pm–4pm)</option>
                <option>Evening (4pm–7pm)</option>
              </select>
            </div>
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '5px', color: '#7a6e6e', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Additional Notes</label>
            <textarea placeholder="Any special requirements or information..." style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010', minHeight: '80px', resize: 'vertical'}} />
          </div>

          <button style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '11px 28px', borderRadius: '3px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
            Submit Booking Request
          </button>
        </div>

        {/* UPCOMING EVENTS */}
        <div>
          <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#8b0e0e', marginBottom: '1.25rem'}}>Upcoming Events</h3>
          {[
            {date: 'May 4', title: 'Sunday Parish Mass', desc: 'Join us for our weekly mass. Doors open at 8:30 AM.'},
            {date: 'May 10', title: 'Community Outreach Day', desc: 'Shelter visitation and donation drive. Meet at parish by 7:00 AM.'},
            {date: 'May 18', title: 'Youth Graduation', desc: 'Celebrating our youth Bible study graduates. Parents warmly invited.'},
            {date: 'May 25', title: 'Parish Family Day', desc: 'A day of food, games and fellowship for the whole family.'},
          ].map((e, i) => (
            <div key={i} style={{background: 'white', borderRadius: '6px', padding: '1.25rem', border: '1px solid #e4e0d8', marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
              <div style={{background: '#8b0e0e', color: 'white', borderRadius: '4px', padding: '6px 10px', fontSize: '11px', fontWeight: '600', textAlign: 'center', minWidth: '48px', flexShrink: 0}}>
                {e.date.split(' ')[0]}<br/>{e.date.split(' ')[1]}
              </div>
              <div>
                <h4 style={{fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#8b0e0e', marginBottom: '0.25rem'}}>{e.title}</h4>
                <p style={{fontSize: '13px', color: '#7a6e6e'}}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}