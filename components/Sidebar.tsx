'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, FileText, CreditCard, LogOut } from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Results', href: '/results', icon: FileText },
  { name: 'Payment Info', href: '/payment', icon: CreditCard },
  { name: 'Tuition', href: '/tuition', icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-green-600 min-h-screen p-4 flex-col">
      <h1 className="text-white text-2xl font-bold mb-8 px-4">Bells Portal</h1>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-green-800 text-white font-bold shadow-lg'
                  : 'text-green-100 hover:bg-green-700'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 text-green-100 hover:bg-green-700 rounded-lg mt-auto w-full">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  )
}