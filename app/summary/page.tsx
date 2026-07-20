"use client";

import { useEffect, useState } from "react";
import { getStudySession } from "@/lib/studyStore";

export default function SummaryPage() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [filename, setFilename] = useState("");

  useEffect(() => {
    generateSummary();
  }, []);

  async function generateSummary() {
    const session = getStudySession();

    if (!session) {
      setSummary("Please upload a PDF from the Study page first.");
      setLoading(false);
      return;
    }

    setFilename(session.filename);

    try {
      const res = await fetch("/api/summarize", {
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
        setSummary(data.summary);
      } else {
        setSummary(data.error || "Failed to generate summary.");
      }
    } catch (err) {
      console.error(err);
      setSummary("Something went wrong while generating the summary.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-[calc(100vh-80px)]">
      <div className="mx-auto max-w-5xl py-16">

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold">
            AI Summary
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            MentorAI analyzed your document and created a study summary.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

          <div className="mb-8 rounded-2xl bg-slate-950 p-5">

            <p className="text-sm text-slate-400">
              Current Document
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              {filename || "No document selected"}
            </h2>

          </div>

          {loading ? (
            <div className="rounded-2xl bg-slate-950 p-10 text-center">
              <div className="text-xl font-semibold text-cyan-400">
                🤖 MentorAI is generating your summary...
              </div>

              <p className="mt-4 text-slate-500">
                This usually takes a few seconds.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-950 p-8">
              <div className="whitespace-pre-wrap leading-8 text-slate-200">
                {summary}
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}