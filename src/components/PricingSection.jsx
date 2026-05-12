import { useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../lib/mpesa';
import PaymentModal from './PaymentModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PricingSection() {
  const [payModal, setPayModal] = useState({ open: false, plan: 'monthly' });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChoosePlan = (planId) => {
    if (!user) { navigate('/signup'); return; }
    setPayModal({ open: true, plan: planId });
  };

  const planOrder = ['weekly', 'monthly', 'termly'];
  const icons = { weekly: Zap, monthly: Star, termly: Check };

  return (
    <section id="pricing" className="section-pad" style={{ background:'var(--grad-hero)', position:'relative', overflow:'hidden' }}>
      {/* Background decor */}
      <div style={{ position:'absolute', top:'-10%', right:'-5%', width:400, height:400, borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:300, height:300, borderRadius:'50%', background:'rgba(245,158,11,0.08)', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:'1rem' }}>
            <span className="badge badge-amber">
              Choose Your Plan
            </span>
          </div>
          <h2 style={{ color:'#fff', marginBottom:'0.75rem' }}>
            Invest in Your Child&apos;s Future
          </h2>
          <p style={{ color:'rgba(255,255,255,0.72)', maxWidth:520, margin:'0 auto', fontSize:'1.05rem' }}>
            Flexible subscription plans designed for every family. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
          gap:'1.5rem', maxWidth:'960px', margin:'0 auto',
        }}>
          {planOrder.map((planId) => {
            const plan = SUBSCRIPTION_PLANS[planId];
            const isFeatured = planId === 'monthly';
            const Icon = icons[planId];

            return (
              <div
                key={planId}
                style={{
                  background: isFeatured ? '#fff' : 'rgba(255,255,255,0.07)',
                  borderRadius:'var(--radius-xl)',
                  padding:'2rem',
                  border: isFeatured ? '2px solid var(--amber)' : '1px solid rgba(255,255,255,0.12)',
                  position:'relative',
                  backdropFilter: isFeatured ? 'none' : 'blur(8px)',
                  transform: isFeatured ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: isFeatured ? 'var(--shadow-xl)' : 'none',
                  transition:'transform 0.22s var(--ease)',
                }}
                onMouseEnter={e=>{
                  if (!isFeatured) e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.transform = isFeatured ? 'scale(1.04)' : 'scale(1)';
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)',
                    background: planId === 'termly' ? 'var(--grad-amber)' : 'var(--grad-forest)',
                    color: planId === 'termly' ? 'var(--ink)' : '#fff',
                    padding:'0.3rem 1.1rem', borderRadius:'var(--radius-pill)',
                    fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase',
                    whiteSpace:'nowrap',
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Icon */}
                <div style={{
                  width:48, height:48, borderRadius:'var(--radius)',
                  background: isFeatured ? 'var(--forest-pale)' : 'rgba(255,255,255,0.1)',
                  display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem',
                }}>
                  <Icon size={22} color={isFeatured ? 'var(--forest)' : '#fff'} />
                </div>

                <h3 style={{ fontSize:'1.15rem', fontWeight:700, marginBottom:'0.4rem', color: isFeatured ? 'var(--ink)' : '#fff' }}>
                  {plan.name}
                </h3>

                {/* Price */}
                <div style={{ marginBottom:'1.5rem' }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:'0.3rem' }}>
                    <span style={{ fontSize:'0.9rem', color: isFeatured ? 'var(--muted)' : 'rgba(255,255,255,0.6)', fontWeight:600 }}>KES</span>
                    <span style={{
                      fontFamily:'var(--font-head)', fontSize:'2.6rem', fontWeight:800,
                      color: isFeatured ? 'var(--forest)' : '#fff',
                      lineHeight:1,
                    }}>
                      {plan.price.toLocaleString()}
                    </span>
                  </div>
                  <p style={{ color: isFeatured ? 'var(--muted)' : 'rgba(255,255,255,0.55)', fontSize:'0.82rem', marginTop:'0.25rem' }}>
                    {plan.days}-day full access
                  </p>
                </div>

                {/* Features */}
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.7rem', marginBottom:'1.75rem' }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
                      <div style={{
                        width:20, height:20, borderRadius:'50%', flexShrink:0,
                        background: isFeatured ? 'var(--forest-pale)' : 'rgba(255,255,255,0.15)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        <Check size={11} color={isFeatured ? 'var(--forest)' : '#fff'} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize:'0.88rem', color: isFeatured ? 'var(--ink-mid)' : 'rgba(255,255,255,0.82)' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn btn-lg ${isFeatured ? 'btn-primary' : ''}`}
                  style={{
                    width:'100%', borderRadius:'var(--radius)',
                    ...(!isFeatured ? {
                      background:'rgba(255,255,255,0.15)',
                      color:'#fff',
                      border:'1px solid rgba(255,255,255,0.25)',
                      backdropFilter:'blur(4px)',
                    } : {}),
                  }}
                  onClick={() => handleChoosePlan(planId)}
                >
                  {user ? 'Activate Plan' : 'Get Started'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Access Code CTA */}
        <div style={{ textAlign:'center', marginTop:'3rem' }}>
          <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.9rem' }}>
            Already have an access code?{' '}
            <button
              onClick={() => setPayModal({ open:true, plan:'monthly' })}
              style={{ background:'none', border:'none', cursor:'pointer', color:'var(--amber)', fontWeight:700, textDecoration:'underline' }}
            >
              Sign in to continue learning →
            </button>
          </p>
        </div>
      </div>

      <PaymentModal
        isOpen={payModal.open}
        onClose={() => setPayModal(p => ({...p, open:false}))}
        defaultPlan={payModal.plan}
      />
    </section>
  );
}
