import { useNavigate } from 'react-router-dom'
import { Check, Zap, Star } from 'lucide-react'

const PLANS = [
  {
    id: 'weekly',
    name: 'Weekly Access',
    price: '200',
    period: '/ week',
    duration: '7 days full access',
    color: 'border-gray-200',
    highlight: false,
    features: [
      'Access all 54+ games',
      'All Learning Areas included',
      '7 days full access',
      'Progress tracking',
    ],
    cta: 'Start Weekly',
    badge: null,
  },
  {
    id: 'monthly',
    name: 'Monthly Access',
    price: '600',
    period: '/ month',
    duration: '30 days full access',
    color: 'border-forest-500',
    highlight: true,
    features: [
      'Access all 54+ games',
      'All Subjects included',
      '30 days full access',
      'Progress tracking',
      'Priority Support',
    ],
    cta: 'Start Monthly',
    badge: 'Most Popular',
  },
  {
    id: 'termly',
    name: 'Termly Access',
    price: '1,650',
    period: '/ term',
    duration: '90 days full access',
    color: 'border-gold-500',
    highlight: false,
    features: [
      'Access all 54+ games',
      'All Subjects included',
      '90 days full access',
      'Progress tracking',
      'Priority Support',
      'Achievement Certificates',
    ],
    cta: 'Start Termly',
    badge: 'Best Value',
  },
]

export default function PricingCards({ showTitle = true }) {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-forest-100 text-forest-700 rounded-full text-sm font-semibold mb-4">
              Choose Your Plan
            </span>
            <h2 className="section-title mb-4">Affordable Learning for Every Family</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Flexible subscription plans starting at just KES 200. No hidden charges, cancel anytime.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`
                bg-white rounded-3xl border-2 p-8 relative transition-all duration-300
                ${plan.color}
                ${plan.highlight ? 'pricing-popular shadow-2xl' : 'shadow-md hover:shadow-xl'}
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-sm font-bold shadow-lg whitespace-nowrap
                  ${plan.highlight ? 'bg-forest-700 text-white' : 'bg-gold-500 text-forest-900'}`}>
                  <Star className="w-3.5 h-3.5 inline mr-1.5 fill-current" />{plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500">{plan.duration}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-gray-500">KES</span>
                  <span className="text-5xl font-extrabold text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                      ${plan.highlight ? 'bg-forest-100' : 'bg-gray-100'}`}>
                      <Check className={`w-3 h-3 font-bold ${plan.highlight ? 'text-forest-700' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => navigate('/signup')}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 btn-shine
                  ${plan.highlight
                    ? 'bg-forest-800 text-white hover:bg-forest-700 shadow-lg shadow-forest-900/25'
                    : plan.id === 'termly'
                    ? 'bg-gold-500 text-forest-900 hover:bg-gold-400 shadow-md'
                    : 'border-2 border-gray-200 text-gray-700 hover:border-forest-300 hover:bg-forest-50'
                  }`}
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Access code banner */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Already have an access code?{' '}
            <button
              onClick={() => navigate('/signin?mode=access-code')}
              className="text-forest-700 font-semibold hover:text-forest-900 underline underline-offset-2"
            >
              Sign in to continue learning
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
