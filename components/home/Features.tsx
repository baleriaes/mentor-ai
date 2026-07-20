"use client";

import Link from "next/link";

import {
  FileText,
  Brain,
  CircleHelp,
  Bot,
} from "@/components/ui/Icons";

const features = [
  {
    icon: FileText,
    title: "AI Summaries",
    href: "/summary",
    description:
      "Turn long lecture notes, textbooks, and research papers into concise summaries you can review in minutes.",
  },
  {
    icon: Brain,
    title: "Smart Flashcards",
    href: "/flashcards",
    description:
      "Generate interactive flashcards automatically from your study material and reinforce learning with active recall.",
  },
  {
    icon: CircleHelp,
    title: "AI Quizzes",
    href: "/quiz",
    description:
      "Challenge yourself with AI-generated multiple-choice quizzes based entirely on your uploaded documents.",
  },
  {
    icon: Bot,
    title: "AI Tutor",
    href: "/chat",
    description:
      "Ask questions naturally and receive detailed explanations grounded in your own study material.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Everything You Need
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            One Workspace.
            <br />
            Four Powerful AI Tools.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            MentorAI transforms static PDFs into an interactive learning
            experience so you can spend less time organizing notes and more
            time understanding them.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                href={feature.href}
                key={feature.title}
                className="group block rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-cyan-500/10 p-4 text-cyan-400 transition group-hover:scale-105">
                  <Icon size={32} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-400">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}