'use client'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, CreditCard, BookOpen, FileText, LogOut } from "lucide-react"
import { supabase } from '@/lib/supabase'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const menu = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Invoices', href: '/invoices', icon: FileText },
  ]

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900 text-white z-40">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
          <span className="text-xl font-bold">School Portal</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  )
}