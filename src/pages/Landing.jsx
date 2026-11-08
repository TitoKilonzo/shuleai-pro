import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Zap, Trophy, Users,
  CheckCircle2, ChevronRight, Smartphone, BarChart3, Shield,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SafeImage from '../components/SafeImage';
import { GAMES, SUBJECTS } from '../lib/games';

const STATS = [
  { value: GAMES.length, label: 'Learning Games' },
  { value: Object.keys(SUBJECTS).length, label: 'Learning Areas' },
  { value: 'PP1 to Grade 9', label: 'Grade Range' },
];

const HOW_IT_WORKS = [
  {
    step: '01', title: 'Create Your Account',
    desc: 'Create a student or parent account to get started.',
    icon: Users, color: 'var(--forest)',
  },
  {
    step: '02', title: 'Pay via M-Pesa',
    desc: 'Choose a subscription plan and pay using M-Pesa.',
    icon: Smartphone, color: 'var(--amber-dark)',
  },
  {
    step: '03', title: 'Play, Learn & Excel',
    desc: 'Play CBC learning games and review your scores and progress.',
    icon: Trophy, color: 'var(--coral)',
  },
];

const FEATURES = [
  { icon: Play, title: `${GAMES.length} CBC Learning Games`, color: 'var(--forest)', bg: 'var(--forest-pale)', desc: 'Explore the games currently in the ShuleAI Pro catalogue across early learning through Grade 9.' },
  { icon: BarChart3, title: 'Progress Tracking', color: 'var(--amber-dark)', bg: 'var(--amber-light)', desc: 'Review game scores, learning area progress, and completed sessions.' },
  { icon: Trophy, title: 'Game Points', color: 'var(--coral)', bg: 'var(--coral-light)', desc: 'Games list available points and provide feedback on submitted answers.' },
  { icon: Smartphone, title: 'M-Pesa Payments', color: '#8B5CF6', bg: '#F5F3FF', desc: 'Subscribe using M-Pesa STK push. Available plan durations are shown before checkout.' },
  { icon: Users, title: 'Parent Dashboard Preview', color: '#10B981', bg: '#ECFDF5', desc: 'The demo account includes a sample parent view with learner scores and learning area progress.' },
  { icon: Shield, title: 'CBC Learning Areas', color: '#0EA5E9', bg: '#F0F9FF', desc: 'Browse games by subject and grade using the learning area catalogue.' },
];

const PLANS = [
  {
    name: 'Bronze',
    price: 'KES 200',
    period: '7 days',
    accent: '#CD7F32',
    bg: 'linear-gradient(135deg, #3D1F00 0%, #6B3A1F 100%)',
    badgeBg: 'rgba(205,127,50,0.25)',
    badgeColor: '#F0A050',
    features: [`All ${GAMES.length} games`, 'Progress tracking', 'Parent dashboard'],
    highlight: false,
  },
  {
    name: 'Silver',
    price: 'KES 600',
    period: '30 days',
    accent: '#94A3B8',
    bg: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
    badgeBg: 'rgba(148,163,184,0.25)',
    badgeColor: '#CBD5E1',
    features: [`All ${GAMES.length} games`, 'Progress tracking', 'Parent dashboard'],
    highlight: true,
  },
  {
    name: 'Gold',
    price: 'KES 1,650',
    period: '90 days',
    accent: '#FBBF24',
    bg: 'linear-gradient(135deg, #78350F 0%, #B45309 100%)',
    badgeBg: 'rgba(251,191,36,0.25)',
    badgeColor: '#FCD34D',
    features: [`All ${GAMES.length} games`, 'Progress tracking', 'Parent dashboard'],
    highlight: false,
  },
];

