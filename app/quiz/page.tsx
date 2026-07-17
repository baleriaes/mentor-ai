"use client";

import { useState } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setQuiz([]);
    setCurrent(0);
    setScore(0);
    setFinished(false);

    try {
      // Upload PDF
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const upload = await uploadRes.json();

      if (!upload.success) {
        alert("Failed to read PDF.");
        setLoading(false);
        return;
      }

      // Generate Quiz
      const quizRes = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: upload.text,
        }),
      });

      const result = await quizRes.json();

      if (!result.success) {
        console.error(result);
        alert("Failed to generate quiz.");
        setLoading(false);
        return;
      }

      setQuiz(result.quiz);

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  function submitAnswer() {
    if (!selected) return;

    if (selected === quiz[current].answer) {
      setScore(score + 1);
    }

    setSelected("");

    if (current === quiz.length - 1) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-10">

      <h1 className="text-5xl font-bold mb-6">
        MentorAI Quiz
      </h1>

      <p className="text-gray-400 mb-8">
        Upload a PDF to generate an AI quiz.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
      />

      {loading && (
        <p className="mt-8 text-xl">
          🤖 Creating Quiz...
        </p>
      )}

      {!loading && quiz.length > 0 && !finished && (
        <div className="mt-10 w-full max-w-3xl border rounded-xl p-8 bg-slate-900">

          <h2 className="text-2xl font-bold mb-4">
            Question {current + 1} / {quiz.length}
          </h2>

          <p className="text-lg mb-6">
            {quiz[current].question}
          </p>

          <div className="flex flex-col gap-4">

            {quiz[current].options.map((option) => (

              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`border rounded-lg p-3 text-left transition ${
                  selected === option
                    ? "bg-blue-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {option}
              </button>

            ))}

          </div>

          <button
            onClick={submitAnswer}
            className="mt-8 bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Submit Answer
          </button>

        </div>
      )}

      {finished && (
        <div className="mt-10 border rounded-xl p-8 bg-slate-900">

          <h2 className="text-3xl font-bold mb-4">
            Quiz Complete!
          </h2>

          <p className="text-xl">
            Score: {score} / {quiz.length}
          </p>

        </div>
      )}

    </main>
  );
}