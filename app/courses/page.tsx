'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useUser } from '@supabase/auth-helpers-react'

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('first')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]) // for checkboxes
  const user = useUser()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*')
    setCourses(data || [])
  }

  const toggleCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId) // uncheck
        : [...prev, courseId] // check
    )
  }

  const handleSubmit = async () => {
    if (selectedCourses.length === 0) {
      alert('Select at least 1 course bro')
      return
    }
    // Save to course_registrations table
    const inserts = selectedCourses.map(courseId => ({
      user_id: user?.id,
      course_id: courseId,
      semester: activeTab
    }))
    await supabase.from('course_registrations').insert(inserts)
    alert('Courses registered successfully!')
    setSelectedCourses([])
  }

  const filteredCourses = courses.filter(c => c.semester?.toLowerCase() === activeTab)
  const isAdmin = user?.email?.includes('admin') // change this to your admin check logic

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Course Registration</h1>
        {isAdmin && (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            + Add Course
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab('first')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'first' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          First Semester
        </button>
        <button
          onClick={() => setActiveTab('second')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'second' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Second Semester
        </button>
      </div>

      {/* Course list */}
      <div className="space-y-4">
        {filteredCourses.map(course => (
          <div key={course.id} className="border rounded-lg p-4 flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedCourses.includes(course.id)}
              onChange={() => toggleCourse(course.id)}
              className="w-5 h-5 cursor-pointer"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{course.course_code}</h3>
              <p className="text-gray-700">{course.course_name}</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">{course.units} Units</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">100L</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">First Sem</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit button for students */}
      {!isAdmin && selectedCourses.length > 0 && (
        <button 
          onClick={handleSubmit}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-8 py-3 rounded-full shadow-lg font-bold"
        >
          Submit Courses ({selectedCourses.length})
        </button>
      )}
    </div>
  )
}