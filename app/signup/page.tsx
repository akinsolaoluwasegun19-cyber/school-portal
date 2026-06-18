'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { full_name: fullName }
      }
    })

    if (error) {
      alert('Signup failed: ' + error.message)
      setLoading(false)
      return
    }

    // 2. Create empty profile with matric_no = null
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        matric_no: null // admin will add later
      })

      if (profileError) console.log('Profile error:', profileError)

      // 3. Redirect to student info form - THIS IS THE KEY PART
      alert('Account created! Now complete your profile')
      router.push('/student-info')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Student Account</h1>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
          />
          
          <input 
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
          />
          
          <input 
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
          />
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have account? 
          <Link href="/login" className="text-green-600 font-semibold ml-1">Login</Link>
        </p>
      </div>
    </div>
  )
}