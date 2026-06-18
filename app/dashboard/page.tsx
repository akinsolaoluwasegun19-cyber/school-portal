'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from "next/link"
import { User } from "lucide-react"

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const result = await supabase.auth.getUser()
    const user = result.data.user
    
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    }
  }

  return (
    <div className="w-full">
      {/* Welcome Card - full width on mobile */}
      <div className="bg-green-600 text-white p-6 md:p-8 rounded-2xl mb-6 w-full">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back to Bells Portal</h1>
      </div>

      {/* Student Info card - responsive width */}
      <Link href="/student-info">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer border-t-4 border-green-600 w-full max-w-md">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
              <User size={28} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Student Info</h3>
              <p className="text-gray-500 text-sm">View your details</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}