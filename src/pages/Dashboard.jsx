import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Trophy, Clock, Star, Play, BarChart3,
  LogOut, ChevronRight, Award, Flame, Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getFeaturedGames, SUBJECTS, GAMES } from '../lib/games';
import { progressService } from '../lib/appwrite';
import PaymentModal from '../components/PaymentModal';
import NotificationDropdown from '../components/NotificationDropdown';

const DEMO_PROGRESS = [
  { subject: 'mathematics',       score: 88, gamesPlayed: 12, timeSpent: 3600 },
  { subject: 'integrated_science',score: 72, gamesPlayed: 8,  timeSpent: 2800 },
  { subject: 'agriculture',       score: 91, gamesPlayed: 10, timeSpent: 3200 },
  { subject: 'caas',              score: 85, gamesPlayed: 7,  timeSpent: 2100 },
];

const DEMO_RECENT = [
  { id: 'g001', title: 'Number Quest',          subject: 'mathematics',       score: 95, completedAt: new Date(Date.now()-3600000).toISOString() },
  { id: 'g016', title: 'Cell Explorer',         subject: 'integrated_science',score: 80, completedAt: new Date(Date.now()-86400000).toISOString() },
  { id: 'g049', title: 'Crop Farmer Simulator', subject: 'agriculture',       score: 100,completedAt: new Date(Date.now()-172800000).toISOString() },
];

const CBC_BANDS = [
  { lbl: 'Exceeding Expectation (EE)', range: '80–100%', color: 'var(--success)' },
  { lbl: 'Meeting Expectation (ME)',   range: '50–79%',  color: '#2563EB' },
  { lbl: 'Approaching Expectation (AE)',range: '40–49%', color: 'var(--warning)' },
  { lbl: 'Below Expectation (BE)',     range: '0–39%',   color: 'var(--error)' },
];

const scoreColor = (s) => s >= 80 ? 'var(--success)' : s >= 50 ? '#2563EB' : s >= 40 ? 'var(--warning)' : 'var(--error)';
const scoreBg    = (s) => s >= 80 ? '#DCFCE7'       : s >= 50 ? '#DBEAFE'  : s >= 40 ? '#FEF9C3'       : '#FEE2E2';

