"use client";

import Link from "next/link";
import { ArrowRight, Brain, Sparkles } from "@/components/ui/Icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>


      <div className="mx-auto flex max-w-7xl flex-col items-center px-8 text-center">


        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">

          <Sparkles size={16} />

          Your AI Study Companion

        </div>



        {/* Logo */}
        <div className="mb-6 flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">

            <Brain size={42} />

          </div>


          <h1 className="text-5xl font-black tracking-tight md:text-7xl">

            Mentor
            <span className="text-cyan-400">
              AI
            </span>

          </h1>

        </div>



        {/* Main Heading */}
        <h2 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">

          Turn Any PDF Into

          <span className="block text-cyan-400">

            Your Personal AI Tutor

          </span>

        </h2>




        {/* Description */}
        <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-400">

          Upload your study materials and transform them into summaries,
          flashcards, quizzes, and personalized AI tutoring in seconds.

        </p>




        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">


          <Link
            href="/upload"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400"
          >

            Start Studying

            <ArrowRight size={18} />

          </Link>



          <Link
            href="/dashboard"
            className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-semibold transition hover:border-cyan-400 hover:text-cyan-400"
          >

            View Dashboard

          </Link>


        </div>





        {/* Feature Pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">


          {[
            "AI Summary",
            "Flashcards",
            "Smart Quiz",
            "AI Tutor",
          ].map((item) => (

            <div
              key={item}
              className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-300"
            >

              ✓ {item}

            </div>

          ))}


        </div>



      </div>


    </section>
  );
}