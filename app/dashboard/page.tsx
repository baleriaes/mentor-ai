"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStudySession, StudySession } from "@/lib/studyStore";
import DashboardQuickActions from "@/components/DashboardQuickActions";


export default function Dashboard() {


  const [session,setSession] = useState<StudySession | null>(null);



  useEffect(()=>{

    setSession(getStudySession());

  },[]);




  const wordCount = session
    ? session.text.trim().split(/\s+/).filter(Boolean).length
    : 0;




return (

<main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">


<div className="mx-auto max-w-7xl px-8 py-16">





<section className="mb-12">


<h1 className="text-5xl font-bold">

Welcome Back 👋

</h1>


<p className="mt-4 text-lg text-slate-400">

Your personal AI learning workspace.

</p>


</section>







<section className="grid gap-6 md:grid-cols-4">



<div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

<p className="text-slate-400">
Documents
</p>

<h2 className="mt-3 text-4xl font-bold">
{session ? 1 : 0}
</h2>

<p className="mt-2 text-sm text-slate-500">
Uploaded PDFs
</p>

</div>





<div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

<p className="text-slate-400">
Words Studied
</p>

<h2 className="mt-3 text-4xl font-bold">
{wordCount.toLocaleString()}
</h2>

<p className="mt-2 text-sm text-slate-500">
Extracted concepts
</p>

</div>






<div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

<p className="text-slate-400">
Learning Tools
</p>

<h2 className="mt-3 text-4xl font-bold">
4
</h2>

<p className="mt-2 text-sm text-slate-500">
AI Features Available
</p>

</div>






<div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

<p className="text-slate-400">
Status
</p>

<h2 className="mt-3 text-xl font-bold text-cyan-400">

{session ? "Ready 🚀" : "Waiting"}

</h2>

<p className="mt-2 text-sm text-slate-500">

Study Workspace

</p>

</div>



</section>








<section className="mt-12 rounded-3xl border border-slate-700 bg-slate-900 p-8">



<h2 className="text-3xl font-bold">

Your Learning Journey

</h2>



{session ? (


<>


<div className="mt-6 rounded-2xl bg-slate-950 p-6">


<h3 className="text-2xl font-bold">

📘 {session.filename}

</h3>


<p className="mt-3 text-slate-400">

Uploaded:

{" "}

{new Date(session.uploadedAt).toLocaleDateString()}

</p>


</div>






<div className="mt-8 grid gap-5 md:grid-cols-4">


<Link href="/summary"

className="rounded-2xl bg-slate-950 p-6 hover:ring-2 hover:ring-cyan-400">

📝

<h3 className="mt-3 font-bold">

Summary

</h3>

<p className="mt-2 text-sm text-slate-400">

Understand concepts

</p>

</Link>





<Link href="/flashcards"

className="rounded-2xl bg-slate-950 p-6 hover:ring-2 hover:ring-cyan-400">

🧠

<h3 className="mt-3 font-bold">

Flashcards

</h3>

<p className="mt-2 text-sm text-slate-400">

Practice memory

</p>

</Link>





<Link href="/quiz"

className="rounded-2xl bg-slate-950 p-6 hover:ring-2 hover:ring-cyan-400">

❓

<h3 className="mt-3 font-bold">

Quiz

</h3>

<p className="mt-2 text-sm text-slate-400">

Test yourself

</p>

</Link>





<Link href="/chat"

className="rounded-2xl bg-slate-950 p-6 hover:ring-2 hover:ring-cyan-400">

🤖

<h3 className="mt-3 font-bold">

AI Tutor

</h3>

<p className="mt-2 text-sm text-slate-400">

Ask questions

</p>

</Link>



</div>



</>


) : (


<div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-10 text-center">


<h3 className="text-2xl font-bold">

Start Your First Study Session

</h3>


<p className="mt-3 text-slate-400">

Upload a PDF and MentorAI will create your learning workspace.

</p>


<Link

href="/upload"

className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950"

>

Upload PDF

</Link>


</div>


)}


</section>







<DashboardQuickActions />







<section className="mt-12 rounded-3xl border border-slate-700 bg-slate-900 p-8">


<h2 className="text-3xl font-bold">

How MentorAI Helps You

</h2>



<div className="mt-6 space-y-4">


<div className="rounded-xl bg-slate-950 p-5">

📄 Understand difficult material with AI summaries.

</div>


<div className="rounded-xl bg-slate-950 p-5">

🧠 Strengthen memory through active recall.

</div>


<div className="rounded-xl bg-slate-950 p-5">

🎓 Learn concepts with your personal AI tutor.

</div>


</div>


</section>





</div>


</main>

);

}