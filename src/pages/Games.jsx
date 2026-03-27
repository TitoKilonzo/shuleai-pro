import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, X, GraduationCap, ChevronDown, LogOut } from 'lucide-react'
import useAuthStore from '../store/authStore'
import GameCard from '../components/GameCard'
import { GAMES, SUBJECTS, DIFFICULTIES } from '../lib/games'

const ALL_GRADES = [4, 5, 6, 7, 8, 9]

export default function Games() {
  const { profile, logout } = useAuthStore()
  const [search, setSearch] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedDiff, setSelectedDiff] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('popular')

  const filtered = useMemo(() => {
    let g = [...GAMES]
    if (search) {
      const q = search.toLowerCase()
      g = g.filter(game =>
        game.title.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q) ||
        game.tags?.some(t => t.includes(q))
      )
    }
    if (selectedSubject !== 'all') g = g.filter(game => game.subject === selectedSubject)
    if (selectedGrade !== 'all') g = g.filter(game => game.grade.includes(parseInt(selectedGrade)))
    if (selectedDiff !== 'all') g = g.filter(game => game.difficulty === selectedDiff)
    if (sortBy === 'popular') g.sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
    else if (sortBy === 'newest') g.reverse()
    else if (sortBy === 'points') g.sort((a, b) => b.points - a.points)
    return g
  }, [search, selectedSubject, selectedGrade, selectedDiff, sortBy])

  const subjectList = [{ id: 'all', label: 'All Subjects' }, ...Object.values(SUBJECTS)]

  const clearFilters = () => {
    setSearch('')
    setSelectedSubject('all')
    setSelectedGrade('all')
    setSelectedDiff('all')
  }
  const hasFilters = search || selectedSubject !== 'all' || selectedGrade !== 'all' || selectedDiff !== 'all'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-forest-800 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-extrabold text-forest-900 hidden sm:block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                ShuleAI <span className="text-gold-500">Pro</span>
              </span>
            </Link>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search games, subjects…"
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-forest-400"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors
                  ${showFilters ? 'bg-forest-800 text-white border-forest-800' : 'border-gray-200 text-gray-600 hover:border-forest-300'}`}>
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {hasFilters && <span className="w-2 h-2 bg-gold-500 rounded-full" />}
              </button>
              <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 hidden sm:block">Dashboard</Link>
              <button onClick={logout} className="text-gray-400 hover:text-red-500 p-2">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-3">
              <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}
                className="input-field py-2 text-sm">
                {subjectList.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <select value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)}
                className="input-field py-2 text-sm">
                <option value="all">All Grades</option>
                {ALL_GRADES.map(g => <option key={g} value={g}>Grade {g}</option>)}
              </select>
              <select value={selectedDiff} onChange={e => setSelectedDiff(e.target.value)}
                className="input-field py-2 text-sm">
                <option value="all">All Difficulties</option>
                {Object.entries(DIFFICULTIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="input-field py-2 text-sm">
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="points">Most Points</option>
              </select>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {subjectList.map(s => (
            <button key={s.id} onClick={() => setSelectedSubject(s.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                ${selectedSubject === s.id ? 'bg-forest-800 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-forest-300'}`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-extrabold text-gray-900 text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {hasFilters ? `${filtered.length} games found` : `All Games (${filtered.length})`}
            </h2>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-forest-600 hover:text-forest-800 font-semibold mt-0.5 flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Games grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(game => <GameCard key={game.id} game={game} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="font-bold text-gray-700 mb-1">No games found</h3>
            <p className="text-gray-400 text-sm mb-4">Try different filters or search terms</p>
            <button onClick={clearFilters} className="btn-outline py-2.5 px-6">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
