export default function PaymentPage() {
  return (
    <div>
      {/* Green header card like first image */}
      <div className="bg-green-600 text-white p-6 rounded-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Payment Information</h1>
        <p className="text-green-100 mt-1">View all your school fees and charges here</p>
      </div>

      {/* 3 white cards with colored top border */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
          <div className="text-green-600 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
          <p className="text-gray-500 text-sm">Tuition Fee</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">₦250,000</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-orange-500">
          <div className="text-orange-600 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </div>
          <p className="text-gray-500 text-sm">Hostel Fee</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">₦80,000</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
          <div className="text-blue-600 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <p className="text-gray-500 text-sm">Other Charges</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">₦15,000</p>
        </div>
      </div>
    </div>
  )
}