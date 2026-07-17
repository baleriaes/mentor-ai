import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, studyText } = await request.json();

    console.log("Question:", message);

    const prompt = `
You are MentorAI.

Answer ONLY using these notes.

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

    console.log("Ollama status:", response.status);

    const data = await response.json();

    console.log("Ollama response:", data);

    return NextResponse.json({
      success: true,
      response: data.response,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}