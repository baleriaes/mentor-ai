import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "MentorAI",
  description: "AI Study Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">

        <nav className="flex justify-between items-center p-6 border-b border-slate-800">

          <Link href="/" className="text-3xl font-bold text-cyan-400">
            MentorAI
          </Link>

          <div className="flex gap-6">

            <Link href="/">Home</Link>

            <Link href="/upload">Upload</Link>

            <Link href="/chat">Chat</Link>

            <Link href="/dashboard">Dashboard</Link>

          </div>

        </nav>

        {children}

      </body>
    </html>
  );
}