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
    <div className="min-h-screen bg-white">
      {/* Navigation - Modern */}
      <nav className="nav-modern fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forest to-forest-mid flex items-center justify-center shadow-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-forest to-forest-mid bg-clip-text text-transparent">
                  ShuleAI Pro
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <Link to="/features" className="text-muted hover:text-forest transition-colors font-medium">
                Features
              </Link>
              <Link to="/learning-areas" className="text-muted hover:text-forest transition-colors font-medium">
                Subjects
              </Link>
              <Link to="/pricing" className="text-muted hover:text-forest transition-colors font-medium">
                Pricing
              </Link>
              <div className="flex items-center space-x-3">
                <Link to="/signin" className="text-muted hover:text-forest font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </div>
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-surface-alt transition-colors">
              <Menu className="h-6 w-6 text-muted" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern */}
      <section
        className="hero-modern py-24 relative"
        style={{
          background: "linear-gradient(rgba(6,24,50,0.78), rgba(6,24,50,0.58)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80') center/cover no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="badge-modern badge-primary inline-flex items-center px-4 py-2 text-sm font-semibold">
                🚀 AI-Powered CBC/CBE Learning
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Learn Smarter with AI Support<br />
              for PP1 through Grade 9
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              A clean, focused learning platform for every stage of the CBC/CBE journey — from early primary foundations all the way to secondary mastery.
            </p>
            <div className="flex justify-center mb-16">
              <Link to="/signup" className="btn btn-lg bg-white text-forest hover:bg-white/90 shadow-xl">
                Start Learning Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
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
