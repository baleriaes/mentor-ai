"use client";

import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";

type UploadCardProps = {
  onUploadComplete: (text: string, fileName: string) => void;
};

export default function UploadCard({
  onUploadComplete,
}: UploadCardProps) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const upload = await uploadRes.json();

      if (!upload.success) {
        alert("Upload failed.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("studyText", upload.text);

      onUploadComplete(upload.text, file.name);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-12 shadow-2xl">

        <div className="text-center">

          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10">
            <FileText
              size={48}
              className="text-cyan-400"
            />
          </div>

          <h2 className="text-4xl font-bold text-white">
            Upload Your Study Material
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Upload lecture notes, textbooks, or study guides and let MentorAI
            generate summaries, flashcards, quizzes, and AI tutoring.
          </p>

          <label className="mt-10 block cursor-pointer">

            <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 p-14 transition-all hover:border-cyan-400 hover:bg-slate-900">

              <Upload
                size={64}
                className="mx-auto mb-6 text-cyan-400"
              />

              <p className="text-2xl font-bold text-white">
                Drag & Drop your PDF
              </p>

              <p className="mt-3 text-slate-400">
                or click below to browse your files
              </p>

              <div className="mt-8 inline-flex items-center rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400">
                Choose PDF
              </div>

              <p className="mt-6 text-sm text-slate-500">
                PDF • Fast • Secure
              </p>

            </div>

            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              className="hidden"
            />

          </label>

          {loading && (
            <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-cyan-500/20 bg-slate-950 p-5">

              <Loader2
                className="animate-spin text-cyan-400"
                size={22}
              />

              <span className="font-medium text-cyan-300">
                Processing your document...
              </span>

            </div>
          )}

          {fileName && !loading && (
            <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-green-500/30 bg-slate-950 p-5">

              <CheckCircle2
                className="text-green-400"
                size={24}
              />

              <div>

                <p className="font-semibold text-green-400">
                  Ready to Study
                </p>

                <p className="text-slate-400">
                  {fileName}
                </p>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}