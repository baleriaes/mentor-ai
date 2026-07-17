import { NextResponse } from "next/server";
import { askOllama } from "@/lib/ollama";

export async function POST(request: Request) {
  try {
    console.log("===== SUMMARIZE API START =====");

    const { text } = await request.json();

    console.log("Received text length:", text?.length);

    if (!text) {
      return NextResponse.json(
        { success: false, error: "No text provided" },
        { status: 400 }
      );
    }

    const prompt = `
You are MentorAI.

Summarize these study notes using bullet points.

${text}
`;

    console.log("Sending prompt to Ollama...");

    const summary = await askOllama(prompt);

    console.log("Ollama responded:");
    console.log(summary);

    return NextResponse.json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error("SUMMARIZE ERROR:");
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