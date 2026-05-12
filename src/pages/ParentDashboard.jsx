import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Users, BarChart3, Trophy, Clock, Star,
  LogOut, ChevronRight, TrendingUp, Award, Play,
  Calendar, ShieldCheck, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SUBJECTS } from '../lib/games';
import PaymentModal from '../components/PaymentModal';
import NotificationDropdown from '../components/NotificationDropdown';

// Demo children data
const DEMO_CHILDREN = [
  {
    id: 'child_001',
    name: 'Brian Kamau',
    grade: 'Grade 7',
    avatar: 'B',
    avatarColor: '#3B82F6',
    gamesPlayed: 42,
    avgScore: 84,
    streak: 7,
    lastActive: '2 hours ago',
    progress: [
      { subject: 'mathematics', score: 88, games: 12 },
      { subject: 'integrated_science', score: 76, games: 9 },
      { subject: 'pre_technical', score: 91, games: 8 },
      { subject: 'caas', score: 80, games: 7 },
      { subject: 'cre', score: 85, games: 6 },
    ],
    recentGames: [
      { title: 'Algebra Arena', score: 92, date: 'Today' },
      { title: 'Circuit Builder', score: 88, date: 'Yesterday' },
      { title: 'Forces & Motion', score: 76, date: '2 days ago' },
    ],
  },
  {
    id: 'child_002',
    name: 'Mercy Kamau',
    grade: 'Grade 5',
    avatar: 'M',
    avatarColor: '#EC4899',
    gamesPlayed: 28,
    avgScore: 91,
    streak: 12,
    lastActive: '30 min ago',
    progress: [
      { subject: 'mathematics', score: 95, games: 10 },
      { subject: 'science_technology', score: 88, games: 8 },
      { subject: 'agriculture', score: 94, games: 6 },
      { subject: 'caas', score: 87, games: 4 },
    ],
    recentGames: [
      { title: 'Times Table Typhoon', score: 100, date: 'Today' },
      { title: 'Plant Life Cycle Lab', score: 94, date: 'Today' },
      { title: 'Seed Selection Master', score: 90, date: 'Yesterday' },
    ],
  },
];

const WEEKLY_ACTIVITY = [
  { day: 'Mon', brian: 45, mercy: 60 },
  { day: 'Tue', brian: 30, mercy: 75 },
  { day: 'Wed', brian: 60, mercy: 45 },
  { day: 'Thu', brian: 90, mercy: 80 },
  { day: 'Fri', brian: 75, mercy: 90 },
  { day: 'Sat', brian: 50, mercy: 40 },
  { day: 'Sun', brian: 40, mercy: 55 },
];

