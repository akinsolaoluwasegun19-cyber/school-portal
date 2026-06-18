'use client'
import './globals.css'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CreditCard, BookOpen, FileText, LogOut, GraduationCap, Menu, X } from "lucide-react"
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
  ]

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-50">
          
          {/* Mobile menu button - only shows on phone */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-lg shadow-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Sidebar - hidden on mobile, visible on desktop */}
          <aside className={`fixed md:relative z-40 w-64 bg-green-600 text-white min-h-screen p-6 flex-col transition-all duration-300 ${
            sidebarOpen ? 'left-0' : '-left-64 md:left-0'
          }`}>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap size={28} />
              <h1 className="text-2xl font-bold">Bells Portal</h1>
            </div>
            
            <nav className="space-y-2 flex-1">
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
                </Link>
              ))}
            </nav>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 hover:bg-green-700 p-3 rounded-lg w-full text-left mt-auto"
            >
              <LogOut size={20} /> Logout
            </button>
          </aside>

          {/* Overlay when sidebar open on mobile */}
          {sidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content - full width on mobile */}
          <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8 w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}