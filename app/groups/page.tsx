'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
 
export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
const [groupAnnouncements, setGroupAnnouncements] = useState<any[]>([])

useEffect(() => {
  if (selectedGroup) {
    supabase
      .from('group_announcements')
      .select('*')
      .eq('group_name', selectedGroup)
      .order('created_at', {ascending: false})
      .then(({data}) => {
        if (data) setGroupAnnouncements(data)
      })
  }
}, [selectedGroup])

  const groups = [
    // MAIN GROUPS
    {
      icon: '🙏',
      category: 'Main Groups',
      title: "Men's Fellowship",
      schedule: 'Contact parish for schedule',
      desc: 'A brotherhood committed to prayer, accountability and scripture.',
      announcements: [
        {title: "Welcome to Men's Fellowship", body: 'We meet regularly for prayer and fellowship. Contact the parish office for meeting times.'},
      ]
    },
    {
      icon: '🌸',
      category: 'Main Groups',
      title: "Women's Fellowship",
      schedule: 'Contact parish for schedule',
      desc: 'Empowering women through faith, mentorship and community service.',
      announcements: [
        {title: "Welcome to Women's Fellowship", body: 'Join us for our regular meetings. Contact the parish office for more details.'},
      ]
    },
    {
      icon: '✝️',
      category: 'Main Groups',
      title: "Youth Fellowship",
      schedule: 'Contact parish for schedule',
      desc: 'For young parishioners. Faith formation, music and leadership development.',
      announcements: [
        {title: 'Welcome to Youth Fellowship', body: 'A space for young members to grow in faith together. Contact us for meeting times.'},
      ]
    },
    {
      icon: '👶',
      category: 'Main Groups',
      title: "Children's Ministry",
      schedule: 'Sundays during Mass',
      desc: 'Fun, age-appropriate Bible activities for children during Sunday mass.',
      announcements: [
        {title: "Welcome to Children's Ministry", body: 'We meet every Sunday during mass. All children are welcome!'},
      ]
    },
    // SOCIETIES & ORGANISATIONS
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "Association of the Childhood of Jesus",
      schedule: 'Contact parish for schedule',
      desc: 'Dedicated to the spiritual development of children in the faith.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "St. Mary - Ikhwezi",
      schedule: 'Contact parish for schedule',
      desc: 'A group devoted to the Blessed Virgin Mary and her intercession.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "St. John Bosco",
      schedule: 'Contact parish for schedule',
      desc: 'Inspired by the patron saint of youth, serving the young people of the parish.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "St. Joseph",
      schedule: 'Contact parish for schedule',
      desc: 'Under the patronage of St. Joseph, patron of workers and families.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "St. Anne",
      schedule: 'Contact parish for schedule',
      desc: 'Devoted to St. Anne, grandmother of Jesus and patron of mothers.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "Catholic Women's League",
      schedule: 'Contact parish for schedule',
      desc: 'Uniting Catholic women in service, prayer and community outreach.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "Legion of Mary",
      schedule: 'Contact parish for schedule',
      desc: 'An apostolic organisation of Catholics who serve the Church under the banner of Mary.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "St. Francis",
      schedule: 'Contact parish for schedule',
      desc: 'Inspired by St. Francis of Assisi — simplicity, humility and care for creation.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "Sacred Heart",
      schedule: 'Contact parish for schedule',
      desc: 'Devoted to the Sacred Heart of Jesus and his infinite love and mercy.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '⭐',
      category: 'Societies & Organisations',
      title: "St. Dominic",
      schedule: 'Contact parish for schedule',
      desc: 'Under the patronage of St. Dominic, devoted to prayer and the Rosary.',
      announcements: [
        {title: 'Welcome', body: 'Contact the parish office for meeting schedules and more information.'},
      ]
    },
    {
      icon: '🎵',
      category: 'Societies & Organisations',
      title: "Choir",
      schedule: 'Contact parish for schedule',
      desc: 'Praising God through music and song. All vocal and instrumental talents welcome.',
      announcements: [
        {title: 'Welcome to the Choir', body: 'We welcome all singers and musicians. Contact the parish office for rehearsal times.'},
      ]
    },
  ]

  const mainGroups = groups.filter(g => g.category === 'Main Groups')
  const societies = groups.filter(g => g.category === 'Societies & Organisations')

  const selectedGroupData = groups.find(g => g.title === selectedGroup)

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Parish Groups</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2.5rem'}}>Find your community and grow together in faith.</p>

      {/* GROUP ANNOUNCEMENTS MODAL */}
      {selectedGroup && selectedGroupData && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
          <div style={{background: 'white', borderRadius: '8px', width: '100%', maxWidth: '520px', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const}}>
            <div style={{background: '#8b0e0e', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid #c9a030'}}>
              <div>
                <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: 'white'}}>{selectedGroupData.title}</h3>
                <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '2px'}}>Group Updates</p>
              </div>
              <button onClick={() => setSelectedGroup(null)} style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>×</button>
            </div>
            <div style={{padding: '1.25rem', overflowY: 'auto' as const}}>
              {groupAnnouncements.length > 0 ? groupAnnouncements.map((a, i) => (
  <div key={i} style={{background: '#fdf6e3', borderRadius: '6px', padding: '1rem', border: '1px solid #e4e0d8', borderLeft: '4px solid #c9a030', marginBottom: '0.85rem'}}>
    <h4 style={{fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>{a.title}</h4>
    <p style={{fontSize: '13px', color: '#7a6e6e', lineHeight: '1.6'}}>{a.body}</p>
    <p style={{fontSize: '11px', color: '#c9a030', marginTop: '0.5rem'}}>{new Date(a.created_at).toLocaleDateString('en-ZA')}</p>
  </div>
)) : (
  <p style={{fontSize: '13px', color: '#7a6e6e', textAlign: 'center', padding: '1.5rem'}}>No updates yet for this group.</p>
)}
            </div>
          </div>
        </div>
      )}

      {/* MAIN GROUPS */}
      <h2 style={{fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#8b0e0e', marginBottom: '1rem'}}>Main Groups</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem'}}>
        {mainGroups.map((g, i) => (
          <div key={i} style={{background: 'white', borderRadius: '6px', padding: '1.5rem', border: '1px solid #e4e0d8', borderTop: '4px solid #8b0e0e', display: 'flex', flexDirection: 'column' as const, gap: '0.75rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{width: '48px', height: '48px', background: '#8b0e0e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0}}>{g.icon}</div>
              <div>
                <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#8b0e0e'}}>{g.title}</h3>
                <p style={{fontSize: '11px', color: '#c9a030', fontWeight: '500'}}>{g.schedule}</p>
              </div>
            </div>
            <p style={{fontSize: '13px', color: '#7a6e6e', lineHeight: '1.65', flex: 1}}>{g.desc}</p>
            <button onClick={() => setSelectedGroup(g.title)} style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '3px', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', alignSelf: 'flex-start' as const}}>
              See Updates
            </button>
          </div>
        ))}
      </div>

      {/* SOCIETIES */}
      <h2 style={{fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: '#8b0e0e', marginBottom: '1rem'}}>Societies & Organisations</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem'}}>
        {societies.map((g, i) => (
          <div key={i} style={{background: 'white', borderRadius: '6px', padding: '1.5rem', border: '1px solid #e4e0d8', borderTop: '4px solid #c9a030', display: 'flex', flexDirection: 'column' as const, gap: '0.75rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{width: '48px', height: '48px', background: '#c9a030', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0}}>{g.icon}</div>
              <div>
                <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#8b0e0e'}}>{g.title}</h3>
                <p style={{fontSize: '11px', color: '#c9a030', fontWeight: '500'}}>{g.schedule}</p>
              </div>
            </div>
            <p style={{fontSize: '13px', color: '#7a6e6e', lineHeight: '1.65', flex: 1}}>{g.desc}</p>
            <button onClick={() => setSelectedGroup(g.title)} style={{background: '#c9a030', color: '#8b0e0e', border: 'none', padding: '8px 16px', borderRadius: '3px', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif', alignSelf: 'flex-start' as const}}>
              See Updates
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}