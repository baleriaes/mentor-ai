"use client";

import { useState } from "react";
import Link from "next/link";
import UploadCard from "@/components/UploadCard";
import { setStudySession } from "@/lib/studyStore";


export default function UploadPage() {


  const [fileName, setFileName] = useState("");
  const [uploadedAt, setUploadedAt] = useState("");



  function handleUploadComplete(text:string,name:string){


    const date = new Date().toISOString();


    setFileName(name);

    setUploadedAt(date);



    setStudySession({

      filename:name,

      text,

      uploadedAt:date,

    });


  }





return (

<main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">


<section className="mx-auto max-w-6xl px-8 py-16">





<div className="mb-14 text-center">


<h1 className="text-5xl font-bold">

📚 Your AI Study Workspace

</h1>



<p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">

Upload your study material and let MentorAI transform it into
an interactive learning experience.

</p>


</div>







<UploadCard

onUploadComplete={handleUploadComplete}

/>







{!fileName && (


<section className="mt-14 rounded-3xl border border-slate-700 bg-slate-900 p-8">



<h2 className="text-3xl font-bold">

How MentorAI Helps You Learn

</h2>



<p className="mt-4 text-slate-400">

One upload creates your complete AI-powered study environment.

</p>





<div className="mt-8 grid gap-6 md:grid-cols-3">



<div className="rounded-2xl bg-slate-950 p-6">

<p className="text-cyan-400 font-bold">
01
</p>

<h3 className="mt-3 text-xl font-bold">
Upload
</h3>

<p className="mt-3 text-slate-400">
Add your PDF notes, textbooks, or study guides.
</p>

</div>





<div className="rounded-2xl bg-slate-950 p-6">

<p className="text-cyan-400 font-bold">
02
</p>

<h3 className="mt-3 text-xl font-bold">
AI Understands
</h3>

<p className="mt-3 text-slate-400">
MentorAI analyzes important concepts from your material.
</p>

</div>






<div className="rounded-2xl bg-slate-950 p-6">

<p className="text-cyan-400 font-bold">
03
</p>

<h3 className="mt-3 text-xl font-bold">
Study Smarter
</h3>

<p className="mt-3 text-slate-400">
Generate summaries, flashcards, quizzes, and tutoring.
</p>

</div>




</div>


</section>

)}







{fileName && (


<section className="mt-12">



<div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-8">



<h2 className="text-3xl font-bold">

🎉 Your AI Study Workspace Is Ready

</h2>



<p className="mt-5 text-xl">

📘 {fileName}

</p>




<p className="mt-3 text-slate-300">

Uploaded:

{" "}

{new Date(uploadedAt).toLocaleString()}

</p>





<div className="mt-8 grid gap-4 md:grid-cols-4">



<Link

href="/summary"

className="rounded-xl bg-slate-950 p-5 hover:ring-2 hover:ring-cyan-400"

>

📝

<p className="mt-2 font-bold">
Summary
</p>

</Link>





<Link

href="/flashcards"

className="rounded-xl bg-slate-950 p-5 hover:ring-2 hover:ring-cyan-400"

>

🧠

<p className="mt-2 font-bold">
Flashcards
</p>

</Link>





<Link

href="/quiz"

className="rounded-xl bg-slate-950 p-5 hover:ring-2 hover:ring-cyan-400"

>

❓

<p className="mt-2 font-bold">
Quiz
</p>

</Link>





<Link

href="/chat"

className="rounded-xl bg-slate-950 p-5 hover:ring-2 hover:ring-cyan-400"

>

🤖

<p className="mt-2 font-bold">
AI Tutor
</p>

</Link>



</div>



</div>



</section>


)}





</section>


</main>

);

}