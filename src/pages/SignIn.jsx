import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user?.role === 'parent' ? '/parent' : '/dashboard');
    } catch (err) {
      const msg = err?.message || '';
      if (msg.includes('Invalid credentials') || msg.includes('password')) {
        setError('Invalid email or password. Please try again.');
      } else if (msg) {
        setError(msg);
      } else {
        setError('Sign in failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* Left: Form */}
      <div className="auth-form-side">
        <div style={{ maxWidth: 400, margin: '0 auto', width: '100%' }}>
          <Link to="/" className="auth-back-link">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '2.5rem' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={19} color="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.18rem', color: 'var(--forest)' }}>
              ShuleAI <span style={{ color: 'var(--amber)' }}>Pro</span>
            </span>
          </Link>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '0.35rem' }}>Welcome back</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={email}
                onChange={e => setEmail(e.target.value)} autoComplete="email" required />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: '3rem' }}
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex', padding: 0 }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <a href="#" style={{ fontSize: '0.8rem', color: 'var(--forest)', fontWeight: 600 }}>Forgot password?</a>
              </div>
            </div>

            {error && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'var(--error)', fontSize: '0.85rem', background: '#FEF2F2', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid #FECACA' }}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} /> {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.25rem' }} disabled={loading}>
              {loading ? (<><div className="loader" style={{ width: 18, height: 18 }} /> Signing in…</>) : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
            Don&apos;t have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--forest)', fontWeight: 700 }}>Create one free</Link>
          </p>

          {/* Demo hint */}
          <div style={{ marginTop: '1.75rem', padding: '1rem', borderRadius: 'var(--radius)', background: 'var(--forest-pale)', border: '1px solid var(--forest-glass)' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--forest)', margin: '0 0 0.35rem' }}>🧪 Demo Access</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-mid)', margin: 0, lineHeight: 1.6 }}>
              Student: <code style={{ background: 'rgba(18,90,159,0.1)', padding: '1px 5px', borderRadius: 4 }}>demo@shuleaipro.co.ke</code><br />
              Password: <code style={{ background: 'rgba(18,90,159,0.1)', padding: '1px 5px', borderRadius: 4 }}>Demo@2026</code>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Visual panel */}
      <div className="auth-visual-side">
        <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efd?w=900&q=85" alt="Students learning" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(18,90,159,0.88) 0%, rgba(18,90,159,0.55) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: 'var(--amber)', fontSize: '1.2rem' }}>★</span>)}
            </div>
            <blockquote style={{ color: '#fff', fontSize: '1.12rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1rem', fontFamily: 'var(--font-head)' }}>
              &quot;ShuleAI Pro transformed how my children approach learning. Their CBC exam results are now outstanding!&quot;
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-head)', border: '2px solid rgba(255,255,255,0.35)' }}>GM</div>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, margin: 0 }}>Grace Mwangi</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', margin: 0 }}>Parent of 2, Nairobi</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            {[['56+','CBC Games'],['10K+','Active Learners'],['7','Learning Areas'],['4.9★','User Rating']].map(([v,l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 'var(--radius)', padding: '0.9rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '0 0 0.1rem' }}>{v}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .auth-layout { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; }
        .auth-form-side { display: flex; flex-direction: column; justify-content: center; padding: 3rem 2rem; background: var(--surface); overflow-y: auto; }
        .auth-visual-side { position: relative; overflow: hidden; }
        .auth-back-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: var(--muted); font-size: 0.88rem; margin-bottom: 2rem;
          text-decoration: none; transition: color 0.18s;
        }
        .auth-back-link:hover { color: var(--forest); }
        @media (max-width: 768px) {
          .auth-layout { grid-template-columns: 1fr; }
          .auth-visual-side { display: none; }
        }
      `}</style>
    </div>
  );
}
