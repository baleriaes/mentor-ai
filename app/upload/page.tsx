"use client";

import { useState } from "react";
import UploadCard from "@/components/UploadCard";
import StudyActions from "@/components/StudyActions";
import { setStudySession } from "@/lib/studyStore";

export default function UploadPage() {

  const [fileName, setFileName] = useState("");
  const [uploadedAt, setUploadedAt] = useState("");

  function handleUploadComplete(text: string, name: string) {

    const date = new Date().toISOString();

    setFileName(name);
    setUploadedAt(date);

    setStudySession({
      filename: name,
      text,
      uploadedAt: date,
    });

  }


  return (

    <main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">


      <section className="mx-auto max-w-6xl px-8 py-16">


        {/* Header */}

        <div className="mb-14 text-center">

          <h1 className="text-5xl font-bold">
            Study Workspace 📚
          </h1>


          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">

            Upload your learning materials and let MentorAI create summaries,
            flashcards, quizzes, and personalized tutoring.

          </p>

        </div>




        {/* Upload */}

        <UploadCard
          onUploadComplete={handleUploadComplete}
        />





        {/* Before Upload */}

        {!fileName && (

          <section className="mt-14 rounded-3xl border border-slate-700 bg-slate-900 p-8">


            <h2 className="text-3xl font-bold">
              Your AI Study Assistant
            </h2>


            <p className="mt-3 text-slate-400">
              Upload any PDF and transform your notes into an interactive
              learning experience.
            </p>



            <div className="mt-8 grid gap-6 md:grid-cols-2">


              <div className="rounded-2xl bg-slate-950 p-6">

                <h3 className="text-xl font-bold">
                  📄 AI Summary
                </h3>

                <p className="mt-2 text-slate-400">
                  Understand important ideas quickly.
                </p>

              </div>



              <div className="rounded-2xl bg-slate-950 p-6">

                <h3 className="text-xl font-bold">
                  🧠 Flashcards
                </h3>

                <p className="mt-2 text-slate-400">
                  Practice and memorize concepts.
                </p>

              </div>




              <div className="rounded-2xl bg-slate-950 p-6">

                <h3 className="text-xl font-bold">
                  ❓ AI Quiz
                </h3>

                <p className="mt-2 text-slate-400">
                  Test your understanding.
                </p>

              </div>




              <div className="rounded-2xl bg-slate-950 p-6">

                <h3 className="text-xl font-bold">
                  🤖 AI Tutor
                </h3>

                <p className="mt-2 text-slate-400">
                  Ask questions and learn step-by-step.
                </p>

              </div>



            </div>


          </section>

        )}






        {/* After Upload */}


        {fileName && (

          <section className="mt-12">


            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-8">


              <h2 className="text-3xl font-bold">
                ✅ Document Ready
              </h2>



              <p className="mt-4 text-xl">
                {fileName}
              </p>



              <p className="mt-3 text-slate-300">

                Uploaded:
                {" "}
                {new Date(uploadedAt).toLocaleString()}

              </p>



              <div className="mt-6 inline-flex rounded-full bg-green-500/10 px-5 py-2 text-green-400">

                ✓ Ready for AI Learning

              </div>



            </div>




            <div className="mt-10">

              <StudyActions />

            </div>



          </section>

        )}



      </section>


    </main>

  );

}