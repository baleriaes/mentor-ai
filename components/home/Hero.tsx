"use client";

import Link from "next/link";
import { ArrowRight, Brain, Sparkles } from "@/components/ui/Icons";


export default function Hero() {

  return (

    <section className="relative overflow-hidden py-28">


      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      </div>





      <div className="mx-auto flex max-w-7xl flex-col items-center px-8 text-center">





        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">

          <Sparkles size={16}/>

          AI-Powered Learning Workspace

        </div>







        <div className="mb-8 flex items-center gap-4">


          <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">

            <Brain size={42}/>

          </div>



          <h1 className="text-5xl font-black tracking-tight md:text-7xl">

            Mentor
            <span className="text-cyan-400">
              AI
            </span>

          </h1>


        </div>







        <h2 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">


          Transform Your Study Materials Into


          <span className="block text-cyan-400">

            Your Personal AI Learning Assistant

          </span>


        </h2>








        <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-400">


          Upload your notes, textbooks, or PDFs and let MentorAI create
          summaries, flashcards, quizzes, and personalized tutoring
          designed around how you learn.


        </p>








        <div className="mt-12 flex flex-col gap-4 sm:flex-row">


          <Link

            href="/upload"

            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400"

          >

            Upload Study Material

            <ArrowRight size={18}/>

          </Link>





          <Link

            href="/chat"

            className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-semibold transition hover:border-cyan-400 hover:text-cyan-400"

          >

            Try AI Tutor

          </Link>



        </div>









        <div className="mt-16 grid max-w-4xl gap-4 md:grid-cols-3">



          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-cyan-400 font-bold">
              1
            </p>

            <p className="mt-2 font-semibold">
              Upload
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Add your study materials.
            </p>

          </div>






          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-cyan-400 font-bold">
              2
            </p>

            <p className="mt-2 font-semibold">
              Understand
            </p>

            <p className="mt-2 text-sm text-slate-400">
              AI analyzes important concepts.
            </p>

          </div>







          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-cyan-400 font-bold">
              3
            </p>

            <p className="mt-2 font-semibold">
              Study Smarter
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Practice with AI tools.
            </p>

          </div>




        </div>






      </div>


    </section>

  );

}