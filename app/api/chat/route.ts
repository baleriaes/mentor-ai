import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const {
      message,
      studyText,
      mode,
      history,
    } = await request.json();


    let instructions = "";
    let context = "";


    // 📄 STUDY MODE
    if (mode === "study") {

      instructions = `
You are MentorAI Study Mode.

Your purpose is to help students understand their uploaded study materials.

Rules:
- Use ONLY the uploaded notes.
- Explain concepts clearly.
- Give examples when helpful.
- If the answer is not in the notes, say:

"I couldn't find that in your uploaded notes. Try Learn Mode for a general explanation."

Do not make up information from outside the document.
`;

      context = `
Uploaded Study Notes:

${studyText || "No notes uploaded."}
`;

    }



    // 🎓 LEARN MODE
    if (mode === "learn") {

      instructions = `
You are MentorAI Learn Mode.

You are a patient expert teacher.

Your job is to teach any topic step-by-step.

Use:
- simple explanations
- examples
- analogies
- practical applications

The student may not have uploaded notes.

Focus on helping the student truly understand the topic.
`;

    }




    // 💬 GENERAL AI
    if (mode === "general") {

      instructions = `
You are MentorAI General AI.

Answer like a helpful AI assistant.

Help with:
- questions
- explanations
- writing
- brainstorming
- planning
- general knowledge

Do not use uploaded notes unless the user asks about them.

For questions about recent events, current news, sports results, prices, or information that may have changed:
- Do not invent facts.
- Be honest if you do not have live information.
- Explain that a current source may be needed.

Give useful and clear answers.
`;

    }



    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",


        messages: [

          {
            role: "system",
            content: instructions,
          },


          ...(history || []).map((msg: any) => ({
            role:
              msg.role === "ai"
                ? "assistant"
                : "user",

            content: msg.content,
          })),


          {
            role: "user",
            content: `

${context}

Student Question:

${message}

`,
          },

        ],


        temperature: 0.5,

      });



    return NextResponse.json({

      success: true,

      response:
        completion.choices[0].message.content,

    });



  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );

  }
}