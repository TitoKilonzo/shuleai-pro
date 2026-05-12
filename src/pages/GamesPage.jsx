import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, BookOpen, LogOut, Gamepad2,
  Star, Filter, ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GameCard from '../components/GameCard';
import { GAMES, SUBJECTS, DIFFICULTIES } from '../lib/games';
import PaymentModal from '../components/PaymentModal';

const ALL_GRADES = ['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3', 4, 5, 6, 7, 8, 9];

export default function GamesPage() {
  const { user, logout, isSubscribed } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || 'all');

  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam) {
      setSelectedSubject(subjectParam);
    }
  }, [searchParams]);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedDiff, setSelectedDiff] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [payModal, setPayModal] = useState(false);

  const subjectList = useMemo(() => [{ id: 'all', label: 'All Learning Areas' }, ...Object.values(SUBJECTS)], []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setSelectedSubject('all');
    setSelectedGrade('all');
    setSelectedDiff('all');
  }, []);

  const handleGameClick = useCallback((gameId) => {
    if (!isSubscribed()) {
      setPayModal(true);
      return;
    }
    navigate(`/games/${gameId}`);
  }, [isSubscribed, navigate]);

  const filtered = useMemo(() => {
    let g = [...GAMES];
    if (search) {
      const q = search.toLowerCase();
      g = g.filter(game =>
        game.title.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q) ||
        game.skills?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedSubject !== 'all') g = g.filter(game => game.subject === selectedSubject);
    if (selectedGrade !== 'all') g = g.filter(game => {
      const gradeVal = isNaN(selectedGrade) ? selectedGrade : parseInt(selectedGrade);
      return Array.isArray(game.grade) ? game.grade.includes(gradeVal) : game.grade === gradeVal;
    });
    if (selectedDiff !== 'all') g = g.filter(game => game.difficulty === selectedDiff);
    if (sortBy === 'popular') g.sort((a, b) => (b.plays || 0) - (a.plays || 0));
    else if (sortBy === 'newest') g.reverse();
    else if (sortBy === 'points') g.sort((a, b) => (b.points || 0) - (a.points || 0));
    return g;
  }, [search, selectedSubject, selectedGrade, selectedDiff, sortBy]);

  const hasFilters = search || selectedSubject !== 'all' || selectedGrade !== 'all' || selectedDiff !== 'all';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)',
      }}>
        <div className="container" style={{ padding: '0.85rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Logo */}
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--grad-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={17} color="#fff" />
              </div>
              <span className="games-logo-text" style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--forest)' }}>
                ShuleAI <span style={{ color: 'var(--amber)' }}>Pro</span>
              </span>
            </Link>

            {/* Search */}
            <div style={{ flex: 1, maxWidth: 440, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search games, learning areas…"
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: search ? '2.5rem' : '1rem', height: 42, borderRadius: 'var(--radius-pill)', fontSize: '0.88rem' }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex', padding: 0 }}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn btn-sm ${showFilters ? 'btn-primary' : 'btn-outline'}`}
                style={{ gap: '0.35rem' }}
              >
                <SlidersHorizontal size={15} />
                <span className="games-filter-label">Filters</span>
                {hasFilters && <span style={{ width: 7, height: 7, background: 'var(--amber)', borderRadius: '50%', flexShrink: 0 }} />}
              </button>
              <Link to="/dashboard" className="btn btn-ghost btn-sm games-dash-link">Dashboard</Link>
              <button className="btn btn-ghost btn-sm" onClick={logout} style={{ color: 'var(--muted)', gap: '0.25rem' }}>
                <LogOut size={15} />
              </button>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="games-filter-panel" style={{
              marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border)',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem',
            }}>
              <div className="filter-item">
                <label>Learning Area</label>
                <select className="form-input" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                  {subjectList.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <div className="filter-item">
                <label>Grade Level</label>
                <select className="form-input" value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)}>
                  <option value="all">All Grades</option>
                  {ALL_GRADES.map(g => <option key={g} value={g}>{typeof g === 'number' ? `Grade ${g}` : g}</option>)}
                </select>
              </div>
              <div className="filter-item">
                <label>Difficulty</label>
                <select className="form-input" value={selectedDiff} onChange={e => setSelectedDiff(e.target.value)}>
                  <option value="all">All Difficulties</option>
                  {Object.entries(DIFFICULTIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div className="filter-item">
                <label>Sort By</label>
                <select className="form-input" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="points">Most Points</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container" style={{ padding: '1.5rem' }}>
        {/* Subject tabs */}
        <div className="games-subject-tabs" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
          {subjectList.map(s => (
            <button key={s.id} onClick={() => setSelectedSubject(s.id)}
              className={`btn btn-sm ${selectedSubject === s.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Results header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem' }}>
              {hasFilters ? `${filtered.length} games found` : `All Games (${filtered.length})`}
            </h3>
            {hasFilters && (
              <button onClick={clearFilters} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--forest)', fontSize: '0.82rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', padding: 0,
              }}>
                <X size={14} /> Clear filters
              </button>
            )}
          </div>
          {!isSubscribed() && (
            <button className="btn btn-amber btn-sm" onClick={() => setPayModal(true)}>
              🔓 Subscribe to Play
            </button>
          )}
        </div>

        {/* Games grid */}
        {filtered.length > 0 ? (
          <div className="games-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}>
            {filtered.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={() => handleGameClick(game.id)}
                locked={!isSubscribed()}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{
              width: 64, height: 64, background: 'var(--surface-alt)', borderRadius: 'var(--radius-lg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
            }}>
              <Search size={28} color="var(--muted)" />
            </div>
            <h4 style={{ margin: '0 0 0.35rem' }}>No games found</h4>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>Try different filters or search terms</p>
            <button onClick={clearFilters} className="btn btn-outline">Clear Filters</button>
          </div>
        )}
      </div>

      <PaymentModal isOpen={payModal} onClose={() => setPayModal(false)} />

      <style>{`
        .games-subject-tabs::-webkit-scrollbar { display: none; }
        .games-subject-tabs { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
          .games-logo-text { display: none; }
          .games-dash-link { display: none !important; }
          .games-filter-label { display: none; }
          .games-filter-panel { grid-template-columns: 1fr 1fr !important; }
          .games-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .games-grid { grid-template-columns: 1fr !important; }
          .games-filter-panel { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}