import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Clock, Star, CheckCircle2, XCircle, Trophy, Zap,
  ChevronRight, RotateCcw, Home, Play, Pause, Target, Award
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import { progressService } from '../lib/appwrite'
import { GAMES, SUBJECTS, DIFFICULTIES, DEMO_QUESTIONS } from '../lib/games'

const QUESTIONS = DEMO_QUESTIONS['math-quiz']

export default function GamePlay() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuthStore()

  const game = GAMES.find(g => g.id === gameId)
  const subject = game ? (SUBJECTS[game.subject.toUpperCase()] || Object.values(SUBJECTS).find(s => s.id === game.subject)) : null
  const difficulty = game ? DIFFICULTIES[game.difficulty] : null

  const [phase, setPhase] = useState('intro') // intro | playing | result
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(20)
  const [totalTime, setTotalTime] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)

  const q = QUESTIONS[qIndex]

  // Timer
  useEffect(() => {
    if (phase !== 'playing' || paused || answered) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleTimeout()
          return 0
        }
        return t - 1
      })
      setTotalTime(t => t + 1)
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase, qIndex, paused, answered])

  const handleTimeout = () => {
    setAnswered(true)
    setSelected(null)
    setAnswers(prev => [...prev, { correct: false, selected: null, time: 20 - timeLeft }])
    setTimeout(() => nextQuestion(), 2000)
  }

  const handleSelect = (idx) => {
    if (answered) return
    clearInterval(timerRef.current)
    setSelected(idx)
    setAnswered(true)
    const correct = idx === q.answer
    if (correct) setScore(s => s + 1)
    setAnswers(prev => [...prev, { correct, selected: idx, time: 20 - timeLeft }])
    setTimeout(() => nextQuestion(), correct ? 1500 : 2200)
  }

  const nextQuestion = () => {
    if (qIndex >= QUESTIONS.length - 1) {
      setPhase('result')
    } else {
      setQIndex(i => i + 1)
      setSelected(null)
      setAnswered(false)
      setTimeLeft(20)
    }
  }

  const startGame = () => {
    setPhase('playing')
    setQIndex(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setAnswers([])
    setTimeLeft(20)
    setTotalTime(0)
  }

  const saveAndExit = async () => {
    if (user?.$id) {
      try {
        await progressService.saveProgress(
          user.$id, gameId, game?.subject || 'mathematics',
          score, QUESTIONS.length, totalTime, profile?.grade || '7'
        )
      } catch {}
    }
    navigate('/games')
  }

  const pct = Math.round((score / QUESTIONS.length) * 100)
  const timerPct = (timeLeft / 20) * 100
  const timerColor = timeLeft > 10 ? '#0a4f38' : timeLeft > 5 ? '#d97706' : '#dc2626'

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Game not found</p>
          <Link to="/games" className="btn-primary">Back to Games</Link>
        </div>
      </div>
    )
  }

  // ── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-500">Back to Games</span>
          </div>

          {/* Game hero */}
          <div className="card overflow-hidden mb-6">
            <div className="relative h-56">
              <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=300&fit=crop' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-2 mb-2">
                  <span className={`badge ${difficulty?.color}`}>{difficulty?.label}</span>
                  {subject && <span className="badge bg-white/20 text-white backdrop-blur-sm">{subject.label}</span>}
                </div>
                <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {game.title}
                </h1>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">{game.description}</p>
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl mb-6">
                {[
                  { icon: Clock, label: 'Duration', value: `${game.duration} min` },
                  { icon: Target, label: 'Questions', value: `${QUESTIONS.length} Q's` },
                  { icon: Zap, label: 'Points', value: `${game.points} pts` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-5 h-5 text-forest-700 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="font-bold text-gray-900 text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {/* Grades */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-gray-500">Available for:</span>
                {game.grade.map(g => (
                  <span key={g} className="badge bg-forest-100 text-forest-700">Grade {g}</span>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={startGame} className="btn-primary flex-1 py-4">
                  <Play className="w-5 h-5 fill-white" /> Start Game
                </button>
                <button onClick={() => navigate('/games')} className="btn-outline py-4 px-6">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Other games suggestion */}
          <div>
            <h3 className="font-bold text-gray-700 mb-3 text-sm">More games you might like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {GAMES.filter(g => g.id !== gameId && g.subject === game.subject).slice(0, 3).map(g => (
                <div key={g.id} onClick={() => navigate(`/games/${g.id}`)}
                  className="cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <img src={g.thumbnail} alt={g.title} className="w-full h-20 object-cover" />
                  <div className="p-2">
                    <p className="text-xs font-bold text-gray-900 truncate">{g.title}</p>
                    <p className="text-xs text-gold-600">{g.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── PLAYING ──────────────────────────────────────────────────────────────
  if (phase === 'playing') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => { if (confirm('Exit game? Progress will be lost.')) navigate('/games') }}
            className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-gold-500" />
              <span className="font-bold text-gray-900">{score}/{QUESTIONS.length}</span>
            </div>
            <div className="flex gap-1">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i < qIndex ? (answers[i]?.correct ? 'bg-green-400' : 'bg-red-400') : i === qIndex ? 'bg-forest-600 w-6' : 'bg-gray-200'} ${i === qIndex ? 'w-6' : 'w-4'}`} />
              ))}
            </div>
            <button onClick={() => setPaused(p => !p)} className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-gray-700">
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-sm font-mono font-bold" style={{ color: timerColor }}>
            {String(timeLeft).padStart(2, '0')}s
          </div>
        </div>

        {/* Timer bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full transition-all duration-1000" style={{ width: `${timerPct}%`, backgroundColor: timerColor }} />
        </div>

        {paused && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 text-center max-w-xs w-full mx-4 shadow-2xl">
              <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Pause className="w-8 h-8 text-forest-700" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">Game Paused</h2>
              <p className="text-gray-500 text-sm mb-6">Take a breath. Resume when ready.</p>
              <button onClick={() => setPaused(false)} className="btn-primary w-full py-3.5">
                <Play className="w-4 h-4" /> Resume
              </button>
            </div>
          </div>
        )}

        {/* Question */}
        <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
          <div className="text-center mb-8 page-enter">
            <span className="text-sm font-semibold text-forest-600">Question {qIndex + 1} of {QUESTIONS.length}</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mt-3 leading-snug"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {q.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {q.options.map((opt, idx) => {
              let cls = 'bg-white border-2 border-gray-200 text-gray-800 hover:border-forest-400 hover:bg-forest-50'
              if (answered) {
                if (idx === q.answer) cls = 'answer-correct border-2'
                else if (idx === selected) cls = 'answer-wrong border-2'
                else cls = 'bg-white border-2 border-gray-100 text-gray-400 opacity-60'
              } else if (selected === idx) {
                cls = 'answer-selected border-2'
              }
              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                  className={`w-full p-4 rounded-2xl text-left font-semibold text-sm transition-all flex items-center gap-3 ${cls} disabled:cursor-not-allowed`}>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0
                    ${answered && idx === q.answer ? 'bg-green-400 text-white' : answered && idx === selected ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </div>
                  {opt}
                  {answered && idx === q.answer && <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />}
                  {answered && idx === selected && idx !== q.answer && <XCircle className="w-4 h-4 text-red-500 ml-auto" />}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <div className={`p-4 rounded-2xl border page-enter ${selected === q.answer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-start gap-2">
                {selected === q.answer
                  ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                <div>
                  <p className={`font-bold text-sm ${selected === q.answer ? 'text-green-800' : 'text-red-700'}`}>
                    {selected === q.answer ? '🎉 Correct!' : selected === null ? '⏱ Time\'s up!' : '❌ Not quite!'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{q.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── RESULT ───────────────────────────────────────────────────────────────
  if (phase === 'result') {
    const grade = pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D'
    const msg = pct >= 80 ? 'Excellent Work!' : pct >= 60 ? 'Good Job!' : pct >= 40 ? 'Keep Practicing!' : 'Need More Practice'
    const ptEarned = Math.round(game.points * (pct / 100))

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden page-enter">
            {/* Header */}
            <div className={`p-8 text-center ${pct >= 80 ? 'bg-forest-800' : pct >= 60 ? 'bg-blue-700' : 'bg-amber-600'}`}>
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                {pct >= 80 ? <Trophy className="w-10 h-10 text-gold-300" /> : <Target className="w-10 h-10 text-white" />}
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{msg}</h2>
              <p className="text-white/80 text-sm">{game.title}</p>
            </div>

            {/* Stats */}
            <div className="p-6">
              {/* Score circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke={pct >= 80 ? '#0a4f38' : pct >= 60 ? '#2563eb' : '#d97706'}
                      strokeWidth="8" strokeDasharray={`${pct * 2.51} 251`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{pct}%</span>
                    <span className="text-xs text-gray-500">Grade {grade}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Correct', value: `${score}/${QUESTIONS.length}`, icon: CheckCircle2, color: 'text-green-600' },
                  { label: 'Points Earned', value: `+${ptEarned}`, icon: Zap, color: 'text-gold-600' },
                  { label: 'Time Spent', value: `${Math.round(totalTime)}s`, icon: Clock, color: 'text-blue-600' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="text-center p-3 bg-gray-50 rounded-2xl">
                    <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                    <p className="font-extrabold text-gray-900 text-sm">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>

              {/* Answer review */}
              <div className="space-y-2 mb-6">
                {answers.map((ans, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl text-sm ${ans.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                    {ans.correct ? <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                    <span className="flex-1 text-gray-700 line-clamp-1">{QUESTIONS[i].question}</span>
                    <span className="text-xs text-gray-400">{ans.time}s</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button onClick={startGame} className="btn-primary w-full py-3.5">
                  <RotateCcw className="w-4 h-4" /> Play Again
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => navigate('/games')} className="btn-outline py-3 text-sm">
                    <Home className="w-4 h-4" /> All Games
                  </button>
                  <button onClick={saveAndExit} className="py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 flex items-center justify-center gap-2">
                    Save & Exit <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
