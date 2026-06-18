'use client'  // <- THIS LINE IS CRITICAL. Don't remove it
import './globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Menu, X, LayoutGrid, CreditCard, BookOpen, FileText, LogOut, Bell, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Payment Info', href: '/payment', icon: CreditCard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Results', href: '/student-info', icon: FileText },
  { name: 'Logout', href: '/logout', icon: LogOut },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden bg-gray-50`}>
        <div className="flex min-h-screen">
          
          {/* Mobile Hamburger - z-50 so it stays on top */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-4 left-4 z-50 md:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile backdrop - z-30, lower than button */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar - z-40, between button and backdrop */}
          <aside className={`
            fixed md:static inset-y-0 left-0 z-40 
            w-64 bg-green-600 text-white p-4 rounded-r-2xl
            transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white rounded-full p-2">
                <User size={20} className="text-green-600" />
              </div>
              <h1 className="text-xl font-bold">Bells Portal</h1>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      isActive 
                        ? 'bg-white text-green-600 font-semibold' 
                        : 'hover:bg-green-700 text-white'
                    }`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 md:ml-64 w-full p-4 md:p-8 pt-20 md:pt-8 bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}