export default function Dashboard() {
  const { user, subscription, logout, isSubscribed } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalGames: 0, avgScore: 0, subjects: 0, totalMinutes: 0 });
  const [payModal, setPayModal] = useState(false);
  const featured = getFeaturedGames(8);

  useEffect(() => {
    if (user?.isDemo) { setStats({ totalGames: 37, avgScore: 88, subjects: 5, totalMinutes: 184 }); return; }
    if (user?.$id)    { progressService.getProgressStats(user.$id).then(setStats).catch(() => {}); }
  }, [user]);

  const daysLeft = (() => {
    if (!subscription?.expiresAt) return null;
    const d = Math.ceil((new Date(subscription.expiresAt) - new Date()) / 86400000);
    return d > 0 ? d : 0;
  })();

  const STAT_CARDS = [
    { icon: Play,      label: 'Games Played',         value: stats.totalGames,    color: 'var(--forest)',   bg: 'var(--forest-pale)' },
    { icon: Star,      label: 'Avg. Score',            value: `${stats.avgScore}%`,color: '#D97706',        bg: '#FEF9C3' },
    { icon: BookOpen,  label: 'Learning Areas Active', value: stats.subjects,      color: '#8B5CF6',        bg: '#F5F3FF' },
    { icon: Clock,     label: 'Minutes Learned',       value: stats.totalMinutes,  color: 'var(--coral)',   bg: 'var(--coral-light)' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* ── Top Nav ──────────────────────────────── */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={17} color="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--forest)' }} className="dash-logo">
              ShuleAI <span style={{ color: 'var(--amber)' }}>Pro</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Link to="/games" className="btn btn-ghost btn-sm" style={{ color: 'var(--ink)' }}>Games</Link>
            <NotificationDropdown />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.65rem', background: 'var(--bg)', borderRadius: '100px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--forest-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--forest)' }}>{user?.name?.[0]?.toUpperCase()}</span>
              </div>
              <span className="dash-username" style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink)' }}>{user?.name?.split(' ')[0]}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={logout} style={{ color: 'var(--muted)' }}>
              <LogOut size={15} />
            </button>
          </nav>
        </div>
      </header>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* ── Welcome Strip ───────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ marginBottom: '0.2rem', fontSize: 'clamp(1.3rem,3vw,1.7rem)' }}>
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p style={{ color: 'var(--muted)', margin: 0 }}>Continue your CBC learning journey.</p>
          </div>

          {isSubscribed() ? (
            <div style={{ background: 'var(--grad-forest)', color: '#fff', padding: '0.85rem 1.4rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', flexShrink: 0, minWidth: 150 }}>
              <p style={{ fontSize: '0.7rem', margin: '0 0 0.2rem', opacity: 0.8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {subscription?.plan?.toUpperCase()} PLAN
              </p>
              <p style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0 0 0.1rem', fontFamily: 'var(--font-head)' }}>
                {daysLeft} days left
              </p>
              <p style={{ fontSize: '0.7rem', opacity: 0.7, margin: 0 }}>Keep the streak alive!</p>
            </div>
          ) : (
            <button className="btn btn-amber btn-lg" onClick={() => setPayModal(true)}>
              <Zap size={18} /> Activate Subscription
            </button>
          )}
        </div>

        {/* ── Stat Cards ──────────────────────────── */}
        <div className="dash-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {STAT_CARDS.map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="stat-card">
              <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <Icon size={18} color={color} />
              </div>
              <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.9rem', fontWeight: 900, margin: '0 0 0.15rem', color: 'var(--ink)', lineHeight: 1 }}>{value}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* ── Main 2-col grid ─────────────────────── */}
        <div className="dash-main-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

          {/* Featured Games */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Featured Games</h3>
              <Link to="/games" className="btn btn-ghost btn-sm" style={{ color: 'var(--forest)', gap: '0.25rem' }}>
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="dash-games-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem' }}>
              {featured.slice(0, 6).map(game => {
                const sub = Object.values(SUBJECTS).find(s => s.id === game.subject);
                return (
                  <div key={game.id}
                    className="card"
                    style={{ overflow: 'hidden', cursor: isSubscribed() ? 'pointer' : 'default', opacity: isSubscribed() ? 1 : 0.88 }}
                    onClick={() => isSubscribed() ? navigate(`/games/${game.id}`) : setPayModal(true)}
                  >
                    <div style={{ height: 120, overflow: 'hidden', position: 'relative' }}>
                      <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s var(--ease)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />
                      {!isSubscribed() && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ background: 'var(--amber)', color: 'var(--ink)', padding: '3px 10px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 800 }}>SUBSCRIBE</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '0.7rem' }}>
                      <p style={{ fontSize: '0.68rem', color: sub?.color || 'var(--forest)', fontWeight: 700, margin: '0 0 0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sub?.label || game.subject}</p>
                      <h4 style={{ fontSize: '0.86rem', margin: '0 0 0.3rem', lineHeight: 1.3, fontWeight: 700 }}>{game.title}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{game.duration}</span>
                        <span style={{ color: 'var(--amber)', fontSize: '0.75rem', fontWeight: 700 }}>★ {game.rating || '4.7'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Recent Activity */}
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Flame size={15} color="var(--coral)" /> Recent Activity
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {DEMO_RECENT.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--forest-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Play size={13} color="var(--forest)" fill="var(--forest)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: '0.8rem', margin: '0 0 0.05rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                      <p style={{ color: 'var(--muted)', fontSize: '0.72rem', margin: 0 }}>Score: {item.score}%</p>
                    </div>
                    <span style={{ background: scoreBg(item.score), color: scoreColor(item.score), padding: '2px 8px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{item.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Progress */}
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BarChart3 size={15} color="var(--forest)" /> Learning Area Progress
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {DEMO_PROGRESS.map(({ subject, score }) => {
                  const sub = Object.values(SUBJECTS).find(s => s.id === subject);
                  return (
                    <div key={subject}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{sub?.label || subject}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: scoreColor(score) }}>{score}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${score}%`, background: sub?.color || 'var(--forest)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CBC Performance Bands */}
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>CBC Performance Bands</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {CBC_BANDS.map(({ lbl, range, color }) => (
                  <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.65rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color }}>{lbl}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)', background: 'var(--surface)', padding: '1px 7px', borderRadius: '100px', border: '1px solid var(--border)' }}>{range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div style={{ background: 'linear-gradient(135deg, #0B4F3C, #1A7A5E)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <Award size={16} color="var(--amber)" />
                <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem' }}>Achievements</h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[{ label: 'First Game', icon: '🎮' }, { label: 'Math Star', icon: '⭐' }, { label: '7-Day Streak', icon: '🔥' }, { label: 'Top Scorer', icon: '🏆' }].map(({ label, icon }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.12)', borderRadius: '100px', padding: '4px 10px', fontSize: '0.73rem', fontWeight: 600 }}>
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
        @media (max-width: 1000px) { .dash-main-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px)  {
          .dash-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-logo, .dash-username { display: none; }
        }
        @media (max-width: 480px)  {
          .dash-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .dash-games-grid { grid-template-columns: 1fr 1fr !important; }
        }
        .card:hover img { transform: scale(1.06); }
      `}</style>
    </div>
  );
}
