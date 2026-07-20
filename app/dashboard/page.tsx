"use client";

import { useEffect, useState } from "react";
import { getStudySession, StudySession } from "@/lib/studyStore";
import DashboardQuickActions from "@/components/DashboardQuickActions";

export default function Dashboard() {

  const [session, setSession] = useState<StudySession | null>(null);

  useEffect(() => {
    setSession(getStudySession());
  }, []);


  const wordCount = session
    ? session.text.trim().split(/\s+/).filter(Boolean).length
    : 0;


  return (

    <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-8 py-16">


        {/* Header */}

        <section className="mb-12">

          <h1 className="text-5xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Your AI-powered learning workspace is ready.
          </p>

        </section>



        {/* Stats */}

        <section className="grid gap-6 md:grid-cols-4">


          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Documents
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {session ? "1" : "0"}
            </h2>

            <p className="mt-2 text-slate-500">
              Uploaded PDFs
            </p>

          </div>



          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Words
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {wordCount.toLocaleString()}
            </h2>

            <p className="mt-2 text-slate-500">
              Extracted content
            </p>

          </div>



          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              AI Tools
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              4
            </h2>

            <p className="mt-2 text-slate-500">
              Summary, Quiz, Flashcards, Tutor
            </p>

          </div>



          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Status
            </p>

            <h2 className="mt-3 text-xl font-bold text-cyan-400">
              {session ? "Ready" : "Waiting"}
            </h2>

            <p className="mt-2 text-slate-500">
              AI Learning System
            </p>

          </div>


        </section>




        {/* Current Document */}


        <section className="mt-12 rounded-3xl border border-slate-700 bg-slate-900 p-8">


          <h2 className="text-3xl font-bold">
            Continue Learning
          </h2>



          {session ? (

            <div className="mt-6 rounded-2xl bg-slate-950 p-6">


              <h3 className="text-2xl font-semibold">
                📘 {session.filename}
              </h3>


              <p className="mt-3 text-slate-400">
                Uploaded:
                {" "}
                {new Date(session.uploadedAt).toLocaleDateString()}
              </p>



              <div className="mt-6 flex flex-wrap gap-4">


                <a
                  href="/chat"
                  className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  Open AI Tutor
                </a>



                <a
                  href="/summary"
                  className="rounded-xl border border-slate-700 px-6 py-3 hover:border-cyan-400"
                >
                  View Summary
                </a>



                <a
                  href="/flashcards"
                  className="rounded-xl border border-slate-700 px-6 py-3 hover:border-cyan-400"
                >
                  Flashcards
                </a>



                <a
                  href="/quiz"
                  className="rounded-xl border border-slate-700 px-6 py-3 hover:border-cyan-400"
                >
                  Quiz
                </a>


              </div>


            </div>


          ) : (

            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">

              Upload a document to start learning.

            </div>

          )}



        </section>





        {/* Quick Actions */}


        <DashboardQuickActions />





        {/* Activity */}


        <section className="mt-12 rounded-3xl border border-slate-700 bg-slate-900 p-8">


          <h2 className="text-3xl font-bold">
            Recent Activity
          </h2>


          <div className="mt-6 space-y-4">


            <div className="rounded-xl bg-slate-950 p-5">
              📄 Upload documents and create your study workspace.
            </div>


            <div className="rounded-xl bg-slate-950 p-5">
              🧠 Generate AI-powered learning materials.
            </div>


            <div className="rounded-xl bg-slate-950 p-5">
              🎓 Learn concepts with MentorAI Tutor.
            </div>


          </div>


        </section>


      </div>


    </main>

  );

}