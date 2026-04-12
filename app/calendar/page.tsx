'use client'
import { useState } from 'react'

const LITURGICAL_SEASONS: Record<string, {name: string, color: string, bg: string, desc: string}> = {
  advent: {name: 'Advent', color: '#6b21a8', bg: '#f3e8ff', desc: 'Season of preparation and waiting for the coming of Christ'},
  christmas: {name: 'Christmas', color: '#b45309', bg: '#fff7ed', desc: 'Celebration of the birth of Jesus Christ'},
  ordinary1: {name: 'Ordinary Time', color: '#15803d', bg: '#f0fdf4', desc: 'Time of growth and discipleship in everyday life'},
  lent: {name: 'Lent', color: '#7c2d12', bg: '#fef2f2', desc: 'Season of fasting, prayer and penance before Easter'},
  easter: {name: 'Easter', color: '#b45309', bg: '#fffbeb', desc: 'Celebration of the Resurrection of Jesus Christ'},
  ordinary2: {name: 'Ordinary Time', color: '#15803d', bg: '#f0fdf4', desc: 'Time of growth and discipleship in everyday life'},
}

const FEASTS: Record<string, {name: string, type: string, color: string}> = {
  '01-01': {name: 'Solemnity of Mary, Mother of God', type: 'solemnity', color: '#8b0e0e'},
  '01-06': {name: 'Epiphany of the Lord', type: 'solemnity', color: '#8b0e0e'},
  '02-02': {name: 'Presentation of the Lord', type: 'feast', color: '#c9a030'},
  '02-14': {name: 'St. Valentine\'s Day', type: 'memorial', color: '#c9a030'},
  '03-17': {name: 'St. Patrick\'s Day', type: 'memorial', color: '#c9a030'},
  '03-19': {name: 'St. Joseph, Spouse of the Blessed Virgin Mary', type: 'solemnity', color: '#8b0e0e'},
  '03-25': {name: 'Annunciation of the Lord', type: 'solemnity', color: '#8b0e0e'},
  '04-23': {name: 'St. George', type: 'memorial', color: '#c9a030'},
  '04-27': {name: 'Freedom Day (South Africa)', type: 'holiday', color: '#15803d'},
  '05-01': {name: 'Workers Day (South Africa)', type: 'holiday', color: '#15803d'},
  '05-31': {name: 'Visitation of the Blessed Virgin Mary', type: 'feast', color: '#c9a030'},
  '06-03': {name: 'Uganda Martyrs Day', type: 'solemnity', color: '#8b0e0e'},
  '06-13': {name: 'St. Anthony of Padua', type: 'memorial', color: '#c9a030'},
  '06-16': {name: 'Youth Day (South Africa)', type: 'holiday', color: '#15803d'},
  '06-24': {name: 'Birth of St. John the Baptist', type: 'solemnity', color: '#8b0e0e'},
  '06-29': {name: 'Ss. Peter and Paul, Apostles', type: 'solemnity', color: '#8b0e0e'},
  '07-26': {name: 'Ss. Joachim and Anne', type: 'memorial', color: '#c9a030'},
  '08-06': {name: 'Transfiguration of the Lord', type: 'feast', color: '#c9a030'},
  '08-09': {name: 'National Women\'s Day (South Africa)', type: 'holiday', color: '#15803d'},
  '08-15': {name: 'Assumption of the Blessed Virgin Mary', type: 'solemnity', color: '#8b0e0e'},
  '08-22': {name: 'Queenship of Mary', type: 'memorial', color: '#c9a030'},
  '09-08': {name: 'Nativity of the Blessed Virgin Mary', type: 'feast', color: '#c9a030'},
  '09-14': {name: 'Exaltation of the Holy Cross', type: 'feast', color: '#c9a030'},
  '09-24': {name: 'Heritage Day (South Africa)', type: 'holiday', color: '#15803d'},
  '10-02': {name: 'Guardian Angels', type: 'memorial', color: '#c9a030'},
  '10-04': {name: 'St. Francis of Assisi', type: 'memorial', color: '#c9a030'},
  '10-07': {name: 'Our Lady of the Rosary', type: 'memorial', color: '#c9a030'},
  '11-01': {name: 'All Saints Day', type: 'solemnity', color: '#8b0e0e'},
  '11-02': {name: 'All Souls Day', type: 'commemoration', color: '#7a6e6e'},
  '11-21': {name: 'Presentation of the Blessed Virgin Mary', type: 'memorial', color: '#c9a030'},
  '12-08': {name: 'Immaculate Conception of the Blessed Virgin Mary', type: 'solemnity', color: '#8b0e0e'},
  '12-12': {name: 'Our Lady of Guadalupe', type: 'feast', color: '#c9a030'},
  '12-16': {name: 'Day of Reconciliation (South Africa)', type: 'holiday', color: '#15803d'},
  '12-25': {name: 'Christmas Day — Nativity of the Lord', type: 'solemnity', color: '#8b0e0e'},
  '12-26': {name: 'Day of Goodwill (South Africa)', type: 'holiday', color: '#15803d'},
  '12-28': {name: 'Holy Innocents', type: 'feast', color: '#c9a030'},
}

