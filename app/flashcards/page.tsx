"use client";

import { useEffect, useState } from "react";

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  async function loadFlashcards() {
    const text = sessionStorage.getItem("studyText");

    if (!text) return;

    setLoading(true);

    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setFlashcards(result.flashcards);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  loadFlashcards();
}, []);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setFlashcards([]);
    setCurrent(0);
    setShowAnswer(false);

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
        alert("Failed to read PDF");
        setLoading(false);
        return;
      }

      // Generate flashcards
      const flashcardRes = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: upload.text,
        }),
      });

      const result = await flashcardRes.json();

      if (!result.success) {
        console.error(result);
        alert("Failed to generate flashcards");
        setLoading(false);
        return;
      }

      setFlashcards(result.flashcards);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  function nextCard() {
    if (current < flashcards.length - 1) {
      setCurrent(current + 1);
      setShowAnswer(false);
    }
  }

  function previousCard() {
    if (current > 0) {
      setCurrent(current - 1);
      setShowAnswer(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-10">

      <h1 className="text-5xl font-bold mb-4">
        MentorAI Flashcards
      </h1>

      <p className="text-gray-400 mb-8">
        Upload a PDF to generate AI flashcards.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        className="mb-8"
      />

      {loading && (
        <p className="text-xl">
          🤖 Creating Flashcards...
        </p>
      )}

      {!loading && flashcards.length > 0 && (
        <div className="w-full max-w-2xl">

          <div className="border rounded-xl p-8 bg-slate-900">

            <h2 className="text-xl font-bold mb-4">
              Card {current + 1} of {flashcards.length}
            </h2>

            <p className="text-lg">
              <strong>Question:</strong>
            </p>

            <p className="mb-6 mt-2">
              {flashcards[current].question}
            </p>

            {showAnswer && (
              <>
                <p className="text-lg font-bold">
                  Answer:
                </p>

                <p className="mt-2 text-green-400">
                  {flashcards[current].answer}
                </p>
              </>
            )}

          </div>

          <div className="flex justify-center gap-4 mt-6">

            <button
              onClick={previousCard}
              className="bg-gray-700 px-5 py-2 rounded-lg"
            >
              Previous
            </button>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="bg-blue-600 px-5 py-2 rounded-lg"
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>

            <button
              onClick={nextCard}
              className="bg-green-600 px-5 py-2 rounded-lg"
            >
              Next
            </button>

          </div>

        </div>
      )}

    </main>
  );
}