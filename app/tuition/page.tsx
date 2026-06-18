import { ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";

export default function TuitionPage() {
  return (
    <div className="p-6 md:p-8">
      
      <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 shadow-lg">
        <Link href="/payment" className="flex items-center gap-2 text-green-100 mb-3 hover:underline">
          <ArrowLeft size={20} />
          Back to Payment Info
        </Link>
        <h1 className="text-3xl font-bold">Tuition Fee Details</h1>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500 max-w-2xl">
        <CreditCard size={50} className="text-green-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Tuition Fee</h2>
        <p className="text-4xl font-bold text-gray-900 mb-4">₦250,000</p>
        
        <div className="mt-6 space-y-2 text-gray-700">
          <p><b>Session:</b> 2025/2026</p>
          <p><b>Paid on:</b> 15 Jan 2026</p>
          <p><b>Receipt No:</b> BELL/2026/001</p>
        </div>
      </div>
    </div>
  );
}