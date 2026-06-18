'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('first')
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  
  // Set to true when you want to test admin view
  const isAdmin = false 

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('courses').select('*')
    if (error) {
      console.log('Error:', error)
    } else {
      setCourses(data || [])
    }
    setLoading(false)
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
    
    const result = await supabase.auth.getUser()
    const user = result.data.user
    
    if (!user) {
      alert('Login first!')
      return
    }

    const inserts = selectedCourses.map(courseId => ({
      user_id: user.id,
      course_id: courseId,
      semester: activeTab
    }))

    const { error } = await supabase.from('course_registrations').insert(inserts)
    
    if (error) {
      alert('Error: ' + error.message)
      console.log(error)
    } else {
      alert('Courses registered successfully! ✅')
      setSelectedCourses([])
    }
  }

  const filteredCourses = courses.filter(c => 
    String(c.semester).toLowerCase() === activeTab
  )

  if (loading) return <div className="p-6">Loading courses...</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Course Registration</h1>
        
        {isAdmin && (
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            + Add Course
          </button>
        )}
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab('first')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === 'first' 
              ? 'bg-green-600 text-white shadow' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          First Semester
        </button>
        <button
          onClick={() => setActiveTab('second')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === 'second' 
              ? 'bg-green-600 text-white shadow' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Second Semester
        </button>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No courses for {activeTab} semester yet
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition"
            >
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id)}
                onChange={() => toggleCourse(course.id)}
                className="w-5 h-5 cursor-pointer accent-green-600"
              />
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{course.course_code}</h3>
                <p className="text-gray-700 mt-1">{course.course_name}</p>
                
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {course.units || 2} Units
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    100L
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {activeTab === 'first' ? 'First Sem' : 'Second Sem'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isAdmin && selectedCourses.length > 0 && (
        <button 
          onClick={handleSubmit}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-lg font-bold transition transform hover:scale-105"
        >
          Submit Courses ({selectedCourses.length})
        </button>
      )}
    </div>
  )
}