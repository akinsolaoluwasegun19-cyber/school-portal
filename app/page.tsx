import Link from "next/link";
import { User, Bell } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Green welcome banner */}
      <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back to Bells Portal</h1>
        <Bell size={24} />
      </div>

      {/* Only 1 card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/student-info">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500 hover:shadow-xl transition cursor-pointer">
            <User size={40} className="text-green-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-1">Student Info</h2>
            <p className="text-gray-600">View your details</p>
          </div>
        </Link>
      </div>
    </div>
  );
}