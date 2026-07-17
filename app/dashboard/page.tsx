import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-12">

      <h1 className="text-6xl font-bold mb-6">
        MentorAI
      </h1>

      <p className="text-xl text-gray-300 mb-12">
        Choose how you'd like to study.
      </p>

      <div className="grid grid-cols-2 gap-8">

        <Link
          href="/upload"
          className="bg-blue-600 rounded-xl p-10 text-center hover:bg-blue-700 transition"
        >
          📄
          <h2 className="text-2xl mt-4 font-bold">
            AI Summary
          </h2>
        </Link>

        <Link
          href="/flashcards"
          className="bg-green-600 rounded-xl p-10 text-center hover:bg-green-700 transition"
        >
          🧠
          <h2 className="text-2xl mt-4 font-bold">
            Flashcards
          </h2>
        </Link>

        <Link
          href="/quiz"
          className="bg-purple-600 rounded-xl p-10 text-center hover:bg-purple-700 transition"
        >
          ❓
          <h2 className="text-2xl mt-4 font-bold">
            Quiz
          </h2>
        </Link>

        <Link
          href="/chat"
          className="bg-orange-600 rounded-xl p-10 text-center hover:bg-orange-700 transition"
        >
          🤖
          <h2 className="text-2xl mt-4 font-bold">
            AI Tutor
          </h2>
        </Link>

      </div>

    </main>
  );
}