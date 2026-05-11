import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, Menu } from 'lucide-react';
import Footer from '../components/Footer';

export default function Landing() {
  const PARTNERS = ['BPS', 'Cherry Creek', 'Columbus City', 'Colorado Springs D11', 'DeKalb County', 'Denton'];

  const FEATURES = [
    {
      icon: BookOpen,
      title: 'Unified K-12 Operations',
      description: 'Connect student information, family engagement, and classroom tools in one platform.'
    },
    {
      icon: Award,
      title: 'Data That Drives Decisions',
      description: 'Turn student and school insights into actions that improve outcomes across the whole district.'
    },
    {
      icon: Users,
      title: 'Tools for Every Role',
      description: 'Empower administrators, educators, and families with intuitive workflows and modern experiences.'
    }
  ];

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

      {/* Build Your PowerSchool */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-forest font-semibold mb-4">Build Your PowerSchool</p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">
              An integrated platform to deliver unparalleled outcomes
            </h2>
            <p className="text-lg text-muted max-w-2xl leading-relaxed mb-8">
              Learn how ShuleAI Pro unlocks operational excellence that empowers administrators, educators, and families to advance student outcomes.
            </p>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Configure Your Own K-12 OS
            </Link>
          </div>
          <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="K-12 platform overview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.24em] text-forest font-semibold mb-6">Trusted by education leaders</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS.map((partner) => (
              <div key={partner} className="rounded-3xl border border-slate-200 bg-white py-6 text-center text-sm font-semibold text-ink shadow-sm">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.24em] text-forest font-semibold mb-4">PowerSchool Overview</p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink">
              A platform built for simplicity, scale, and measurable impact
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card-modern p-8">
                <div className="mb-5 text-forest">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-ink">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-forest to-forest-mid text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-light font-semibold mb-4">Simplify your school operations</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Configure the K-12 platform that fits your goals
          </h2>
          <Link to="/signup" className="btn btn-lg bg-white text-forest hover:bg-slate-100">
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
