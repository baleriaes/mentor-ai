"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    const studyText = sessionStorage.getItem("studyText");

    if (!studyText) {
      setReply("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          studyText,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setReply(data.response);
      } else {
        setReply(data.error);
      }
    } catch (err) {
      console.error(err);
      setReply("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-10">

      <h1 className="text-5xl font-bold mb-4">
        AI Tutor
      </h1>

      <p className="text-gray-400 mb-8">
        Ask questions about your uploaded notes.
      </p>

      <textarea
        className="bg-slate-800 rounded-xl p-4 w-full max-w-3xl h-40"
        placeholder="Example: Explain DHCP like I'm five."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={askAI}
        className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-xl mt-6"
      >
        Ask MentorAI
      </button>

      {loading && (
        <p className="mt-6">
          🤖 Thinking...
        </p>
      )}

      {reply && (
        <div className="mt-8 bg-slate-900 rounded-xl p-6 max-w-3xl w-full whitespace-pre-wrap">
          {reply}
        </div>
      )}

    </main>
  );
}