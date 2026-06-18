'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { ArrowLeft, Camera, Upload } from "lucide-react"

export default function StudentInfoPage() {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    department: '',
    state: '',
    dob: '',
    address: ''
  })
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const result = await supabase.auth.getUser()
    const user = result.data.user

    if (user) {
      const { data } = await supabase
       .from('profiles')
       .select('*')
       .eq('id', user.id)
       .single()

      if (data) {
        setProfile(data)
        setAvatarUrl(data.avatar_url || '')
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || '',
          department: data.department || '',
          state: data.state || '',
          dob: data.dob || '',
          address: data.address || ''
        })
      }
    }
  }

  const uploadAvatar = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const result = await supabase.auth.getUser()
    const user = result.data.user

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
     .from('avatars')
     .upload(filePath, file, { upsert: true })

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    setAvatarUrl(data.publicUrl)

    // Save to profiles table immediately
    await supabase.from('profiles').upsert({
      id: user.id,
      avatar_url: data.publicUrl
    })

    setUploading(false)
    alert('Photo uploaded! ✅')
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const result = await supabase.auth.getUser()
    const user = result.data.user

    if (!user) {
      alert('You must be logged in')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      avatar_url: avatarUrl,
      matric_no: profile?.matric_no || null,
     ...formData
    })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Information saved successfully! ✅')
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">

      <div className="bg-green-600 text-white p-6 rounded-2xl mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-3"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">Student Information</h1>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* PHOTO UPLOAD SECTION - Added at top */}
        <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-200">
          <div className="relative w-32 h-32 mb-4">
            {avatarUrl? (
              <img
                src={avatarUrl}
                alt="Student"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-dashed border-gray-400 flex items-center justify-center">
                <Camera size={40} className="text-gray-500" />
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={uploadAvatar}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            <Upload size={18} />
            {uploading? 'Uploading...' : avatarUrl? 'Change Photo' : 'Upload Photo'}
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Upload passport photo. You can use camera, gallery, or Google Drive
          </p>
        </div>

        {/* Matric warning - now below photo */}
        {!profile?.matric_no && (
          <div className="bg-yellow-100 border-yellow-300 text-yellow-800 p-4 rounded-lg mb-6">
            ⚠️ No matric number assigned yet. Admin will add it after admission.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={e => setFormData({...formData, full_name: e.target.value})}
              className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              placeholder="Akinsola Damola John"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="080xxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Date of Birth *</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={e => setFormData({...formData, dob: e.target.value})}
                className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Department *</label>
            <select
              required
              value={formData.department}
              onChange={e => setFormData({...formData, department: e.target.value})}
              className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mass Communication">Mass Communication</option>
              <option value="Accounting">Accounting</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Economics">Economics</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">State of Origin</label>
            <input
              type="text"
              value={formData.state}
              onChange={e => setFormData({...formData, state: e.target.value})}
              className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              placeholder="Lagos"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Home Address</label>
            <textarea
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 outline-none"
              rows={3}
              placeholder="Enter your full address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg disabled:opacity-50 transition"
          >
            {loading? 'Saving...' : 'Save Information'}
          </button>
        </form>
      </div>
    </div>
  )
}