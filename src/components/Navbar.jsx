import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Features', to: '/features' },
    { label: 'Learning Areas', to: '/learning-areas' },
    { label: 'Games', to: '/games' },
    { label: 'Pricing', to: '/pricing' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'all 0.3s ease',
          background: (scrolled || !isLanding) ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: (scrolled || !isLanding) ? 'blur(12px)' : 'none',
          borderBottom: (scrolled || !isLanding) ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: (scrolled || !isLanding) ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'70px' }}>
          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.5rem', textDecoration:'none' }}>
            <div style={{
              width:38, height:38, borderRadius:10,
              background:'var(--grad-forest)',
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink: 0,
            }}>
              <BookOpen size={20} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{
              fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1.25rem',
              color: (scrolled || !isLanding) ? 'var(--forest)' : '#fff',
            }}>
              ShuleAI <span style={{ color:'var(--amber)' }}>Pro</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.25rem' }} className="nav-links-desktop">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration:'none',
                  padding:'0.5rem 0.85rem', borderRadius:'var(--radius-pill)',
                  fontFamily:'var(--font-body)', fontWeight:500, fontSize:'0.92rem',
                  color: (scrolled || !isLanding) ? 'var(--muted)' : 'rgba(255,255,255,0.85)',
                  transition:'all 0.18s',
                }}
                onMouseEnter={e => {
                  e.target.style.background = (scrolled || !isLanding) ? 'var(--surface-alt)' : 'rgba(255,255,255,0.12)';
                  e.target.style.color = (scrolled || !isLanding) ? 'var(--forest)' : '#fff';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'none';
                  e.target.style.color = (scrolled || !isLanding) ? 'var(--muted)' : 'rgba(255,255,255,0.85)';
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            {user ? (
              <>
                <Link
                  to={user.role === 'parent' ? '/parent' : '/dashboard'}
                  className="btn btn-outline btn-sm"
                  style={{ borderColor: (scrolled||!isLanding) ? 'var(--forest)' : '#fff', color: (scrolled||!isLanding) ? 'var(--forest)' : '#fff' }}
                >
                  Dashboard
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={logout} style={{ color: (scrolled||!isLanding) ? 'var(--muted)' : 'rgba(255,255,255,0.7)' }}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="btn btn-sm"
                  style={{
                    background:'transparent', fontWeight:600, fontSize:'0.9rem',
                    color: (scrolled||!isLanding) ? 'var(--forest)' : '#fff',
                  }}
                >
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-amber btn-sm">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display:'none', background:'none', border:'none', cursor:'pointer',
                color: (scrolled||!isLanding) ? 'var(--ink)' : '#fff',
                padding:'0.35rem',
              }}
              className="nav-menu-toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            position:'absolute', top:'70px', left:0, right:0,
            background:'#fff', borderTop:'1px solid var(--border)',
            padding:'1rem', boxShadow:'var(--shadow-lg)',
          }}>
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display:'block', width:'100%', textAlign:'left',
                  textDecoration:'none',
                  padding:'0.85rem 1rem', borderRadius:'var(--radius)',
                  fontFamily:'var(--font-body)', fontWeight:500, fontSize:'0.95rem',
                  color:'var(--ink)', transition:'background 0.18s',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-menu-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
