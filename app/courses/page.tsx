'use client'
import { useState } from 'react'
import { allCourses } from '../../lib/courses'

export default function CoursesPage() {
  // Later: get student level from profile. For now hardcode 100L
  const studentLevel = '100L'
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  
  const levelCourses = allCourses.filter(c => c.level === studentLevel)
  const firstSem = levelCourses.filter(c => c.semester === 'First')
  const secondSem = levelCourses.filter(c => c.semester === 'Second')

  const toggleCourse = (code: string) => {
    setSelectedCourses(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  const totalUnits = levelCourses
    .filter(c => selectedCourses.includes(c.code))
    .reduce((sum, c) => sum + c.unit, 0)

  const handleSubmit = () => {
    alert(`Registered ${selectedCourses.length} courses\nTotal Units: ${totalUnits}\n\nCourses: ${selectedCourses.join(', ')}`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-green-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold">Course Registration</h1>
        <p className="text-green-100">Level: {studentLevel} | Selected Units: {totalUnits}</p>
      </div>

      {/* First Semester */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-800">First Semester</h2>
        <div className="space-y-2">
          {firstSem.map(course => (
            <label key={course.code} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-green-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={selectedCourses.includes(course.code)}
                onChange={() => toggleCourse(course.code)}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{course.code} - {course.title}</p>
                <p className="text-sm text-gray-500">{course.unit} Unit{course.unit > 1 ? 's' : ''}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Second Semester */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Second Semester</h2>
        <div className="space-y-2">
          {secondSem.map(course => (
            <label key={course.code} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-green-50 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={selectedCourses.includes(course.code)}
                onChange={() => toggleCourse(code.code)}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{course.code} - {course.title}</p>
                <p className="text-sm text-gray-500">{course.unit} Unit{course.unit > 1 ? 's' : ''}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition text-lg"
      >
        Submit Registration - {totalUnits} Units
      </button>
    </div>
  )
}