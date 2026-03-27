import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Trophy, Clock, Star, Check, X, RotateCcw, Home, ChevronRight, Award } from 'lucide-react';
import { getGameById, SUBJECTS } from '../lib/games';
import { useAuth } from '../context/AuthContext';
import { progressService } from '../lib/appwrite';

// Generates quiz questions per game subject
function generateQuestions(game) {
  const banks = {
    mathematics: [
      { q: 'What is 7 × 8?', options: ['54', '56', '48', '64'], answer: 1 },
      { q: 'Solve: 144 ÷ 12 = ?', options: ['10', '14', '12', '11'], answer: 2 },
      { q: 'What is 15% of 200?', options: ['25', '30', '20', '35'], answer: 1 },
      { q: 'Find x: 3x + 6 = 21', options: ['5', '4', '6', '3'], answer: 0 },
      { q: 'What is the area of a rectangle 8m × 5m?', options: ['35m²', '40m²', '26m²', '45m²'], answer: 1 },
    ],
    integrated_science: [
      { q: 'What organelle produces energy in a cell?', options: ['Nucleus', 'Mitochondria', 'Vacuole', 'Ribosome'], answer: 1 },
      { q: 'Which gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], answer: 2 },
      { q: 'What is the formula for water?', options: ['CO₂', 'H₂O', 'NaCl', 'O₂'], answer: 1 },
      { q: 'Which force pulls objects toward Earth?', options: ['Friction', 'Tension', 'Gravity', 'Magnetism'], answer: 2 },
      { q: 'What is the powerhouse of the cell?', options: ['Ribosome', 'Nucleus', 'Cell Wall', 'Mitochondria'], answer: 3 },
    ],
    science_technology: [
      { q: 'A lever is an example of a what?', options: ['Force', 'Simple Machine', 'Energy', 'Compound Machine'], answer: 1 },
      { q: 'Which soil type holds water best?', options: ['Sandy', 'Loamy', 'Clay', 'Silt'], answer: 2 },
      { q: 'Which stage comes after a seedling?', options: ['Fruit', 'Flower', 'Young Plant', 'Germination'], answer: 2 },
      { q: 'Light travels in what pattern?', options: ['Waves', 'Straight Lines', 'Circles', 'Zigzags'], answer: 1 },
      { q: 'What is the function of the root system?', options: ['Make food', 'Absorb water & anchor plant', 'Attract insects', 'Store seeds'], answer: 1 },
    ],
    agriculture: [
      { q: 'Which nutrient in soil helps plant growth most?', options: ['Nitrogen', 'Calcium', 'Sodium', 'Iron'], answer: 0 },
      { q: 'What is the practice of leaving land unplanted called?', options: ['Irrigation', 'Fallowing', 'Mulching', 'Terracing'], answer: 1 },
      { q: 'Which animal provides milk for dairy farming?', options: ['Goat only', 'Cow only', 'Cow and Goat', 'Sheep only'], answer: 2 },
      { q: 'Crop rotation helps to:', options: ['Reduce rainfall', 'Replenish soil nutrients', 'Increase pests', 'Remove weeds only'], answer: 1 },
      { q: 'Which pest control method is most eco-friendly?', options: ['Burning crops', 'Biological control', 'Heavy pesticides', 'Flooding fields'], answer: 1 },
    ],
    cre: [
      { q: 'Where was Jesus born?', options: ['Nazareth', 'Jerusalem', 'Bethlehem', 'Jericho'], answer: 2 },
      { q: 'How many books are in the Bible (Protestant)?', options: ['63', '66', '72', '60'], answer: 1 },
      { q: 'Who led the Israelites out of Egypt?', options: ['Abraham', 'David', 'Moses', 'Solomon'], answer: 2 },
      { q: 'What is the greatest commandment according to Jesus?', options: ['Do not steal', 'Love God and love your neighbour', 'Honour your parents', 'Do not kill'], answer: 1 },
      { q: 'Which book of the Bible contains the Ten Commandments?', options: ['Genesis', 'Leviticus', 'Exodus', 'Deuteronomy'], answer: 2 },
    ],
    caas: [
      { q: 'How many counties does Kenya have?', options: ['45', '48', '47', '50'], answer: 2 },
      { q: 'What is Kenya\'s national language?', options: ['Kikuyu', 'Swahili', 'Luo', 'Kalenjin'], answer: 1 },
      { q: 'The East African Community headquarters is in?', options: ['Nairobi', 'Kampala', 'Arusha', 'Dar es Salaam'], answer: 2 },
      { q: 'Which is Africa\'s tallest mountain?', options: ['Mount Kenya', 'Mount Kilimanjaro', 'Mount Elgon', 'Rwenzori'], answer: 1 },
      { q: 'What does "Harambee" mean?', options: ['Peace and Unity', 'Pulling Together', 'Progress', 'Freedom'], answer: 1 },
    ],
    pre_technical: [
      { q: 'Which tool is used to measure angles?', options: ['Ruler', 'Protractor', 'Compass', 'Set square'], answer: 1 },
      { q: 'What unit measures electrical current?', options: ['Volts', 'Watts', 'Amperes', 'Ohms'], answer: 2 },
      { q: 'Which wood joint is used for corners?', options: ['Butt joint', 'Dovetail joint', 'Mortise & Tenon', 'Lap joint'], answer: 1 },
      { q: 'A circuit with no break in it is called?', options: ['Open circuit', 'Short circuit', 'Closed circuit', 'Broken circuit'], answer: 2 },
      { q: 'Which material is a good conductor of electricity?', options: ['Rubber', 'Plastic', 'Copper', 'Wood'], answer: 2 },
    ],
  };
  return (banks[game.subject] || banks.mathematics).slice(0, 5);
}

export default function GamePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const game = getGameById(id);

  const [phase, setPhase] = useState('intro'); // intro | playing | result
  const [questions] = useState(() => game ? generateQuestions(game) : []);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [startTime] = useState(Date.now());

  const sub = game ? Object.values(SUBJECTS).find(s => s.id === game.subject) : null;

  // Timer per question
  useEffect(() => {
    if (phase !== 'playing' || selected !== null) return;
    if (timeLeft <= 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, selected]);

  const handleAnswer = useCallback((idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = questions[current].answer === idx;
    setAnswers(prev => [...prev, { idx, correct, timeUsed: 20 - timeLeft }]);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(p => p + 1);
        setSelected(null);
        setTimeLeft(20);
      } else {
        setPhase('result');
        // Save progress
        const score = Math.round(([...answers, { correct }].filter(a => a.correct).length / questions.length) * 100);
        if (!user?.isDemo) {
          progressService.saveProgress({
            userId: user.$id, gameId: id,
            subject: game.subject, score,
            timeSpent: Math.round((Date.now() - startTime) / 1000),
          }).catch(() => {});
        }
      }
    }, 1200);
  }, [selected, current, questions, timeLeft, answers, user, id, game, startTime]);

  const score = Math.round((answers.filter(a => a.correct).length / questions.length) * 100);
  const correct = answers.filter(a => a.correct).length;

  if (!game) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <h3>Game not found</h3>
      <Link to="/games" className="btn btn-primary">← Back to Games</Link>
    </div>
  );

  const q = questions[current];
  const timerPct = (timeLeft / 20) * 100;
  const timerColor = timeLeft > 10 ? 'var(--forest)' : timeLeft > 5 ? 'var(--warning)' : 'var(--error)';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/games" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.88rem', textDecoration: 'none' }}>
              <ChevronLeft size={18} /> Games
            </Link>
            <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>{game.title}</span>
          </div>
          {phase === 'playing' && (
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>
              {current + 1} / {questions.length}
            </span>
          )}
        </div>
      </header>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <div style={{ animation: 'fadeUp 0.5s ease both' }}>
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <img src={game.image} alt={game.title} style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} />
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span className="badge badge-forest">{sub?.label || game.subject}</span>
                <span className="badge badge-amber">{game.difficulty}</span>
                <span className="badge" style={{ background: 'var(--surface-alt)', color: 'var(--muted)' }}>
                  <Clock size={12} /> {game.duration}
                </span>
                <span className="badge" style={{ background: 'var(--surface-alt)', color: 'var(--muted)' }}>
                  Gr. {game.grades.join(', ')}
                </span>
              </div>

              <h2 style={{ marginBottom: '0.75rem' }}>{game.title}</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{game.description}</p>

              {/* Skills */}
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Skills you'll practice:</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {game.skills.map(s => (
                    <span key={s} style={{ background: 'var(--forest-pale)', color: 'var(--forest)', padding: '3px 10px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', padding: '1rem', marginBottom: '1.75rem', border: '1px solid var(--border)' }}>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>How to play:</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {[
                    `Answer ${questions.length} multiple-choice questions`,
                    'You have 20 seconds per question',
                    'Choose the best answer from 4 options',
                    'Your score is calculated at the end',
                  ].map((rule, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--ink-mid)' }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--forest)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setPhase('playing')}>
                <Trophy size={18} /> Start Game!
              </button>
            </div>
          </div>
        )}

        {/* ── PLAYING ── */}
        {phase === 'playing' && q && (
          <div style={{ animation: 'fadeIn 0.3s ease both' }}>
            {/* Progress */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)' }}>Question {current + 1} of {questions.length}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: timerColor, fontWeight: 700, fontSize: '0.88rem' }}>
                  <Clock size={15} />
                  {timeLeft}s
                </div>
              </div>
              {/* Question progress bar */}
              <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
                <div className="progress-bar-fill" style={{ width: `${((current) / questions.length) * 100}%` }} />
              </div>
              {/* Timer bar */}
              <div className="progress-bar" style={{ height: 5 }}>
                <div style={{ height: '100%', borderRadius: 4, background: timerColor, width: `${timerPct}%`, transition: 'width 1s linear, background 0.3s' }} />
              </div>
            </div>

            {/* Question card */}
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border)', marginBottom: '1.25rem', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '1.2rem', lineHeight: 1.5, marginBottom: 0 }}>{q.q}</h3>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = q.answer === i;
                const revealed = selected !== null;
                let bg = 'var(--surface)', border = 'var(--border)', color = 'var(--ink)';
                if (revealed) {
                  if (isCorrect) { bg = 'var(--forest-pale)'; border = 'var(--forest)'; color = 'var(--forest)'; }
                  else if (isSelected && !isCorrect) { bg = '#FEF2F2'; border = 'var(--error)'; color = 'var(--error)'; }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    style={{
                      width: '100%', textAlign: 'left', padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius)', border: `2px solid ${border}`,
                      background: bg, color, cursor: selected !== null ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500,
                      transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)',
                    }}
                    onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--forest-light)'; }}
                    onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        background: revealed && isCorrect ? 'var(--forest)' : revealed && isSelected ? 'var(--error)' : 'var(--bg)',
                        color: (revealed && (isCorrect || isSelected)) ? '#fff' : 'var(--muted)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '0.8rem', border: `1px solid ${border}`,
                      }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </div>
                    {revealed && isCorrect && <Check size={18} color="var(--forest)" />}
                    {revealed && isSelected && !isCorrect && <X size={18} color="var(--error)" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === 'result' && (
          <div style={{ animation: 'scaleIn 0.4s ease both' }}>
            <div style={{
              background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem', textAlign: 'center', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
            }}>
              {/* Score ring */}
              <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 1.5rem' }}>
                <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--forest-pale)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke={score >= 80 ? 'var(--forest)' : score >= 60 ? 'var(--amber)' : 'var(--coral)'}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * 327} 327`}
                    style={{ transition: 'stroke-dasharray 1s var(--ease)' }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.8rem', lineHeight: 1, color: 'var(--ink)' }}>{score}%</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>Score</span>
                </div>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ marginBottom: '0.4rem' }}>
                  {score >= 80 ? '🎉 Excellent Work!' : score >= 60 ? '👍 Good Effort!' : '💪 Keep Practising!'}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>
                  You got <strong style={{ color: 'var(--forest)' }}>{correct}</strong> out of <strong>{questions.length}</strong> questions correct.
                </p>
              </div>

              {/* Question review */}
              <div style={{ textAlign: 'left', background: 'var(--bg)', borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1.75rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.75rem' }}>Question Review</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {questions.map((ques, i) => {
                    const ans = answers[i];
                    const wasCorrect = ans?.correct;
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.83rem' }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: '0.1rem',
                          background: wasCorrect ? 'var(--forest)' : 'var(--error)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {wasCorrect ? <Check size={11} color="#fff" strokeWidth={3} /> : <X size={11} color="#fff" strokeWidth={3} />}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, lineHeight: 1.4 }}>{ques.q}</p>
                          {!wasCorrect && (
                            <p style={{ margin: '0.1rem 0 0', color: 'var(--forest)', fontSize: '0.78rem' }}>
                              Correct: {ques.options[ques.answer]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn btn-primary btn-lg" style={{ width: '100%' }}
                  onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setTimeLeft(20); setPhase('playing'); }}>
                  <RotateCcw size={17} /> Play Again
                </button>
                <Link to="/games" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
                  <ChevronRight size={17} /> More Games
                </Link>
                <Link to="/dashboard" className="btn btn-ghost btn-sm" style={{ width: '100%', textAlign: 'center', color: 'var(--muted)' }}>
                  <Home size={15} /> Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
