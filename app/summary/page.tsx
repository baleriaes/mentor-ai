"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStudySession } from "@/lib/studyStore";
import type { StudySession } from "@/lib/studyStore";

export default function SummaryPage() {
  const [session, setSession] = useState<StudySession | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studySession = getStudySession();

    setSession(studySession);

    if (studySession) {
      generateSummary(studySession.text);
    } else {
      setLoading(false);
    }
  }, []);


  async function generateSummary(text: string) {
    try {
        const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSummary(data.summary);
      } else {
        setSummary("Unable to generate summary.");
      }

    } catch (error) {
      console.error(error);
      setSummary("Something went wrong.");
    }

    setLoading(false);
  }


  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">

      <section className="mx-auto max-w-5xl px-8 py-16">


        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold">
            📝 AI Summary
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Understand the most important ideas from your study material.
          </p>

        </div>



        {session && (

          <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Current Document
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              📘 {session.filename}
            </h2>

          </div>

        )}



        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">


          {loading && (

            <div className="rounded-2xl bg-slate-950 p-10 text-center">

              <p className="text-xl text-cyan-400">
                🤖 MentorAI is analyzing your document...
              </p>

              <p className="mt-3 text-slate-500">
                Creating your personalized study summary.
              </p>

            </div>

          )}



          {!loading && !summary && (

            <div className="rounded-2xl bg-slate-950 p-10 text-center">

              <p className="text-xl">
                No summary available.
              </p>

              <p className="mt-3 text-slate-500">
                Upload a document first to generate a summary.
              </p>

            </div>

          )}



          {!loading && summary && (

            <div className="rounded-2xl bg-slate-950 p-8">

              <div className="whitespace-pre-line leading-8 text-slate-300">
                {summary}
              </div>

            </div>

          )}



        </div>




        {!loading && summary && (

          <section className="mt-12 rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-8">


            <h2 className="text-3xl font-bold">
              🎯 Continue Learning
            </h2>


            <p className="mt-3 text-slate-300">
              Your summary is complete. Choose what you want to do next.
            </p>



            <div className="mt-8 grid gap-5 md:grid-cols-3">


              <Link
                href="/flashcards"
                className="rounded-2xl bg-slate-950 p-6 transition hover:ring-2 hover:ring-cyan-400"
              >

                <h3 className="text-xl font-bold">
                  🧠 Review Flashcards
                </h3>

                <p className="mt-3 text-slate-400">
                  Memorize important concepts with active recall.
                </p>

              </Link>




              <Link
                href="/quiz"
                className="rounded-2xl bg-slate-950 p-6 transition hover:ring-2 hover:ring-cyan-400"
              >

                <h3 className="text-xl font-bold">
                  ❓ Take Quiz
                </h3>

                <p className="mt-3 text-slate-400">
                  Test your understanding.
                </p>

              </Link>




              <Link
                href="/chat"
                className="rounded-2xl bg-slate-950 p-6 transition hover:ring-2 hover:ring-cyan-400"
              >

                <h3 className="text-xl font-bold">
                  🤖 Ask AI Tutor
                </h3>

                <p className="mt-3 text-slate-400">
                  Ask questions and learn from your material.
                </p>

              </Link>



            </div>


          </section>

        )}


      </section>

    </main>
  );
}