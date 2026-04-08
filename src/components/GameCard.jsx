import { Play, Star, Clock, Users, Zap, Lock } from 'lucide-react';
import { SUBJECTS, DIFFICULTIES, GAME_TYPES } from '../lib/games';
import SafeImage from './SafeImage';

export default function GameCard({ game, compact = false, onPlay, locked = false }) {
  const subject = Object.values(SUBJECTS).find(s => s.id === game.subject);
  const difficulty = DIFFICULTIES[game.difficulty] || DIFFICULTIES.Medium;
  const gameType = game.type ? GAME_TYPES[game.type] : null;

  const handleClick = () => {
    if (onPlay) onPlay();
  };

  if (compact) {
    return (
      <div onClick={handleClick} className="card" style={{ overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ position: 'relative', height: 120, overflow: 'hidden' }}>
          <SafeImage src={game.image} alt={game.title} style={{ width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
          <span className="badge" style={{
            position: 'absolute', top: 8, right: 8,
            background: difficulty.colorHex + '18', color: difficulty.colorHex,
            fontSize: '0.7rem',
          }}>{difficulty.label}</span>
        </div>
        <div style={{ padding: '0.65rem' }}>
          <h4 style={{ fontSize: '0.82rem', margin: '0 0 0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{game.title}</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{game.duration}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--amber-dark)', fontWeight: 600 }}>{game.points} pts</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflow: 'hidden', cursor: 'pointer', position: 'relative' }} onClick={handleClick}>
      {/* Thumbnail */}
      <div style={{ position: 'relative', height: 170, overflow: 'hidden' }}>
        <SafeImage
          src={game.image}
          alt={game.title}
          style={{ width: '100%', height: '100%', transition: 'transform 0.4s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />

        {/* Overlays */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          <span className="badge" style={{
            background: difficulty.colorHex + '20', color: difficulty.colorHex,
            backdropFilter: 'blur(6px)',
          }}>{difficulty.label}</span>
          {gameType && (
            <span className="badge" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(6px)' }}>
              {gameType.label}
            </span>
          )}
        </div>

        {/* Play / Lock overlay */}
        {locked ? (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              background: 'var(--amber)', color: 'var(--ink)',
              padding: '5px 14px', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '0.3rem',
            }}>
              <Lock size={12} /> SUBSCRIBE
            </div>
          </div>
        ) : (
          <div className="game-card-play" style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: 'opacity 0.2s ease',
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)',
            }}>
              <Play size={22} color="var(--forest)" fill="var(--forest)" style={{ marginLeft: 2 }} />
            </div>
          </div>
        )}

        {/* Grade badges */}
        <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 4 }}>
          {game.grade && game.grade.slice(0, 3).map(g => (
            <span key={g} className="badge" style={{
              background: 'rgba(11,79,60,0.75)', color: '#fff', fontSize: '0.68rem',
              backdropFilter: 'blur(4px)', padding: '2px 8px',
            }}>
              G{g}
            </span>
          ))}
          {game.grade && game.grade.length > 3 && (
            <span className="badge" style={{ background: 'rgba(11,79,60,0.75)', color: '#fff', fontSize: '0.68rem', padding: '2px 8px' }}>
              +{game.grade.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0.85rem 1rem' }}>
        {/* Subject */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
          <div style={{
            width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
            background: (subject?.color || '#888') + '18',
            border: `1.5px solid ${(subject?.color || '#888')}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: subject?.color || '#888' }} />
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: subject?.color || 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {subject?.label || game.subject}
          </span>
        </div>

        <h4 style={{
          fontFamily: 'var(--font-head)', fontSize: '0.95rem', margin: '0 0 0.25rem', fontWeight: 700,
          lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {game.title}
        </h4>
        <p style={{
          fontSize: '0.78rem', color: 'var(--muted)', margin: '0 0 0.65rem', lineHeight: 1.5,
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {game.description}
        </p>

        {/* Stats row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '0.6rem', borderTop: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={13} />{game.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Users size={13} />{(game.plays || 0).toLocaleString()}
            </span>
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--amber-dark)' }}>
            <Zap size={13} />{game.points} pts
          </span>
        </div>
      </div>

      <style>{`
        .card:hover .game-card-play { opacity: 1 !important; }
        .card:hover img { transform: scale(1.08); }
      `}</style>
    </div>
  );
}