const SAINTS: Record<string, string> = {
  '01-01': 'Mary, Mother of God',
  '01-02': 'Ss. Basil & Gregory Nazianzen',
  '01-03': 'Most Holy Name of Jesus',
  '01-04': 'St. Elizabeth Ann Seton',
  '01-05': 'St. John Neumann',
  '01-06': 'St. Andre Bessette',
  '01-07': 'St. Raymond of Penyafort',
  '01-13': 'St. Hilary',
  '01-17': 'St. Anthony of Egypt',
  '01-20': 'St. Fabian & St. Sebastian',
  '01-21': 'St. Agnes',
  '01-22': 'St. Vincent',
  '01-24': 'St. Francis de Sales',
  '01-25': 'Conversion of St. Paul',
  '01-26': 'Ss. Timothy & Titus',
  '01-28': 'St. Thomas Aquinas',
  '01-31': 'St. John Bosco',
  '02-03': 'St. Blaise & St. Ansgar',
  '02-05': 'St. Agatha',
  '02-06': 'St. Paul Miki & Companions',
  '02-08': 'St. Jerome Emiliani & St. Josephine Bakhita',
  '02-10': 'St. Scholastica',
  '02-11': 'Our Lady of Lourdes',
  '02-14': 'Ss. Cyril & Methodius',
  '02-17': 'Seven Founders of the Order of Servites',
  '02-21': 'St. Peter Damian',
  '02-22': 'Chair of St. Peter',
  '02-23': 'St. Polycarp',
  '03-04': 'St. Casimir',
  '03-07': 'Ss. Perpetua & Felicity',
  '03-08': 'St. John of God',
  '03-09': 'St. Frances of Rome',
  '03-17': 'St. Patrick',
  '03-18': 'St. Cyril of Jerusalem',
  '03-19': 'St. Joseph',
  '03-23': 'St. Turibius of Mogrovejo',
  '04-02': 'St. Francis of Paola',
  '04-04': 'St. Isidore',
  '04-05': 'St. Vincent Ferrer',
  '04-07': 'St. John Baptist de la Salle',
  '04-11': 'St. Stanislaus',
  '04-13': 'St. Martin I',
  '04-21': 'St. Anselm',
  '04-23': 'St. George & St. Adalbert',
  '04-24': 'St. Fidelis of Sigmaringen',
  '04-25': 'St. Mark',
  '04-28': 'St. Peter Chanel & St. Louis Grignion de Montfort',
  '04-29': 'St. Catherine of Siena',
  '04-30': 'St. Pius V',
  '05-02': 'St. Athanasius',
  '05-03': 'Ss. Philip & James',
  '05-10': 'St. Damien de Veuster',
  '05-12': 'Ss. Nereus & Achilleus & St. Pancras',
  '05-13': 'Our Lady of Fatima',
  '05-14': 'St. Matthias',
  '05-15': 'St. Isidore the Farmer',
  '05-18': 'St. John I',
  '05-20': 'St. Bernardine of Siena',
  '05-21': 'St. Christopher Magallanes & Companions',
  '05-22': 'St. Rita of Cascia',
  '05-25': 'St. Bede the Venerable & St. Gregory VII & St. Mary Magdalene de Pazzi',
  '05-26': 'St. Philip Neri',
  '05-27': 'St. Augustine of Canterbury',
  '06-01': 'St. Justin',
  '06-02': 'Ss. Marcellinus & Peter',
  '06-03': 'St. Charles Lwanga & Companions — Uganda Martyrs',
  '06-05': 'St. Boniface',
  '06-06': 'St. Norbert',
  '06-09': 'St. Ephrem',
  '06-11': 'St. Barnabas',
  '06-13': 'St. Anthony of Padua',
  '06-19': 'St. Romuald',
  '06-21': 'St. Aloysius Gonzaga',
  '06-22': 'St. Paulinus of Nola & Ss. John Fisher & Thomas More',
  '06-27': 'St. Cyril of Alexandria',
  '06-28': 'St. Irenaeus',
  '06-29': 'Ss. Peter & Paul',
  '06-30': 'First Martyrs of the Church of Rome',
  '07-01': 'Bl. Junipero Serra',
  '07-03': 'St. Thomas',
  '07-04': 'St. Elizabeth of Portugal',
  '07-05': 'St. Anthony Zaccaria',
  '07-06': 'St. Maria Goretti',
  '07-09': 'St. Augustine Zhao Rong & Companions',
  '07-11': 'St. Benedict',
  '07-13': 'St. Henry',
  '07-14': 'St. Kateri Tekakwitha',
  '07-15': 'St. Bonaventure',
  '07-16': 'Our Lady of Mount Carmel',
  '07-20': 'St. Apollinaris',
  '07-21': 'St. Lawrence of Brindisi',
  '07-22': 'St. Mary Magdalene',
  '07-23': 'St. Bridget',
  '07-24': 'St. Sharbel Makhluf',
  '07-25': 'St. James',
  '07-26': 'Ss. Joachim & Anne',
  '07-29': 'St. Martha & St. Mary & St. Lazarus',
  '07-30': 'St. Peter Chrysologus',
  '07-31': 'St. Ignatius of Loyola',
  '08-01': 'St. Alphonsus Liguori',
  '08-02': 'St. Eusebius of Vercelli & St. Peter Julian Eymard',
  '08-04': 'St. John Vianney',
  '08-05': 'Dedication of the Basilica of St. Mary Major',
  '08-06': 'Transfiguration of the Lord',
  '08-07': 'Ss. Sixtus II & Companions & St. Cajetan',
  '08-08': 'St. Dominic',
  '08-10': 'St. Lawrence',
  '08-11': 'St. Clare',
  '08-13': 'Ss. Pontian & Hippolytus',
  '08-14': 'St. Maximilian Kolbe',
  '08-15': 'Assumption of the Blessed Virgin Mary',
  '08-16': 'St. Stephen of Hungary',
  '08-19': 'St. John Eudes',
  '08-20': 'St. Bernard',
  '08-21': 'St. Pius X',
  '08-22': 'Queenship of Mary',
  '08-23': 'St. Rose of Lima',
  '08-24': 'St. Bartholomew',
  '08-25': 'St. Louis & St. Joseph Calasanz',
  '08-27': 'St. Monica',
  '08-28': 'St. Augustine',
  '08-29': 'Passion of St. John the Baptist',
  '09-03': 'St. Gregory the Great',
  '09-08': 'Nativity of the Blessed Virgin Mary',
  '09-09': 'St. Peter Claver',
  '09-12': 'Most Holy Name of Mary',
  '09-13': 'St. John Chrysostom',
  '09-14': 'Exaltation of the Holy Cross',
  '09-15': 'Our Lady of Sorrows',
  '09-16': 'Ss. Cornelius & Cyprian',
  '09-17': 'St. Robert Bellarmine',
  '09-19': 'St. Januarius',
  '09-20': 'Ss. Andrew Kim Taegon & Paul Chong Hasang & Companions',
  '09-21': 'St. Matthew',
  '09-23': 'St. Pius of Pietrelcina (Padre Pio)',
  '09-26': 'Ss. Cosmas & Damian',
  '09-27': 'St. Vincent de Paul',
  '09-28': 'St. Wenceslaus & St. Lawrence Ruiz & Companions',
  '09-29': 'Ss. Michael, Gabriel & Raphael',
  '09-30': 'St. Jerome',
  '10-01': 'St. Therese of the Child Jesus',
  '10-02': 'Guardian Angels',
  '10-04': 'St. Francis of Assisi',
  '10-05': 'Bl. Francis Xavier Seelos',
  '10-06': 'St. Bruno & Bl. Marie Rose Durocher',
  '10-07': 'Our Lady of the Rosary',
  '10-09': 'Ss. Denis & Companions & St. John Leonardi',
  '10-11': 'St. John XXIII',
  '10-14': 'St. Callistus I',
  '10-15': 'St. Teresa of Jesus',
  '10-16': 'St. Hedwig & St. Margaret Mary Alacoque',
  '10-17': 'St. Ignatius of Antioch',
  '10-18': 'St. Luke',
  '10-19': 'Ss. John de Brebeuf & Isaac Jogues & Companions',
  '10-20': 'St. Paul of the Cross',
  '10-22': 'St. John Paul II',
  '10-23': 'St. John of Capistrano',
  '10-24': 'St. Anthony Mary Claret',
  '10-28': 'Ss. Simon & Jude',
  '11-01': 'All Saints',
  '11-02': 'All Souls',
  '11-03': 'St. Martin de Porres',
  '11-04': 'St. Charles Borromeo',
  '11-09': 'Dedication of the Lateran Basilica',
  '11-10': 'St. Leo the Great',
  '11-11': 'St. Martin of Tours',
  '11-12': 'St. Josaphat',
  '11-13': 'St. Frances Xavier Cabrini',
  '11-15': 'St. Albert the Great',
  '11-16': 'St. Margaret of Scotland & St. Gertrude',
  '11-17': 'St. Elizabeth of Hungary',
  '11-18': 'Dedication of the Basilicas of Ss. Peter & Paul',
  '11-21': 'Presentation of the Blessed Virgin Mary',
  '11-22': 'St. Cecilia',
  '11-23': 'St. Clement I & St. Columban & Bl. Miguel Agustin Pro',
  '11-24': 'St. Andrew Dung-Lac & Companions',
  '11-25': 'St. Catherine of Alexandria',
  '11-30': 'St. Andrew',
  '12-03': 'St. Francis Xavier',
  '12-04': 'St. John Damascene',
  '12-06': 'St. Nicholas',
  '12-07': 'St. Ambrose',
  '12-08': 'Immaculate Conception of the Blessed Virgin Mary',
  '12-09': 'St. Juan Diego Cuauhtlatoatzin',
  '12-11': 'St. Damasus I',
  '12-12': 'Our Lady of Guadalupe',
  '12-13': 'St. Lucy',
  '12-14': 'St. John of the Cross',
  '12-21': 'St. Peter Canisius',
  '12-23': 'St. John of Kanty',
  '12-25': 'Nativity of the Lord',
  '12-26': 'St. Stephen',
  '12-27': 'St. John',
  '12-28': 'Holy Innocents',
  '12-29': 'St. Thomas Becket',
  '12-31': 'St. Sylvester I',
}

