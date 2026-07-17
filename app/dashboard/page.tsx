import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-8 py-16">

      <h1 className="text-6xl font-extrabold mb-4">
        🤖 MentorAI
      </h1>

      <p className="text-xl text-gray-400 text-center max-w-2xl mb-12">
        Upload your study notes and let AI generate summaries,
        quizzes, flashcards, and personalized tutoring.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        <Link
          href="/upload"
          className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-10 transition shadow-xl"
        >
          <div className="text-5xl">📄</div>

          <h2 className="text-3xl font-bold mt-6">
            AI Summary
          </h2>

          <p className="mt-3 text-blue-100">
            Upload a PDF and instantly generate an AI-powered summary.
          </p>
        </Link>

        <Link
          href="/quiz"
          className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-10 transition shadow-xl"
        >
          <div className="text-5xl">❓</div>

          <h2 className="text-3xl font-bold mt-6">
            Quiz Generator
          </h2>

          <p className="mt-3 text-purple-100">
            Test yourself with AI-generated multiple-choice questions.
          </p>
        </Link>

        <Link
          href="/flashcards"
          className="bg-green-600 hover:bg-green-700 rounded-2xl p-10 transition shadow-xl"
        >
          <div className="text-5xl">🧠</div>

          <h2 className="text-3xl font-bold mt-6">
            Flashcards
          </h2>

          <p className="mt-3 text-green-100">
            Memorize concepts using AI-generated flashcards.
          </p>
        </Link>

        <Link
          href="/chat"
          className="bg-orange-600 hover:bg-orange-700 rounded-2xl p-10 transition shadow-xl"
        >
          <div className="text-5xl">🤖</div>

          <h2 className="text-3xl font-bold mt-6">
            AI Tutor
          </h2>

          <p className="mt-3 text-orange-100">
            Ask questions about your uploaded notes and receive instant answers.
          </p>
        </Link>

      </div>

    </main>
  );
}