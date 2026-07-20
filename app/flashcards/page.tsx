"use client";

import { useEffect, useState } from "react";
import { getStudySession } from "@/lib/studyStore";

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    loadFlashcards();
  }, []);

  async function loadFlashcards() {
    const session = getStudySession();

    if (!session) {
      setLoading(false);
      return;
    }

    setFileName(session.filename);

    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: session.text,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFlashcards(data.flashcards);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
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
    <main className="min-h-[calc(100vh-80px)]">

      <div className="mx-auto max-w-5xl py-16">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold">
            AI Flashcards
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Review important concepts from your uploaded study material.
          </p>

        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

          <div className="mb-8 rounded-2xl bg-slate-950 p-5">

            <p className="text-sm text-slate-400">
              Current Document
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {fileName || "No document selected"}
            </h2>

          </div>

          {!loading && flashcards.length === 0 && (

            <div className="rounded-2xl bg-slate-950 p-10 text-center">

              <p className="text-xl">
                No flashcards available.
              </p>

              <p className="mt-3 text-slate-500">
                Upload a PDF from the Study page first.
              </p>

            </div>

          )}

          {loading && (

            <div className="rounded-2xl bg-slate-950 p-10 text-center">

              <div className="text-xl font-semibold text-cyan-400">
                🤖 MentorAI is creating flashcards...
              </div>

              <p className="mt-4 text-slate-500">
                This usually takes a few seconds.
              </p>

            </div>

          )}

          {!loading && flashcards.length > 0 && (
                        <>

              <div
                onClick={() => setShowAnswer(!showAnswer)}
                className="cursor-pointer rounded-2xl bg-slate-950 p-10 transition hover:border hover:border-cyan-500"
              >

                <div className="mb-6 flex items-center justify-between">

                  <h2 className="text-xl font-bold">
                    Card {current + 1} of {flashcards.length}
                  </h2>

                  <span className="text-sm text-slate-500">
                    Click card to flip
                  </span>

                </div>

                {!showAnswer ? (

                  <div className="min-h-[180px] flex items-center justify-center">

                    <p className="text-2xl text-center font-semibold">
                      {flashcards[current].question}
                    </p>

                  </div>

                ) : (

                  <div className="min-h-[180px] flex items-center justify-center">

                    <p className="text-xl text-center leading-8 text-green-400">
                      {flashcards[current].answer}
                    </p>

                  </div>

                )}

              </div>

              <div className="mt-8 flex justify-between">

                <button
                  onClick={previousCard}
                  disabled={current === 0}
                  className="rounded-xl bg-slate-800 px-6 py-3 disabled:opacity-40"
                >
                  ← Previous
                </button>

                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="rounded-xl bg-cyan-600 px-6 py-3 hover:bg-cyan-500"
                >
                  {showAnswer ? "Show Question" : "Show Answer"}
                </button>

                <button
                  onClick={nextCard}
                  disabled={current === flashcards.length - 1}
                  className="rounded-xl bg-cyan-600 px-6 py-3 disabled:opacity-40 hover:bg-cyan-500"
                >
                  Next →
                </button>

              </div>

            </>

          )}

        </div>

      </div>

    </main>
  );
}