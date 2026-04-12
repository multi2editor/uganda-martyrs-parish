'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Admin() {
  const [page, setPage] = useState('dashboard')
  const [authorized, setAuthorized] = useState(false)
  const [announcements, setAnnouncements] = useState([
    {title: 'Sunday Service Time Change', category: 'Urgent', date: 'Mar 28', body: 'Starting this Sunday, our main service will begin at 9:00 AM.'},
    {title: 'Youth Camp Registration Open', category: 'Youth', date: 'Mar 25', body: 'Limited slots available — register before 30th April.'},
    {title: 'Community Outreach — May 10', category: 'Community', date: 'Mar 22', body: 'We will be visiting a local shelter on May 10th.'},
  ])
  const [bookings, setBookings] = useState([
    {id: 1, name: 'Sipho Nkosi', type: 'Baptism', date: 'May 10', status: 'pending'},
    {id: 2, name: 'Zanele Mthembu', type: 'Wedding', date: 'May 17', status: 'pending'},
    {id: 3, name: 'Peter Dube', type: 'Baby Dedication', date: 'May 24', status: 'pending'},
    {id: 4, name: 'Grace Sithole', type: 'Baptism', date: 'Apr 27', status: 'approved'},
  ])
  const [groupMembers, setGroupMembers] = useState<any[]>([])
  const [giveawayEntries, setGiveawayEntries] = useState<any[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newCat, setNewCat] = useState('General')

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()
      if (profile && profile.role === 'admin') {
        setAuthorized(true)
        loadData()
      } else {
        window.location.href = '/'
      }
    }
    checkAdmin()
  }, [])

  const loadData = async () => {
    const { data: gm } = await supabase.from('group_members').select('*').order('created_at', {ascending: false})
    if (gm) setGroupMembers(gm)
    const { data: ge } = await supabase.from('giveaway_entries').select('*').order('created_at', {ascending: false})
    if (ge) setGiveawayEntries(ge)
    const { data: bk } = await supabase.from('bookings').select('*').order('created_at', {ascending: false})
    if (bk) setBookings(bk.map((b: any, i: number) => ({id: i+1, name: b.full_name, type: b.event_type, date: b.preferred_date, status: b.status})))
  }

  const postAnnouncement = async () => {
    if (!newTitle || !newBody) return
    const { error } = await supabase
      .from('announcements')
      .insert([{title: newTitle, body: newBody, category: newCat}])
    if (!error) {
      setAnnouncements([{title: newTitle, category: newCat, date: 'Today', body: newBody}, ...announcements])
      setNewTitle(''); setNewBody('')
    }
  }

  const updateBooking = (id: number, status: string) => {
    setBookings(bookings.map(b => b.id === id ? {...b, status} : b))
  }

  const navItems = [
    {id: 'dashboard', label: 'Dashboard', icon: '📊'},
    {id: 'bookings', label: 'Bookings', icon: '📅'},
    {id: 'announcements', label: 'Announcements', icon: '📢'},
    {id: 'members', label: 'Members', icon: '👥'},
    {id: 'groups', label: 'Group Requests', icon: '🤝'},
    {id: 'giveaway_entries', label: 'Giveaway Entries', icon: '🎁'},
    {id: 'donations', label: 'Donations', icon: '💰'},
    {id: 'gallery', label: 'Gallery', icon: '🖼'},
    {id: 'giveaways', label: 'Giveaways', icon: '🎀'},
    {id: 'group_announcements', label: 'Group Updates', icon: '👥'},
  ]

  const sidebarStyle = {
    width: '200px',
    background: '#8b0e0e',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    borderRight: '3px solid #c9a030',
    minHeight: '100vh'
  }

  const statCard = (label: string, value: string, sub: string, subColor = '#1a7a3a') => (
    <div style={{background: 'white', borderRadius: '6px', padding: '1rem', border: '1px solid #e4e0d8'}}>
      <p style={{fontSize: '11px', color: '#7a6e6e', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '4px'}}>{label}</p>
      <p style={{fontSize: '1.6rem', fontWeight: '500', color: '#8b0e0e', lineHeight: '1'}}>{value}</p>
      <p style={{fontSize: '11px', color: subColor, marginTop: '4px'}}>{sub}</p>
    </div>
  )

  const badgeStyle = (status: string) => ({
    fontSize: '10px',
    padding: '2px 8px',
    borderRadius: '2px',
    fontWeight: '500' as const,
    background: status === 'approved' ? '#eaf5ee' : status === 'declined' ? '#fdeaea' : '#fff8e0',
    color: status === 'approved' ? '#1a7a3a' : status === 'declined' ? '#8b0e0e' : '#b07800'
  })

  if (!authorized) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column' as const, gap: '1rem'}}>
        <div style={{width: '40px', height: '40px', border: '3px solid #e4e0d8', borderTop: '3px solid #8b0e0e', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
        <p style={{color: '#7a6e6e', fontSize: '14px'}}>Checking access...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f5f4f2'}}>
      
      {/* SIDEBAR */}
      <div style={sidebarStyle}>
        <div style={{padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <img src="/logo.webp" alt="logo" style={{width: '32px', height: '32px', borderRadius: '50%', objectFit: 'contain', background: 'white', padding: '2px'}} />
          <div>
            <p style={{color: 'white', fontSize: '12px', fontWeight: '500'}}>Uganda Martyrs</p>
            <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '10px'}}>Admin Panel</p>
          </div>
        </div>
        <div style={{padding: '0.75rem 0', flex: 1}}>
          {navItems.map(item => (
            <div key={item.id} onClick={() => setPage(item.id)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '9px 16px', cursor: 'pointer',
              color: page === item.id ? 'white' : 'rgba(255,255,255,0.75)',
              background: page === item.id ? 'rgba(255,255,255,0.12)' : 'transparent',
              borderLeft: `3px solid ${page === item.id ? '#c9a030' : 'transparent'}`,
              fontSize: '12.5px'
            }}>
              <span style={{fontSize: '14px'}}>{item.icon}</span>
              {item.label}
              {item.id === 'bookings' && bookings.filter(b => b.status === 'pending').length > 0 && (
                <span style={{marginLeft: 'auto', background: '#c9a030', color: '#8b0e0e', fontSize: '10px', fontWeight: '600', padding: '1px 6px', borderRadius: '10px'}}>
                  {bookings.filter(b => b.status === 'pending').length}
                </span>
              )}
            </div>
          ))}
        </div>
        <div style={{padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <a href="/" style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px', textDecoration: 'none'}}>← Back to website</a>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column' as const}}>
        
        {/* TOPBAR */}
        <div style={{background: 'white', borderBottom: '1px solid #e4e0d8', padding: '0 1.5rem', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h2 style={{fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#8b0e0e', textTransform: 'capitalize' as const}}>{page.replace('_', ' ')}</h2>
          <span style={{fontSize: '12px', color: '#7a6e6e'}}>Uganda Martyrs Parish Admin</span>
        </div>

        <div style={{padding: '1.25rem', flex: 1}}>

          {/* DASHBOARD */}
          {page === 'dashboard' && (
            <div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem'}}>
                {statCard('Total members', '0', '↑ 0 this month')}
                {statCard('Pending bookings', `${bookings.filter(b => b.status === 'pending').length}`, 'Awaiting review', '#b07800')}
                {statCard('Donations (Apr)', 'R0.00', '↑ 0% vs March')}
                {statCard('Active giveaways', '0', 'Ends this month')}
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
                  <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 style={{fontSize: '13px', fontWeight: '500'}}>Recent bookings</h3>
                    <span onClick={() => setPage('bookings')} style={{fontSize: '11.5px', color: '#8b0e0e', cursor: 'pointer'}}>View all</span>
                  </div>
                  <div style={{padding: '0.75rem 1rem'}}>
                    {bookings.slice(0, 3).map(b => (
                      <div key={b.id} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #e4e0d8'}}>
                        <div style={{width: '32px', height: '32px', background: '#eaf0fb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '500', color: '#1a4a8c', flexShrink: 0}}>
                          {b.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div style={{flex: 1}}>
                          <p style={{fontSize: '12.5px', fontWeight: '500'}}>{b.name}</p>
                          <p style={{fontSize: '11px', color: '#7a6e6e'}}>{b.type} · {b.date}</p>
                        </div>
                        <span style={badgeStyle(b.status)}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
                  <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 style={{fontSize: '13px', fontWeight: '500'}}>Latest announcements</h3>
                    <span onClick={() => setPage('announcements')} style={{fontSize: '11.5px', color: '#8b0e0e', cursor: 'pointer'}}>View all</span>
                  </div>
                  <div style={{padding: '0.75rem 1rem'}}>
                    {announcements.slice(0, 3).map((a, i) => (
                      <div key={i} style={{padding: '8px 0', borderBottom: '1px solid #e4e0d8'}}>
                        <p style={{fontSize: '12.5px', fontWeight: '500', marginBottom: '2px'}}>{a.title}</p>
                        <p style={{fontSize: '11px', color: '#7a6e6e'}}>{a.body.substring(0, 50)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BOOKINGS */}
          {page === 'bookings' && (
            <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
              <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                <h3 style={{fontSize: '13px', fontWeight: '500'}}>All booking requests</h3>
              </div>
              <div style={{padding: '0.75rem 1rem'}}>
                {bookings.map(b => (
                  <div key={b.id} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #e4e0d8'}}>
                    <div style={{width: '36px', height: '36px', background: '#eaf0fb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '500', color: '#1a4a8c', flexShrink: 0}}>
                      {b.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div style={{flex: 1}}>
                      <p style={{fontSize: '13px', fontWeight: '500'}}>{b.name}</p>
                      <p style={{fontSize: '11.5px', color: '#7a6e6e'}}>{b.type} · {b.date}</p>
                    </div>
                    <span style={badgeStyle(b.status)}>{b.status}</span>
                    {b.status === 'pending' && (
                      <div style={{display: 'flex', gap: '4px'}}>
                        <button onClick={() => updateBooking(b.id, 'approved')} style={{background: '#eaf5ee', color: '#1a7a3a', border: 'none', padding: '4px 10px', borderRadius: '3px', fontSize: '11px', cursor: 'pointer', fontWeight: '500'}}>✓ Approve</button>
                        <button onClick={() => updateBooking(b.id, 'declined')} style={{background: '#fdeaea', color: '#8b0e0e', border: 'none', padding: '4px 10px', borderRadius: '3px', fontSize: '11px', cursor: 'pointer', fontWeight: '500'}}>✗ Decline</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANNOUNCEMENTS */}
          {page === 'announcements' && (
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start'}}>
              <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
                <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                  <h3 style={{fontSize: '13px', fontWeight: '500'}}>Post new announcement</h3>
                </div>
                <div style={{padding: '1rem'}}>
                  <div style={{marginBottom: '0.85rem'}}>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Announcement title" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}} />
                  </div>
                  <div style={{marginBottom: '0.85rem'}}>
                    <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}}>
                      <option>General</option>
                      <option>Urgent</option>
                      <option>Youth</option>
                      <option>Community</option>
                      <option>Building</option>
                    </select>
                  </div>
                  <div style={{marginBottom: '1rem'}}>
                    <textarea value={newBody} onChange={e => setNewBody(e.target.value)} placeholder="Write your announcement..." style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif', minHeight: '80px', resize: 'vertical'}} />
                  </div>
                  <button onClick={postAnnouncement} style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>Post Announcement</button>
                </div>
              </div>
              <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
                <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                  <h3 style={{fontSize: '13px', fontWeight: '500'}}>Published announcements</h3>
                </div>
                <div style={{padding: '0.75rem 1rem'}}>
                  {announcements.map((a, i) => (
                    <div key={i} style={{padding: '8px 0', borderBottom: '1px solid #e4e0d8'}}>
                      <p style={{fontSize: '12.5px', fontWeight: '500', marginBottom: '2px'}}>{a.title}</p>
                      <p style={{fontSize: '11px', color: '#7a6e6e', marginBottom: '4px'}}>{a.body.substring(0, 60)}...</p>
                      <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                        <span style={{fontSize: '10px', background: '#fdeaea', color: '#8b0e0e', padding: '2px 8px', borderRadius: '2px'}}>{a.category}</span>
                        <span style={{fontSize: '11px', color: '#c9a030'}}>{a.date}</span>
                        <span onClick={() => setAnnouncements(announcements.filter((_, j) => j !== i))} style={{fontSize: '11px', color: '#8b0e0e', cursor: 'pointer', marginLeft: 'auto'}}>Delete</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MEMBERS */}
          {page === 'members' && (
            <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
              <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                <h3 style={{fontSize: '13px', fontWeight: '500'}}>Member directory</h3>
              </div>
              <table style={{width: '100%', borderCollapse: 'collapse' as const, fontSize: '12.5px'}}>
                <thead>
                  <tr style={{borderBottom: '1.5px solid #e4e0d8'}}>
                    {['Name', 'Email', 'Joined', 'Role', 'Status'].map(h => (
                      <th key={h} style={{textAlign: 'left' as const, padding: '8px 10px', fontSize: '11px', color: '#7a6e6e', fontWeight: '500', textTransform: 'uppercase' as const}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {name: 'Fr. Andrew Kasozi', email: 'andrew@ugandamp.org', joined: 'Jan 2020', role: 'Admin'},
                    {name: 'Deacon Samuel Moyo', email: 'samuel@ugandamp.org', joined: 'Mar 2021', role: 'Staff'},
                    {name: 'Maria Dlamini', email: 'maria.d@gmail.com', joined: 'Feb 2024', role: 'Member'},
                    {name: 'Sipho Nkosi', email: 'sipho.n@outlook.com', joined: 'Jan 2025', role: 'Member'},
                  ].map((m, i) => (
                    <tr key={i} style={{borderBottom: '1px solid #e4e0d8'}}>
                      <td style={{padding: '8px 10px', fontWeight: '500'}}>{m.name}</td>
                      <td style={{padding: '8px 10px', color: '#7a6e6e'}}>{m.email}</td>
                      <td style={{padding: '8px 10px', color: '#7a6e6e'}}>{m.joined}</td>
                      <td style={{padding: '8px 10px'}}>
                        <select style={{fontSize: '11.5px', border: '1px solid #e4e0d8', borderRadius: '3px', padding: '3px 6px', fontFamily: 'Inter, sans-serif'}}>
                          <option>Admin</option>
                          <option>Staff</option>
                          <option>Member</option>
                        </select>
                      </td>
                      <td style={{padding: '8px 10px'}}><span style={{fontSize: '10px', background: '#eaf5ee', color: '#1a7a3a', padding: '2px 8px', borderRadius: '2px', fontWeight: '500'}}>Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* GROUP REQUESTS */}
          {page === 'groups' && (
            <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
              <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                <h3 style={{fontSize: '13px', fontWeight: '500'}}>Group join requests ({groupMembers.length})</h3>
              </div>
              <div style={{padding: '0.75rem 1rem'}}>
                {groupMembers.length === 0 ? (
                  <p style={{fontSize: '13px', color: '#7a6e6e', textAlign: 'center', padding: '2rem'}}>No group requests yet.</p>
                ) : groupMembers.map((m, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #e4e0d8'}}>
                    <div style={{width: '36px', height: '36px', background: '#eaf0fb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '500', color: '#1a4a8c', flexShrink: 0}}>
                      {m.full_name?.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div style={{flex: 1}}>
                      <p style={{fontSize: '13px', fontWeight: '500'}}>{m.full_name}</p>
                      <p style={{fontSize: '11.5px', color: '#7a6e6e'}}>{m.phone} · {m.group_name}</p>
                    </div>
                    <span style={{fontSize: '10px', background: '#fff8e0', color: '#b07800', padding: '2px 8px', borderRadius: '2px', fontWeight: '500'}}>
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GIVEAWAY ENTRIES */}
          {page === 'giveaway_entries' && (
            <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
              <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                <h3 style={{fontSize: '13px', fontWeight: '500'}}>Giveaway entries ({giveawayEntries.length})</h3>
              </div>
              <div style={{padding: '0.75rem 1rem'}}>
                {giveawayEntries.length === 0 ? (
                  <p style={{fontSize: '13px', color: '#7a6e6e', textAlign: 'center', padding: '2rem'}}>No entries yet.</p>
                ) : giveawayEntries.map((e, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #e4e0d8'}}>
                    <div style={{width: '36px', height: '36px', background: '#fff8e0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '500', color: '#b07800', flexShrink: 0}}>
                      {e.full_name?.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div style={{flex: 1}}>
                      <p style={{fontSize: '13px', fontWeight: '500'}}>{e.full_name}</p>
                      <p style={{fontSize: '11.5px', color: '#7a6e6e'}}>{e.phone} · {e.giveaway_title}</p>
                    </div>
                    <span style={{fontSize: '10px', background: '#eaf5ee', color: '#1a7a3a', padding: '2px 8px', borderRadius: '2px', fontWeight: '500'}}>
                      {new Date(e.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
{/* GROUP ANNOUNCEMENTS */}
{page === 'group_announcements' && (
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start'}}>
    <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
      <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
        <h3 style={{fontSize: '13px', fontWeight: '500'}}>Post group update</h3>
      </div>
      <div style={{padding: '1rem'}}>
        <div style={{marginBottom: '0.85rem'}}>
          <label style={{display: 'block', fontSize: '11px', color: '#7a6e6e', marginBottom: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.3px'}}>Select Group</label>
          <select id="group-select" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}}>
            <option>Men's Fellowship</option>
            <option>Women's Fellowship</option>
            <option>Youth Fellowship</option>
            <option>Children's Ministry</option>
            <option>Association of the Childhood of Jesus</option>
            <option>St. Mary - Ikhwezi</option>
            <option>St. John Bosco</option>
            <option>St. Joseph</option>
            <option>St. Anne</option>
            <option>Catholic Women's League</option>
            <option>Legion of Mary</option>
            <option>St. Francis</option>
            <option>Sacred Heart</option>
            <option>St. Dominic</option>
            <option>Choir</option>
            <option>Catechesis</option>
            <option>St. Antony</option>
          </select>
        </div>
        <div style={{marginBottom: '0.85rem'}}>
          <label style={{display: 'block', fontSize: '11px', color: '#7a6e6e', marginBottom: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.3px'}}>Title</label>
          <input id="group-ann-title" placeholder="Update title" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}} />
        </div>
        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', fontSize: '11px', color: '#7a6e6e', marginBottom: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.3px'}}>Message</label>
          <textarea id="group-ann-body" placeholder="Write your group update..." style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif', minHeight: '80px', resize: 'vertical'}} />
        </div>
        <button
          onClick={async () => {
            const group = (document.getElementById('group-select') as HTMLSelectElement).value
            const title = (document.getElementById('group-ann-title') as HTMLInputElement).value
            const body = (document.getElementById('group-ann-body') as HTMLTextAreaElement).value
            if (!title || !body) return
            const { error } = await supabase.from('group_announcements').insert([{group_name: group, title, body}])
            if (!error) {
              alert(`Update posted to ${group}!`)
              ;(document.getElementById('group-ann-title') as HTMLInputElement).value = ''
              ;(document.getElementById('group-ann-body') as HTMLTextAreaElement).value = ''
            }
          }}
          style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}
        >Post Group Update</button>
      </div>
    </div>
    <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
      <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
        <h3 style={{fontSize: '13px', fontWeight: '500'}}>Recent group updates</h3>
      </div>
      <div style={{padding: '0.75rem 1rem'}}>
        <p style={{fontSize: '13px', color: '#7a6e6e', textAlign: 'center', padding: '1rem'}}>Post an update to see it here.</p>
      </div>
    </div>
  </div>
)}
          {/* DONATIONS */}
          {page === 'donations' && (
            <div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem'}}>
                {statCard('This month', 'R4,820', '↑ 12% vs last month')}
                {statCard('This year', 'R38,450', 'Jan–Apr 2026')}
                {statCard('Total donors', '63', 'Unique this month')}
              </div>
              <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
                <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                  <h3 style={{fontSize: '13px', fontWeight: '500'}}>Recent donations</h3>
                </div>
                <table style={{width: '100%', borderCollapse: 'collapse' as const, fontSize: '12.5px'}}>
                  <thead>
                    <tr style={{borderBottom: '1.5px solid #e4e0d8'}}>
                      {['Donor', 'Amount', 'Type', 'Date', 'Status'].map(h => (
                        <th key={h} style={{textAlign: 'left' as const, padding: '8px 10px', fontSize: '11px', color: '#7a6e6e', fontWeight: '500', textTransform: 'uppercase' as const}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {donor: 'Anonymous', amount: 'R500', type: 'Tithe', date: '1 Apr 2026'},
                      {donor: 'Maria Dlamini', amount: 'R250', type: 'Building fund', date: '31 Mar 2026'},
                      {donor: 'Joseph Khumalo', amount: 'R100', type: 'Offering', date: '30 Mar 2026'},
                      {donor: 'Anonymous', amount: 'R1,000', type: 'Outreach', date: '28 Mar 2026'},
                    ].map((d, i) => (
                      <tr key={i} style={{borderBottom: '1px solid #e4e0d8'}}>
                        <td style={{padding: '8px 10px'}}>{d.donor}</td>
                        <td style={{padding: '8px 10px', fontWeight: '500'}}>{d.amount}</td>
                        <td style={{padding: '8px 10px', color: '#7a6e6e'}}>{d.type}</td>
                        <td style={{padding: '8px 10px', color: '#7a6e6e'}}>{d.date}</td>
                        <td style={{padding: '8px 10px'}}><span style={{fontSize: '10px', background: '#eaf5ee', color: '#1a7a3a', padding: '2px 8px', borderRadius: '2px', fontWeight: '500'}}>Received</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GALLERY */}
          {page === 'gallery' && (
            <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
              <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                <h3 style={{fontSize: '13px', fontWeight: '500'}}>Upload photos</h3>
              </div>
              <div style={{padding: '1.25rem'}}>
                <div style={{border: '2px dashed #e4e0d8', borderRadius: '6px', padding: '2rem', textAlign: 'center', marginBottom: '1.25rem'}}>
                  <p style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>🖼</p>
                  <p style={{fontSize: '13px', fontWeight: '500', color: '#8b0e0e', marginBottom: '4px'}}>Upload parish photos</p>
                  <p style={{fontSize: '12px', color: '#7a6e6e', marginBottom: '1rem'}}>JPG, PNG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = e.target.files
                      if (!files) return
                      for (const file of Array.from(files)) {
                        await supabase.storage.from('gallery').upload(`${Date.now()}-${file.name}`, file)
                      }
                      alert('Photos uploaded successfully!')
                    }}
                    style={{display: 'none'}}
                    id="gallery-upload"
                  />
                  <label htmlFor="gallery-upload" style={{background: '#8b0e0e', color: 'white', padding: '8px 20px', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer'}}>
                    Choose Photos
                  </label>
                </div>
                <p style={{fontSize: '12px', color: '#7a6e6e'}}>Uploaded photos appear automatically on the public gallery page.</p>
              </div>
            </div>
          )}

          {/* GIVEAWAYS */}
          {page === 'giveaways' && (
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start'}}>
              <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
                <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                  <h3 style={{fontSize: '13px', fontWeight: '500'}}>Create giveaway</h3>
                </div>
                <div style={{padding: '1rem'}}>
                  {['Title', 'Description', 'End date', 'Eligibility'].map((field, i) => (
                    <div key={i} style={{marginBottom: '0.85rem'}}>
                      <label style={{display: 'block', fontSize: '11px', color: '#7a6e6e', marginBottom: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.3px'}}>{field}</label>
                      {field === 'End date' ? <input type="date" style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}} /> :
                       field === 'Eligibility' ? <select style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}}><option>All members</option><option>Youth only</option><option>Children only</option><option>Families</option></select> :
                       field === 'Description' ? <textarea style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif', minHeight: '70px', resize: 'vertical'}} /> :
                       <input style={{width: '100%', border: '1.5px solid #e4e0d8', borderRadius: '3px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif'}} />}
                    </div>
                  ))}
                  <button style={{background: '#8b0e0e', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '3px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>Create Giveaway</button>
                </div>
              </div>
              <div style={{background: 'white', borderRadius: '6px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
                <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8'}}>
                  <h3 style={{fontSize: '13px', fontWeight: '500'}}>Active giveaways</h3>
                </div>
                <div style={{padding: '0.75rem 1rem'}}>
                  {[
                    {title: 'Easter Hamper Giveaway', entries: 42, ends: 'May 15'},
                    {title: "Children's Bible Pack", entries: 18, ends: 'May 31'},
                  ].map((g, i) => (
                    <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #e4e0d8'}}>
                      <div style={{flex: 1}}>
                        <p style={{fontSize: '12.5px', fontWeight: '500'}}>{g.title}</p>
                        <p style={{fontSize: '11px', color: '#7a6e6e'}}>{g.entries} entries · Ends {g.ends}</p>
                      </div>
                      <span style={{fontSize: '10px', background: '#eaf5ee', color: '#1a7a3a', padding: '2px 8px', borderRadius: '2px', fontWeight: '500'}}>Active</span>
                      <button style={{background: '#fdeaea', color: '#8b0e0e', border: 'none', padding: '4px 10px', borderRadius: '3px', fontSize: '11px', cursor: 'pointer', fontWeight: '500'}}>End</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}