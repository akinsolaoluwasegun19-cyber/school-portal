'use client'
import { useState } from 'react'
import { BookOpen, Calendar } from 'lucide-react'

// First Semester Courses
const firstSemesterCourses = [
  { code: 'GST 111', name: 'Communication in English', units: 2 },
  { code: 'GST 113', name: 'Nigerian Peoples and Culture', units: 2 },
  { code: 'MTH 101', name: 'Elementary Mathematics I', units: 3 },
  { code: 'MTH 103', name: 'Elementary Mathematics III / Further Mathematics', units: 3 },
  { code: 'PHY 101', name: 'General Physics I', units: 3 },
  { code: 'PHY 103', name: 'General Physics III', units: 3 },
  { code: 'CHM 101', name: 'General Chemistry I', units: 3 },
  { code: 'CPE/CSC 101', name: 'Introduction to Computing', units: 2 },
  { code: 'ENG 101', name: 'Introduction to Engineering', units: 2 },
  { code: 'PHY 107', name: 'Physics Practical I', units: 1 },
  { code: 'CHM 107', name: 'Chemistry Practical I', units: 1 },
]

// Second Semester Courses  
const secondSemesterCourses = [
  { code: 'GST 102', name: 'Communication in English II', units: 2 },
  { code: 'GST 106', name: 'Entrepreneurship Studies', units: 2 },
  { code: 'GST 108/110', name: 'Government, Society and Economy', units: 2 },
  { code: 'MTH 102', name: 'Elementary Mathematics II', units: 3 },
  { code: 'MTH 104', name: 'Elementary Mathematics IV', units: 3 },
  { code: 'PHY 102', name: 'General Physics II', units: 3 },
  { code: 'PHY 104', name: 'General Physics IV', units: 3 },
  { code: 'CHM 102', name: 'General Chemistry II', units: 3 },
  { code: 'PHY 108', name: 'General Physics Practical II', units: 1 },
  { code: 'CHM 108', name: 'General Chemistry Practical II', units: 1 },
  { code: 'CPE 102 / CSC 102', name: 'Introduction to Computing II', units: 2 },
  { code: 'ENG 102 / GET 102', name: 'Engineering Drawing/Graphics', units: 2 },
  { code: 'Workshop Practice', name: 'Workshop Practice', units: 1 },
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
        <p className="mt-2 text-lg">Level: 100L | Selected Units: <span className="font-bold">{totalUnits}</span></p>
      </div>

      {/* Semester Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <h3 className="text-lg font-bold text-black">First Semester</h3>
              <p className="text-sm text-gray-600">{firstSemesterCourses.length} courses</p>
            </div>
          </div>
        </button>

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
              <h3 className="text-lg font-bold text-black">Second Semester</h3>
              <p className="text-sm text-gray-600">{secondSemesterCourses.length} courses</p>
            </div>
          </div>
        </button>
      </div>

      {/* Courses List */}
      {activeSemester && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-black">
            {activeSemester === 'first' ? 'First' : 'Second'} Semester Courses
          </h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {coursesToShow.map(course => (
              <label key={course.code} className="flex items-center gap-4 p-4 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.code)}
                  onChange={() => toggleCourse(course.code)}
                  className="w-5 h-5 accent-green-600"
                />
                <div className="flex-1">
                  <p className="font-bold text-black text-base">{course.code} - {course.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{course.units} Units</p>
                </div>
              </label>
            ))}
          </div>

          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
            Submit Courses
          </button>
        </div>
      )}
    </div>
  )
}