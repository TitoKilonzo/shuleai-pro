import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Shield, Trophy, Users,
  Smartphone, BarChart3, Rocket
} from 'lucide-react';
import SafeImage from '../components/SafeImage';
import { GAMES, SUBJECTS } from '../lib/games';

const FEATURES = [
  {
    icon: Rocket,
    title: 'CBC Learning Areas',
    desc: 'Browse games organized by the learning areas and grade labels in the catalogue.',
    color: 'var(--forest)',
    bg: 'var(--forest-pale)'
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    desc: 'Review completed games, scores, and learning area progress in the dashboards.',
    color: 'var(--amber)',
    bg: 'var(--amber-light)'
  },
  {
    icon: Trophy,
    title: 'Game Points',
    desc: 'Each game lists the points available for completion and provides feedback on submitted answers.',
    color: 'var(--coral)',
    bg: 'var(--coral-light)'
  },
  {
    icon: Users,
    title: 'Parent Dashboard Preview',
    desc: 'The demo account provides a clearly labeled sample parent view with learner scores and subject progress.',
    color: '#8B5CF6',
    bg: '#F5F3FF'
  },
  {
    icon: Shield,
    title: 'Focused Learning',
    desc: 'The app provides access to its learning games and progress tools.',
    color: '#10B981',
    bg: '#ECFDF5'
  },
  {
    icon: Smartphone,
    title: 'Multi-Device',
    desc: 'Use the responsive web app on a phone, tablet, or desktop browser.',
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

        {/* Catalogue examples */}
        <section className="section-pad" style={{ background: 'var(--surface-alt)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge badge-forest" style={{ marginBottom: '1rem' }}>Current Catalogue</span>
              <h2 style={{ marginBottom: '0.75rem' }}>Games Available to Learners</h2>
              <p style={{ color: 'var(--muted)', maxWidth: 620, margin: '0 auto' }}>
                Each example below comes directly from the ShuleAI Pro game catalogue.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {GAMES.slice(0, 3).map(game => {
                const subject = Object.values(SUBJECTS).find(item => item.id === game.subject);
                return (
                  <article key={game.id} className="card-modern" style={{ overflow: 'hidden' }}>
                    <SafeImage src={game.image} alt={game.title} style={{ width: '100%', height: 190 }} />
                    <div style={{ padding: '1.25rem' }}>
                      <p style={{ color: subject?.color || 'var(--forest)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 0.4rem' }}>
                        {subject?.label || game.subject}
                      </p>
                      <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.4rem' }}>{game.title}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0 }}>{game.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
