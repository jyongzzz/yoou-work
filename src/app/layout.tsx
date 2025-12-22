import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YOOU | Interaction Designer",
  description: "Portfolio of a Creative Technologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // [Config] 메뉴 구조 정의 (유지보수성을 위해 배열로 관리)
  const navItems = [
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' }, // 기존 WORK -> PROJECTS
    { name: 'PLAYGROUND', path: '/playground' }, // 신규 추가
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F9F9F8] text-[#1A1A1A] overflow-x-hidden`}>
        
        {/* [Sidebar] Desktop: Fixed Left / Mobile: Static Top */}
        <aside className="w-full md:w-64 p-6 md:fixed md:h-screen flex flex-col justify-between z-50 bg-[#F9F9F8] border-b md:border-b-0 md:border-r border-gray-200">
          
          {/* Logo */}
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-blue-600 transition-colors">
              YOOU.
            </Link>
            <p className="text-xs text-gray-400 mt-2 font-mono">
              Art x Tech <br />
              Seoul, KR
            </p>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-6 mt-8 md:mt-0">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path} 
                className="text-sm font-medium hover:translate-x-2 transition-transform duration-300 ease-out uppercase tracking-widest"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer (Desktop Only) */}
          <div className="hidden md:block text-[10px] text-gray-300 font-mono">
            <p>POWERED BY RTX 5090</p>
            <p className="mt-1">© 2025</p>
          </div>
        </aside>

        {/* [Main Content] Sidebar 너비(md:pl-64)만큼 밀어서 렌더링 */}
        <main className="w-full min-h-screen md:pl-64">
          <div className="p-6 md:p-20 w-full h-full">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}