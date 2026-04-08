import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.7)', padding: '3rem 0 1.5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                ShuleAI <span style={{ color: 'var(--amber)' }}>Pro</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 260 }}>
              Kenya's most advanced CBC-aligned educational gaming platform. Making learning fun for every child.
            </p>
          </div>
          
          {[
            { heading: 'Platform', links: [
              { label: 'Features', to: '/features' },
              { label: 'Learning Areas', to: '/subjects' },
              { label: 'Games', to: '/games' },
              { label: 'Pricing', to: '/pricing' }
            ] },
            { heading: 'Support', links: [
              { label: 'Help Center', to: '#' },
              { label: 'Contact', to: '#' },
              { label: 'Privacy Policy', to: '#' },
              { label: 'Terms', to: '#' }
            ] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h5 style={{ color: '#fff', fontWeight: 700, fontSize: 0.9 + 'rem', marginBottom: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{heading}</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.18s' }}
                      onMouseEnter={e => e.target.style.color = '#fff'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.82rem', margin: 0 }}>© 2026 ShuleAI Pro. All rights reserved. Built in Kenya 🇰🇪</p>
          <p style={{ fontSize: '0.82rem', margin: 0, color: 'rgba(255,255,255,0.4)' }}>Powered by SynthLink Tech Solutions</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer div[style*="grid-template-columns"] { 
            grid-template-columns: 1fr !important;
          }
          footer div[style*="grid-column: span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </footer>
  );
}
