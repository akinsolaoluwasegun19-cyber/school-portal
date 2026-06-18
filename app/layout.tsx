'use client'
import './globals.css'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CreditCard, BookOpen, FileText, LogOut, GraduationCap, Menu, X, Bell } from "lucide-react"
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const menu = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Payment Info', href: '/payment', icon: CreditCard },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Results', href: '/results', icon: FileText },
    { name: 'Tuition', href: '/tuition', icon: CreditCard },
  ]

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Mobile menu button - matches your 2nd screenshot */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-lg shadow-lg"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Sidebar - slides in from left */}
        <aside className={`fixed top-0 left-0 h-full w-64 bg-green-600 text-white p-6 z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Bells Portal</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className="space-y-3">
            {menu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  pathname === item.href ? 'bg-white text-green-600 font-bold' : 'hover:bg-green-700'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </button>
            ))}
          </nav>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 hover:bg-green-700 p-3 rounded-lg w-full text-left mt-8 absolute bottom-6 left-6 right-6"
          >
            <LogOut size={20} /> Logout
          </button>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content - full width on mobile */}
        <main className="p-6 pt-20 md:p-8">
          {children}
        </main>
      </body>
    </html>
  )
}