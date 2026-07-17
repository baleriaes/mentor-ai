import { NextResponse } from "next/server";
import { extractPdfText } from "@/lib/pdf";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());

    const text = await extractPdfText(bytes);

    return NextResponse.json({
      success: true,
      filename: file.name,
      text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to read PDF" },
      { status: 500 }
    );
  }
}