import { useNavigate } from 'react-router-dom'
import { Play, Star, Clock, Users, Zap } from 'lucide-react'
import { SUBJECTS, DIFFICULTIES, GAME_TYPES } from '../lib/games'
import SafeImage from './SafeImage'

export default function GameCard({ game, compact = false }) {
  const navigate = useNavigate()
  const subject = SUBJECTS[game.subject.toUpperCase()] || SUBJECTS[Object.keys(SUBJECTS).find(k => SUBJECTS[k].id === game.subject)]
  const difficulty = DIFFICULTIES[game.difficulty]
  const gameType = GAME_TYPES[game.type]

  // Use game.image as primary, game.thumbnail as fallback if somehow defined
  const imageSrc = game.image || game.thumbnail

  if (compact) {
    return (
      <div
        onClick={() => navigate(`/games/${game.id}`)}
        className="game-card card cursor-pointer group"
      >
        <div className="relative h-32 overflow-hidden">
          <SafeImage
            src={imageSrc}
            alt={game.title}
            className="w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className={`absolute top-2 right-2 badge ${difficulty.color}`}>{difficulty.label}</span>
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{game.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{game.duration} min</span>
            <span className="text-xs text-gold-600 font-semibold">{game.points} pts</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="game-card card cursor-pointer group"
      onClick={() => navigate(`/games/${game.id}`)}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <SafeImage
          src={imageSrc}
          alt={game.title}
          className="w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Overlays */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${difficulty.color}`}>{difficulty.label}</span>
          {game.type && (
            <span className="badge bg-white/20 text-white backdrop-blur-sm">{gameType?.label}</span>
          )}
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
            <Play className="w-6 h-6 text-forest-800 fill-forest-800 ml-1" />
          </div>
        </div>

        {/* Grade badges */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          {game.grade && game.grade.slice(0, 3).map(g => (
            <span key={g} className="badge bg-forest-700/80 text-white text-xs backdrop-blur-sm">
              G{g}
            </span>
          ))}
          {game.grade && game.grade.length > 3 && (
            <span className="badge bg-forest-700/80 text-white text-xs">+{game.grade.length - 3}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Subject */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: subject?.color + '20', border: `1px solid ${subject?.color}40` }}>
            <div className="w-2 h-2 rounded-full mx-auto mt-1.5" style={{ backgroundColor: subject?.color }} />
          </div>
          <span className="text-xs font-medium" style={{ color: subject?.color }}>
            {subject?.label}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {game.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{game.description}</p>

        {/* Stats row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />{game.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />{(game.plays || 0).toLocaleString()}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold text-gold-600">
            <Zap className="w-3.5 h-3.5" />{game.points} pts
          </span>
        </div>
      </div>
    </div>
  )
}
