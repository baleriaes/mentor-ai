"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

      }


    } catch (error) {

      console.error(error);

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

    <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">


      <div className="mx-auto max-w-5xl px-8 py-16">


        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold">
            🧠 AI Flashcards
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






          {loading && (

            <div className="rounded-2xl bg-slate-950 p-10 text-center">

              <p className="text-xl font-semibold text-cyan-400">
                🤖 MentorAI is creating flashcards...
              </p>

              <p className="mt-3 text-slate-500">
                This usually takes a few seconds.
              </p>

            </div>

          )}







          {!loading && flashcards.length === 0 && (

            <div className="rounded-2xl bg-slate-950 p-10 text-center">

              <p className="text-xl">
                No flashcards available.
              </p>


              <p className="mt-3 text-slate-500">
                Upload a PDF first.
              </p>

            </div>

          )}







          {!loading && flashcards.length > 0 && (

            <>


              <div
                onClick={() => setShowAnswer(!showAnswer)}
                className="cursor-pointer rounded-2xl bg-slate-950 p-10 transition hover:ring-2 hover:ring-cyan-400"
              >


                <div className="mb-6 flex justify-between">

                  <h2 className="text-xl font-bold">

                    Card {current + 1} of {flashcards.length}

                  </h2>


                  <span className="text-sm text-slate-500">
                    Click to flip
                  </span>


                </div>




                <div className="flex min-h-[180px] items-center justify-center">


                  {!showAnswer ? (

                    <p className="text-center text-2xl font-semibold">
                      {flashcards[current].question}
                    </p>

                  ) : (

                    <p className="text-center text-xl leading-8 text-green-400">
                      {flashcards[current].answer}
                    </p>

                  )}


                </div>



              </div>






              <div className="mt-8 flex items-center justify-between gap-4">


                <Link

                  href="/summary"

                  className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700"

                >

                  ← Summary

                </Link>





                <button

                  onClick={() => setShowAnswer(!showAnswer)}

                  className="rounded-xl bg-cyan-600 px-6 py-3 hover:bg-cyan-500"

                >

                  {showAnswer ? "Show Question" : "Show Answer"}

                </button>






                {current === flashcards.length - 1 ? (

                  <Link

                    href="/quiz"

                    className="rounded-xl bg-cyan-600 px-6 py-3 hover:bg-cyan-500"

                  >

                    Take Quiz →

                  </Link>

                ) : (

                  <button

                    onClick={nextCard}

                    className="rounded-xl bg-cyan-600 px-6 py-3 hover:bg-cyan-500"

                  >

                    Next →

                  </button>

                )}



              </div>





              {current > 0 && (

                <button

                  onClick={previousCard}

                  className="mt-6 rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700"

                >

                  ← Previous Card

                </button>

              )}



            </>

          )}



        </div>


      </div>


    </main>

  );

}