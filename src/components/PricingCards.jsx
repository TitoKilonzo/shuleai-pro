import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { GAMES } from '../lib/games'

const PLANS = [
  {
    id: 'bronze',
    name: 'Bronze Plan',
    price: '200',
    period: '/ week',
    duration: '7 days full access',
    color: 'border-orange-800/30',
    bgBtn: 'border-2 border-orange-200 text-orange-900 hover:border-orange-300 hover:bg-orange-50',
    highlight: false,
    features: [
      `Access all ${GAMES.length} games`,
      'All Learning Areas included',
      '7 days full access',
      'Progress tracking',
    ],
    cta: 'Start Bronze',
  },
  {
    id: 'silver',
    name: 'Silver Plan',
    price: '600',
    period: '/ month',
    duration: '30 days full access',
    color: 'border-slate-400',
    bgBtn: 'bg-slate-800 text-white hover:bg-slate-700 shadow-lg shadow-slate-900/25',
    highlight: true,
    features: [
      `Access all ${GAMES.length} games`,
      'All Learning Areas included',
      '30 days full access',
      'Progress tracking',
    ],
    cta: 'Start Silver',
  },
  {
    id: 'gold',
    name: 'Gold Plan',
    price: '1,650',
    period: '/ term',
    duration: '90 days full access',
    color: 'border-amber-500',
    bgBtn: 'bg-amber-500 text-amber-950 hover:bg-amber-400 shadow-md',
    highlight: false,
    features: [
      `Access all ${GAMES.length} games`,
      'All Learning Areas included',
      '90 days full access',
      'Progress tracking',
    ],
    cta: 'Start Gold',
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
              Choose a 7-day, 30-day, or 90-day plan and pay using M-Pesa.
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
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 btn-shine ${plan.bgBtn}`}
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
