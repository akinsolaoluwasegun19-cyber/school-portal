export default function PaymentPage() {
  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-green-600 text-white rounded-xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Payment Information</h1>
        <p className="text-green-100">View all your school fees and charges here</p>
      </div>
      
      {/* Fee cards - stacks on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-gray-200">
          <h3 className="text-gray-500 text-sm mb-2">Tuition Fee</h3>
          <p className="text-3xl font-bold text-gray-800">₦250,000</p>
          <p className="text-red-500 text-sm mt-2">Due: 30 Sept 2026</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-gray-200">
          <h3 className="text-gray-500 text-sm mb-2">Hostel Fee</h3>
          <p className="text-3xl font-bold text-gray-800">₦50,000</p>
          <p className="text-green-600 text-sm mt-2">Paid</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-gray-200">
          <h3 className="text-gray-500 text-sm mb-2">Other Charges</h3>
          <p className="text-3xl font-bold text-gray-800">₦15,000</p>
          <p className="text-orange-500 text-sm mt-2">Pending</p>
        </div>
      </div>
    </div>
  )
}