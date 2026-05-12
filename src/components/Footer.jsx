import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.7)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
                ShuleAI <span style={{ color: 'var(--amber)' }}>Pro</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 280, marginBottom: '1.5rem' }}>
              Kenya&apos;s most advanced AI-powered educational platform. Transforming learning through personalized, gamified education for CBC curriculum.
            </p>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Mail size={14} />
                <span>support@shuleaipro.co.ke</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Phone size={14} />
                <span>+254741563880</span>
              </div>
            </div>
          </div>

          {[
            { heading: 'Platform', links: [
              { label: 'AI Learning Assistant', to: '/features' },
              { label: 'Learning Areas', to: '/learning-areas' },
              { label: 'Interactive Games', to: '/games' },
              { label: 'Progress Analytics', to: '/dashboard' },
              { label: 'Pricing Plans', to: '/pricing' }
            ] },
            { heading: 'Resources', links: [
              { label: 'CBC Curriculum Guide', to: '#' },
              { label: 'Parent Resources', to: '#' },
              { label: 'Teacher Portal', to: '#' },
              { label: 'Blog & Updates', to: '#' },
              { label: 'API Documentation', to: '#' }
            ] },
            { heading: 'Support', links: [
              { label: 'Help Center', to: '#' },
              { label: 'Contact Support', to: '#' },
              { label: 'System Status', to: '#' },
              { label: 'Privacy Policy', to: '#' },
              { label: 'Terms of Service', to: '#' }
            ] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h5 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.2rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{heading}</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
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

        {/* Social Links & Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            © 2026 ShuleAI Pro. All rights reserved. Made with ❤️ for Kenyan education.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Follow us:</span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: Facebook, href: 'https://facebook.com/shuleaipro' },
                { icon: Twitter, href: 'https://twitter.com/shuleaipro' },
                { icon: Instagram, href: 'https://instagram.com/shuleaipro' },
                { icon: Youtube, href: 'https://youtube.com/@shuleaipro' },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.18s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--amber)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
