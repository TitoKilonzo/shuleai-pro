import { Users, Gamepad2, BookOpen, Award } from 'lucide-react'

const STATS = [
  { icon: Users,     label: 'Active Learners',  value: '28,400+' },
  { icon: Gamepad2,  label: 'Educational Games', value: '54+' },
  { icon: BookOpen,  label: 'Subjects Covered',  value: '11' },
  { icon: Award,     label: 'Certificates Issued',value: '5,200+' },
]

export default function StatsBar() {
  return (
    <div className="bg-white border-y border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-forest-50 rounded-2xl flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-forest-700" />
              </div>
              <div className="text-2xl font-extrabold text-forest-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {value}
              </div>
              <div className="text-sm text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
