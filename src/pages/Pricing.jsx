import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingSection from '../components/PricingSection';

export default function Pricing() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ paddingTop: '80px' }}>
        {/* Hero Section */}
        <section className="section-pad" style={{ background: 'var(--grad-forest)', color: '#fff' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#fff', marginBottom: '1.5rem' }}>Simple, Transparent Pricing</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto', fontSize: '1.2rem' }}>
              Choose a plan that fits your family's needs. All plans include full access to our 50+ CBC games.
            </p>
          </div>
        </section>

        {/* Pricing Content */}
        <div style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
          <PricingSection />
        </div>

        {/* FAQs or Additional Info */}
        <section className="section-pad">
          <div className="container">
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Subscription FAQ</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { q: 'How do I pay for a subscription?', a: 'Payments are made securely via M-Pesa. Once you choose a plan, you\'ll receive a prompt on your phone to enter your PIN.' },
                  { q: 'Can I cancel my subscription?', a: 'Yes, our plans are non-recurring. You subscribe for a set period (7, 30, or 90 days), and it simply expires if not renewed.' },
                  { q: 'Is there a limit to how many games I can play?', a: 'No, every active subscription provides unlimited access to all 56+ games on the platform.' },
                  { q: 'Supported devices?', a: 'ShuleAI Pro works on all modern smartphones, tablets, and computers with an internet connection.' }
                ].map(faq => (
                  <div key={faq.q} style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                    <h4 style={{ marginBottom: '0.75rem', color: 'var(--forest)' }}>{faq.q}</h4>
                    <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
