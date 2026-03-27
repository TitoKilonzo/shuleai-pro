import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user?.role === 'parent' ? '/parent' : '/dashboard');
    } catch (err) {
      console.error('Sign in error details:', err);
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
    <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
      {/* Left: Form */}
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'3rem', background:'var(--surface)' }}>
        <div style={{ maxWidth:400, margin:'0 auto', width:'100%' }}>
          {/* Back */}
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', color:'var(--muted)', fontSize:'0.88rem', marginBottom:'2rem', transition:'color 0.18s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--forest)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}>
            <ArrowLeft size={16} /> Back to Home
          </Link>

          {/* Logo */}
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', textDecoration:'none', marginBottom:'2.5rem' }}>
            <div style={{ width:36, height:36, borderRadius:9, background:'var(--grad-forest)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <BookOpen size={18} color="#fff" />
            </div>
            <span style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1.15rem', color:'var(--forest)' }}>
              ShuleAI <span style={{ color:'var(--amber)' }}>Pro</span>
            </span>
          </Link>

          <div style={{ marginBottom:'2rem' }}>
            <h2 style={{ marginBottom:'0.35rem' }}>Welcome back</h2>
            <p style={{ color:'var(--muted)', fontSize:'0.95rem' }}>Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position:'relative' }}>
                <input
                  className="form-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight:'3rem' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position:'absolute', right:'0.85rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--muted)', display:'flex', padding:0 }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <a href="#" style={{ fontSize:'0.8rem', color:'var(--forest)', fontWeight:500 }}>Forgot password?</a>
              </div>
            </div>

            {error && (
              <div style={{ display:'flex', gap:'0.5rem', alignItems:'center', color:'var(--error)', fontSize:'0.85rem', background:'#FEF2F2', padding:'0.75rem', borderRadius:'var(--radius)' }}>
                <AlertCircle size={16} flexShrink={0} /> {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width:'100%', marginTop:'0.5rem' }}
              disabled={loading}
            >
              {loading ? (
                <><div className="loader" style={{ width:18, height:18, borderWidth:2 }} />Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'1.5rem', color:'var(--muted)', fontSize:'0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color:'var(--forest)', fontWeight:700 }}>Create one free</Link>
          </p>

          {/* Access code link */}
          <div style={{ marginTop:'2rem', paddingTop:'1.5rem', borderTop:'1px solid var(--border)', textAlign:'center' }}>
            <p style={{ color:'var(--muted)', fontSize:'0.85rem' }}>
              Already have an access code?{' '}
              <Link to="/signup" style={{ color:'var(--coral)', fontWeight:600 }}>Sign in to continue learning →</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Visual */}
      <div style={{ position:'relative', overflow:'hidden' }} className="signin-visual">
        <img
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efd?w=900&q=85"
          alt="Students learning"
          style={{ width:'100%', height:'100%', objectFit:'cover' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(11,79,60,0.8) 0%, rgba(11,79,60,0.4) 100%)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'3rem' }}>
          <div style={{ marginBottom:'2rem' }}>
            <div style={{ display:'flex', gap:4, marginBottom:'1rem' }}>
              {[1,2,3,4,5].map(s=><span key={s} style={{ color:'var(--amber)', fontSize:'1.2rem' }}>★</span>)}
            </div>
            <blockquote style={{ color:'#fff', fontSize:'1.15rem', lineHeight:1.7, fontStyle:'italic', marginBottom:'1rem', fontFamily:'var(--font-head)' }}>
              "ShuleAI Pro transformed how my children approach learning. Their exam results are now outstanding!"
            </blockquote>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&q=80" alt="Grace" style={{ width:44, height:44, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(255,255,255,0.4)' }} />
              <div>
                <p style={{ color:'#fff', fontWeight:700, margin:0 }}>Grace Mwangi</p>
                <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.82rem', margin:0 }}>Parent of 2, Nairobi</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginTop:'2rem' }}>
            {[
              { value:'56+', label:'Educational Games' },
              { value:'10k+', label:'Active Learners' },
              { value:'7', label:'CBC Subjects' },
              { value:'4.8★', label:'User Rating' },
            ].map(({ value, label }) => (
              <div key={label} style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', borderRadius:'var(--radius)', padding:'1rem', border:'1px solid rgba(255,255,255,0.15)' }}>
                <p style={{ fontFamily:'var(--font-head)', fontSize:'1.5rem', fontWeight:800, color:'#fff', margin:0 }}>{value}</p>
                <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.78rem', margin:0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .signin-visual { display: none !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
