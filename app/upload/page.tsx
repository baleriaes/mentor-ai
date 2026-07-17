"use client";

import { useState } from "react";

export default function UploadPage() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    console.clear();
    console.log("========== START ==========");

    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setSummary("");

    try {
      console.log("Uploading PDF...");

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Upload status:", uploadRes.status);

      const upload = await uploadRes.json();

      console.log("UPLOAD RESPONSE");
      console.log(upload);

      if (!upload.success) {
        setSummary("Upload failed");
        setLoading(false);
        return;
      }
      sessionStorage.setItem("studyText", upload.text);

      console.log("Calling summarize API...");

      const summarizeRes = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: upload.text,
        }),
      });

      console.log("Summarize status:", summarizeRes.status);

      const summarize = await summarizeRes.json();

      console.log("SUMMARY RESPONSE");
      console.log(summarize);

      if (summarize.success) {
        setSummary(summarize.summary);
      } else {
        setSummary("Summary failed");
      }

      console.log("========== END ==========");

    } catch (err) {
      console.error("FULL ERROR");
      console.error(err);
      setSummary(String(err));
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">

      <h1 className="text-5xl font-bold mb-8">
        MentorAI
      </h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
      />

      {loading && <p className="mt-8">Reading PDF...</p>}

      {summary && (
        <div className="mt-8 border rounded-xl p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">
            AI Summary
          </h2>

          <pre className="whitespace-pre-wrap">
            {summary}
          </pre>
        </div>
      )}

    </main>
  );
}