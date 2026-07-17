import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message, studyText } = await request.json();

  const prompt = `
You are MentorAI.

You are helping a student study.

Answer ONLY using the study notes below.

If the answer is not contained in the notes, say:

"I couldn't find that in your uploaded notes."

Study Notes:

${studyText}

Student Question:

${message}
`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.1:8b",
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();

  return NextResponse.json({
    response: data.response,
  });
}