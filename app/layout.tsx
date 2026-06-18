import './globals.css'
import Link from 'next/link'
import { LayoutDashboard, BookOpen, FileText, CreditCard, LogOut } from 'lucide-react'

export const metadata = {
  title: 'Bells Portal',
  description: 'Student Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex min-h-screen">
          {/* Green Sidebar */}
          <aside className="w-64 bg-green-600 text-white p-6 hidden md:flex flex-col fixed h-full">
            <h1 className="text-2xl font-bold mb-8">Bells Portal</h1>
            
            <nav className="space-y-2 flex-1">
              <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>

              <Link href="/courses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition">
                <BookOpen size={20} />
                <span>Courses</span>
              </Link>

              <Link href="/results" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition">
                <FileText size={20} />
                <span>Results</span>
              </Link>

              {/* PAYMENT INFO - Active/Highlighted */}
              <Link href="/payment" className="flex items-center gap-3 p-3 rounded-lg bg-white text-green-600 font-bold">
                <CreditCard size={20} />
                <span>Payment Info</span>
              </Link>
            </nav>

            {/* LOGOUT - At bottom */}
            <Link href="/logout" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition mt-auto">
              <LogOut size={20} />
              <span>Logout</span>
            </Link>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8 md:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}