const SUBJECT_LIST = Object.values(SUBJECTS);

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: '5rem',
        position: 'relative',
        background: 'linear-gradient(rgba(6,24,50,0.82), rgba(6,24,50,0.60)), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80) center/cover no-repeat',
        color: '#fff',
        minHeight: '95vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '12%', left: '3%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(18,90,159,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>

            <h1 style={{ color: '#fff', marginBottom: '1.25rem', lineHeight: 1.08, fontFamily: 'var(--font-head)', fontWeight: 900 }}>
              <span style={{ color: 'var(--amber)' }}>CBC Learning Games</span>{' '}
              for Kenyan Students
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.18rem)', color: 'rgba(255,255,255,0.88)', marginBottom: '2.5rem', lineHeight: 1.75, maxWidth: 640, margin: '0 auto 2.5rem' }}>
              Explore {GAMES.length} learning games across {Object.keys(SUBJECTS).length} CBC learning areas, from PP1 through Grade 9.
              Subscribe using M-Pesa and review learning progress in one place.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <Link to="/signup" className="btn btn-amber btn-lg">
                Start Learning Free <ArrowRight size={18} />
              </Link>
              <Link to="/games" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                <Play size={18} fill="currentColor" /> Browse {GAMES.length} Games
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {STATS.map(({ value, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '0 0 0.15rem' }}>{value}</p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
            <path d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80 Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      {/* ── Learning Areas ──────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">{Object.keys(SUBJECTS).length} CBC Learning Areas</span>
            <h2>Every Subject. Every Grade. One Platform.</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 540, margin: '0.75rem auto 0', lineHeight: 1.7 }}>
              Browse games by subject and grade, with content ranging from PP1 through Grade 9.
            </p>
          </div>
          <div className="subjects-grid">
            {SUBJECT_LIST.map(sub => (
              <Link key={sub.id} to={`/games?subject=${sub.id}`} className="subject-card"
                style={{ '--sub-accent': sub.color }}
              >
                <div className="subject-dot" style={{ background: sub.color + '18' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: sub.color }} />
                </div>
                <span className="subject-name">{sub.label}</span>
                <span className="subject-grades">{sub.grades}</span>
                <span className="subject-cta" style={{ color: sub.color }}>Explore <ChevronRight size={12} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--surface-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Simple Setup</span>
            <h2>Ready in 3 Simple Steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon, color }) => (
              <div key={step} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', fontFamily: 'var(--font-head)', fontSize: '2.8rem', fontWeight: 900, color, opacity: 0.1, lineHeight: 1 }}>{step}</span>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{ marginBottom: '0.65rem', fontSize: '1.1rem' }}>{title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: 0, fontSize: '0.92rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Everything You Need</span>
            <h2>Built for Kenyan Learners</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 520, margin: '0.75rem auto 0', lineHeight: 1.7 }}>
              Every feature is purpose-built for the CBC curriculum and the realities of Kenyan families.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="card-modern" style={{ padding: '1.75rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Icon size={22} color={color} />
                </div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--surface-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Flexible Plans</span>
            <h2>Simple, Transparent Pricing</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 480, margin: '0.75rem auto 0', lineHeight: 1.7 }}>
              All plans include access to the {GAMES.length} games in the catalogue. Pay via M-Pesa.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {PLANS.map(({ name, price, period, accent, bg, badgeBg, badgeColor, features, highlight, badge }) => (
              <div
                key={name}
                style={{
                  background: bg,
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.25rem 2rem',
                  minWidth: 220,
                  maxWidth: 280,
                  flex: '1 1 220px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: highlight ? '0 20px 60px rgba(0,0,0,0.35)' : '0 8px 30px rgba(0,0,0,0.2)',
                  transform: highlight ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.22s var(--ease)',
                  border: highlight ? `1.5px solid ${accent}55` : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Badge */}
                {badge && (
                  <span style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: accent, color: name === 'Silver' ? '#1E293B' : '#1a0a00',
                    padding: '0.28rem 1rem', borderRadius: 'var(--radius-pill)',
                    fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.07em',
                    textTransform: 'uppercase', whiteSpace: 'nowrap',
                    boxShadow: `0 3px 12px ${accent}66`,
                  }}>{badge}</span>
                )}

                {/* Tier icon circle */}
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: badgeBg,
                  border: `2px solid ${accent}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem', fontSize: '1.5rem',
                }}>
                  <Trophy size={22} color={accent} />
                </div>

                <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', color: badgeColor, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.3rem' }}>{name}</p>
                <p style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '0 0 0.2rem' }}>{price}</p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 1.75rem' }}>{period}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem', flex: 1 }}>
                  {features.map(feat => (
                    <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.82)' }}>
                      <CheckCircle2 size={14} color={accent} />
                      {feat}
                    </div>
                  ))}
                </div>

                <Link to="/signup" style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  padding: '0.7rem 1.25rem', borderRadius: 'var(--radius)',
                  background: `${accent}22`,
                  border: `1.5px solid ${accent}66`,
                  color: accent,
                  fontWeight: 700, fontSize: '0.88rem',
                  textDecoration: 'none',
                  transition: 'background 0.18s',
                }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.75rem', color: 'var(--muted)', fontSize: '0.85rem' }}>
            All payments via <strong style={{ color: 'var(--ink)' }}>M-Pesa</strong> · No recurring charges ·{' '}
            <Link to="/pricing" style={{ color: 'var(--forest)', fontWeight: 600 }}>View full pricing →</Link>
          </p>
        </div>
      </section>

      {/* ── Game Catalogue ──────────────────────────────────────── */}
      <section className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">From the Catalogue</span>
            <h2>Explore Learning Games</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 520, margin: '0.75rem auto 0', lineHeight: 1.7 }}>
              A sample of the games currently available in the ShuleAI Pro catalogue.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {GAMES.slice(0, 3).map(game => {
              const subject = Object.values(SUBJECTS).find(item => item.id === game.subject);
              return (
                <article key={game.id} className="card-modern" style={{ overflow: 'hidden' }}>
                  <SafeImage src={game.image} alt={game.title} style={{ width: '100%', height: 190 }} />
                  <div style={{ padding: '1.25rem' }}>
                    <p style={{ color: subject?.color || 'var(--forest)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>
                      {subject?.label || game.subject}
                    </p>
                    <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.4rem' }}>{game.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0 }}>{game.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/signup" className="btn btn-primary">
              Create an Account to Play <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="cta-modern section-pad">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.9)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-pill)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            <Zap size={14} fill="currentColor" />             CBC learning games for Kenyan students
          </span>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to Transform Your Child&apos;s Learning?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.7, fontSize: '1.05rem' }}>
            Create an account to explore the catalogue. Choose a subscription and pay with M-Pesa when you are ready.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn btn-lg" style={{ background: '#fff', color: 'var(--forest)', fontWeight: 700 }}>
              Create Free Account <ArrowRight size={18} />
            </Link>
            <Link to="/games" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)' }}>
              Browse All Games
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
