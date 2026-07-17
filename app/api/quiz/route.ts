import { NextRequest, NextResponse } from "next/server";
import { askOllama } from "@/lib/ollama";

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
- Do NOT use \`\`\`json.
- The "answer" MUST be the EXACT text of the correct option.
- The answer MUST match one of the four options exactly.

Correct Example:

[
  {
    "question": "What does DHCP do?",
    "options": [
      "Automatically assigns IP addresses",
      "Translates domain names",
      "Connects switches",
      "Encrypts data"
    ],
    "answer": "Automatically assigns IP addresses"
  }
]

Study Notes:

${text}
`;

    const response = await askOllama(prompt);

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