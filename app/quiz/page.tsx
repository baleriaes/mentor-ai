"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStudySession } from "@/lib/studyStore";

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
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");



  useEffect(() => {
    loadQuiz();
  }, []);



  async function loadQuiz() {

    const session = getStudySession();


    if (!session) {
      setLoading(false);
      return;
    }


    setFileName(session.filename);


    try {

      const res = await fetch("/api/quiz", {

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

        setQuiz(data.quiz);

      }


    } catch (error) {

      console.error(error);

    }


    setLoading(false);

  }





  function submitAnswer() {

    if (!selected) return;


    if (selected === quiz[current].answer) {

      setScore((previous) => previous + 1);

    }


    setSelected("");



    if (current === quiz.length - 1) {

      setFinished(true);

    } else {

      setCurrent((previous) => previous + 1);

    }

  }





  return (

    <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">


      <div className="mx-auto max-w-5xl px-8 py-16">


        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold">
            ❓ AI Quiz
          </h1>


          <p className="mt-4 text-lg text-slate-400">
            Test yourself on your uploaded study material.
          </p>

        </div>





        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">



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

              <p className="text-xl text-cyan-400">
                🤖 MentorAI is creating your quiz...
              </p>

            </div>

          )}






          {!loading && quiz.length > 0 && !finished && (

            <>

              <h2 className="mb-6 text-2xl font-bold">

                Question {current + 1} of {quiz.length}

              </h2>



              <p className="mb-8 text-xl">
                {quiz[current].question}
              </p>





              <div className="space-y-4">

                {quiz[current].options.map((option,index)=>(

                  <button

                    key={option}

                    onClick={() => setSelected(option)}

                    className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition ${
                      
                      selected === option
                      ? "border-cyan-400 bg-cyan-500/20"
                      : "border-slate-700 bg-slate-950 hover:border-cyan-400"

                    }`}

                  >

                    <span className="font-bold text-cyan-400">
                      {String.fromCharCode(65 + index)}
                    </span>

                    {option}


                  </button>

                ))}

              </div>





              <div className="mt-8 flex justify-between items-center">


                <p>
                  Score:
                  {" "}
                  <strong>{score}</strong>
                </p>



                <button

                  onClick={submitAnswer}

                  disabled={!selected}

                  className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 disabled:opacity-40"

                >

                  {current === quiz.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}

                </button>


              </div>



            </>

          )}







          {finished && (

            <div className="rounded-2xl bg-slate-950 p-10 text-center">


              <h2 className="text-4xl font-bold">
                🎉 Quiz Complete!
              </h2>



              <p className="mt-8 text-2xl">
                Final Score
              </p>



              <p className="mt-4 text-6xl font-bold text-cyan-400">

                {score} / {quiz.length}

              </p>




              <p className="mt-6 text-slate-400">

                {score === quiz.length
                  ? "Perfect score! Outstanding work."
                  : "Great effort! Keep learning."}

              </p>




              <div className="mt-10 flex justify-center gap-5">


                <Link

                  href="/flashcards"

                  className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700"

                >

                  ← Review Flashcards

                </Link>





                <Link

                  href="/chat"

                  className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"

                >

                  Ask AI Tutor →

                </Link>



              </div>



            </div>

          )}



        </div>


      </div>


    </main>

  );

}