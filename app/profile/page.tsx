"use client";

import { useEffect, useState } from "react";
import { getStudySession, StudySession } from "@/lib/studyStore";

export default function ProfilePage() {

  const [session, setSession] = useState<StudySession | null>(null);


  useEffect(() => {
    setSession(getStudySession());
  }, []);



  const wordCount = session
    ? session.text.trim().split(/\s+/).filter(Boolean).length
    : 0;


  const characterCount = session?.text.length ?? 0;



  return (

    <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">

      <section className="mx-auto max-w-6xl px-8 py-16">


        {/* Header */}

        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold">
            👤 Profile
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Your MentorAI learning journey.
          </p>

        </div>





        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10">



          {/* User Information */}

          <div className="flex items-center gap-6">


            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/20 text-4xl">
              👩‍💻
            </div>


            <div>

              <h2 className="text-3xl font-bold">
                Student
              </h2>


              <p className="text-slate-400">
                Learning with MentorAI
              </p>


            </div>


          </div>







          {/* Statistics */}


          <div className="mt-12 grid gap-6 md:grid-cols-4">


            <div className="rounded-2xl bg-slate-950 p-6">

              <p className="text-sm text-slate-400">
                Documents
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                {session ? 1 : 0}
              </h3>

              <p className="mt-2 text-slate-500">
                Uploaded PDFs
              </p>

            </div>





            <div className="rounded-2xl bg-slate-950 p-6">

              <p className="text-sm text-slate-400">
                Words Studied
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                {wordCount.toLocaleString()}
              </h3>

              <p className="mt-2 text-slate-500">
                From documents
              </p>

            </div>





            <div className="rounded-2xl bg-slate-950 p-6">

              <p className="text-sm text-slate-400">
                AI Features
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                4
              </h3>

              <p className="mt-2 text-slate-500">
                Summary • Flashcards • Quiz • Tutor
              </p>

            </div>





            <div className="rounded-2xl bg-slate-950 p-6">

              <p className="text-sm text-slate-400">
                Status
              </p>


              <h3 className="mt-3 text-xl font-bold text-cyan-400">

                {session
                  ? "Ready to Study"
                  : "Waiting for PDF"}

              </h3>


            </div>


          </div>







          {/* Current Material */}



          <div className="mt-12">


            <h2 className="text-2xl font-bold">
              Current Study Material
            </h2>



            {session ? (

              <div className="mt-5 rounded-2xl bg-slate-950 p-6">


                <h3 className="text-xl font-semibold">
                  📘 {session.filename}
                </h3>



                <p className="mt-3 text-slate-400">

                  Uploaded:

                  {" "}

                  {new Date(session.uploadedAt).toLocaleString()}

                </p>




                <div className="mt-5 grid gap-4 md:grid-cols-2">


                  <div className="rounded-xl bg-slate-900 p-4">

                    <p className="text-sm text-slate-400">
                      Words
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {wordCount.toLocaleString()}
                    </p>

                  </div>




                  <div className="rounded-xl bg-slate-900 p-4">

                    <p className="text-sm text-slate-400">
                      Characters
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {characterCount.toLocaleString()}
                    </p>

                  </div>


                </div>




                <div className="mt-6 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-green-400">

                  ✓ Ready for AI Study

                </div>



              </div>


            ) : (

              <div className="mt-5 rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">

                📄 Upload a PDF from the Study page to begin.

              </div>

            )}


          </div>







          {/* About */}


          <div className="mt-12">


            <h2 className="text-2xl font-bold">
              About MentorAI
            </h2>


            <p className="mt-4 leading-8 text-slate-400">

              MentorAI is an AI-powered learning assistant that transforms
              study materials into summaries, flashcards, quizzes, and
              personalized tutoring to help students learn smarter.

            </p>


          </div>




        </div>


      </section>


    </main>

  );

}