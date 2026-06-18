import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function OthersPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 shadow-lg">
        <Link href="/payment" className="flex items-center gap-2 text-green-100 mb-3 hover:underline">
          <ArrowLeft size={20} />
          Back to Payment Info
        </Link>
        <h1 className="text-3xl font-bold">Other Charges Details</h1>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 max-w-2xl">
        <FileText size={50} className="text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Other Charges</h2>
        <p className="text-4xl font-bold text-gray-900 mb-4">₦15,000</p>
        <div className="mt-6 space-y-2 text-gray-700">
          <p>Library, departmental, and miscellaneous fees</p>
        </div>
      </div>
    </div>
  );
}