import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCards from '../components/PricingCards'
import { CheckCircle2, Shield, Headphones, Award, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQ = [
  { q: 'Can I cancel my subscription anytime?', a: 'Yes. You can cancel at any time. You\'ll retain access until your current period ends.' },
  { q: 'How does the access code work?', a: 'When you subscribe, you receive a unique access code. Share it with your child to sign in and start playing.' },
  { q: 'Is the content truly aligned with CBC?', a: 'Absolutely. Every game maps to specific KICD strands and sub-strands for Grade 4–9.' },
  { q: 'Can parents monitor their child\'s progress?', a: 'Yes. The parent dashboard gives full visibility into scores, time spent, subjects covered and badges earned.' },
  { q: 'What payment methods are accepted?', a: 'We accept M-Pesa, credit/debit cards and bank transfers.' },
  { q: 'Can one subscription be used by multiple children?', a: 'Each subscription covers one learner. For multiple children, each needs their own plan.' },
]

export default function Plans() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <div className="bg-forest-950 py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 bg-forest-800 text-gold-400 rounded-full text-sm font-semibold mb-4">
              Pricing Plans
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Invest in Your Child's Future
            </h1>
            <p className="text-forest-200 text-lg">
              Affordable CBC-aligned learning starting at just KES 200/week.
              No hidden fees. Cancel anytime.
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <PricingCards showTitle={false} />

        {/* Guarantees */}
        <div className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Safe & Secure', desc: 'Child-safe platform with COPPA compliance. No ads, no tracking.', color: 'text-blue-600 bg-blue-50' },
                { icon: Headphones, title: 'Priority Support', desc: 'Monthly & Termly subscribers get dedicated support via WhatsApp and email.', color: 'text-forest-700 bg-forest-50' },
                { icon: Award, title: 'Certificates', desc: 'Termly subscribers earn official ShuleAI Pro completion certificates.', color: 'text-gold-600 bg-gold-50' },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{title}</h3>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-forest-900 text-center mb-10" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              What's Included in Each Plan
            </h2>
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-500">Feature</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-gray-900">Weekly</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-forest-800 bg-forest-50">Monthly</th>
                      <th className="text-center py-4 px-4 text-sm font-bold text-gold-700">Termly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Access to all 54+ games', weekly: true, monthly: true, termly: true },
                      { feature: 'All subjects / learning areas', weekly: true, monthly: true, termly: true },
                      { feature: 'Progress tracking', weekly: true, monthly: true, termly: true },
                      { feature: 'Achievement badges', weekly: true, monthly: true, termly: true },
                      { feature: 'Parent dashboard access', weekly: true, monthly: true, termly: true },
                      { feature: 'Priority support', weekly: false, monthly: true, termly: true },
                      { feature: 'Achievement certificates', weekly: false, monthly: false, termly: true },
                      { feature: 'Leaderboard participation', weekly: false, monthly: true, termly: true },
                      { feature: 'Offline game cache', weekly: false, monthly: false, termly: true },
                    ].map(({ feature, weekly, monthly, termly }, i) => (
                      <tr key={feature} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                        <td className="py-3.5 px-6 text-sm text-gray-600">{feature}</td>
                        <td className="py-3.5 px-4 text-center">
                          {weekly ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-200 text-lg">—</span>}
                        </td>
                        <td className="py-3.5 px-4 text-center bg-forest-50/50">
                          {monthly ? <CheckCircle2 className="w-5 h-5 text-forest-600 mx-auto" /> : <span className="text-gray-200 text-lg">—</span>}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {termly ? <CheckCircle2 className="w-5 h-5 text-gold-600 mx-auto" /> : <span className="text-gray-200 text-lg">—</span>}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="py-4 px-6 font-bold text-sm text-gray-900">Price</td>
                      <td className="py-4 px-4 text-center font-extrabold text-gray-900 text-lg">KES 200</td>
                      <td className="py-4 px-4 text-center font-extrabold text-forest-800 text-lg bg-forest-50/50">KES 600</td>
                      <td className="py-4 px-4 text-center font-extrabold text-gold-700 text-lg">KES 1,650</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-forest-900 text-center mb-10" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{q}</h3>
                  <p className="text-gray-500 text-sm">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-forest-900 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Ready to Start?
          </h2>
          <p className="text-forest-200 mb-8">Create your account and choose a plan in minutes.</p>
          <Link to="/signup" className="btn-gold text-base px-8 py-4 btn-shine inline-flex items-center gap-2">
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
