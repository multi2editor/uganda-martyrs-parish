import { supabase } from '../lib/supabase.js'

export default async function Gallery() {
  const { data: files } = await supabase.storage.from('gallery').list()
  
  const categories = ['All', 'Sunday Mass', 'Outreach', 'Youth', 'Special Events']

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Parish Gallery</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2rem'}}>Moments from our services, events and community life.</p>

      {files && files.length > 0 ? (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginBottom: '2rem'}}>
          {files.map((file, i) => {
            const { data } = supabase.storage.from('gallery').getPublicUrl(file.name)
            return (
              <div key={i} style={{borderRadius: '6px', overflow: 'hidden', aspectRatio: '4/3'}}>
                <img
                  src={data.publicUrl}
                  alt={file.name}
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginBottom: '2rem'}}>
          {[
            {bg: '#8b0e0e', icon: '✝', label: 'Sunday Mass'},
            {bg: '#6b0e0e', icon: '🙏', label: 'Prayer Service'},
            {bg: '#a01515', icon: '🎵', label: 'Choir'},
            {bg: '#7a1010', icon: '📖', label: 'Bible Study'},
            {bg: '#b01e1e', icon: '👥', label: 'Community'},
            {bg: '#c02020', icon: '🕊', label: 'Special Event'},
          ].map((item, i) => (
            <div key={i} style={{background: item.bg, borderRadius: '6px', aspectRatio: '4/3', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <span style={{fontSize: '2rem'}}>{item.icon}</span>
              <span style={{fontSize: '11px', color: 'rgba(255,255,255,0.7)'}}>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{background: 'white', borderRadius: '6px', padding: '1.5rem', border: '1.5px dashed #e4e0d8', textAlign: 'center'}}>
        <p style={{fontSize: '14px', color: '#8b0e0e', fontWeight: '500', marginBottom: '4px'}}>📸 Photos uploaded by our admin team</p>
        <p style={{fontSize: '13px', color: '#7a6e6e'}}>Real photos from our masses, outreach and events will appear here.</p>
      </div>
    </main>
  )
}