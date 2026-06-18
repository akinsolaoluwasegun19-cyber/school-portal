"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard, BookOpen, Award, LogOut, GraduationCap } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

const menu = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Payment Info", href: "/payment", icon: CreditCard },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Results", href: "/results", icon: Award },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          
          {/* Sidebar with curved right edge ONLY change here */}
          <div className="bg-green-600 h-screen w-64 p-6 text-white fixed left-0 top-0 rounded-r-3xl">
            
            {/* Logo + Title */}
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={40} className="bg-white text-green-600 p-2 rounded-full" />
              <h1 className="text-2xl font-bold">Bells Portal</h1>
            </div>
            
            {/* Menu */}
            <nav className="space-y-2">
              {menu.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive 
                        ? "bg-white text-green-600 font-bold" 
                        : "hover:bg-green-700"
                    }`}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
              
              <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 w-full mt-8">
                <LogOut size={20} />
                Logout
              </button>
            </nav>
          </div>

          {/* Main content */}
          <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}