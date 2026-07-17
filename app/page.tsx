"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">
        Upload Your Notes
      </h1>

      <p className="text-gray-500 mb-8">
        Upload a PDF to generate quizzes, summaries, and flashcards.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files?.length) {
            const selectedFile = e.target.files[0];

const formData = new FormData();
formData.append("file", selectedFile);

fetch("/api/upload", {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

setFile(selectedFile);
          }
        }}
        className="border rounded-lg p-3"
      />

      {file && (
        <div className="mt-6 rounded-lg border p-4 w-full max-w-md">
          <h2 className="font-bold">Selected File</h2>
          <p>{file.name}</p>
          <p>{(file.size / 1024).toFixed(1)} KB</p>
        </div>
      )}
    </main>
  );
}