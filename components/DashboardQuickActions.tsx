import FeatureCard from "./FeatureCard";
import {
  FileText,
  Brain,
  CircleHelp,
  Bot,
} from "@/components/ui/Icons";

export default function DashboardQuickActions() {
  return (
    <section className="mt-12">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Continue Learning
        </h2>

        <p className="mt-2 text-slate-400">
          Choose a tool and keep improving your understanding.
        </p>

      </div>


      <div className="grid gap-6 md:grid-cols-2">


        <FeatureCard
          icon={<FileText size={30} />}
          title="AI Summary"
          description="Transform your document into a clear summary with the most important concepts."
          href="/summary"
          buttonText="View Summary"
        />


        <FeatureCard
          icon={<Brain size={30} />}
          title="Smart Flashcards"
          description="Practice active recall with AI-generated flashcards from your notes."
          href="/flashcards"
          buttonText="Study Flashcards"
        />


        <FeatureCard
          icon={<CircleHelp size={30} />}
          title="AI Quiz"
          description="Challenge yourself with questions generated from your study material."
          href="/quiz"
          buttonText="Take Quiz"
        />


        <FeatureCard
          icon={<Bot size={30} />}
          title="AI Tutor"
          description="Ask questions, learn concepts, and get personalized explanations."
          href="/chat"
          buttonText="Open AI Tutor"
        />


      </div>

    </section>
  );
}