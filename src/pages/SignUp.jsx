import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, AlertCircle, ArrowLeft, User, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('Please fill in all required fields.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await register({ name, email, password, phone, role });
      navigate(role === 'parent' ? '/parent' : '/dashboard');
    } catch (err) {
      console.error('Registration error details:', err);
      const msg = err?.message || '';
      if (msg.includes('already')) {
        setError('An account with this email already exists. Please sign in.');
      } else if (msg) {
        setError(msg);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
      {/* Left: Form */}
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'3rem', background:'var(--surface)', overflowY:'auto' }}>
        <div style={{ maxWidth:420, margin:'0 auto', width:'100%' }}>
          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', color:'var(--muted)', fontSize:'0.88rem', marginBottom:'1.5rem', transition:'color 0.18s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--forest)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}>
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', textDecoration:'none', marginBottom:'2rem' }}>
            <div style={{ width:36, height:36, borderRadius:9, background:'var(--grad-forest)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <BookOpen size={18} color="#fff" />
            </div>
            <span style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1.15rem', color:'var(--forest)' }}>
              ShuleAI <span style={{ color:'var(--amber)' }}>Pro</span>
            </span>
          </Link>

          <div style={{ marginBottom:'1.75rem' }}>
            <h2 style={{ marginBottom:'0.35rem' }}>Create your account</h2>
            <p style={{ color:'var(--muted)', fontSize:'0.95rem' }}>Join thousands of Kenyan learners today.</p>
          </div>

          {/* Role Picker */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'1.5rem' }}>
            {[
              { id:'student', label:'Student', desc:'I want to learn', icon: User },
              { id:'parent', label:'Parent', desc:'I manage my child', icon: Users },
            ].map(({ id, label, desc, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                style={{
                  padding:'0.9rem', borderRadius:'var(--radius)', border:`2px solid ${role===id?'var(--forest)':'var(--border)'}`,
                  background: role===id ? 'var(--forest-glass)' : 'var(--surface)',
                  cursor:'pointer', textAlign:'left', transition:'all 0.18s', display:'flex', flexDirection:'column', gap:'0.3rem',
                }}
              >
                <Icon size={18} color={role===id?'var(--forest)':'var(--muted)'} />
                <span style={{ fontWeight:700, fontSize:'0.92rem', color: role===id?'var(--forest)':'var(--ink)', display:'block' }}>{label}</span>
                <span style={{ fontSize:'0.78rem', color:'var(--muted)' }}>{desc}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="Enter your full name" value={name} onChange={e=>setName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">M-Pesa Phone Number</label>
              <input className="form-input" placeholder="0712345678" value={phone} onChange={e=>setPhone(e.target.value)} />
              <span className="form-hint">Used for subscription payments (optional now)</span>
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <div style={{ position:'relative' }}>
                <input
                  className="form-input"
                  type={showPw?'text':'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  style={{ paddingRight:'3rem' }}
                  required minLength={8}
                />
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  style={{ position:'absolute', right:'0.85rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--muted)', display:'flex', padding:0 }}>
                  {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ display:'flex', gap:'0.5rem', alignItems:'center', color:'var(--error)', fontSize:'0.85rem', background:'#FEF2F2', padding:'0.75rem', borderRadius:'var(--radius)' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg" style={{ width:'100%', marginTop:'0.5rem' }} disabled={loading}>
              {loading ? <><div className="loader" style={{ width:18, height:18, borderWidth:2 }} />Creating account...</> : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'1.5rem', color:'var(--muted)', fontSize:'0.88rem' }}>
            By signing up, you agree to our{' '}
            <a href="#" style={{ color:'var(--forest)', fontWeight:600 }}>Terms of Service</a>{' '}and{' '}
            <a href="#" style={{ color:'var(--forest)', fontWeight:600 }}>Privacy Policy</a>.
          </p>
          <p style={{ textAlign:'center', marginTop:'1rem', color:'var(--muted)', fontSize:'0.9rem' }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ color:'var(--forest)', fontWeight:700 }}>Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right: Visual */}
      <div style={{ position:'relative', overflow:'hidden' }} className="signup-visual">
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=85"
          alt="Classroom learning"
          style={{ width:'100%', height:'100%', objectFit:'cover' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(15,61,46,0.85) 0%, rgba(26,122,94,0.65) 100%)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'3rem' }}>
          <h3 style={{ color:'#fff', marginBottom:'0.75rem', fontSize:'1.5rem' }}>
            Start Learning with 56+ Interactive Games
          </h3>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.95rem', lineHeight:1.7, marginBottom:'2rem' }}>
            Mathematics, Science, Agriculture, CRE, CAAS and more — all aligned to Kenya&apos;s CBC curriculum for PP1–Grade 9.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
            {['Mathematics','Integrated Science','Agriculture','CRE','CAAS','Pre-Technical'].map(s=>(
              <span key={s} style={{ background:'rgba(255,255,255,0.15)', backdropFilter:'blur(4px)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', padding:'0.3rem 0.8rem', borderRadius:'100px', fontSize:'0.78rem', fontWeight:500 }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .signup-visual { display: none !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
