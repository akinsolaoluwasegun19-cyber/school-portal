export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Welcome back to Bells Portal</h1>
        <p className="text-gray-600">Akinsola Kolawole • Computer Science 300L</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">CGPA</p>
          <p className="text-2xl font-bold">4.21</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Courses</p>
          <p className="text-2xl font-bold">7</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Outstanding</p>
          <p className="text-2xl font-bold">₦265k</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Attendance</p>
          <p className="text-2xl font-bold">92%</p>
        </div>
      </div>
    </div>
  )
}