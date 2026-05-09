import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Trophy, Users, Star, Play, ChevronRight, ArrowRight,
  BarChart3, Shield, Smartphone, Award, Target,
  Calculator, Leaf, Palette, Cross, Wrench, Microscope, Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SafeImage from '../components/SafeImage';
import { GAMES, SUBJECTS, getFeaturedGames } from '../lib/games';

const STATS = [
  { value: '56+', label: 'Educational Games', icon: Play },
  { value: '7', label: 'CBC Learning Areas', icon: BookOpen },
  { value: '10k+', label: 'Active Learners', icon: Users },
  { value: '4.8', label: 'Average Rating', icon: Star },
];

const SUBJECT_PREVIEW = [
  { key:'mathematics', icon: Calculator, color:'#3B82F6', bg:'#EFF6FF', image:'https://images.unsplash.com/photo-1596495578221-81765c92842e?w=600&q=80' },
  { key:'integrated_science', icon: Microscope, color:'#10B981', bg:'#ECFDF5', image:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80' },
  { key:'agriculture', icon: Leaf, color:'#84CC16', bg:'#F7FEE7', image:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
  { key:'caas', icon: Palette, color:'#F59E0B', bg:'#FFFBEB', image:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80' },
];

const BENEFITS = [
  {
    title: 'Personalized Learning Paths',
    description: 'Adaptive games guide each learner through CBC topics at their own pace, boosting confidence and retention.',
    icon: Target,
    color: '#3B82F6'
  },
  {
    title: 'Curriculum-Aligned Activities',
    description: 'Hands-on games across all grade 4–9 learning areas help students connect classroom concepts with practice.',
    icon: BookOpen,
    color: '#10B981'
  },
  {
    title: 'Progress Insight for Parents',
    description: 'Instant feedback and visual progress tracking make it easy to support improvement every day.',
    icon: BarChart3,
    color: '#F59E0B'
  }
];

export default function Landing() {
  const featured = getFeaturedGames(4);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight:'100vh', background: 'var(--bg)' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        background:'var(--grad-hero)', minHeight:'90vh', paddingTop:'70px',
        display:'flex', flexDirection:'column', justifyContent:'center',
        position:'relative', overflow:'hidden',
      }}>
        {/* Background Decor */}
        <div style={{ position:'absolute', top:'10%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'rgba(82,183,136,0.12)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-10%', left:'-8%', width:400, height:400, borderRadius:'50%', background:'rgba(245,158,11,0.10)', pointerEvents:'none' }} />

        <div className="container" style={{ padding: '4rem 1.5rem', position:'relative', zIndex:1 }}>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div style={{ flex: 1, animation:'fadeUp 0.7s ease both' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' }}>
                <span className="badge badge-amber">CBC-Aligned</span>
                <span className="badge" style={{ background:'rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.85)' }}>Grade 4–9</span>
              </div>
              <h1 style={{ color:'#fff', marginBottom:'1.5rem', lineHeight:1.1 }}>
                Kenya's Premier<br />
                <span style={{ color:'var(--amber)' }}>Educational</span><br />
                Gaming Hub
              </h1>
              <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'1.15rem', marginBottom:'2.5rem', maxWidth:540 }}>
                Interactive CBC learning platform with 56+ games. Designed to make every subject your child's favorite.
              </p>

              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                <Link to="/signup" className="btn btn-amber btn-lg">
                  Get Started Free <ArrowRight size={18} />
                </Link>
                <Link to="/games" className="btn btn-lg" style={{ background:'rgba(255,255,255,0.1)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)' }}>
                  Explore 56 Games
                </Link>
              </div>

              {/* Social Proof */}
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginTop:'3rem' }}>
                <div style={{ display:'flex' }}>
                  {[...Array(3)].map((_, i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i + 5}`} alt="User" style={{
                      width:36, height:36, borderRadius:'50%', border:'2px solid #fff',
                      marginLeft: i > 0 ? -12 : 0
                    }} />
                  ))}
                </div>
                <div>
                  <div style={{ display:'flex', gap:2 }}>
                    {[1,2,3,4,5].map(s=><Star key={s} size={12} fill="var(--amber)" color="var(--amber)" />)}
                  </div>
                  <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.85rem', margin:0 }}>
                    Trusted by 10,000+ Families
                  </p>
                </div>
              </div>
            </div>

            {/* Right Interactive Image */}
            <div style={{ flex: 1, position:'relative', width: '100%', marginTop: '3rem' }} className="lg:mt-0 xl:mr-8 xl:ml-8">
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
                <SafeImage 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" 
                  alt="Learning Hero"
                  style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', height: '100%', maxHeight: 480, objectFit: 'cover', width: '100%' }}
                />
              </div>
              {/* Floating Cards */}
              <div className="animate-float hidden sm:block" style={{ position: 'absolute', top: 30, left: -20, zIndex: 3, background: '#fff', padding: '1rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Trophy className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 m-0">Daily Goal</p>
                    <p className="font-bold text-sm m-0 text-slate-800">85% Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div style={{ background:'rgba(0,0,0,0.2)', backdropFilter:'blur(10px)', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4 px-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon size={18} color="var(--amber)" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl m-0 leading-none">{value}</p>
                    <p className="text-white/60 text-xs m-0 mt-1">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBJECT HUB ─────────────────────────────────── */}
      <section className="section-pad">
        <div className="container">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <div className="section-label">Explore Learning Areas</div>
              <h2>Comprehensive CBC Coverage</h2>
              <p className="text-muted mt-2">Discover interactive games across all core CBC categories from Grade 4 to 9.</p>
            </div>
            <Link to="/learning-areas" className="btn btn-outline">View All Learning Areas <ChevronRight size={18} /></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBJECT_PREVIEW.map(({ key, icon: Icon, color, image }) => {
              const sub = Object.values(SUBJECTS).find(s=>s.id===key);
              return (
                <Link to="/learning-areas" key={key} className="card group overflow-hidden" style={{ textDecoration: 'none' }}>
                  <div className="h-40 relative">
                    <SafeImage src={image} alt={key} className="group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                       <Icon size={16} />
                       <span className="text-sm font-semibold">{sub?.label || key}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted mb-1">{sub?.grades}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ color }}>Learn More</span>
                      <ChevronRight size={14} className="text-muted" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GAMES HIGHLIGHT ──────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="section-label justify-center">Student Favorites</div>
            <h2>Most Played Educational Games</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featured.map(game => {
              const subData = Object.values(SUBJECTS).find(s=>s.id===game.subject);
              return (
                <div key={game.id} className="card overflow-hidden cursor-pointer" onClick={() => navigate('/signup')}>
                  <div className="h-44 relative">
                    <SafeImage src={game.image} alt={game.title} />
                    <div className="absolute top-3 left-3">
                       <span className="badge bg-black/40 text-white backdrop-blur-md border-0">{game.difficulty}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold mb-2 block" style={{ color: subData?.color }}>{subData?.label}</span>
                    <h4 className="text-sm font-bold mb-2">{game.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <div className="flex items-center gap-1"><Clock size={12}/>{game.duration}</div>
                      <div className="flex items-center gap-1"><Users size={12}/>{(game.plays/1000).toFixed(1)}k</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
             <Link to="/games" className="btn btn-primary btn-lg">Browse All 56 Games</Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden" style={{ background: 'var(--surface-alt)' }}>
        <div className="container relative z-10">
           <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="section-label justify-center">Why ShuleAI Pro</div>
              <h2 className="mb-4">Built for deeper understanding and faster mastery</h2>
              <p className="text-muted">Engaging math, science and language games that help students progress confidently through CBC learning goals.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BENEFITS.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="card p-8 bg-white/90 shadow-sm hover:shadow-lg transition-all duration-300 border-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${benefit.color}20` }}>
                      <Icon size={22} color={benefit.color} />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
           </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--amber)' }}>
        <div className="container text-center">
          <h2 className="mb-4">Ready to boost your child's grades?</h2>
          <p className="text-slate-800/70 mb-8 max-w-lg mx-auto">Access the full CBC curriculum through immersive gaming today.</p>
          <div className="flex justify-center gap-4">
             <Link to="/signup" className="btn btn-primary btn-lg px-12">Join ShuleAI Pro</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
