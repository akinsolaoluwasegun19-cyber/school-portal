'use client'
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from '../lib/supabase'

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const menu = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Courses', href: '/courses' },
    { name: 'Payments', href: '/payments' },
    { name: 'Invoices', href: '/invoices' },
  ]

  return (
    <>
      {/* Mobile header bar - 64px tall */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white z-50 flex items-center justify-between px-4 shadow-lg">
        <span className="text-lg font-bold">School Portal</span>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile menu drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)}>
          <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-900 text-white p-4" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-2">
              {menu.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setOpen(false)} 
                  className={`block px-3 py-2 rounded ${pathname === item.href ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
                >
                  {item.name}
                </Link>
              ))}
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800 text-red-400">
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  )
} 
// force 
