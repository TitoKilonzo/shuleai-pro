import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Clock, Star, CheckCircle2, XCircle, Trophy, Zap,
  ChevronRight, RotateCcw, Home, Play, Pause, Target,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { progressService } from '../lib/appwrite';
import { GAMES, SUBJECTS, DIFFICULTIES, getQuestionsForGame } from '../lib/games';
import gameUpdateService from '../lib/gameUpdateService';

export default function GamePlay() {
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addGameCompletionNotification } = useNotifications();

  const game = GAMES.find(g => g.id === gameId);
  const subject = game ? Object.values(SUBJECTS).find(s => s.id === game.subject) : null;
  const difficulty = game ? DIFFICULTIES[game.difficulty] : null;
  
  // Initialize daily updates and get personalized questions
  useEffect(() => {
    gameUpdateService.initializeDailyUpdates();
  }, []);

  const QUESTIONS = game ? getQuestionsForGame(game) : [];

  const [phase, setPhase] = useState('intro'); // intro | playing | result
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [totalTime, setTotalTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const q = QUESTIONS[qIndex];

  // Timer
  useEffect(() => {
    if (phase !== 'playing' || paused || answered) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
      setTotalTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qIndex, paused, answered]);

  // Trigger notification when game completes
  useEffect(() => {
    if (phase === 'result' && game && subject) {
      const percentage = Math.round((score / QUESTIONS.length) * 100);
      addGameCompletionNotification(game.title, subject.name, percentage, score, QUESTIONS.length);
    }
  }, [phase, game, subject, score, QUESTIONS.length, addGameCompletionNotification]);

  const handleTimeout = () => {
    setAnswered(true);
    setSelected(null);
    setAnswers(prev => [...prev, { correct: false, selected: null, time: 20 - timeLeft }]);
    setTimeout(() => nextQuestion(), 2000);
  };

  const handleSelect = (idx) => {
    if (answered) return;
    clearInterval(timerRef.current);
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { correct, selected: idx, time: 20 - timeLeft }]);
    setTimeout(() => nextQuestion(), correct ? 1500 : 2200);
  };

  const nextQuestion = () => {
    if (qIndex >= QUESTIONS.length - 1) {
      setPhase('result');
    } else {
      setQIndex(i => i + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(20);
    }
  };

  const startGame = () => {
    setPhase('playing');
    setQIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setTimeLeft(20);
    setTotalTime(0);
  };

  const saveAndExit = async () => {
    if (user?.$id && !user?.isDemo) {
      try {
        // Save progress
        await progressService.saveProgress({
          userId: user.$id,
          gameId,
          subject: game?.subject || 'mathematics',
          score,
          timeSpent: totalTime,
          completedAt: new Date().toISOString(),
        });

        // Update user performance for adaptive learning
        gameUpdateService.updateUserPerformance(
          user.$id,
          game?.subject || 'mathematics',
          score,
          QUESTIONS.length,
          totalTime
        );
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    }
    navigate('/games');
  };

  const pct = Math.round((score / QUESTIONS.length) * 100);
  const timerPct = (timeLeft / 20) * 100;
  const timerColor = timeLeft > 10 ? 'var(--forest)' : timeLeft > 5 ? 'var(--warning)' : 'var(--error)';

  if (!game) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>Game not found</p>
          <Link to="/games" className="btn btn-primary">Back to Games</Link>
        </div>
      </div>
    );
  }

  // ── INTRO ──────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.5rem' }}>
          {/* Back button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button onClick={() => navigate('/games')} className="btn btn-ghost btn-sm" style={{ gap: '0.3rem' }}>
              <ArrowLeft size={16} /> Back to Games
            </button>
          </div>

          {/* Game hero */}
          <div className="card" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
              <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=300&fit=crop'; }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  {difficulty && (
                    <span className="badge" style={{ background: difficulty.colorHex + '20', color: difficulty.colorHex }}>{difficulty.label}</span>
                  )}
                  {subject && (
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(4px)' }}>{subject.label}</span>
                  )}
                </div>
                <h2 style={{ color: '#fff', margin: 0, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>{game.title}</h2>
              </div>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <p style={{ color: 'var(--muted)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>{game.description}</p>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem',
                padding: '1rem', background: 'var(--bg)', borderRadius: 'var(--radius)', marginBottom: '1.25rem',
              }}>
                {[
                  { icon: Clock, label: 'Duration', value: game.duration },
                  { icon: Target, label: 'Questions', value: `${QUESTIONS.length} Q's` },
                  { icon: Zap, label: 'Points', value: `${game.points} pts` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <Icon size={18} color="var(--forest)" style={{ margin: '0 auto 0.25rem' }} />
                    <p style={{ fontSize: '0.72rem', color: 'var(--muted)', margin: '0 0 0.15rem' }}>{label}</p>
                    <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Grades */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Available for:</span>
                {game.grade.map(g => (
                  <span key={g} className="badge badge-forest">Grade {g}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={startGame} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                  <Play size={18} fill="#fff" /> Start Game
                </button>
                <button onClick={() => navigate('/games')} className="btn btn-outline" style={{ padding: '0.75rem 1.25rem' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Other games */}
          <div>
            <h4 style={{ marginBottom: '0.75rem', fontSize: '0.92rem' }}>More games you might like</h4>
            <div className="gameplay-suggestions" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {GAMES.filter(g => g.id !== gameId && g.subject === game.subject).slice(0, 3).map(g => (
                <div key={g.id} onClick={() => navigate(`/games/${g.id}`)}
                  className="card" style={{ overflow: 'hidden', cursor: 'pointer' }}>
                  <img src={g.image} alt={g.title} style={{ width: '100%', height: 80, objectFit: 'cover' }} />
                  <div style={{ padding: '0.5rem' }}>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, margin: '0 0 0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--amber-dark)', margin: 0 }}>{g.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 480px) {
            .gameplay-suggestions { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </div>
    );
  }

  // ── PLAYING ──────────────────────────────────────────────────────────
  if (phase === 'playing') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button onClick={() => { if (confirm('Exit game? Progress will be lost.')) navigate('/games'); }}
            style={{ background: 'var(--bg)', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '0.45rem', borderRadius: 'var(--radius-sm)', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              <Star size={14} color="var(--amber)" />
              <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{score}/{QUESTIONS.length}</span>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{
                  height: 5, borderRadius: 3, transition: 'all 0.2s',
                  width: i === qIndex ? 20 : 12,
                  background: i < qIndex ? (answers[i]?.correct ? 'var(--success)' : 'var(--error)') : i === qIndex ? 'var(--forest)' : 'var(--border)',
                }} />
              ))}
            </div>
            <button onClick={() => setPaused(p => !p)} style={{ background: 'var(--bg)', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', display: 'flex' }}>
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          </div>

          <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.88rem', color: timerColor }}>
            {String(timeLeft).padStart(2, '0')}s
          </div>
        </div>

        {/* Timer bar */}
        <div style={{ height: 3, background: 'var(--border)' }}>
          <div style={{ height: '100%', transition: 'all 1s linear', width: `${timerPct}%`, background: timerColor }} />
        </div>

        {/* Pause overlay */}
        {paused && (
          <div className="modal-overlay" style={{ zIndex: 200 }}>
            <div style={{
              background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
              padding: '2rem', textAlign: 'center', maxWidth: 320, width: '100%', margin: '0 1rem',
              boxShadow: 'var(--shadow-xl)',
            }}>
              <div style={{
                width: 56, height: 56, background: 'var(--forest-pale)', borderRadius: 'var(--radius-lg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
              }}>
                <Pause size={24} color="var(--forest)" />
              </div>
              <h3 style={{ marginBottom: '0.35rem' }}>Game Paused</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>Take a breath. Resume when ready.</p>
              <button onClick={() => setPaused(false)} className="btn btn-primary" style={{ width: '100%' }}>
                <Play size={15} /> Resume
              </button>
            </div>
          </div>
        )}

        {/* Question */}
        <div style={{ flex: 1, maxWidth: 640, margin: '0 auto', width: '100%', padding: '1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }} className="animate-fade-up">
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--forest)' }}>Question {qIndex + 1} of {QUESTIONS.length}</span>
            <h3 style={{ marginTop: '0.5rem', lineHeight: 1.4 }}>{q.question}</h3>
          </div>

          {/* Options */}
          <div className="gameplay-options" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
            {q.options.map((opt, idx) => {
              let bg = 'var(--surface)';
              let border = 'var(--border)';
              let color = 'var(--ink)';
              let opacity = 1;

              if (answered) {
                if (idx === q.answer) { bg = '#DCFCE7'; border = '#22C55E'; color = '#15803D'; }
                else if (idx === selected) { bg = '#FEE2E2'; border = '#EF4444'; color = '#B91C1C'; }
                else { opacity = 0.5; }
              }

              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                  style={{
                    width: '100%', padding: '0.85rem', borderRadius: 'var(--radius)',
                    textAlign: 'left', fontWeight: 600, fontSize: '0.88rem',
                    transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '0.6rem',
                    background: bg, border: `2px solid ${border}`, color, opacity,
                    cursor: answered ? 'default' : 'pointer',
                  }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 'var(--radius-sm)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.78rem', fontWeight: 700,
                    background: answered && idx === q.answer ? '#22C55E' : answered && idx === selected ? '#EF4444' : 'var(--bg)',
                    color: (answered && (idx === q.answer || idx === selected)) ? '#fff' : 'var(--muted)',
                  }}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </div>
                  <span style={{ flex: 1 }}>{opt}</span>
                  {answered && idx === q.answer && <CheckCircle2 size={16} color="#16A34A" />}
                  {answered && idx === selected && idx !== q.answer && <XCircle size={16} color="#EF4444" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <div className="animate-fade-up" style={{
              padding: '0.85rem', borderRadius: 'var(--radius)',
              background: selected === q.answer ? '#F0FDF4' : '#FEF2F2',
              border: `1px solid ${selected === q.answer ? '#BBF7D0' : '#FECACA'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                {selected === q.answer
                  ? <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
                  : <XCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />}
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.88rem', margin: '0 0 0.2rem', color: selected === q.answer ? '#15803D' : '#B91C1C' }}>
                    {selected === q.answer ? '🎉 Correct!' : selected === null ? '⏱ Time\'s up!' : '❌ Not quite!'}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>{q.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 480px) {
            .gameplay-options { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    );
  }

  // ── RESULT ──────────────────────────────────────────────────────────
  if (phase === 'result') {
    const grade = pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
    const msg = pct >= 80 ? 'Excellent Work!' : pct >= 60 ? 'Good Job!' : pct >= 40 ? 'Keep Practicing!' : 'Need More Practice';
    const ptEarned = Math.round((game.points || 100) * (pct / 100));
    const headerBg = pct >= 80 ? 'var(--grad-forest)' : pct >= 60 ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : 'linear-gradient(135deg, #D97706, #F59E0B)';

    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div className="card animate-scale-in" style={{ overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '2rem', textAlign: 'center', background: headerBg }}>
              <div style={{
                width: 68, height: 68, background: 'rgba(255,255,255,0.18)', borderRadius: 'var(--radius-xl)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
              }}>
                {pct >= 80 ? <Trophy size={32} color="#FCD34D" /> : <Target size={32} color="#fff" />}
              </div>
              <h3 style={{ color: '#fff', margin: '0 0 0.25rem' }}>{msg}</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', margin: 0 }}>{game.title}</p>
            </div>

            {/* Stats */}
            <div style={{ padding: '1.5rem' }}>
              {/* Score circle */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <div style={{ position: 'relative', width: 110, height: 110 }}>
                  <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none"
                      stroke={pct >= 80 ? 'var(--forest)' : pct >= 60 ? '#2563EB' : 'var(--amber-dark)'}
                      strokeWidth="8" strokeDasharray={`${pct * 2.51} 251`} strokeLinecap="round" />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: '1.8rem', fontWeight: 800 }}>{pct}%</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Grade {grade}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Correct', value: `${score}/${QUESTIONS.length}`, icon: CheckCircle2, color: 'var(--success)' },
                  { label: 'Points', value: `+${ptEarned}`, icon: Zap, color: 'var(--amber-dark)' },
                  { label: 'Time', value: `${Math.round(totalTime)}s`, icon: Clock, color: 'var(--info)' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} style={{ textAlign: 'center', padding: '0.65rem', background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                    <Icon size={16} color={color} style={{ margin: '0 auto 0.25rem' }} />
                    <p style={{ fontWeight: 800, fontSize: '0.88rem', margin: '0 0 0.1rem' }}>{value}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)', margin: 0 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Answer review */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                {answers.map((ans, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.65rem',
                    borderRadius: 'var(--radius-sm)', fontSize: '0.82rem',
                    background: ans.correct ? '#F0FDF4' : '#FEF2F2',
                  }}>
                    {ans.correct ? <CheckCircle2 size={14} color="#16A34A" style={{ flexShrink: 0 }} /> : <XCircle size={14} color="#EF4444" style={{ flexShrink: 0 }} />}
                    <span style={{ flex: 1, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {QUESTIONS[i]?.question}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', flexShrink: 0 }}>{ans.time}s</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <button onClick={startGame} className="btn btn-primary" style={{ width: '100%' }}>
                  <RotateCcw size={15} /> Play Again
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <button onClick={() => navigate('/games')} className="btn btn-outline btn-sm">
                    <Home size={14} /> All Games
                  </button>
                  <button onClick={saveAndExit} className="btn btn-ghost btn-sm" style={{ background: 'var(--bg)' }}>
                    Save & Exit <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
