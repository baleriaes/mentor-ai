export default function Hero() {
  return (
    <section className="text-center max-w-4xl mx-auto mb-14">
      <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
        ✨ AI-Powered Learning
      </div>

      <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-gray-900">
        Study Smarter with{" "}
        <span className="text-blue-600">MentorAI</span>
      </h1>

      <p className="mt-6 text-xl text-gray-600 leading-8 max-w-2xl mx-auto">
        Upload your lecture notes, textbooks, or study guides and instantly
        generate AI summaries, flashcards, quizzes, and personalized tutoring.
      </p>

      <div className="mt-8 flex justify-center gap-3 flex-wrap">
        <span className="rounded-full bg-white border px-4 py-2 text-sm text-gray-700 shadow-sm">
          📄 PDF Upload
        </span>

        <span className="rounded-full bg-white border px-4 py-2 text-sm text-gray-700 shadow-sm">
          🧠 AI Tutor
        </span>

        <span className="rounded-full bg-white border px-4 py-2 text-sm text-gray-700 shadow-sm">
          ⚡ Instant Summaries
        </span>

        <span className="rounded-full bg-white border px-4 py-2 text-sm text-gray-700 shadow-sm">
          🎯 Quiz Generator
        </span>
      </div>
    </section>
  );
}