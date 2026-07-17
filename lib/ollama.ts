export async function askOllama(prompt: string) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.1:8b",
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact Ollama");
  }

  const data = await response.json();

  return data.response;
}