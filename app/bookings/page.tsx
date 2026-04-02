'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Bookings() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    event_type: 'Baptism',
    preferred_date: '',
    time_preference: 'Morning (8am–12pm)',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!formData.full_name || !formData.phone || !formData.preferred_date) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.from('bookings').insert([formData])
    if (error) {
      setError('Something went wrong. Please try again.')
    } else {
      setSuccess(true)
      setFormData({full_name: '', phone: '', event_type: 'Baptism', preferred_date: '', time_preference: 'Morning (8am–12pm)', notes: ''})
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
    background: 'white'
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
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Book an Event</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Fill in the form below to request a booking. We will confirm within 2 working days.</p>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem'}}>
        
        {/* BOOKING FORM */}
        <div>
          {success ? (
            <div style={{background: '#eaf5ee', border: '1.5px solid #1a7a3a', borderRadius: '6px', padding: '2rem', textAlign: 'center'}}>
              <p style={{fontSize: '2rem', marginBottom: '0.75rem'}}>✅</p>
              <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#1a7a3a', marginBottom: '0.5rem'}}>Booking Submitted!</h3>
              <p style={{fontSize: '13.5px', color: '#7a6e6e', marginBottom: '1rem'}}>Thank you! We will review your request and get back to you within 2 working days.</p>
              <button onClick={() => setSuccess(false)} style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '3px', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>Make another booking</button>
            </div>
          ) : (
            <div>
              <div style={{marginBottom: '1.1rem'}}>
                <label style={labelStyle}>Event Type</label>
                <select value={formData.event_type} onChange={e => setFormData({...formData, event_type: e.target.value})} style={inputStyle}>
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
                  <label style={labelStyle}>Full Name *</label>
                  <input value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} placeholder="Your full name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+27 00 000 0000" style={inputStyle} />
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem'}}>
                <div>
                  <label style={labelStyle}>Preferred Date *</label>
                  <input type="date" value={formData.preferred_date} onChange={e => setFormData({...formData, preferred_date: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Time Preference</label>
                  <select value={formData.time_preference} onChange={e => setFormData({...formData, time_preference: e.target.value})} style={inputStyle}>
                    <option>Morning (8am–12pm)</option>
                    <option>Afternoon (12pm–4pm)</option>
                    <option>Evening (4pm–7pm)</option>
                  </select>
                </div>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={labelStyle}>Additional Notes</label>
                <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Any special requirements..." style={{...inputStyle, minHeight: '80px', resize: 'vertical' as const}} />
              </div>

              {error && <p style={{fontSize: '13px', color: '#8b0e0e', background: '#fdeaea', padding: '8px 12px', borderRadius: '3px', marginBottom: '1rem'}}>{error}</p>}

              <button onClick={handleSubmit} disabled={loading} style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '11px 28px', borderRadius: '3px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', opacity: loading ? 0.7 : 1}}>
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </div>
          )}
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
              <div style={{background: '#8b0e0e', color: 'white', borderRadius: '4px', padding: '6px 10px', fontSize: '11px', fontWeight: '600', textAlign: 'center' as const, minWidth: '48px', flexShrink: 0}}>
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