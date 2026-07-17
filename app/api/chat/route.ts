import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, studyText } = await request.json();

    const prompt = `
You are MentorAI.

Answer ONLY using these notes.

If the answer is not in the notes, say:
"I couldn't find that in your uploaded notes."

Study Notes:
${studyText}

Student Question:
${message}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return NextResponse.json({
      success: true,
      response: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}