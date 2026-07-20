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

Your purpose is to help students learn from their uploaded study material.

Rules:

- Use ONLY the uploaded notes.
- Answer questions using the document.
- Explain concepts clearly.
- Help the student prepare for exams.
- Do not invent information.

If the answer is not found in the notes, say:

"I couldn't find that in your uploaded notes. Try Learn Mode for a general explanation."

Your job is to be a study assistant for the student's own material.
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

You are a personal AI teacher.

Your goal is to help students understand any topic.

Rules:

- Answer the question directly first.
- Do not ask unnecessary clarification questions.
- Explain concepts step-by-step.
- Use simple language.
- Give examples and analogies.
- Explain important details.
- End with key points when helpful.

If the student asks a factual question, provide the answer before teaching more.

Make difficult topics easy to understand.
`;

    }







    // 💬 GENERAL AI

    if (mode === "general") {

      instructions = `
You are MentorAI General AI.

You are a normal AI assistant.

Your purpose is to help with:

- general questions
- writing
- brainstorming
- planning
- explanations
- ideas

Important rules:

- Do NOT use uploaded study notes.
- Do NOT mention the user's documents.
- Do NOT say "according to your notes".
- Answer using your general knowledge only.

If the user asks about a topic that could be in their notes, still answer normally because this is General AI mode.

Be clear, useful, and conversational.
`;

      // IMPORTANT:
      // General AI should never receive PDF context.

      context = "";

    }







    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",


        messages: [

          {
            role: "system",
            content: instructions,
          },



          ...(history || []).map((msg:any)=>({

            role:
              msg.role === "ai"
                ? "assistant"
                : "user",

            content: msg.content,

          })),




          {
            role:"user",

            content:`

${context}

Student Question:

${message}

`,
          },

        ],



        temperature:0.4,


      });






    return NextResponse.json({

      success:true,

      response:
        completion.choices[0].message.content,

    });





  } catch(error) {


    console.error(error);



    return NextResponse.json(

      {
        success:false,
        error:String(error),
      },

      {
        status:500,
      }

    );

  }

}