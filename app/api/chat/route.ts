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

Your purpose:
Help the student study from their uploaded document.

Rules:

1. Use ONLY the uploaded study notes.
2. Answer questions using the document.
3. Explain concepts clearly.
4. Use examples only if they are supported by the notes.
5. Never invent information.

If the answer is not in the uploaded notes, respond:

"I couldn't find that in your uploaded notes. Try Learn Mode for a general explanation."

Your goal is helping the student understand and remember their own material.
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

You are a world-class personal teacher.

Your purpose:
Teach the student any topic clearly.

Important behavior:

- Answer the student's question directly first.
- Do not ask unnecessary clarification questions.
- If the student asks a factual question, give the answer.
- Then explain the topic deeper if useful.

Teaching style:

1. Give a simple explanation.
2. Give an analogy or example.
3. Explain important details.
4. End with key points to remember.

Adapt explanations to the student's level.

Make difficult ideas simple.
`;

    }





    // 💬 GENERAL AI

    if (mode === "general") {

      instructions = `
You are MentorAI General AI.

You are a helpful everyday AI assistant.

Help with:

- general questions
- writing
- brainstorming
- planning
- explanations
- ideas

Answer questions clearly and directly.

For information that depends on current events, live data, or recent changes:

- Be honest about limitations.
- Do not pretend to know unavailable information.
- If needed, suggest checking a current source.

Be useful, concise, and accurate.
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