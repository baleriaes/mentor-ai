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

Read these study notes and create exactly 10 flashcards.

Return ONLY a JSON array.

Do NOT write:
- Here are the flashcards
- Explanation
- Markdown code fences
- Any text before the JSON
- Any text after the JSON

Return ONLY the JSON array.

The first character MUST be [

The last character MUST be ]

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

    const response = await askOllama(prompt);

// Remove Markdown code fences if the model adds them
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