export default function ParentDashboard() {
  const { user, subscription, logout, isSubscribed } = useAuth();
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(DEMO_CHILDREN[0]);
  const [payModal, setPayModal] = useState(false);
  const maxMinutes = Math.max(...WEEKLY_ACTIVITY.flatMap(d => [d.brian, d.mercy]));

  const daysLeft = subscription?.expiresAt
    ? Math.max(0, Math.ceil((new Date(subscription.expiresAt) - new Date()) / 86400000))
    : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={17} color="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--forest)' }}>
              ShuleAI <span style={{ color: 'var(--amber)' }}>Pro</span>
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>Parent View</span>
            <NotificationDropdown />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.75rem', background: 'var(--bg)', borderRadius: '100px' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--amber-dark)' }}>{user?.name?.[0]?.toUpperCase()}</span>
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink)' }}>{user?.name?.split(' ')[0]}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={logout} style={{ gap: '0.3rem', color: 'var(--muted)' }}>
              <LogOut size={15} /> Out
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>Parent Dashboard</h2>
            <p style={{ color: 'var(--muted)' }}>Monitor your children&apos;s CBC learning progress.</p>
          </div>

          {isSubscribed() ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--forest-pale)', borderRadius: 'var(--radius)', padding: '0.75rem 1.1rem', border: '1px solid rgba(11,79,60,0.15)' }}>
              <ShieldCheck size={18} color="var(--forest)" />
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--forest)', margin: 0 }}>
                  {subscription?.plan?.charAt(0).toUpperCase() + subscription?.plan?.slice(1)} Active
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: 0 }}>{daysLeft} days remaining</p>
              </div>
            </div>
          ) : (
            <button className="btn btn-amber" onClick={() => setPayModal(true)}>
              Subscribe Now
            </button>
          )}
        </div>

        {/* Children selector */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {DEMO_CHILDREN.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-lg)',
                border: `2px solid ${selectedChild.id === child.id ? 'var(--forest)' : 'var(--border)'}`,
                background: selectedChild.id === child.id ? 'var(--forest-glass)' : 'var(--surface)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: child.avatarColor + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${child.avatarColor}44` }}>
                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: child.avatarColor }}>{child.avatar}</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 700, fontSize: '0.92rem', margin: 0, color: selectedChild.id === child.id ? 'var(--forest)' : 'var(--ink)' }}>{child.name}</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.78rem', margin: 0 }}>{child.grade}</p>
              </div>
            </button>
          ))}
          <button style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-lg)',
            border: '2px dashed var(--border)', background: 'transparent',
            cursor: 'pointer', color: 'var(--muted)', fontSize: '0.88rem', fontWeight: 600,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--forest-light)'; e.currentTarget.style.color = 'var(--forest)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            <Users size={16} /> Add Child
          </button>
        </div>

        {/* Selected child overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          {[
            { icon: Play, label: 'Games Played', value: selectedChild.gamesPlayed, color: 'var(--forest)', bg: 'var(--forest-pale)' },
            { icon: Star, label: 'Avg. Score', value: `${selectedChild.avgScore}%`, color: '#F59E0B', bg: '#FFFBEB' },
            { icon: Trophy, label: 'Day Streak', value: `${selectedChild.streak} days`, color: 'var(--coral)', bg: 'var(--coral-light)' },
            { icon: Clock, label: 'Last Active', value: selectedChild.lastActive, color: '#8B5CF6', bg: '#F5F3FF' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '1.25rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Icon size={18} color={color} />
              </div>
              <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.2rem', color: 'var(--ink)' }}>{value}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem', margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Learning Area Progress */}
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h4 style={{ margin: 0 }}>Learning Area Performance</h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{selectedChild.name}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedChild.progress.map(({ subject, score, games }) => {
                const sub = Object.values(SUBJECTS).find(s => s.id === subject);
                const color = sub?.color || 'var(--forest)';
                return (
                  <div key={subject}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{sub?.label || subject}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>{games} games</span>
                      </div>
                      <span style={{
                        fontWeight: 700, fontSize: '0.88rem',
                        color: score >= 85 ? 'var(--success)' : score >= 70 ? 'var(--warning)' : 'var(--error)',
                      }}>{score}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${score}%`, background: color, transition: 'width 0.8s var(--ease)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h4 style={{ margin: 0 }}>Weekly Activity</h4>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--forest)', display: 'inline-block' }} />
                  {DEMO_CHILDREN[0].name.split(' ')[0]}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#EC4899', display: 'inline-block' }} />
                  {DEMO_CHILDREN[1].name.split(' ')[0]}
                </span>
              </div>
            </div>
            {/* Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: 140 }}>
              {WEEKLY_ACTIVITY.map(({ day, brian, mercy }) => (
                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', width: '100%' }}>
                    <div style={{ flex: 1, background: 'var(--forest)', borderRadius: '3px 3px 0 0', height: `${(brian / maxMinutes) * 110}px`, transition: 'height 0.5s var(--ease)', minHeight: 4 }} />
                    <div style={{ flex: 1, background: '#EC4899', borderRadius: '3px 3px 0 0', height: `${(mercy / maxMinutes) * 110}px`, transition: 'height 0.5s var(--ease)', minHeight: 4 }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>{day}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>Minutes of learning per day</p>
          </div>
        </div>

        {/* Recent games + Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Recent Games */}
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)' }}>
            <h4 style={{ marginBottom: '1rem' }}>Recent Games – {selectedChild.name.split(' ')[0]}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedChild.recentGames.map((game, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--forest-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={15} color="var(--forest)" fill="var(--forest)" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>{game.title}</p>
                      <p style={{ color: 'var(--muted)', fontSize: '0.75rem', margin: 0 }}>{game.date}</p>
                    </div>
                  </div>
                  <div style={{
                    padding: '3px 10px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700,
                    background: game.score >= 90 ? 'var(--forest-pale)' : game.score >= 70 ? '#FFFBEB' : '#FEF2F2',
                    color: game.score >= 90 ? 'var(--forest)' : game.score >= 70 ? 'var(--warning)' : 'var(--error)',
                  }}>{game.score}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div style={{ background: 'var(--grad-hero)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <TrendingUp size={20} color="var(--amber)" />
              <h4 style={{ margin: 0, color: '#fff' }}>Learning Insights</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '🌟', text: `${selectedChild.name.split(' ')[0]} is performing excellently in Mathematics (${selectedChild.progress.find(p=>p.subject==='mathematics')?.score||'—'}%).` },
                { icon: '📈', text: `${selectedChild.streak}-day learning streak! Consistent daily practice boosts retention significantly.` },
                { icon: '💡', text: `Consider encouraging more Integrated Science games to boost that learning area's score.` },
                { icon: '🏆', text: `Top performer in class percentile based on current progress data.` },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>{icon}</span>
                  <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <button className="btn btn-amber btn-sm" style={{ width: '100%' }} onClick={() => window.print()}>
                <Award size={15} /> Download Progress Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal isOpen={payModal} onClose={() => setPayModal(false)} />

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
