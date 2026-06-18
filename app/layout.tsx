'use client' // <- Must be line 1, no space above it
import './globals.css'
import { useState } from 'react'
import { Menu, X, LayoutDashboard, BookOpen, FileText } from 'lucide-react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Results', href: '/student-info', icon: FileText },
    { name: 'Payment', href: '/payment', icon: LayoutDashboard },
  ]

  return (
    <html lang="en">
      <body className="bg-gray-50">

        {/* Mobile hamburger button - z-[9999] to force it on top */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-[9999] md:hidden bg-green-600 text-white p-3 rounded-lg shadow-lg"
        >
          {sidebarOpen? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-green-600 text-white transform transition-transform duration-300 z-40
          ${sidebarOpen? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <div className="p-6 mt-16 md:mt-0">
            <h2 className="text-2xl font-bold mb-8">Bells Portal</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition"
                  >
                    <Icon size={20} />
                    {item.name}
                  </a>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile overlay - only shows when sidebar open */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          />
        )}

        {/* Main content */}
        <main className="md:ml-64 min-h-screen p-4 md:p-8 pt-20 md:pt-8">
          {children}
        </main>
      </body>
    </html>
  )
}