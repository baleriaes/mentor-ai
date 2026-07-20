import "./globals.css";
import Link from "next/link";
import {
  Brain,
  House,
  BookOpen,
  Bot,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";

export const metadata = {
  title: "MentorAI",
  description: "Study Smarter with AI",
};

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: House,
  },
  {
    href: "/upload",
    label: "Study",
    icon: BookOpen,
  },
  {
    href: "/chat",
    label: "AI Tutor",
    icon: Bot,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="rounded-xl bg-cyan-500/10 p-2">
                <Brain
                  size={24}
                  className="text-cyan-400"
                />
              </div>

              <div className="text-3xl font-extrabold tracking-tight">
                <span className="text-white">
                  Mentor
                </span>

                <span className="text-cyan-400">
                  AI
                </span>
              </div>
            </Link>

            {/* Navigation */}

            <nav className="flex items-center gap-8">

              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-300 transition-all hover:bg-slate-900 hover:text-cyan-400"
                  >
                    <Icon size={18} />

                    {item.label}
                  </Link>
                );
              })}

            </nav>

            {/* Profile */}

            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              <UserCircle size={20} />

              Profile
            </Link>

          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}