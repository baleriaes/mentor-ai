import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          error: "No text provided",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are MentorAI.

Read these study notes and create EXACTLY 10 flashcards.

IMPORTANT RULES:

- Return ONLY a JSON array.
- Do NOT use markdown.
- Do NOT use \`\`\`.
- Do NOT include explanations.
- The first character MUST be [
- The last character MUST be ]

Example:

[
  {
    "question": "What is DHCP?",
    "answer": "Automatically assigns IP addresses."
  },
  {
    "question": "What is DNS?",
    "answer": "Translates domain names into IP addresses."
  }
]

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
      temperature: 0.2,
    });

    const response =
      completion.choices[0].message.content ?? "";

    const start = response.indexOf("[");
    const end = response.lastIndexOf("]");

    if (start === -1 || end === -1) {
      return NextResponse.json({
        success: false,
        error: "No JSON array found",
        raw: response,
      });
    }

    const jsonText = response.slice(start, end + 1);

    let flashcards;

    try {
      flashcards = JSON.parse(jsonText);
    } catch (err) {
      console.error(err);

      return NextResponse.json({
        success: false,
        error: "Could not parse JSON",
        raw: jsonText,
      });
    }

    return NextResponse.json({
      success: true,
      flashcards,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}