// test save 2026-04-18
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { MobileHeader } from '@/components/MobileHeader'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Sidebar />
        <MobileHeader />
        <main className="pt-20 md:pt-8 md:pl-72 p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  )
}