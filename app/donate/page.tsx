'use client'
import { useState } from 'react'

export default function Donate() {
  const [selected, setSelected] = useState('R 100')
  const [custom, setCustom] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('Tithe & Offering')

  const amounts = ['R 50', 'R 100', 'R 250', 'R 500', 'Custom']

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Give & Support</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Your generosity helps us serve our congregation and community.</p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
        
        {/* DONATION BOX */}
        <div style={{background: '#8b0e0e', borderRadius: '6px', padding: '2.5rem', borderTop: '4px solid #c9a030'}}>
          <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.6rem', color: 'white', marginBottom: '0.4rem'}}>Make a Donation</h3>
          <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '13.5px', marginBottom: '1.5rem'}}>Choose an amount or enter a custom figure. All proceeds support parish ministry.</p>
          
          {/* AMOUNT BUTTONS */}
          <div style={{display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem'}}>
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelected(amt)}
                style={{
                  background: selected === amt ? '#c9a030' : 'rgba(255,255,255,0.1)',
                  border: `1.5px solid ${selected === amt ? '#c9a030' : 'rgba(255,255,255,0.25)'}`,
                  color: selected === amt ? '#8b0e0e' : 'white',
                  padding: '8px 18px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: selected === amt ? '600' : '400',
                  fontFamily: 'Inter, sans-serif'
                }}
              >{amt}</button>
            ))}
          </div>

          {/* DONATION TYPE */}
          <div style={{marginBottom: '0.85rem'}}>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              style={{width: '100%', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 14px', borderRadius: '3px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}}
            >
              <option>Tithe & Offering</option>
              <option>Building & Maintenance Fund</option>
              <option>Community Outreach</option>
              <option>General Donation</option>
            </select>
          </div>

          {/* CUSTOM AMOUNT */}
          {selected === 'Custom' && (
            <input
              value={custom}
              onChange={e => setCustom(e.target.value)}
              placeholder="Enter custom amount (ZAR)"
              style={{width: '100%', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 14px', borderRadius: '3px', fontSize: '13px', marginBottom: '0.85rem', fontFamily: 'Inter, sans-serif'}}
            />
          )}

          {/* DONOR NAME */}
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name (optional)"
            style={{width: '100%', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 14px', borderRadius: '3px', fontSize: '13px', marginBottom: '1rem', fontFamily: 'Inter, sans-serif'}}
          />

          <button style={{background: '#c9a030', color: '#8b0e0e', border: 'none', padding: '13px', borderRadius: '3px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif', width: '100%'}}>
            Proceed to Payment
          </button>

          <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '11px', textAlign: 'center', marginTop: '0.75rem'}}>
            Secure payments via PayFast · ZAR only
          </p>
        </div>

        {/* GIVING CATEGORIES */}
        <div>
          {[
            {title: 'Tithe & Offering', verse: '"Honour the Lord with your wealth and with the firstfruits of all your produce." — Proverbs 3:9', desc: 'Give your tithe and weekly offering to support the parish ministry.'},
            {title: 'Building & Maintenance Fund', verse: null, desc: 'Support the upkeep and growth of our parish facilities for future generations.'},
            {title: 'Community Outreach', verse: null, desc: 'Help us serve the vulnerable in Umlazi and surrounding areas through food, clothing and essential care.'},
          ].map((item, i) => (
            <div key={i} style={{background: 'white', borderRadius: '6px', padding: '1.5rem', border: '1px solid #e4e0d8', borderLeft: i === 0 ? '4px solid #c9a030' : '4px solid #8b0e0e', marginBottom: '1rem'}}>
              <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>{item.title}</h3>
              {item.verse && <p style={{fontSize: '12.5px', color: '#c9a030', fontStyle: 'italic', marginBottom: '0.4rem'}}>{item.verse}</p>}
              <p style={{fontSize: '13.5px', color: '#7a6e6e', lineHeight: '1.65'}}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}