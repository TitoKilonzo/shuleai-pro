import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Trophy, Clock, Star, Play, BarChart3,
  LogOut, Settings, Bell, ChevronRight, Award, Flame, Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getFeaturedGames, SUBJECTS, GAMES } from '../lib/games';
import { progressService } from '../lib/appwrite';
import PaymentModal from '../components/PaymentModal';

const DEMO_PROGRESS = [
  { subject:'mathematics', score:88, gamesPlayed:12, timeSpent:3600 },
  { subject:'integrated_science', score:72, gamesPlayed:8, timeSpent:2800 },
  { subject:'agriculture', score:91, gamesPlayed:10, timeSpent:3200 },
  { subject:'caas', score:85, gamesPlayed:7, timeSpent:2100 },
];

const DEMO_RECENT = [
  { id:'g001', title:'Number Quest', subject:'mathematics', score:95, completedAt: new Date(Date.now()-3600000).toISOString() },
  { id:'g016', title:'Cell Explorer', subject:'integrated_science', score:80, completedAt: new Date(Date.now()-86400000).toISOString() },
  { id:'g049', title:'Crop Farmer Simulator', subject:'agriculture', score:100, completedAt: new Date(Date.now()-172800000).toISOString() },
];

export default function Dashboard() {
  const { user, subscription, logout, isSubscribed } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalGames:0, avgScore:0, subjects:0, totalMinutes:0 });
  const [payModal, setPayModal] = useState(false);
  const featured = getFeaturedGames(8);

  useEffect(() => {
    if (user?.isDemo) {
      setStats({ totalGames:37, avgScore:88, subjects:5, totalMinutes:184 });
      return;
    }
    progressService.getProgressStats(user.$id).then(setStats).catch(()=>{});
  }, [user]);

  const timeUntilExpiry = () => {
    if (!subscription?.expiresAt) return null;
    const days = Math.ceil((new Date(subscription.expiresAt) - new Date()) / 86400000);
    return days > 0 ? days : 0;
  };
  const daysLeft = timeUntilExpiry();

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      {/* Top Nav */}
      <header style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', position:'sticky', top:0, zIndex:100, boxShadow:'var(--shadow-sm)' }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.5rem', textDecoration:'none' }}>
            <div style={{ width:34, height:34, borderRadius:8, background:'var(--grad-forest)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <BookOpen size={17} color="#fff" />
            </div>
            <span style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:'1.1rem', color:'var(--forest)' }}>
              ShuleAI <span style={{ color:'var(--amber)' }}>Pro</span>
            </span>
          </Link>

          <nav style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            <Link to="/games" className="btn btn-ghost btn-sm">Games</Link>
            <button style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)', padding:'0.4rem', position:'relative' }}>
              <Bell size={20} />
              <span style={{ position:'absolute', top:4, right:4, width:8, height:8, background:'var(--coral)', borderRadius:'50%', border:'2px solid var(--surface)' }} />
            </button>
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', padding:'0.4rem 0.75rem', background:'var(--bg)', borderRadius:'100px' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'var(--forest-pale)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontWeight:700, fontSize:'0.85rem', color:'var(--forest)' }}>{user?.name?.[0]?.toUpperCase()}</span>
              </div>
              <span style={{ fontWeight:600, fontSize:'0.88rem', color:'var(--ink)' }}>{user?.name?.split(' ')[0]}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={logout} style={{ gap:'0.3rem', color:'var(--muted)' }}>
              <LogOut size={15} /> Out
            </button>
          </nav>
        </div>
      </header>

      <div className="container" style={{ padding:'2rem 1.5rem' }}>
        {/* Welcome + Subscription */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'1.5rem', alignItems:'start', marginBottom:'2rem' }}>
          <div>
            <h2 style={{ marginBottom:'0.25rem' }}>
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p style={{ color:'var(--muted)' }}>Continue your CBC learning journey.</p>
          </div>

          {isSubscribed() ? (
            <div style={{
              background:'var(--grad-forest)', color:'#fff',
              padding:'0.85rem 1.25rem', borderRadius:'var(--radius)',
              textAlign:'center', minWidth:160,
            }}>
              <p style={{ fontSize:'0.75rem', margin:'0 0 0.2rem', opacity:0.8, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>
                {subscription?.plan?.toUpperCase()} PLAN
              </p>
              <p style={{ fontSize:'1.2rem', fontWeight:800, margin:'0 0 0.15rem', fontFamily:'var(--font-head)' }}>
                {daysLeft} days left
              </p>
              <p style={{ fontSize:'0.72rem', opacity:0.7, margin:0 }}>Keep learning!</p>
            </div>
          ) : (
            <button className="btn btn-amber btn-lg" onClick={() => setPayModal(true)}>
              Activate Subscription
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { icon: Play, label:'Games Played', value: stats.totalGames, color:'var(--forest)', bg:'var(--forest-pale)' },
            { icon: Star, label:'Avg. Score', value:`${stats.avgScore}%`, color:'#F59E0B', bg:'#FFFBEB' },
            { icon: BookOpen, label:'Subjects Active', value: stats.subjects, color:'#8B5CF6', bg:'#F5F3FF' },
            { icon: Clock, label:'Minutes Learned', value: stats.totalMinutes, color:'var(--coral)', bg:'var(--coral-light)' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} style={{ background:'var(--surface)', borderRadius:'var(--radius)', padding:'1.25rem', border:'1px solid var(--border)', boxShadow:'var(--shadow-sm)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.75rem' }}>
                <div style={{ width:36, height:36, borderRadius:9, background:bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={18} color={color} />
                </div>
              </div>
              <p style={{ fontFamily:'var(--font-head)', fontSize:'1.8rem', fontWeight:800, margin:'0 0 0.2rem', color:'var(--ink)' }}>{value}</p>
              <p style={{ color:'var(--muted)', fontSize:'0.82rem', margin:0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.5rem' }}>
          {/* Games grid */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
              <h3 style={{ margin:0, fontSize:'1.15rem' }}>Featured Games</h3>
              <Link to="/games" className="btn btn-ghost btn-sm" style={{ gap:'0.3rem', color:'var(--forest)' }}>
                View All <ChevronRight size={15} />
              </Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'1rem' }}>
              {featured.slice(0,6).map(game => {
                const sub = Object.values(SUBJECTS).find(s=>s.id===game.subject);
                return (
                  <div key={game.id}
                    className="card"
                    style={{ overflow:'hidden', cursor: isSubscribed() ? 'pointer' : 'default', opacity: isSubscribed() ? 1 : 0.85 }}
                    onClick={() => isSubscribed() ? navigate(`/games/${game.id}`) : setPayModal(true)}
                  >
                    <div style={{ height:120, overflow:'hidden', position:'relative' }}>
                      <img src={game.image} alt={game.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      {!isSubscribed() && (
                        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ background:'var(--amber)', color:'var(--ink)', padding:'4px 10px', borderRadius:'100px', fontSize:'0.72rem', fontWeight:700 }}>SUBSCRIBE</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding:'0.75rem' }}>
                      <p style={{ fontSize:'0.72rem', color:sub?.color||'var(--forest)', fontWeight:700, margin:'0 0 0.2rem', textTransform:'uppercase', letterSpacing:'0.04em' }}>{sub?.label||game.subject}</p>
                      <h4 style={{ fontSize:'0.88rem', margin:'0 0 0.3rem', lineHeight:1.3 }}>{game.title}</h4>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <span style={{ fontSize:'0.75rem', color:'var(--muted)' }}>{game.duration}</span>
                        <span style={{ color:'var(--amber)', fontSize:'0.78rem' }}>★ {game.rating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
            {/* Recent activity */}
            <div style={{ background:'var(--surface)', borderRadius:'var(--radius-lg)', padding:'1.25rem', border:'1px solid var(--border)' }}>
              <h4 style={{ marginBottom:'1rem', fontSize:'1rem' }}>Recent Activity</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {DEMO_RECENT.map(item => (
                  <div key={item.id} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.6rem', borderRadius:'var(--radius-sm)', background:'var(--bg)' }}>
                    <div style={{ width:36, height:36, borderRadius:8, background:'var(--forest-pale)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Play size={15} color="var(--forest)" fill="var(--forest)" />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:600, fontSize:'0.82rem', margin:'0 0 0.1rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</p>
                      <p style={{ color:'var(--muted)', fontSize:'0.75rem', margin:0 }}>Score: {item.score}%</p>
                    </div>
                    <div style={{
                      background: item.score >= 90 ? 'var(--forest-pale)' : item.score >= 70 ? '#FFFBEB' : '#FFF5F5',
                      color: item.score >= 90 ? 'var(--forest)' : item.score >= 70 ? 'var(--warning)' : 'var(--error)',
                      padding:'2px 8px', borderRadius:'100px', fontSize:'0.72rem', fontWeight:700,
                    }}>{item.score}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject progress */}
            <div style={{ background:'var(--surface)', borderRadius:'var(--radius-lg)', padding:'1.25rem', border:'1px solid var(--border)' }}>
              <h4 style={{ marginBottom:'1rem', fontSize:'1rem' }}>Subject Progress</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.85rem' }}>
                {DEMO_PROGRESS.map(({ subject, score }) => {
                  const sub = Object.values(SUBJECTS).find(s=>s.id===subject);
                  return (
                    <div key={subject}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.3rem' }}>
                        <span style={{ fontSize:'0.82rem', fontWeight:600 }}>{sub?.label||subject}</span>
                        <span style={{ fontSize:'0.82rem', fontWeight:700, color: score>=80?'var(--success)':score>=60?'var(--warning)':'var(--error)' }}>{score}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width:`${score}%`, background: sub?.color || 'var(--forest)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievement badges */}
            <div style={{ background:'linear-gradient(135deg, #0B4F3C, #1A7A5E)', borderRadius:'var(--radius-lg)', padding:'1.25rem', color:'#fff' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.85rem' }}>
                <Award size={18} color="var(--amber)" />
                <h4 style={{ margin:0, color:'#fff', fontSize:'1rem' }}>Achievements</h4>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                {[
                  { label:'First Game', icon:'🎮' },
                  { label:'Math Star', icon:'⭐' },
                  { label:'7-Day Streak', icon:'🔥' },
                  { label:'Top Scorer', icon:'🏆' },
                ].map(({ label, icon }) => (
                  <div key={label} style={{ display:'flex', alignItems:'center', gap:'0.3rem', background:'rgba(255,255,255,0.12)', borderRadius:'100px', padding:'4px 10px', fontSize:'0.75rem', fontWeight:600 }}>
                    <span>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal isOpen={payModal} onClose={() => setPayModal(false)} />

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 2fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(auto-fit, minmax(180px"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
