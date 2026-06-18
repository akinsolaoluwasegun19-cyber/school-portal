import { CreditCard, Home, FileText } from 'lucide-react'
import Link from 'next/link'

export default function PaymentPage() {
  return (
    <div>
      {/* Green header */}
      <div className="bg-green-600 text-white p-6 rounded-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Payment Information</h1>
        <p className="text-green-100 mt-1">View all your school fees and charges here</p>
      </div>

      {/* 3 clickable fee cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link href="/payment/tuition" className="block">
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500 hover:shadow-md transition-shadow cursor-pointer">
            <CreditCard size={32} className="text-green-600 mb-3" />
            <p className="text-gray-500 text-sm">Tuition Fee</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">₦250,000</p>
          </div>
        </Link>
        
        <Link href="/payment/hostel" className="block">
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-orange-500 hover:shadow-md transition-shadow cursor-pointer">
            <Home size={32} className="text-orange-600 mb-3" />
            <p className="text-gray-500 text-sm">Hostel Fee</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">₦80,000</p>
          </div>
        </Link>
        
        <Link href="/payment/other" className="block">
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500 hover:shadow-md transition-shadow cursor-pointer">
            <FileText size={32} className="text-blue-600 mb-3" />
            <p className="text-gray-500 text-sm">Other Charges</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">₦15,000</p>
          </div>
        </Link>
      </div>
    </div>
  )
}