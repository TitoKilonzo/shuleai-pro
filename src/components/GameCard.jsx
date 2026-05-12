import { memo } from 'react';
import { Play, Clock, Users, Zap, Lock } from 'lucide-react';
import { SUBJECTS, DIFFICULTIES, GAME_TYPES } from '../lib/games';
import SafeImage from './SafeImage';

const GameCard = memo(function GameCard({ game, compact = false, onPlay, locked = false }) {
  const subject    = Object.values(SUBJECTS).find(s => s.id === game.subject);
  const difficulty = DIFFICULTIES[game.difficulty] || DIFFICULTIES.Medium;
  const gameType   = game.type ? GAME_TYPES[game.type] : null;

  if (compact) {
    return (
      <div onClick={onPlay} style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s var(--ease)', boxShadow: 'var(--shadow-sm)' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
      >
        <div style={{ position: 'relative', height: 110, overflow: 'hidden' }}>
          <SafeImage src={game.image} alt={game.title} style={{ width: '100%', height: '100%', transition: 'transform 0.35s var(--ease)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }} />
          <span style={{ position: 'absolute', top: 7, right: 7, background: difficulty.colorHex + '22', color: difficulty.colorHex, borderRadius: 'var(--radius-pill)', padding: '2px 8px', fontSize: '0.68rem', fontWeight: 700 }}>
            {difficulty.label}
          </span>
        </div>
        <div style={{ padding: '0.6rem' }}>
          <h4 style={{ fontSize: '0.82rem', margin: '0 0 0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 700 }}>{game.title}</h4>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{game.duration}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--amber-dark)', fontWeight: 700 }}>{game.points} pts</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="game-card"
      style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: 'var(--shadow-sm)', transition: 'all 0.25s var(--ease)' }}
      onClick={onPlay}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', height: 168, overflow: 'hidden' }}>
        <SafeImage
          src={game.image}
          alt={game.title}
          style={{ width: '100%', height: '100%', transition: 'transform 0.4s var(--ease)' }}
          className="game-card-img"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 55%)' }} />

        {/* Top badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          <span style={{ background: difficulty.colorHex + '22', color: difficulty.colorHex, backdropFilter: 'blur(6px)', borderRadius: 'var(--radius-pill)', padding: '3px 9px', fontSize: '0.7rem', fontWeight: 700 }}>
            {difficulty.label}
          </span>
          {gameType && (
            <span style={{ background: 'rgba(255,255,255,0.16)', color: '#fff', backdropFilter: 'blur(6px)', borderRadius: 'var(--radius-pill)', padding: '3px 9px', fontSize: '0.7rem', fontWeight: 600 }}>
              {gameType.label}
            </span>
          )}
        </div>

        {/* Grade badges - bottom right */}
        <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 4 }}>
          {game.grade?.slice(0, 3).map(g => (
            <span key={g} style={{ background: 'rgba(18,90,159,0.78)', color: '#fff', borderRadius: 'var(--radius-pill)', padding: '2px 7px', fontSize: '0.66rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>
              G{g}
            </span>
          ))}
          {game.grade?.length > 3 && (
            <span style={{ background: 'rgba(18,90,159,0.78)', color: '#fff', borderRadius: 'var(--radius-pill)', padding: '2px 7px', fontSize: '0.66rem', fontWeight: 700 }}>
              +{game.grade.length - 3}
            </span>
          )}
        </div>

        {/* Lock overlay or play button */}
        {locked ? (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'var(--amber)', color: 'var(--ink)', padding: '6px 14px', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Lock size={12} /> SUBSCRIBE
            </div>
          </div>
        ) : (
          <div className="game-play-btn" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)' }}>
              <Play size={20} color="var(--forest)" fill="var(--forest)" style={{ marginLeft: 2 }} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '0.9rem 1rem' }}>
        {/* Subject label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: subject?.color || 'var(--forest)', flexShrink: 0 }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: subject?.color || 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {subject?.label || game.subject}
          </span>
        </div>

        <h4 style={{ fontFamily: 'var(--font-head)', fontSize: '0.96rem', margin: '0 0 0.25rem', fontWeight: 700, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {game.title}
        </h4>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0 0 0.7rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {game.description}
        </p>
      </div>

      <style>{`
        .game-card:hover { transform: translateY(-5px) !important; box-shadow: var(--shadow-lg) !important; border-color: var(--border) !important; }
        .game-card:hover .game-card-img { transform: scale(1.07); }
        .game-card:hover .game-play-btn { opacity: 1 !important; }
      `}</style>
    </div>
  );
});

export default GameCard;

