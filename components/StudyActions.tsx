import FeatureCard from "./FeatureCard";

import {
  FileText,
  Brain,
  CircleHelp,
  Bot,
} from "@/components/ui/Icons";

const features = [
  {
    icon: <FileText size={34} />,
    title: "Summary",
    description:
      "Generate a clean, AI-powered summary of your uploaded notes.",
    href: "/summary",
    buttonText: "Open Summary",
  },
  {
    icon: <Brain size={34} />,
    title: "Flashcards",
    description:
      "Create interactive flashcards to review the most important concepts.",
    href: "/flashcards",
    buttonText: "Study Flashcards",
  },
  {
    icon: <CircleHelp size={34} />,
    title: "Quiz",
    description:
      "Challenge yourself with AI-generated practice questions.",
    href: "/quiz",
    buttonText: "Start Quiz",
  },
  {
    icon: <Bot size={34} />,
    title: "AI Tutor",
    description:
      "Chat with MentorAI and ask questions about your study material.",
    href: "/chat",
    buttonText: "Open AI Tutor",
  },
];

export default function StudyActions() {
  return (
    <section className="mt-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white">
          Choose Your Study Mode
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          MentorAI can transform your notes into multiple learning experiences.
          Pick one below to get started.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            href={feature.href}
            buttonText={feature.buttonText}
          />
        ))}
      </div>
    </section>
  );
}