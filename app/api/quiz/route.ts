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

Create EXACTLY 10 multiple-choice questions from these study notes.

IMPORTANT RULES:

- Return ONLY a JSON array.
- Do NOT write explanations.
- Do NOT use markdown.
- Do NOT wrap the JSON in \`\`\`.
- Every question must have exactly four options.
- The "answer" must exactly match one of the options.

Example:

[
  {
    "question": "What does DHCP do?",
    "options": [
      "Automatically assigns IP addresses",
      "Translates domain names",
      "Connects networks",
      "Encrypts data"
    ],
    "answer": "Automatically assigns IP addresses"
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
        error: "No JSON found",
        raw: response,
      });
    }

    const json = response.slice(start, end + 1);

    let quiz;

    try {
      quiz = JSON.parse(json);
    } catch (err) {
      console.error(err);

      return NextResponse.json({
        success: false,
        error: "Invalid JSON",
        raw: json,
      });
    }

    return NextResponse.json({
      success: true,
      quiz,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      {
        status: 500,
      }
    );
  }
}