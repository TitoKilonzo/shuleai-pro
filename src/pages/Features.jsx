import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Zap, Star, Shield, Trophy, Users, 
  Smartphone, BarChart3, Clock, Rocket 
} from 'lucide-react';
import SafeImage from '../components/SafeImage';

const FEATURES = [
  {
    icon: Rocket,
    title: 'CBC Aligned',
    desc: 'Every game is mapped to the Competency Based Curriculum (CBC) specific learning outcomes.',
    color: 'var(--forest)',
    bg: 'var(--forest-pale)'
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    desc: 'Real-time performance tracking for parents and teachers to monitor child progress.',
    color: 'var(--amber)',
    bg: 'var(--amber-light)'
  },
  {
    icon: Trophy,
    title: 'Reward System',
    desc: 'Gamified rewards and badges to keep children motivated and engaged in learning.',
    color: 'var(--coral)',
    bg: 'var(--coral-light)'
  },
  {
    icon: Users,
    title: 'Social Learning',
    desc: 'Challenges and leaderboards that encourage healthy competition among peers.',
    color: '#8B5CF6',
    bg: '#F5F3FF'
  },
  {
    icon: Shield,
    title: 'Child Safe',
    desc: '100% ad-free and moderated environment designed specifically for young learners.',
    color: '#10B981',
    bg: '#ECFDF5'
  },
  {
    icon: Smartphone,
    title: 'Multi-Device',
    desc: 'Learn on any device – mobile, tablet, or desktop – anywhere in Kenya.',
    color: '#3B82F6',
    bg: '#EFF6FF'
  }
];

export default function Features() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section className="section-pad" style={{ background: 'var(--grad-forest)', color: '#fff' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#fff', marginBottom: '1.5rem' }}>Platform Features</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto', fontSize: '1.2rem' }}>
              Discover how ShuleAI Pro makes learning effective, engaging, and aligned with the CBC curriculum.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section-pad">
          <div className="container">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2.5rem' 
            }}>
              {FEATURES.map((feat) => (
                <div key={feat.title} className="card animate-fade-up" style={{ padding: '2.5rem' }}>
                  <div style={{ 
                    width: 56, height: 56, borderRadius: 14, 
                    background: feat.bg, display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', 
                    marginBottom: '1.5rem' 
                  }}>
                    <feat.icon size={28} color={feat.color} />
                  </div>
                  <h3 style={{ marginBottom: '1rem' }}>{feat.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Showcase */}
        <section className="section-pad" style={{ background: 'var(--surface-alt)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <span className="badge badge-forest" style={{ marginBottom: '1rem' }}>Immersive Learning</span>
                <h2 style={{ marginBottom: '1.5rem' }}>Gamified Curriculum Delivery</h2>
                <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
                  We transform abstract concepts into interactive challenges. Instead of just reading about photosynthesis, 
                  students build their own plants and manage their growth in our virtual labs.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    'Instant feedback on every answer',
                    'Interactive 3D models and simulations',
                    'Contextual hints to support learning',
                    'Aligned with latest KICD requirements'
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--forest-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={10} color="var(--forest)" fill="var(--forest)" />
                      </div>
                      <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SafeImage 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80" 
                  alt="Learning Interface"
                  style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', height: 400 }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
