'use client'
import { useState } from 'react'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Merchandise', 'Jewelry', 'Event Tickets', 'Books']

  const products = [
    {
      name: 'Uganda Martyrs Parish T-Shirt',
      category: 'Merchandise',
      price: 'R 250',
      description: 'Official parish t-shirt. Available in S, M, L, XL.',
      emoji: '👕',
      bg: '#8b0e0e'
    },
    {
      name: 'Parish Baseball Cap',
      category: 'Merchandise',
      price: 'R 180',
      description: 'Embroidered parish logo cap. One size fits all.',
      emoji: '🧢',
      bg: '#6b0e0e'
    },
    {
      name: 'Martyrs Cross Necklace',
      category: 'Jewelry',
      price: 'R 350',
      description: 'Beautiful gold-plated cross necklace with parish crest.',
      emoji: '✝️',
      bg: '#a01515'
    },
    {
      name: 'Rosary Beads',
      category: 'Jewelry',
      price: 'R 120',
      description: 'Hand crafted rosary beads in red and gold parish colours.',
      emoji: '📿',
      bg: '#7a1010'
    },
    {
      name: 'Martyrs Day Trip 2026',
      category: 'Event Tickets',
      price: 'R 450',
      description: 'Annual Martyrs Day pilgrimage trip. Includes transport and meals.',
      emoji: '🚌',
      bg: '#8b0e0e'
    },
    {
      name: 'Youth Camp 2026 Ticket',
      category: 'Event Tickets',
      price: 'R 300',
      description: '3 day youth camp. Ages 13-25. Includes accommodation and meals.',
      emoji: '⛺',
      bg: '#6b0e0e'
    },
    {
      name: 'Daily Devotional Book',
      category: 'Books',
      price: 'R 95',
      description: '365 daily devotionals inspired by the Uganda Martyrs.',
      emoji: '📖',
      bg: '#a01515'
    },
    {
      name: 'Parish Prayer Book',
      category: 'Books',
      price: 'R 75',
      description: 'Collection of prayers and hymns used in our parish.',
      emoji: '🙏',
      bg: '#7a1010'
    },
  ]

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)

  return (
    <main style={{padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto'}}>
      <h1 style={{fontFamily: 'Georgia, serif', fontSize: '2.2rem', color: '#8b0e0e', marginBottom: '0.4rem'}}>Parish Shop</h1>
      <div style={{width: '44px', height: '3px', background: '#c9a030', marginBottom: '1rem', borderRadius: '2px'}}></div>
      <p style={{color: '#7a6e6e', fontSize: '14.5px', marginBottom: '2rem'}}>Support the parish by purchasing our merchandise, jewelry and event tickets.</p>

      {/* CATEGORIES */}
      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? '#8b0e0e' : 'white',
              color: activeCategory === cat ? 'white' : '#8b0e0e',
              border: '1.5px solid #8b0e0e',
              padding: '6px 16px',
              borderRadius: '3px',
              fontSize: '12.5px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}
          >{cat}</button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem'}}>
        {filtered.map((product, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '6px',
            border: '1px solid #e4e0d8',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column' as const
          }}>
            {/* PRODUCT IMAGE PLACEHOLDER */}
            <div style={{
              background: product.bg,
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              borderBottom: '3px solid #c9a030'
            }}>
              {product.emoji}
            </div>

            {/* PRODUCT INFO */}
            <div style={{padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' as const, gap: '0.5rem'}}>
              <span style={{
                fontSize: '10px',
                background: '#fff8e7',
                color: '#8b0e0e',
                border: '1px solid #c9a030',
                padding: '2px 8px',
                borderRadius: '2px',
                display: 'inline-block',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>{product.category}</span>
              <h3 style={{fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#8b0e0e'}}>{product.name}</h3>
              <p style={{fontSize: '13px', color: '#7a6e6e', lineHeight: '1.6', flex: 1}}>{product.description}</p>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem'}}>
                <span style={{fontSize: '1.2rem', fontWeight: '600', color: '#8b0e0e'}}>{product.price}</span>
                <a href="/contact" style={{
                  background: '#8b0e0e',
                  color: 'white',
                  border: 'none',
                  padding: '7px 16px',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: 'none'
                }}>Order Now</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NOTE */}
      <div style={{background: '#fff8e7', border: '1px solid #c9a030', borderRadius: '6px', padding: '1.25rem', textAlign: 'center'}}>
        <p style={{fontSize: '13.5px', color: '#8b0e0e', fontWeight: '500', marginBottom: '4px'}}>📦 How to order</p>
        <p style={{fontSize: '13px', color: '#7a6e6e'}}>Click "Order Now" on any item to contact us. We'll confirm availability and arrange payment and collection after Sunday mass or via delivery.</p>
      </div>
    </main>
  )
}