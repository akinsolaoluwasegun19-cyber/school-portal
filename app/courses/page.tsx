'use client'
import { useState } from 'react'
import { BookOpen, Save } from 'lucide-react'

export default function CoursesPage() {
  // Later: replace this with student level from login/session
  const [studentLevel, setStudentLevel] = useState('100')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  // Replace this with your real Bells course list
  const allCourses = {
    '100': [
      { code: 'CSC 101', title: 'Intro to Computer Science', unit: 3 },
      { code: 'CSC 102', title: 'Programming I', unit: 3 },
      { code: 'MTH 101', title: 'General Mathematics I', unit: 2 },
      { code: 'GST 101', title: 'Use of English I', unit: 2 },
      { code: 'GST 103', title: 'Nigerian Peoples & Culture', unit: 2 },
    ],
    '200': [
      { code: 'CSC 201', title: 'Data Structures', unit: 3 },
      { code: 'CSC 202', title: 'Programming II', unit: 3 },
      { code: 'CSC 203', title: 'Digital Logic', unit: 2 },
      { code: 'MTH 201', title: 'General Mathematics III', unit: 2 },
    ],
    '300': [
      { code: 'CSC 301', title: 'Database Systems', unit: 3 },
      { code: 'CSC 302', title: 'Web Development', unit: 2 },
      { code: 'CSC 303', title: 'Operating Systems', unit: 3 },
    ],
    '400': [
      { code: 'CSC 401', title: 'Software Engineering', unit: 3 },
      { code: 'CSC 402', title: 'Project', unit: 6 },
    ]
  }

  const coursesForLevel = allCourses[studentLevel] || []
  const totalUnits = coursesForLevel
   .filter(c => selectedCourses.includes(c.code))
   .reduce((sum, c) => sum + c.unit, 0)

  const toggleCourse = (code: string) => {
    setSelectedCourses(prev =>
      prev.includes(code)
       ? prev.filter(c => c!== code)
        : [...prev, code]
    )
  }

  const saveCourses = () => {
    if (totalUnits > 24) {
      alert(`⚠️ Total units ${totalUnits} exceeds 24 units limit!`)
      return
    }
    alert(`✅ Saved! You selected: ${selectedCourses.join(', ')}\nTotal Units: ${totalUnits}`)
    // Later: send to API/database here
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-green-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <BookOpen /> Course Registration
        </h1>
        <p className="text-green-100 mt-2">
          Level: {studentLevel} | Total Units Selected: {totalUnits}/24
        </p>
      </div>

      {/* Temp Level Selector - Remove after login */}
      <div className="bg-yellow-50 border-yellow-200 p-4 rounded-lg text-sm">
        <span className="font-medium text-yellow-800">⚠️ Temp:</span>
        <span className="text-yellow-700 ml-2">Change level here. After login this will auto-detect from student profile</span>
        <select
          value={studentLevel}
          onChange={(e) => {setStudentLevel(e.target.value); setSelectedCourses([])}}
          className="ml-3 p-2 border-yellow-300 rounded-lg bg-white"
        >
          <option value="100">100 Level</option>
          <option value="200">200 Level</option>
          <option value="300">300 Level</option>
          <option value="400">400 Level</option>
        </select>
      </div>

      {/* Course List */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {studentLevel} Level Courses
        </h2>

        <div className="space-y-3">
          {coursesForLevel.length > 0? (
            coursesForLevel.map((course) => (
              <label
                key={course.code}
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-green-50 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.code)}
                  onChange={() => toggleCourse(course.code)}
                  className="w-5 h-5 text-green-600 rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{course.code} - {course.title}</p>
                  <p className="text-sm text-gray-500">{course.unit} Units</p>
                </div>
              </label>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No courses found for {studentLevel} Level</p>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={saveCourses}
          disabled={selectedCourses.length === 0}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          <Save size={20} /> Save Selected Courses
        </button>
      </div>
    </div>
  )
}