import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Zap, Trophy, Users,
  CheckCircle2, ChevronRight, Smartphone, BarChart3, Shield, Star,
  Flame, Award, BookOpen, Target, TrendingUp, GraduationCap,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SUBJECTS } from '../lib/games';

const STATS = [
  { value: '100+', label: 'CBC Games' },
  { value: '10K+', label: 'Active Learners' },
  { value: '7', label: 'Learning Areas' },
  { value: 'PP1–9', label: 'All Grades Covered' },
];

const HOW_IT_WORKS = [
  {
    step: '01', title: 'Create Your Account',
    desc: 'Sign up in seconds. Choose student or parent — we tailor the experience to your role.',
    icon: Users, color: 'var(--forest)',
  },
  {
    step: '02', title: 'Pay via M-Pesa',
    desc: 'Instant STK push — weekly, monthly, or termly plans built for Kenyan families.',
    icon: Smartphone, color: 'var(--amber-dark)',
  },
  {
    step: '03', title: 'Play, Learn & Excel',
    desc: 'Unlock 56+ interactive CBC games. Earn badges, track scores, and rise through performance bands.',
    icon: Trophy, color: 'var(--coral)',
  },
];

const FEATURES = [
  { icon: Play, title: '100+ Interactive CBC Games', color: 'var(--forest)', bg: 'var(--forest-pale)', desc: 'Every game maps directly to CBC competency — from Alphabet Adventure in PP1 to Algebra Arena in Grade 9.' },
  { icon: BarChart3, title: 'Real-Time Progress Analytics', color: 'var(--amber-dark)', bg: 'var(--amber-light)', desc: 'See subject-level scores, streaks, and CBC performance bands (EE, ME, AE, BE) at a glance.' },
  { icon: Trophy, title: 'Gamified Achievements', color: 'var(--coral)', bg: 'var(--coral-light)', desc: 'Badges, streaks, leaderboards, and points keep learners motivated every single day.' },
  { icon: Smartphone, title: 'M-Pesa Native Payments', color: '#8B5CF6', bg: '#F5F3FF', desc: 'No credit cards. Subscribe instantly via M-Pesa STK push — built for Kenyan families.' },
  { icon: Users, title: 'Parent Dashboard', color: '#10B981', bg: '#ECFDF5', desc: 'Monitor up to 5 children\'s progress, weekly activity charts, and subject mastery — all in one view.' },
  { icon: Shield, title: 'Safe & Curriculum-Aligned', color: '#0EA5E9', bg: '#F0F9FF', desc: 'Content reviewed against KICD guidelines. No ads, no external links — fully focused learning.' },
];

const ACHIEVEMENTS = [
  {
    icon: Flame,
    title: 'Daily Streaks',
    desc: 'Earn streak badges for logging in and playing every day. Students with 7+ day streaks score 40% higher on average.',
    stat: '21-day',
    statLabel: 'Longest Streak',
    color: '#F97316',
    bg: '#FFF7ED',
  },
  {
    icon: Award,
    title: 'Performance Bands',
    desc: 'Rise from BE → AE → ME → EE, mirroring real CBC report card bands. Every game session maps to your band progress.',
    stat: 'EE',
    statLabel: 'Top Band',
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
  {
    icon: Trophy,
    title: 'Subject Badges',
    desc: 'Collect badges for mastering each of the 7 CBC learning areas. Badges unlock at 75%, 90% and 100% mastery.',
    stat: '21+',
    statLabel: 'Unique Badges',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  {
    icon: TrendingUp,
    title: 'Leaderboards',
    desc: 'Weekly leaderboards rank students by score across each subject — healthy competition that keeps learners coming back.',
    stat: 'Top 10',
    statLabel: 'Weekly Ranks',
    color: '#10B981',
    bg: '#ECFDF5',
  },
  {
    icon: GraduationCap,
    title: 'Achievement Certificates',
    desc: 'Termly subscribers unlock printable certificates for each subject mastered — great for school portfolios.',
    stat: '7',
    statLabel: 'Subjects to Master',
    color: '#0EA5E9',
    bg: '#F0F9FF',
  },
  {
    icon: Target,
    title: 'Competency Goals',
    desc: 'Set weekly learning targets per subject. The AI tracks your pace and suggests which games to play next.',
    stat: 'AI',
    statLabel: 'Powered Goals',
    color: 'var(--forest)',
    bg: 'var(--forest-pale)',
  },
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
    features: ['All 56+ games', 'Progress tracking', 'Parent dashboard'],
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
    features: ['All 56+ games', 'Progress tracking', 'Parent dashboard'],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Gold',
    price: 'KES 1,650',
    period: '90 days',
    accent: '#FBBF24',
    bg: 'linear-gradient(135deg, #78350F 0%, #B45309 100%)',
    badgeBg: 'rgba(251,191,36,0.25)',
    badgeColor: '#FCD34D',
    features: ['All 56+ games', 'Progress tracking', 'Parent dashboard'],
    highlight: false,
    badge: 'Best Value',
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
              Kenya's Most Advanced{' '}
              <span style={{ color: 'var(--amber)' }}>CBC Learning</span>{' '}
              Platform
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.18rem)', color: 'rgba(255,255,255,0.88)', marginBottom: '2.5rem', lineHeight: 1.75, maxWidth: 640, margin: '0 auto 2.5rem' }}>
              100+ interactive games covering all 7 CBC learning areas from PP1 through Grade 9.
              Pay via M-Pesa. Track progress in real time. Watch your child excel.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <Link to="/signup" className="btn btn-amber btn-lg">
                Start Learning Free <ArrowRight size={18} />
              </Link>
              <Link to="/games" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                <Play size={18} fill="currentColor" /> Browse 56+ Games
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
            <span className="section-eyebrow">7 CBC Learning Areas</span>
            <h2>Every Subject. Every Grade. One Platform.</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 540, margin: '0.75rem auto 0', lineHeight: 1.7 }}>
              Games cover the full CBC framework from PP1 through Grade 9, mapped to competency expectations set by KICD.
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
              All plans include unlimited access to all 56+ games. Pay via M-Pesa — no credit card needed.
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
                  {name === 'Bronze' ? '🥉' : name === 'Silver' ? '🥈' : '🥇'}
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

      {/* ── Achievements & Rewards ───────────────────────────────── */}
      <section className="section-pad">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Gamified Learning</span>
            <h2>Rewards That Keep Learners Coming Back</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 520, margin: '0.75rem auto 0', lineHeight: 1.7 }}>
              ShuleAI Pro turns every study session into a game. Students earn real rewards tied directly to CBC competency progress.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {ACHIEVEMENTS.map(({ icon: Icon, title, desc, stat, statLabel, color, bg }) => (
              <div key={title} className="card-modern" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color={color} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.6rem', fontWeight: 900, color, margin: 0, lineHeight: 1 }}>{stat}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{statLabel}</p>
                  </div>
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.4rem', fontSize: '1rem' }}>{title}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.87rem', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="cta-modern section-pad">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.9)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-pill)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            <Zap size={14} fill="currentColor" /> Join 10,000+ Kenyan Learners
          </span>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to Transform Your Child's Learning?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.7, fontSize: '1.05rem' }}>
            Start free today. No credit card needed — just your M-Pesa when you're ready to subscribe.
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
