import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, Filter, Play, Clock, Star, Lock, ChevronLeft } from 'lucide-react';
import { GAMES, SUBJECTS } from '../lib/games';
import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const GRADES = ['All', 4, 5, 6, 7, 8, 9];

export default function GamesPage() {
  const { isSubscribed } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('all');
  const [difficulty, setDifficulty] = useState('All');
  const [grade, setGrade] = useState('All');
  const [payModal, setPayModal] = useState(false);

  const filtered = useMemo(() => {
    return GAMES.filter(g => {
      const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase());
      const matchSubject = subject === 'all' || g.subject === subject;
      const matchDiff = difficulty === 'All' || g.difficulty === difficulty;
      const matchGrade = grade === 'All' || g.grades.includes(Number(grade));
      return matchSearch && matchSubject && matchDiff && matchGrade;
    });
  }, [search, subject, difficulty, grade]);

  const handlePlay = (game) => {
    if (!isSubscribed()) { setPayModal(true); return; }
    navigate(`/games/${game.id}`);
  };

  const subjectList = [{ id: 'all', label: 'All Subjects', color: 'var(--forest)' }, ...Object.values(SUBJECTS)];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.88rem', textDecoration: 'none' }}>
              <ChevronLeft size={18} /> Back
            </Link>
            <div style={{ width: 1, height: 24, background: 'var(--border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--forest)' }}>Game Library</span>
            </div>
          </div>
          <span style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{filtered.length} of {GAMES.length} games</span>
        </div>
      </header>

      {/* Filters Bar */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1rem 0', position: 'sticky', top: 64, zIndex: 90 }}>
        <div className="container">
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <Search size={17} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input
              className="form-input"
              placeholder="Search games by name or topic..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Subject pills */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {subjectList.map(s => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                style={{
                  padding: '0.4rem 1rem', borderRadius: '100px', border: 'none',
                  whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'var(--font-body)',
                  fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.18s',
                  background: subject === s.id ? (s.color || 'var(--forest)') : 'var(--bg)',
                  color: subject === s.id ? '#fff' : 'var(--muted)',
                  boxShadow: subject === s.id ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Difficulty & Grade */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={15} color="var(--muted)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600 }}>Difficulty:</span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {DIFFICULTIES.map(d => (
                  <button key={d} onClick={() => setDifficulty(d)} style={{
                    padding: '0.25rem 0.65rem', borderRadius: '100px', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.18s',
                    background: difficulty === d ? 'var(--forest)' : 'var(--bg)',
                    color: difficulty === d ? '#fff' : 'var(--muted)',
                  }}>{d}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600 }}>Grade:</span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {GRADES.map(g => (
                  <button key={g} onClick={() => setGrade(g)} style={{
                    padding: '0.25rem 0.65rem', borderRadius: '100px', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.18s',
                    background: grade === g ? 'var(--amber)' : 'var(--bg)',
                    color: grade === g ? 'var(--ink)' : 'var(--muted)',
                  }}>{g === 'All' ? 'All' : `G${g}`}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '1px solid var(--border)' }}>
              <Search size={26} color="var(--muted)" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>No games found</h3>
            <p style={{ color: 'var(--muted)' }}>Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {filtered.map(game => {
              const sub = Object.values(SUBJECTS).find(s => s.id === game.subject);
              const diffColors = { Easy: '#16A34A', Medium: '#CA8A04', Hard: '#DC2626' };
              const locked = !isSubscribed();
              return (
                <div
                  key={game.id}
                  style={{
                    background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden', border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)', transition: 'all 0.22s var(--ease)',
                    cursor: 'pointer', opacity: locked ? 0.88 : 1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                  onClick={() => handlePlay(game)}
                >
                  <div style={{ height: 150, overflow: 'hidden', position: 'relative' }}>
                    <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />

                    {/* Badges */}
                    <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: '0.3rem' }}>
                      <span style={{ background: diffColors[game.difficulty], color: '#fff', padding: '2px 7px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 700 }}>
                        {game.difficulty}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', color: '#fff', padding: '2px 7px', borderRadius: '100px', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Clock size={10} /> {game.duration}
                    </div>

                    {/* Play overlay */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', background: 'rgba(11,79,60,0.5)' }}
                      className="play-overlay">
                      {locked
                        ? <div style={{ background: '#fff', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={18} color="var(--forest)" /></div>
                        : <div style={{ background: 'var(--amber)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Play size={20} color="var(--ink)" fill="var(--ink)" /></div>
                      }
                    </div>
                  </div>

                  <div style={{ padding: '1rem' }}>
                    {/* Subject tag */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 700, color: sub?.color || 'var(--forest)',
                        background: (sub?.color || 'var(--forest)') + '18',
                        padding: '2px 7px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.04em',
                      }}>{sub?.label || game.subject}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                        Gr. {game.grades.join(', ')}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.3rem', lineHeight: 1.3 }}>{game.title}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {game.description}
                    </p>

                    {/* Skills */}
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {game.skills.slice(0, 2).map(skill => (
                        <span key={skill} style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)', padding: '1px 7px', borderRadius: '100px', fontSize: '0.7rem' }}>
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={13} color="var(--amber)" fill="var(--amber)" />
                        <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{game.rating}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{(game.plays / 1000).toFixed(1)}k plays</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PaymentModal isOpen={payModal} onClose={() => setPayModal(false)} />

      <style>{`
        div:hover .play-overlay { opacity: 1 !important; }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(auto-fill, minmax(240px"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          div[style*="grid-template-columns: repeat(auto-fill, minmax(240px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
