"use client";

import Link from "next/link";
import { ArrowRight, Brain } from "@/components/ui/Icons";


export default function CTA() {

  return (

    <section className="py-28">


      <div className="mx-auto max-w-5xl px-8">


        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900">



          <div className="relative px-10 py-20 text-center">



            <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />





            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

              <Brain size={34}/>

            </div>






            <h2 className="mt-8 text-4xl font-bold md:text-6xl">

              Your Next Study Session
              <span className="block text-cyan-400">
                Starts Here
              </span>

            </h2>







            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">


              Upload your study material and let MentorAI transform your
              notes into summaries, flashcards, quizzes, and personalized
              AI tutoring designed around your learning goals.


            </p>







            <div className="mt-10 grid gap-4 md:grid-cols-3">


              <div className="rounded-2xl bg-slate-950 p-5">

                <p className="font-bold text-cyan-400">
                  01
                </p>

                <p className="mt-2">
                  Upload
                </p>

              </div>





              <div className="rounded-2xl bg-slate-950 p-5">

                <p className="font-bold text-cyan-400">
                  02
                </p>

                <p className="mt-2">
                  Learn
                </p>

              </div>






              <div className="rounded-2xl bg-slate-950 p-5">

                <p className="font-bold text-cyan-400">
                  03
                </p>

                <p className="mt-2">
                  Master
                </p>

              </div>



            </div>







            <Link

              href="/upload"

              className="mt-12 inline-flex items-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400"

            >

              Upload Your First PDF

              <ArrowRight size={20}/>


            </Link>






          </div>


        </div>


      </div>


    </section>

  );

}