const PARISH_EVENTS: Record<string, string[]> = {
  '06-03': ['Uganda Martyrs Day — Special Commemorative Mass at 9:00 AM'],
  '12-25': ['Christmas Day Mass — 7:30 AM & 10:00 AM'],
  '01-01': ['New Year Mass — to be confirmed'],
}

function getLiturgicalSeason(month: number, day: number): string {
  const date = month * 100 + day
  if ((date >= 1201 && date <= 1224)) return 'advent'
  if ((date >= 1225) || (date <= 112)) return 'christmas'
  if (date >= 113 && date <= 217) return 'ordinary1'
  if (date >= 218 && date <= 406) return 'lent'
  if (date >= 407 && date <= 608) return 'easter'
  return 'ordinary2'
}

export default function Calendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) }
    else setCurrentMonth(currentMonth - 1)
    setSelectedDay(null)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) }
    else setCurrentMonth(currentMonth + 1)
    setSelectedDay(null)
  }

  const formatKey = (month: number, day: number) => `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const season = getLiturgicalSeason(currentMonth + 1, 1)
  const seasonInfo = LITURGICAL_SEASONS[season]

  const selectedKey = selectedDay ? formatKey(currentMonth, selectedDay) : null
  const selectedFeast = selectedKey ? FEASTS[selectedKey] : null
  const selectedSaint = selectedKey ? SAINTS[selectedKey] : null
  const selectedEvents = selectedKey ? PARISH_EVENTS[selectedKey] : null
  const selectedSeason = selectedDay ? getLiturgicalSeason(currentMonth + 1, selectedDay) : season
  const selectedSeasonInfo = LITURGICAL_SEASONS[selectedSeason]

  const isSunday = (day: number) => new Date(currentYear, currentMonth, day).getDay() === 0

  return (
    <main style={{padding: '2rem', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, sans-serif'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Parish Calendar</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '1.5rem'}}>Liturgical seasons, feasts, saints and parish events.</p>

      {/* SEASON BANNER */}
      <div style={{background: seasonInfo.bg, border: `2px solid ${seasonInfo.color}`, borderRadius: '6px', padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <div style={{width: '12px', height: '12px', borderRadius: '50%', background: seasonInfo.color, flexShrink: 0}}></div>
        <div>
          <p style={{fontSize: '13px', fontWeight: '600', color: seasonInfo.color}}>{seasonInfo.name}</p>
          <p style={{fontSize: '12px', color: '#7a6e6e'}}>{seasonInfo.desc}</p>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
        
        {/* CALENDAR */}
        <div style={{background: 'white', borderRadius: '8px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
          {/* Month Header */}
          <div style={{background: '#8b0e0e', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid #c9a030'}}>
            <button onClick={prevMonth} style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>‹</button>
            <h2 style={{fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: 'white'}}>{monthNames[currentMonth]} {currentYear}</h2>
            <button onClick={nextMonth} style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>›</button>
          </div>

          {/* Day Names */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: '#fdf6e3'}}>
            {dayNames.map(d => (
              <div key={d} style={{padding: '8px 4px', textAlign: 'center', fontSize: '11px', fontWeight: '600', color: d === 'Sun' ? '#8b0e0e' : '#7a6e6e'}}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: '#e4e0d8'}}>
            {Array.from({length: firstDay}).map((_, i) => (
              <div key={`empty-${i}`} style={{background: '#f9f7f3', minHeight: '48px'}}></div>
            ))}
            {Array.from({length: daysInMonth}).map((_, i) => {
              const day = i + 1
              const key = formatKey(currentMonth, day)
              const hasFeast = !!FEASTS[key]
              const hasSaint = !!SAINTS[key]
              const hasEvent = !!PARISH_EVENTS[key]
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
              const isSelected = day === selectedDay
              const isSun = isSunday(day)
              const daySeason = getLiturgicalSeason(currentMonth + 1, day)
              const daySeasonColor = LITURGICAL_SEASONS[daySeason].color

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  style={{
                    background: isSelected ? '#8b0e0e' : isToday ? '#fff8e7' : 'white',
                    minHeight: '48px',
                    padding: '6px 4px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column' as const,
                    alignItems: 'center',
                    gap: '2px',
                    borderLeft: `3px solid ${daySeasonColor}`,
                    transition: 'background 0.15s'
                  }}
                >
                  <span style={{
                    fontSize: '13px',
                    fontWeight: isToday || isSelected ? '700' : '400',
                    color: isSelected ? 'white' : isSun ? '#8b0e0e' : isToday ? '#8b0e0e' : '#1a1010',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                  }}>{day}</span>
                  <div style={{display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {hasFeast && <div style={{width: '5px', height: '5px', borderRadius: '50%', background: isSelected ? 'white' : '#c9a030'}}></div>}
                    {isSun && <div style={{width: '5px', height: '5px', borderRadius: '50%', background: isSelected ? 'white' : '#8b0e0e'}}></div>}
                    {hasEvent && <div style={{width: '5px', height: '5px', borderRadius: '50%', background: isSelected ? 'white' : '#15803d'}}></div>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div style={{padding: '0.75rem 1rem', background: '#fdf6e3', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}><div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#8b0e0e'}}></div><span style={{fontSize: '10px', color: '#7a6e6e'}}>Sunday/Solemnity</span></div>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}><div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#c9a030'}}></div><span style={{fontSize: '10px', color: '#7a6e6e'}}>Feast/Memorial</span></div>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}><div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#15803d'}}></div><span style={{fontSize: '10px', color: '#7a6e6e'}}>Parish Event</span></div>
          </div>
        </div>

        {/* DAY DETAIL */}
        <div>
          {selectedDay ? (
            <div style={{background: 'white', borderRadius: '8px', border: '1px solid #e4e0d8', overflow: 'hidden'}}>
              <div style={{background: '#8b0e0e', padding: '1rem', borderBottom: '3px solid #c9a030'}}>
                <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: 'white'}}>{selectedDay} {monthNames[currentMonth]} {currentYear}</h3>
                <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '2px'}}>{['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date(currentYear, currentMonth, selectedDay).getDay()]}</p>
              </div>
              <div style={{padding: '1.25rem', display: 'flex', flexDirection: 'column' as const, gap: '1rem'}}>

                {/* Season */}
                <div style={{background: selectedSeasonInfo.bg, border: `1px solid ${selectedSeasonInfo.color}`, borderRadius: '6px', padding: '0.75rem'}}>
                  <p style={{fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1px', color: selectedSeasonInfo.color, fontWeight: '600', marginBottom: '2px'}}>Liturgical Season</p>
                  <p style={{fontSize: '13px', color: selectedSeasonInfo.color, fontWeight: '500'}}>{selectedSeasonInfo.name}</p>
                </div>

                {/* Sunday Mass */}
                {isSunday(selectedDay) && (
                  <div style={{background: '#fdeaea', border: '1px solid #8b0e0e', borderRadius: '6px', padding: '0.75rem'}}>
                    <p style={{fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1px', color: '#8b0e0e', fontWeight: '600', marginBottom: '2px'}}>Sunday Mass</p>
                    <p style={{fontSize: '13px', color: '#8b0e0e'}}>7:30 AM & 10:00 AM</p>
                    <p style={{fontSize: '11px', color: '#7a6e6e', marginTop: '2px'}}>Uganda Martyrs Parish, Umlazi G</p>
                  </div>
                )}

                {/* Feast */}
                {selectedFeast && (
                  <div style={{background: '#fff8e7', border: '1px solid #c9a030', borderRadius: '6px', padding: '0.75rem'}}>
                    <p style={{fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1px', color: '#c9a030', fontWeight: '600', marginBottom: '2px'}}>
                      {selectedFeast.type === 'solemnity' ? 'Solemnity' : selectedFeast.type === 'feast' ? 'Feast' : selectedFeast.type === 'holiday' ? 'Public Holiday' : 'Memorial'}
                    </p>
                    <p style={{fontSize: '13px', color: '#1a1010', fontWeight: '500'}}>{selectedFeast.name}</p>
                  </div>
                )}

                {/* Parish Event */}
                {selectedEvents && selectedEvents.map((e, i) => (
                  <div key={i} style={{background: '#f0fdf4', border: '1px solid #15803d', borderRadius: '6px', padding: '0.75rem'}}>
                    <p style={{fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1px', color: '#15803d', fontWeight: '600', marginBottom: '2px'}}>Parish Event</p>
                    <p style={{fontSize: '13px', color: '#1a1010'}}>{e}</p>
                  </div>
                ))}

                {/* Saint of the Day */}
                {selectedSaint && (
                  <div style={{background: '#fdf6e3', border: '1px solid #e4e0d8', borderRadius: '6px', padding: '0.75rem'}}>
                    <p style={{fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '1px', color: '#7a6e6e', fontWeight: '600', marginBottom: '2px'}}>Saint of the Day</p>
                    <p style={{fontSize: '13px', color: '#1a1010'}}>✝ {selectedSaint}</p>
                  </div>
                )}

                {!selectedFeast && !selectedSaint && !selectedEvents && !isSunday(selectedDay) && (
                  <p style={{fontSize: '13px', color: '#7a6e6e', textAlign: 'center', padding: '1rem'}}>No special observance today.</p>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Upcoming this month */}
              <div style={{background: 'white', borderRadius: '8px', border: '1px solid #e4e0d8', overflow: 'hidden', marginBottom: '1rem'}}>
                <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e4e0d8', background: '#fdf6e3'}}>
                  <h3 style={{fontSize: '13px', fontWeight: '600', color: '#8b0e0e'}}>Feasts this month</h3>
                </div>
                <div style={{padding: '0.75rem 1rem'}}>
                  {Object.entries(FEASTS)
                    .filter(([key]) => key.startsWith(String(currentMonth + 1).padStart(2, '0')))
                    .sort(([a], [b]) => a.localeCompare(b))
                    .slice(0, 6)
                    .map(([key, feast]) => (
                      <div key={key} style={{display: 'flex', gap: '0.75rem', padding: '6px 0', borderBottom: '1px solid #e4e0d8', alignItems: 'flex-start'}}>
                        <span style={{fontSize: '12px', fontWeight: '600', color: '#8b0e0e', minWidth: '20px'}}>{key.split('-')[1]}</span>
                        <p style={{fontSize: '12px', color: '#1a1010', lineHeight: '1.4'}}>{feast.name}</p>
                      </div>
                    ))}
                  {Object.entries(FEASTS).filter(([key]) => key.startsWith(String(currentMonth + 1).padStart(2, '0'))).length === 0 && (
                    <p style={{fontSize: '13px', color: '#7a6e6e', padding: '0.5rem 0'}}>No major feasts this month.</p>
                  )}
                </div>
              </div>
              <div style={{background: '#fdf6e3', borderRadius: '6px', padding: '1rem', border: '1px solid #e4e0d8', textAlign: 'center'}}>
                <p style={{fontSize: '13px', color: '#7a6e6e'}}>👆 Tap any day to see feast, saint and parish event details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}