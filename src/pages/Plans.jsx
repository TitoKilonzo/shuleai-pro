import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCards from '../components/PricingCards'
import { CheckCircle2, Smartphone, BookOpen, BarChart3, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQ = [
  { q: 'How long does each plan last?', a: 'Plans provide access for 7, 30, or 90 days, depending on the option selected.' },
  { q: 'How is the content organized?', a: 'Games are grouped by CBC learning area and grade in the catalogue.' },
  { q: 'Can parents monitor their child\'s progress?', a: 'The parent dashboard displays learner activity, game scores, and learning area progress.' },
  { q: 'What payment methods are accepted?', a: 'Subscriptions are paid using M-Pesa.' },
];

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
              Invest in Your Child&apos;s Future
            </h1>
            <p className="text-forest-200 text-lg">
              Affordable CBC-aligned learning starting at just KES 200/week.
              Choose a 7-day, 30-day, or 90-day subscription.
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
                { icon: Smartphone, title: 'M-Pesa Payments', desc: 'Pay for a subscription through the M-Pesa STK push flow.', color: 'text-blue-600 bg-blue-50' },
                { icon: BookOpen, title: 'Full Game Catalogue', desc: 'Every plan provides access to the games and learning areas in the catalogue.', color: 'text-forest-700 bg-forest-50' },
                { icon: BarChart3, title: 'Progress Tracking', desc: 'Review game scores and learning area activity in the dashboards.', color: 'text-gold-600 bg-gold-50' },
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
              What&apos;s Included in Each Plan
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
                      { feature: 'Access to all games', weekly: true, monthly: true, termly: true },
                      { feature: 'All learning areas', weekly: true, monthly: true, termly: true },
                      { feature: 'Progress tracking', weekly: true, monthly: true, termly: true },
                      { feature: 'Parent dashboard access', weekly: true, monthly: true, termly: true },
                    ].map(({ feature, weekly, monthly, termly }, i) => (
                      <tr key={feature} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                        <td className="py-3.5 px-6 text-sm text-gray-600">{feature}</td>
                        <td className="py-3.5 px-4 text-center">
                          {weekly ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : null}
                        </td>
                        <td className="py-3.5 px-4 text-center bg-forest-50/50">
                          {monthly ? <CheckCircle2 className="w-5 h-5 text-forest-600 mx-auto" /> : null}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {termly ? <CheckCircle2 className="w-5 h-5 text-gold-600 mx-auto" /> : null}
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
