'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Course = {
  id: number
  course_code: string
  course_name: string
  units: number
  semester: string
  level: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('course_code')
      
      if (error) {
        console.error('Error:', error)
      } else {
        setCourses(data || [])
      }
      setLoading(false)
    }
    fetchCourses()
  }, [])

  if (loading) return <div className="p-8">Loading courses...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>
      <div className="grid gap-4">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded-lg">
            <h3 className="font-bold text-lg">{course.course_code}</h3>
            <p>{course.course_name}</p>
            <p className="text-sm text-gray-600">
              {course.units} units | {course.semester} | {course.level}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}