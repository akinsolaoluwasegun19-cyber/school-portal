import { LayoutDashboard, CreditCard, BookOpen, Award } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 shadow-lg">
        <h1 className="text-3xl font-bold">Welcome to Bells Portal</h1>
        <p className="text-green-100 mt-2">Student Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Link href="/payment" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-t-4 border-green-500 transition">
          <CreditCard size={40} className="text-green-600 mb-3" />
          <h3 className="text-xl font-bold text-gray-900">Payment Info</h3>
          <p className="text-gray-600 mt-1">View tuition, hostel & other fees</p>
        </Link>

        <Link href="/student-info" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-t-4 border-blue-500 transition">
          <LayoutDashboard size={40} className="text-blue-600 mb-3" />
          <h3 className="text-xl font-bold text-gray-900">Student Information</h3>
          <p className="text-gray-600 mt-1">View your personal details</p>
        </Link>

        <Link href="/courses" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-t-4 border-purple-500 transition">
          <BookOpen size={40} className="text-purple-600 mb-3" />
          <h3 className="text-xl font-bold text-gray-900">Courses</h3>
          <p className="text-gray-600 mt-1">Register & view courses</p>
        </Link>

        <Link href="/results" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-t-4 border-orange-500 transition">
          <Award size={40} className="text-orange-600 mb-3" />
          <h3 className="text-xl font-bold text-gray-900">Results</h3>
          <p className="text-gray-600 mt-1">Check your results</p>
        </Link>
      </div>
    </div>
  );
}