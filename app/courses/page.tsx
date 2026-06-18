'use client'
import { useState } from 'react'
import { BookOpen, Calendar } from 'lucide-react'

const firstSemesterCourses = [
  { code: 'GNS101', name: 'Use of English I', units: 2 },
  { code: 'GNS103', name: 'Nigerian People and Culture', units: 2 },
  { code: 'MTH101', name: 'General Mathematics I', units: 3 },
]

const secondSemesterCourses = [
  { code: 'GNS102', name: 'Use of English II', units: 2 },
  { code: 'MTH102', name: 'General Mathematics II', units: 3 },
  { code: 'PHY101', name: 'General Physics I', units: 3 },
]

export default function CoursesPage() {
  const [activeSemester, setActiveSemester] = useState<'first' | 'second' | null>(null)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  const totalUnits = selectedCourses.reduce((sum, code) => {
    const allCourses = [...firstSemesterCourses, ...secondSemesterCourses]
    const course = allCourses.find(c => c.code === code)
    return sum + (course?.units || 0)
  }, 0)

  const toggleCourse = (code: string) => {
    setSelectedCourses(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  const coursesToShow = activeSemester === 'first' ? firstSemesterCourses : secondSemesterCourses

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold">Course Registration</h1>
        <p className="mt-2">Level: 100L | Selected Units: {totalUnits}</p>
      </div>

      {/* Semester Cards - like Tuition Fee bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Semester Card */}
        <button
          onClick={() => setActiveSemester(activeSemester === 'first' ? null : 'first')}
          className={`p-6 rounded-xl border-t-4 text-left transition-all ${
            activeSemester === 'first'
              ? 'border-green-600 bg-green-50 shadow-lg'
              : 'border-gray-300 bg-white hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-3">
            <BookOpen className={`w-8 h-8 ${activeSemester === 'first' ? 'text-green-600' : 'text-gray-500'}`} />
            <div>
              <h3 className="text-lg font-bold text-gray-800">First Semester</h3>
              <p className="text-sm text-gray-500">{firstSemesterCourses.length} courses</p>
            </div>
          </div>
        </button>

        {/* Second Semester Card */}
        <button
          onClick={() => setActiveSemester(activeSemester === 'second' ? null : 'second')}
          className={`p-6 rounded-xl border-t-4 text-left transition-all ${
            activeSemester === 'second'
              ? 'border-blue-600 bg-blue-50 shadow-lg'
              : 'border-gray-300 bg-white hover:shadow-md'
          }`}
        >
          <div className="flex items-center gap-3">
            <Calendar className={`w-8 h-8 ${activeSemester === 'second' ? 'text-blue-600' : 'text-gray-500'}`} />
            <div>
              <h3 className="text-lg font-bold text-gray-800">Second Semester</h3>
              <p className="text-sm text-gray-500">{secondSemesterCourses.length} courses</p>
            </div>
          </div>
        </button>
      </div>

      {/* Courses List - Only shows when card is clicked */}
      {activeSemester && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {activeSemester === 'first' ? 'First' : 'Second'} Semester Courses
          </h2>
          
          <div className="space-y-3">
            {coursesToShow.map(course => (
              <label key={course.code} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.code)}
                  onChange={() => toggleCourse(course.code)}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <p className="font-semibold">{course.code} - {course.name}</p>
                  <p className="text-sm text-gray-500">{course.units} Units</p>
                </div>
              </label>
            ))}
          </div>

          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
            Submit Courses
          </button>
        </div>
      )}
    </div>
  )
}