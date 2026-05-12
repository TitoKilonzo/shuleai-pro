import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Features',      to: '/features' },
  { label: 'Subjects',      to: '/learning-areas' },
  { label: 'Games',         to: '/games' },
  { label: 'Pricing',       to: '/pricing' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const transparent = isLanding && !scrolled;
  const textColor   = transparent ? '#fff'                         : 'var(--ink)';
  const mutedColor  = transparent ? 'rgba(255,255,255,0.78)'       : 'var(--muted)';
  const hoverBg     = transparent ? 'rgba(255,255,255,0.1)'        : 'var(--surface-alt)';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.3s var(--ease)',
        background: transparent ? 'transparent' : 'rgba(255,255,255,0.97)',
        backdropFilter: transparent ? 'none' : 'blur(14px)',
        borderBottom: transparent ? '1px solid transparent' : '1px solid var(--border)',
        boxShadow: transparent ? 'none' : 'var(--shadow-sm)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: transparent ? '0 2px 12px rgba(0,0,0,0.2)' : 'none' }}>
              <BookOpen size={20} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.22rem', color: transparent ? '#fff' : 'var(--forest)' }}>
              ShuleAI <span style={{ color: 'var(--amber)' }}>Pro</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to}
                style={{
                  textDecoration: 'none', padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 500, fontSize: '0.9rem',
                  color: location.pathname === to ? (transparent ? '#fff' : 'var(--forest)') : mutedColor,
                  background: location.pathname === to ? (transparent ? 'rgba(255,255,255,0.12)' : 'var(--forest-pale)') : 'transparent',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.color = textColor; }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = location.pathname === to ? (transparent ? 'rgba(255,255,255,0.12)' : 'var(--forest-pale)') : 'transparent';
                  e.currentTarget.style.color = location.pathname === to ? (transparent ? '#fff' : 'var(--forest)') : mutedColor;
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth / CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {user ? (
              <>
                <Link to={user.role === 'parent' ? '/parent' : '/dashboard'} className="btn btn-sm"
                  style={{ background: transparent ? 'rgba(255,255,255,0.15)' : 'var(--forest-pale)', color: transparent ? '#fff' : 'var(--forest)', border: transparent ? '1px solid rgba(255,255,255,0.3)' : 'none' }}>
                  Dashboard
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={logout}
                  style={{ color: transparent ? 'rgba(255,255,255,0.7)' : 'var(--muted)' }}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn btn-sm nav-signin"
                  style={{ background: 'transparent', color: transparent ? '#fff' : 'var(--forest)', fontWeight: 600 }}>
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-amber btn-sm">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(m => !m)}
              className="nav-toggle"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: textColor, padding: '0.35rem' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: 68, left: 0, right: 0,
            background: '#fff', borderTop: '1px solid var(--border)',
            padding: '0.75rem 1rem 1.25rem', boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 0.18s ease',
          }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to}
                style={{
                  display: 'flex', alignItems: 'center', width: '100%',
                  textDecoration: 'none', padding: '0.8rem 0.75rem',
                  borderRadius: 'var(--radius)', fontWeight: 500, fontSize: '0.95rem',
                  color: location.pathname === to ? 'var(--forest)' : 'var(--ink)',
                  background: location.pathname === to ? 'var(--forest-pale)' : 'transparent',
                  marginBottom: '0.15rem', transition: 'background 0.15s',
                }}
              >
                {label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', gap: '0.75rem' }}>
              {user ? (
                <>
                  <Link to={user.role === 'parent' ? '/parent' : '/dashboard'} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Dashboard</Link>
                  <button className="btn btn-outline btn-sm" onClick={logout} style={{ flex: 1 }}>Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/signin"  className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Sign In</Link>
                  <Link to="/signup"  className="btn btn-amber btn-sm"   style={{ flex: 1, justifyContent: 'center' }}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-toggle        { display: block !important; }
          .nav-signin        { display: none !important; }
        }
      `}</style>
    </>
  );
}
