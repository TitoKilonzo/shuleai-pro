import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, Award, Star, ArrowRight, ChevronRight, Menu, Shield, Smartphone } from 'lucide-react';
import { SUBJECTS, getFeaturedGames } from '../lib/games';
import SafeImage from '../components/SafeImage';
import Footer from '../components/Footer';

export default function Landing() {
  const navigate = useNavigate();

  // Define subject preview data
  const SUBJECT_PREVIEW = [
    { key: 'mathematics', icon: BookOpen, color: '#3B82F6', image: 'https://images.unsplash.com/photo-1596495578221-81765c92842e?w=800&q=80' },
    { key: 'integrated_science', icon: Award, color: '#10B981', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80' },
    { key: 'agriculture', icon: Users, color: '#84CC16', image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80' },
    { key: 'caas', icon: Star, color: '#F59E0B', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80' },
  ];

  // Define benefits data
  const BENEFITS = [
    {
      icon: BookOpen,
      color: '#3B82F6',
      title: 'Comprehensive CBC Coverage',
      description: 'Complete curriculum alignment from Grade 4 to 9 across all core subjects with regular updates based on KICD guidelines.'
    },
    {
      icon: Award,
      color: '#10B981',
      title: 'AI-Powered Personalization',
      description: 'Advanced algorithms adapt to each student\'s learning pace, identifying strengths and areas needing improvement.'
    },
    {
      icon: Star,
      color: '#F59E0B',
      title: 'Gamified Learning Experience',
      description: 'Transform complex concepts into engaging games and interactive simulations that make learning enjoyable and memorable.'
    }
  ];

  const featured = getFeaturedGames(8);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Modern */}
      <nav className="nav-modern fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest to-forest-mid flex items-center justify-center shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-forest to-forest-mid bg-clip-text text-transparent">
                  ShuleAI Pro
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-muted hover:text-forest transition-colors font-medium">
                Features
              </Link>
              <Link to="/learning-areas" className="text-muted hover:text-forest transition-colors font-medium">
                Subjects
              </Link>
              <Link to="/pricing" className="text-muted hover:text-forest transition-colors font-medium">
                Pricing
              </Link>
              <div className="flex items-center space-x-4">
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
      <section className="hero-modern py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="badge-modern badge-primary inline-flex items-center px-4 py-2 text-sm font-semibold">
                🚀 AI-Powered Education Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Learn Smarter with<br />
              <span className="gradient-text bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">AI Assistance</span>
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your learning experience with personalized AI tutoring, interactive games, and comprehensive CBC curriculum coverage designed specifically for Kenyan students.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/signup" className="btn btn-lg bg-white text-forest hover:bg-white/90 shadow-xl">
                Start Learning Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/features" className="btn btn-outline btn-lg border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Explore Features
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img className="w-10 h-10 rounded-full border-2 border-white/30" src="https://i.pravatar.cc/40?u=1" alt="Student" />
                  <img className="w-10 h-10 rounded-full border-2 border-white/30" src="https://i.pravatar.cc/40?u=2" alt="Student" />
                  <img className="w-10 h-10 rounded-full border-2 border-white/30" src="https://i.pravatar.cc/40?u=3" alt="Student" />
                  <img className="w-10 h-10 rounded-full border-2 border-white/30" src="https://i.pravatar.cc/40?u=4" alt="Student" />
                </div>
                <span className="text-lg font-semibold">15,000+ Students Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold ml-2">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-300/20 rounded-full blur-xl"></div>
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
              Comprehensive CBC Coverage
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Discover interactive games across all core CBC categories from Grade 4 to 9, designed to make learning engaging and effective.
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
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
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

      {/* ── TESTIMONIALS - Modern ─────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-4">
              <span>Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">
              Real Results from Real Students
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              See how ShuleAI Pro is transforming learning outcomes across Kenya with personalized AI-powered education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-modern">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p className="quote">
                "ShuleAI Pro helped me improve my math grade from C to A-. The AI explanations are so clear and the games make learning fun!"
              </p>
              <div className="flex items-center gap-4 mt-6">
                <img src="https://i.pravatar.cc/60?u=student1" alt="Student" className="w-14 h-14 rounded-full border-2 border-forest-pale" />
                <div>
                  <p className="font-bold text-ink">Sarah Wanjiku</p>
                  <p className="text-muted text-sm">Grade 8, Nairobi</p>
                </div>
              </div>
            </div>

            <div className="testimonial-modern">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p className="quote">
                "As a parent, I love seeing my son's progress reports. The AI identifies exactly what he needs to work on. Amazing platform!"
              </p>
              <div className="flex items-center gap-4 mt-6">
                <img src="https://i.pravatar.cc/60?u=parent1" alt="Parent" className="w-14 h-14 rounded-full border-2 border-forest-pale" />
                <div>
                  <p className="font-bold text-ink">David Kiprop</p>
                  <p className="text-muted text-sm">Parent of 2, Eldoret</p>
                </div>
              </div>
            </div>

            <div className="testimonial-modern">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p className="quote">
                "The science simulations are incredible! I finally understand complex concepts that were confusing in class. Highly recommend!"
              </p>
              <div className="flex items-center gap-4 mt-6">
                <img src="https://i.pravatar.cc/60?u=student2" alt="Student" className="w-14 h-14 rounded-full border-2 border-forest-pale" />
                <div>
                  <p className="font-bold text-ink">Michael Oduya</p>
                  <p className="text-muted text-sm">Grade 9, Kisumu</p>
                </div>
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
              Built for deeper understanding and faster mastery
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Engaging math, science and language games that help students progress confidently through CBC learning goals.
            </p>
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
