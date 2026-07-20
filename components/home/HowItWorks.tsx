"use client";

import { Upload, Brain, Sparkles } from "@/components/ui/Icons";

const steps = [
  {
    icon: Upload,
    title: "Upload Your PDF",
    description:
      "Upload lecture notes, textbooks, research papers, or study guides in seconds.",
  },
  {
    icon: Brain,
    title: "AI Understands It",
    description:
      "MentorAI analyzes your document and extracts the most important concepts.",
  },
  {
    icon: Sparkles,
    title: "Study Smarter",
    description:
      "Generate summaries, flashcards, quizzes, and chat with your AI tutor—all from one document.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-8">

        <div className="mx-auto max-w-3xl text-center">

          <p className="font-semibold uppercase tracking-[0.25em] text-cyan-400">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Three Steps to Smarter Learning
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Upload once and let AI build your complete study workspace.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Icon size={32} />
                </div>

                <div className="mt-6 text-sm font-semibold text-cyan-400">
                  STEP {index + 1}
                </div>

                <h3 className="mt-3 text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}