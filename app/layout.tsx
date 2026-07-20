import "./globals.css";
import Link from "next/link";
import {
  Brain,
  House,
  Upload,
  Bot,
  LayoutDashboard,
  UserCircle,
  FileText,
  BrainCircuit,
  CircleHelp,
} from "lucide-react";


export const metadata = {
  title: "MentorAI",
  description: "Study Smarter with AI",
};



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
size={26}
className="text-cyan-400"
/>

</div>


<div className="text-3xl font-extrabold">

<span>
Mentor
</span>

<span className="text-cyan-400">
AI
</span>

</div>


</Link>







{/* Navigation */}


<nav className="flex items-center gap-3">





<Link
href="/"
className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-cyan-400"
>

<House size={17}/>

Home

</Link>







<Link
href="/dashboard"
className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-cyan-400"
>

<LayoutDashboard size={17}/>

Dashboard

</Link>







<Link
href="/upload"
className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-400"
>

<Upload size={17}/>

Upload PDF

</Link>








<Link
href="/summary"
className="hidden items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-cyan-400 md:flex"
>

<FileText size={17}/>

Summary

</Link>








<Link
href="/flashcards"
className="hidden items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-cyan-400 md:flex"
>

<BrainCircuit size={17}/>

Flashcards

</Link>








<Link
href="/quiz"
className="hidden items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-cyan-400 md:flex"
>

<CircleHelp size={17}/>

Quiz

</Link>








<Link
href="/chat"
className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-cyan-400"
>

<Bot size={17}/>

Tutor

</Link>






</nav>









{/* Profile */}


<Link
href="/profile"
className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:border-cyan-400 hover:text-cyan-400"
>


<UserCircle size={20}/>

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