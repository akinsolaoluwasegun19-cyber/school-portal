import { Bell, User } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div>
      {/* Green welcome card */}
      <div className="bg-green-600 text-white p-6 rounded-xl mb-8 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back to Bells Portal</h1>
        <Bell size={24} />
      </div>

      {/* Student Info card - now clickable */}
      <Link href="/student-info" className="block max-w-md">
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500 hover:shadow-md transition-shadow cursor-pointer">
          <User size={32} className="text-green-600 mb-3" />
          <h2 className="text-xl font-bold text-gray-800">Student Info</h2>
          <p className="text-gray-500 mt-1">View your details</p>
        </div>
      </Link>
    </div>
  )
}