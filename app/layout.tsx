'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden bg-gray-50`}>
        <div className="flex min-h-screen">
          
          {/* Mobile menu button - only shows on small screens */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-4 left-4 z-50 md:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Sidebar */}
          <aside className={`
            fixed md:static inset-y-0 left-0 z-40 
            w-64 bg-green-600 text-white p-4 
            transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="flex items-center gap-2 mb-8 mt-12 md:mt-0">
              <div className="bg-white rounded-full p-2">🎓</div>
              <h1 className="text-xl font-bold">Bells Portal</h1>
            </div>
            
            {/* Nav links - update the hrefs to match your routes */}
            <nav className="space-y-2">
              <a href="/dashboard" className="block p-2 rounded hover:bg-green-700">Dashboard</a>
              <a href="/payment" className="block p-2 rounded bg-white text-green-600">Payment Info</a>
              <a href="/courses" className="block p-2 rounded hover:bg-green-700">Courses</a>
              <a href="/student-info" className="block p-2 rounded hover:bg-green-700">Results</a>
              <a href="/logout" className="block p-2 rounded hover:bg-green-700">Logout</a>
            </nav>
          </aside>

          {/* Main content - pushes right on desktop, full width on mobile */}
          <main className="flex-1 md:ml-64 w-full p-4 md:p-8 pt-20 md:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}