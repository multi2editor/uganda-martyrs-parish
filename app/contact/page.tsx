export default function Contact() {
  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Find & Contact Us</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>We'd love to hear from you. Come visit us or get in touch anytime.</p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
        
        {/* CONTACT DETAILS */}
        <div>
          {[
            {
              icon: '📍',
              title: 'Address',
              lines: ['4 Nunu Shezi Drive, Section G', 'Umlazi, 4066', 'KwaZulu-Natal, South Africa']
            },
            {
              icon: '📞',
              title: 'Phone',
              lines: ['+27 63 616 4024']
            },
            {
              icon: '✉️',
              title: 'Email',
              lines: ['ugandamp@outlook.com']
            },
            {
              icon: '⏰',
              title: 'Service Times',
              lines: ['Sunday Mass: 7:30 AM & 10:00 AM', 'Wednesday Bible Study: 6:00 PM', 'Friday Women\'s Ministry: 5:00 PM', 'Saturday Men\'s Fellowship: 7:00 AM']
            },
            {
              icon: '📅',
              title: 'Uganda Martyrs Day',
              lines: ['June 3rd — Annual Commemoration Mass', 'All are welcome to this special service.']
            },
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem'}}>
              <div style={{
                width: '38px',
                height: '38px',
                background: '#8b0e0e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0
              }}>{item.icon}</div>
              <div>
                <h4 style={{fontSize: '13.5px', fontWeight: '500', color: '#8b0e0e', marginBottom: '4px'}}>{item.title}</h4>
                {item.lines.map((line, j) => (
                  <p key={j} style={{fontSize: '13px', color: '#7a6e6e', lineHeight: '1.7'}}>{line}</p>
                ))}
              </div>
            </div>
          ))}

          {/* SOCIAL LINKS */}
          <div style={{display: 'flex', gap: '0.75rem', marginTop: '1rem'}}>
            <button style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '3px', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>Facebook</button>
            <button style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '3px', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>Instagram</button>
            <button style={{background: '#FF0000', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '3px', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>YouTube</button>
          </div>
        </div>

        {/* MAP */}
        <div>
          <div style={{borderRadius: '6px', overflow: 'hidden', border: '1px solid #e4e0d8', marginBottom: '1rem'}}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.123456789!2d30.9!3d-29.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s4+Nunu+Shezi+Drive%2C+Umlazi%2C+4066!5e0!3m2!1sen!2sza!4v1234567890"
              width="100%"
              height="320"
              style={{border: 0, display: 'block'}}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* CONTACT FORM */}
          <div style={{background: 'white', borderRadius: '6px', padding: '1.5rem', border: '1px solid #e4e0d8'}}>
            <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#8b0e0e', marginBottom: '1rem'}}>Send us a message</h3>
            <div style={{marginBottom: '0.85rem'}}>
              <input placeholder="Your name" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010'}} />
            </div>
            <div style={{marginBottom: '0.85rem'}}>
              <input placeholder="Your email or phone" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010'}} />
            </div>
            <div style={{marginBottom: '1rem'}}>
              <textarea placeholder="Your message..." style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '10px 13px', fontSize: '13.5px', fontFamily: 'Inter, sans-serif', color: '#1a1010', minHeight: '100px', resize: 'vertical'}} />
            </div>
            <button style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '11px 28px', borderRadius: '3px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
              Send Message
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}