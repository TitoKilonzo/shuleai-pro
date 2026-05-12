import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SUBJECTS } from '../lib/games';
import { ChevronRight, BookOpen, Microscope, Sprout, Paintbrush, Church, Binary } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUBJECT_ICONS = {
  mathematics: Binary,
  integrated_science: Microscope,
  science_technology: Microscope,
  pre_technical: Binary,
  cre: Church,
  caas: Paintbrush,
  agriculture: Sprout
};

export default function LearningArea() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section className="section-pad" style={{ background: 'var(--grad-hero)', color: '#fff' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#fff', marginBottom: '1.5rem' }}>Our CBC Learning Areas</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto', fontSize: '1.2rem' }}>
              Explore our wide range of educational games across different CBC learning areas.
            </p>
          </div>
        </section>

        {/* Learning Areas Grid */}
        <section className="section-pad">
          <div className="container">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
              gap: '2rem' 
            }}>
              {Object.values(SUBJECTS).map((sub) => {
                const Icon = SUBJECT_ICONS[sub.id] || BookOpen;
                return (
                  <Link 
                    key={sub.id} 
                    to={`/games?subject=${sub.id}`} 
                    className="card animate-fade-up"
                    style={{ 
                      padding: '2.5rem', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '1.5rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = sub.color}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                        width: 48, height: 48, borderRadius: 12, 
                        background: sub.color + '15', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center' 
                      }}>
                        <Icon size={24} color={sub.color} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{sub.label}</h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>{sub.grades}</span>
                      </div>
                    </div>
                    
                    <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                      In-depth educational content and interactive games designed specifically for {sub.label} learners in Kenya.
                    </p>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: sub.color, fontWeight: 700, fontSize: '0.9rem' }}>
                      Browse Games <ChevronRight size={16} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ background: 'var(--surface-alt)', padding: '5rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Missing A Learning Area?</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 500, margin: '0 auto 2.5rem' }}>
              We are constantly adding new content. If there&apos;s a specific CBC topic you&apos;d like to see, let us know!
            </p>
            <Link to="/signup" className="btn btn-primary btn-lg">Start Learning Today</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
