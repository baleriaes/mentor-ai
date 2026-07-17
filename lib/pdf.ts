import { extractText } from "unpdf";

export async function extractPdfText(buffer: Uint8Array) {
  const result = await extractText(buffer);

  if (Array.isArray(result.text)) {
    return result.text.join("\n\n");
  }

  return result.text;
}