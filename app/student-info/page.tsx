import Link from "next/link";
import { UserCircle, ArrowLeft } from "lucide-react";

export default function StudentInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header with back link */}
      <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 shadow-lg">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-green-100 mb-3 hover:text-white hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">Student Information</h1>
      </div>

      {/* No details yet card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500 max-w-2xl">
        <div className="text-center py-12">
          <UserCircle size={100} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No details yet</h2>
          <p className="text-gray-500">Student information will appear here after you sign in</p>
        </div>
      </div>
    </div>
  );
}