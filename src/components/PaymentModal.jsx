import { useState, useEffect } from 'react';
import { X, Check, Smartphone, Loader, AlertCircle, ShieldCheck, ChevronDown } from 'lucide-react';
import { SUBSCRIPTION_PLANS, mpesaService, validatePhone, formatPhone, getExpiryDate } from '../lib/mpesa';
import { subscriptionService } from '../lib/appwrite';
import { useAuth } from '../context/AuthContext';

export default function PaymentModal({ isOpen, onClose, defaultPlan = 'monthly' }) {
  const { user, refreshSubscription } = useAuth();
  const [step, setStep] = useState('form'); // form | processing | success | code
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [accessCode, setAccessCode] = useState('');
  const [errors, setErrors] = useState({});
  const [mpesaRef, setMpesaRef] = useState('');
  const [codeError, setCodeError] = useState('');

  const plan = SUBSCRIPTION_PLANS[selectedPlan];

  useEffect(() => {
    if (!isOpen) return;
    setStep('form');
    setErrors({});
    setMpesaRef('');
    setAccessCode('');
    setCodeError('');
    setSelectedPlan(defaultPlan);
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
  }, [isOpen, user, defaultPlan]);

  // Listen for M-Pesa payment complete event
  useEffect(() => {
    const handler = async (e) => {
      const { ResultCode, MpesaReceiptNumber } = e.detail;
      if (ResultCode === '0') {
        setMpesaRef(MpesaReceiptNumber);
        // Save subscription to Appwrite
        try {
          await subscriptionService.createSubscription({
            userId: user.$id,
            plan: selectedPlan,
            amount: plan.price,
            mpesaRef: MpesaReceiptNumber,
            phone: formatPhone(phone),
            expiresAt: getExpiryDate(selectedPlan),
          });
          await refreshSubscription();
        } catch (err) {
          console.error('Subscription save error:', err);
        }
        setStep('success');
      }
    };
    window.addEventListener('mpesa-payment-complete', handler);
    return () => window.removeEventListener('mpesa-payment-complete', handler);
  }, [user, selectedPlan, plan, phone, refreshSubscription]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!validatePhone(phone)) errs.phone = 'Enter a valid M-Pesa number (e.g. 0712345678)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = async () => {
    if (!validate()) return;
    setStep('processing');
    try {
      await mpesaService.initiateStkPush({
        phone, amount: plan.price,
        accountRef: 'ShuleAIPro',
        description: `${plan.name} - ShuleAI Pro`,
      });
      // For sandbox: success event fires automatically after 5s
    } catch (err) {
      setStep('form');
      setErrors({ submit: 'Payment initiation failed. Please try again.' });
    }
  };

  const handleAccessCode = async () => {
    if (!accessCode.trim()) { setCodeError('Enter your access code'); return; }
    setCodeError('');
    try {
      const codeDoc = await subscriptionService.validateAccessCode(accessCode);
      if (!codeDoc) { setCodeError('Invalid or already used access code'); return; }
      await subscriptionService.redeemAccessCode(codeDoc.$id, user.$id);
      await subscriptionService.createSubscription({
        userId: user.$id,
        plan: codeDoc.plan || 'monthly',
        amount: 0,
        mpesaRef: `CODE-${accessCode.toUpperCase()}`,
        phone: user.phone || '',
        expiresAt: getExpiryDate(codeDoc.plan || 'monthly'),
      });
      await refreshSubscription();
      setStep('success');
    } catch (err) {
      setCodeError('Error validating code. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ padding:'1.5rem 1.5rem 0', borderBottom:'1px solid var(--border)', paddingBottom:'1.25rem' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <h3 style={{ fontSize:'1.2rem', margin:0 }}>Submit Payment Information</h3>
              <p style={{ color:'var(--muted)', fontSize:'0.85rem', marginTop:'0.25rem' }}>
                Complete payment and submit your details below
              </p>
            </div>
            <button onClick={onClose} style={{
              background:'none', border:'none', cursor:'pointer', color:'var(--muted)',
              padding:'0.4rem', borderRadius:'var(--radius-sm)', transition:'all 0.18s',
            }} onMouseEnter={e=>e.currentTarget.style.background='var(--surface-alt)'}
              onMouseLeave={e=>e.currentTarget.style.background='none'}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:'1.5rem' }}>
          {step === 'form' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div style={{
                background:'var(--forest-glass)', borderRadius:'var(--radius)', padding:'0.75rem 1rem',
                borderLeft:'3px solid var(--forest)',
              }}>
                <p style={{ fontSize:'0.82rem', fontWeight:700, color:'var(--forest)', marginBottom:'0.25rem' }}>
                  Submit Your Payment Details & Pay
                </p>
                <p style={{ fontSize:'0.8rem', color:'var(--muted)' }}>
                  An M-Pesa STK push will be sent to your phone
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" placeholder="Enter your full name"
                  value={name} onChange={e=>setName(e.target.value)} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input className="form-input" type="email" placeholder="your@email.com"
                  value={email} onChange={e=>setEmail(e.target.value)} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Subscription Plan *</label>
                <div style={{ position:'relative' }}>
                  <select
                    className="form-input"
                    value={selectedPlan}
                    onChange={e=>setSelectedPlan(e.target.value)}
                    style={{ appearance:'none', paddingRight:'2.5rem', cursor:'pointer' }}
                  >
                    {Object.values(SUBSCRIPTION_PLANS).map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} – KES {p.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={{ position:'absolute', right:'1rem', top:'50%', transform:'translateY(-50%)', color:'var(--muted)', pointerEvents:'none' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">M-Pesa Phone Number *</label>
                <input className="form-input" placeholder="0712345678 or 254712345678"
                  value={phone} onChange={e=>setPhone(e.target.value)} />
                <span className="form-hint">Must match your M-Pesa registered number</span>
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              {errors.submit && (
                <div style={{ display:'flex', gap:'0.5rem', alignItems:'center', color:'var(--error)', fontSize:'0.85rem', background:'#FEF2F2', padding:'0.75rem', borderRadius:'var(--radius)' }}>
                  <AlertCircle size={16} /> {errors.submit}
                </div>
              )}

              {/* Pay Button */}
              <button className="btn btn-primary btn-lg" style={{ width:'100%', marginTop:'0.5rem', borderRadius:'var(--radius)' }} onClick={handlePay}>
                <Smartphone size={18} />
                Pay KES {plan.price.toLocaleString()} via M-Pesa
              </button>

              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', justifyContent:'center', color:'var(--muted)', fontSize:'0.78rem' }}>
                <ShieldCheck size={14} style={{ color:'var(--success)' }} />
                Secured by Safaricom M-Pesa
              </div>

              <hr className="divider" />

              {/* Access Code Section */}
              <button
                className="btn btn-outline"
                style={{ width:'100%', borderRadius:'var(--radius)' }}
                onClick={() => setStep('code')}
              >
                Already Have a Code? Sign in to continue learning
              </button>
            </div>
          )}

          {step === 'code' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div>
                <h4 style={{ marginBottom:'0.35rem' }}>Enter Access Code</h4>
                <p style={{ color:'var(--muted)', fontSize:'0.85rem' }}>
                  If you received an access code, enter it below to activate your subscription.
                </p>
              </div>
              <div className="form-group">
                <label className="form-label">Access Code</label>
                <input className="form-input" placeholder="e.g. SHULE-ABC123"
                  value={accessCode}
                  onChange={e=>setAccessCode(e.target.value.toUpperCase())}
                  style={{ textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:600 }}
                />
                {codeError && <span className="form-error">{codeError}</span>}
              </div>
              <button className="btn btn-primary" style={{ width:'100%' }} onClick={handleAccessCode}>
                Activate Code
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setStep('form')}>
                ← Back to Payment
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div style={{ textAlign:'center', padding:'2rem 1rem' }}>
              <div style={{ width:64, height:64, borderRadius:'50%', background:'var(--forest-pale)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem' }}>
                <Smartphone size={28} color="var(--forest)" />
              </div>
              <h4 style={{ marginBottom:'0.5rem' }}>Check Your Phone</h4>
              <p style={{ color:'var(--muted)', fontSize:'0.9rem', marginBottom:'1.5rem' }}>
                An M-Pesa STK push has been sent to <strong style={{color:'var(--ink)'}}>{phone}</strong>.<br/>
                Enter your M-Pesa PIN to complete payment.
              </p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem', color:'var(--muted)', fontSize:'0.85rem' }}>
                <Loader size={16} style={{ animation:'spin 1s linear infinite' }} />
                Waiting for payment confirmation...
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign:'center', padding:'2rem 1rem' }}>
              <div style={{ position:'relative', width:72, height:72, margin:'0 auto 1.5rem' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--grad-forest)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Check size={32} color="#fff" strokeWidth={3} />
                </div>
                <div style={{ position:'absolute', inset:-6, borderRadius:'50%', border:'2px solid var(--forest-light)', animation:'pulse-ring 1.5s ease-out forwards' }} />
              </div>
              <h4 style={{ marginBottom:'0.5rem', color:'var(--forest)' }}>Payment Successful!</h4>
              {mpesaRef && (
                <p style={{ color:'var(--muted)', fontSize:'0.85rem', marginBottom:'0.5rem' }}>
                  M-Pesa Ref: <strong style={{ color:'var(--ink)', letterSpacing:'0.05em' }}>{mpesaRef}</strong>
                </p>
              )}
              <p style={{ color:'var(--muted)', fontSize:'0.9rem', marginBottom:'1.5rem' }}>
                Your <strong>{plan.name}</strong> is now active. Start learning!
              </p>
              <button className="btn btn-primary" style={{ width:'100%' }} onClick={onClose}>
                Start Learning Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
