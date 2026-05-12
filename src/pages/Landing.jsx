import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, Award, ArrowRight, ChevronRight, Menu, Shield, Smartphone } from 'lucide-react';
import { SUBJECTS, getFeaturedGames } from '../lib/games';
import SafeImage from '../components/SafeImage';
import Footer from '../components/Footer';

export default function Landing() {
  const navigate = useNavigate();

  // Define subject preview data
  const SUBJECT_PREVIEW = [
    { key: 'mathematics', icon: BookOpen, color: '#1E76B8', image: 'https://images.unsplash.com/photo-1519459522028-67f480d7c005?w=800&q=80' },
    { key: 'integrated_science', icon: Award, color: '#0F8B8D', image: 'https://images.unsplash.com/photo-1581093448796-0a7feb0fb06f?w=800&q=80' },
    { key: 'agriculture', icon: Users, color: '#3F8C3C', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80' },
    { key: 'caas', icon: Award, color: '#F59E0B', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80' },
  ];

  // Define benefits data
  const BENEFITS = [
    {
      icon: BookOpen,
      color: '#1E76B8',
      title: 'Complete PP1 to Grade 9 Coverage',
      description: 'Curriculum-aligned content covering PP1 through Grade 9 for all CBC/CBE subjects and learning pathways.'
    },
    {
      icon: Award,
      color: '#0F8B8D',
      title: 'Personalized Learning Paths',
      description: 'AI adapts lessons to each learner’s pace, helping students build confidence at every stage.'
    },
    {
      icon: Users,
      color: '#F59E0B',
      title: 'Meaningful Practice & Feedback',
      description: 'Interactive exercises and clear explanations that make core concepts easy to understand and retain.'
    }
  ];

  const featured = getFeaturedGames(8);

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

      {/* ── SUBJECT HUB - Modern ─────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-bg via-surface-alt to-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-4">
              <span>Explore Learning Areas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">
              CBC/CBE coverage from PP1 to Grade 9
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Discover every core subject, learning objective, and activity designed for the full CBC/CBE pathway — from early foundations through junior secondary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {SUBJECT_PREVIEW.map(({ key, icon: Icon, color, image }) => {
              const sub = Object.values(SUBJECTS).find(s=>s.id===key);
              return (
                <Link to="/learning-areas" key={key} className="card-modern group block overflow-hidden">
                  <div className="h-48 relative">
                    <SafeImage src={image} alt={key} className="group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                       <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}20`, backdropFilter: 'blur(10px)' }}>
                         <Icon size={20} color={color} />
                       </div>
                       <span className="text-lg font-bold block">{sub?.label || key}</span>
                       <span className="text-sm opacity-90">{sub?.grades || 'Grade 4-9'}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-forest font-semibold">Explore Subject</span>
                      <ChevronRight size={18} className="text-muted group-hover:translate-x-1 transition-transform group-hover:text-forest" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/learning-areas" className="btn btn-outline btn-lg">
              View All Learning Areas
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── GAMES HIGHLIGHT - Modern ──────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-4">
              <span>Interactive Learning</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">
              80+ Engaging Activities & Games
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              From math puzzles to science experiments, our gamified learning platform makes every subject an adventure with AI-powered personalization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featured.slice(0, 4).map(game => {
              const subData = Object.values(SUBJECTS).find(s=>s.id===game.subject);
              return (
                <div key={game.id} className="card-modern overflow-hidden cursor-pointer group" onClick={() => navigate('/signup')}>
                  <div className="h-48 relative">
                    <SafeImage src={game.image} alt={game.title} className="group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-4 left-4">
                       <span className="badge-modern badge-primary">{game.difficulty}</span>
                    </div>
                  </div>
                  <div className="p-6">
                            <span className="text-sm font-semibold mb-2 block" style={{ color: subData?.color }}>{subData?.label}</span>
                    <h4 className="text-lg font-bold mb-3 text-ink">{game.title}</h4>
                    <div className="flex items-center justify-between text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <Clock size={14}/>
                        <span>{game.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14}/>
                        <span>{(game.plays/1000).toFixed(1)}k plays</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/games" className="btn btn-primary btn-lg">
              Browse All Activities
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CBE Coverage ─────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="section-label mb-4">
                <span>Full Spectrum Learning</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                Everything for CBC/CBE learners from PP1 to Grade 9
              </h2>
              <p className="text-xl text-muted max-w-2xl leading-relaxed">
                ShuleAI Pro brings together early primary literacy, numeracy and skills building, plus upper primary and junior secondary support — all in one clean, easy-to-follow platform.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card-modern p-6">
                <h3 className="text-xl font-bold mb-3 text-ink">PP1 - Class 3 Foundations</h3>
                <p className="text-muted leading-relaxed">Build confident reading, counting and classroom skills with simple daily lessons and vibrant early learning activities.</p>
              </div>
              <div className="card-modern p-6">
                <h3 className="text-xl font-bold mb-3 text-ink">Class 4 - Class 6 Growth</h3>
                <p className="text-muted leading-relaxed">Strengthen CBC subjects with fun games, science experiments and practice problems that reinforce each topic.</p>
              </div>
              <div className="card-modern p-6">
                <h3 className="text-xl font-bold mb-3 text-ink">Class 7 - Class 9 Mastery</h3>
                <p className="text-muted leading-relaxed">Prepare for junior secondary success with advanced concepts, exam-style exercises and guided revision paths.</p>
              </div>
              <div className="card-modern p-6">
                <h3 className="text-xl font-bold mb-3 text-ink">All CBC/CBE subjects</h3>
                <p className="text-muted leading-relaxed">Complete curriculum coverage for languages, maths, sciences, agriculture, arts and technical subjects.</p>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.75rem', color: 'var(--muted)', fontSize: '0.85rem' }}>
            All payments via <strong style={{ color: 'var(--ink)' }}>M-Pesa</strong> · No recurring charges ·{' '}
            <Link to="/pricing" style={{ color: 'var(--forest)', fontWeight: 600 }}>View full pricing →</Link>
          </p>
        </div>
      </section>

      {/* ── BENEFITS - Modern ─────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-bg via-surface-alt to-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-4">
              <span>Why ShuleAI Pro</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">
              Clear, focused learning for every CBC/CBE stage
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Practical learning tools and meaningful practice designed to keep learners engaged, confident, and ready for school success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="card-modern p-8 text-center group">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto" style={{ background: `${benefit.color}20` }}>
                    <Icon size={28} color={benefit.color} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-ink">{benefit.title}</h3>
                  <p className="text-muted leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA - Modern ────────────────────────────────────── */}
      <section className="cta-modern py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your Child's Learning Journey Today
            </h2>
            <p className="text-white/90 mb-12 text-xl max-w-2xl mx-auto leading-relaxed">
              Join 50,000+ Kenyan students who are achieving academic excellence with AI-powered personalized learning.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Link to="/signup" className="btn btn-lg bg-white text-forest hover:bg-white/90 shadow-2xl transform hover:scale-105 transition-all duration-300">
                🚀 Start Free Trial
              </Link>
              <Link to="/pricing" className="btn btn-outline btn-lg border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                View Pricing
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Shield size={20} />
                <span className="text-sm font-medium">100% Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span className="text-sm font-medium">CBC Certified Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={20} />
                <span className="text-sm font-medium">Mobile Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={20} />
                <span className="text-sm font-medium">24/7 AI Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
