import { extractText } from "unpdf";

export async function extractPdfText(buffer: Uint8Array) {
  try {
    const result = await extractText(buffer);

    console.log("PDF extraction result:", result);

    let text = "";

    if (Array.isArray(result.text)) {
      text = result.text.join("\n\n");
    } else {
      text = result.text ?? "";
    }

    console.log("Extracted text length:", text.length);

    if (!text.trim()) {
      throw new Error("No text could be extracted from the PDF.");
    }

    return text;
  } catch (error) {
    console.error("PDF extraction failed:", error);
    throw error;
  }
}