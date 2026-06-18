'use client'
import { useState } from 'react'
import { allCourses } from '../../lib/courses'

export default function CourseRegistration() {
  const [selectedSemester, setSelectedSemester] = useState<'First' | 'Second'>('First')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  const semesterCourses = allCourses.filter(c => c.semester === selectedSemester)
  
  const totalUnits = selectedCourses.reduce((sum, code) => {
    const course = allCourses.find(c => c.code === code)
    return sum + (course?.unit || 0)
  }, 0)

  const toggleCourse = (code: string) => {
    setSelectedCourses(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    )
  }

  const handleSubmit = () => {
    alert(`Submitted ${selectedCourses.length} courses, ${totalUnits} units for ${selectedSemester} Semester`)
    // Later we’ll save to database here
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Green Header */}
      <div className="bg-green-600 text-white p-6 rounded-xl mb-6">
        <h1 className="text-2xl font-bold">Course Registration</h1>
        <p className="mt-2 opacity-90">Level: 100L | Selected Units: {totalUnits}</p>
      </div>

      {/* Semester Tabs - like tuition fee bar */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSelectedSemester('First')}
          className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
            selectedSemester === 'First'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          First Semester
        </button>
        <button
          onClick={() => setSelectedSemester('Second')}
          className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
            selectedSemester === 'Second'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Second Semester
        </button>
      </div>

      {/* Courses List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{selectedSemester} Semester Courses</h2>
        
        {semesterCourses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No courses added for {selectedSemester} Semester yet</p>
        ) : (
          <div className="space-y-3">
            {semesterCourses.map(course => (
              <label 
                key={course.code} 
                className="flex items-center gap-4 p-4 border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 cursor-pointer transition"
              >
                <input 
                  type="checkbox"
                  checked={selectedCourses.includes(course.code)}
                  onChange={() => toggleCourse(course.code)}
                  className="w-5 h-5 accent-green-600"
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{course.code} - {course.title}</p>
                  <p className="text-sm text-gray-600">{course.unit} Unit{course.unit > 1 ? 's' : ''}</p>
                </div>
              </label>
            ))}
          </div>
        )}

        <button 
          onClick={handleSubmit}
          disabled={selectedCourses.length === 0}
          className="mt-6 w-full bg-green-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Submit {selectedSemester} Semester Courses
        </button>
      </div>
    </div>
  )
}