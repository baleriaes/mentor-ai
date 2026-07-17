import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No text provided",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are MentorAI, an expert AI study tutor.

Summarize the following study notes.

Rules:
- Organize the summary using headings.
- Use bullet points.
- Highlight the most important concepts.
- Keep it concise but educational.
- At the end, include a section called "Exam Tips" with the most important facts to remember.

Study Notes:

${text}
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
      summary: completion.choices?.[0]?.message?.content ?? "No summary generated.",
    });

  } catch (error: any) {
    console.error("========== GROQ ERROR ==========");
    console.error(error);

    if (error?.response) {
      try {
        console.error(await error.response.text());
      } catch {}
    }

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}