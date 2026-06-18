import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function HostelPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 shadow-lg">
        <Link href="/payment" className="flex items-center gap-2 text-green-100 mb-3 hover:underline">
          <ArrowLeft size={20} />
          Back to Payment Info
        </Link>
        <h1 className="text-3xl font-bold">Hostel Fee Details</h1>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-500 max-w-2xl">
        <Home size={50} className="text-orange-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Hostel Fee</h2>
        <p className="text-4xl font-bold text-gray-900 mb-4">₦80,000</p>
        <div className="mt-6 space-y-2 text-gray-700">
          <p><b>Session:</b> 2025/2026</p>
          <p><b>Status:</b> Pending</p>
        </div>
      </div>
    </div>
  );
}