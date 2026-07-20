"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

export default function CTA() {
  return (
    <section className="py-28">

      <div className="mx-auto max-w-5xl px-8">

        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900">

          <div className="relative px-10 py-20 text-center">

            {/* Background Glow */}

            <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

            <h2 className="text-4xl font-bold md:text-6xl">
              Ready to Study Smarter?
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              Stop reading static PDFs.
              Turn your notes into an interactive AI learning workspace with
              summaries, flashcards, quizzes, and an AI tutor.
            </p>

            <Link
              href="/upload"
              className="mt-12 inline-flex items-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Upload Your First PDF

              <ArrowRight size={20} />

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}