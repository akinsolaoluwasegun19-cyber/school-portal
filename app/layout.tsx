// test save 2026-04-18
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          {/* Sidebar + Header go here via client components */}
          {children}
        </div>
      </body>
    </html>
  )
}