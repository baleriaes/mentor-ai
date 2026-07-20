"use client";

import { useState } from "react";
import { getStudySession } from "@/lib/studyStore";

type Mode = "study" | "learn" | "general";

interface Message {
  role: "user" | "ai";
  content: string;
}


const modes = {

  study: {
    label: "📄 Study Mode",
    description:
      "Your document tutor. Answers using your uploaded notes only.",
  },

  learn: {
    label: "🎓 Learn Mode",
    description:
      "Your personal teacher. Explains any topic step-by-step.",
  },

  general: {
    label: "💬 General AI",
    description:
      "Your everyday AI assistant for questions, writing, and ideas.",
  },

};



const suggestions = {

  study: [
    "Summarize my uploaded notes",
    "Explain the main concepts",
    "What should I study first?",
    "Create exam questions",
  ],


  learn: [
    "Explain networking like I am a beginner",
    "Teach me the OSI model",
    "Explain BGP step-by-step",
    "Create a study plan",
  ],


  general: [
    "Help me write an email",
    "Explain a difficult concept",
    "Help me plan my week",
    "Give me ideas for a project",
  ],

};



export default function ChatPage() {


  const [mode,setMode] = useState<Mode>("study");

  const [message,setMessage] = useState("");

  const [messages,setMessages] = useState<Message[]>([]);

  const [loading,setLoading] = useState(false);





  async function askAI(custom?:string){


    const question = custom || message;


    if(!question.trim()) return;



    const session = getStudySession();



    const updatedMessages: Message[] = [

      ...messages,

      {
        role:"user",
        content:question,
      }

    ];



    setMessages(updatedMessages);

    setMessage("");

    setLoading(true);




    try {


      const response = await fetch("/api/chat",{

        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },


        body:JSON.stringify({

          message:question,

          mode,

          studyText:session?.text || "",

          history:messages,

        }),

      });



      const data = await response.json();



      setMessages([

        ...updatedMessages,


        {

          role:"ai",

          content:data.success
            ? data.response
            : "I could not answer that. Please try again.",

        }

      ]);



    } catch(error){


      console.error(error);


      setMessages([

        ...updatedMessages,

        {

          role:"ai",

          content:"Something went wrong. Please try again.",

        }

      ]);

    }



    setLoading(false);

  }






  function handleKey(e:React.KeyboardEvent<HTMLTextAreaElement>){

    if(e.key==="Enter" && !e.shiftKey){

      e.preventDefault();

      askAI();

    }

  }






return (

<main className="min-h-[calc(100vh-80px)] bg-slate-950 text-white">


<div className="mx-auto max-w-5xl px-8 py-14">



<h1 className="text-center text-5xl font-bold">

🤖 MentorAI Tutor

</h1>


<p className="mt-4 text-center text-lg text-slate-400">

Your personal AI learning assistant.

</p>






<div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900 p-6">


<label className="text-sm text-slate-400">

Choose how MentorAI helps you

</label>



<select

value={mode}

onChange={(e)=>{

setMode(e.target.value as Mode);

}}

className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950 p-4"

>


<option value="study">

📄 Study Mode

</option>


<option value="learn">

🎓 Learn Mode

</option>


<option value="general">

💬 General AI

</option>


</select>



<p className="mt-4 text-slate-400">

{modes[mode].description}

</p>


</div>







<div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-6">



<div className="min-h-[450px] rounded-2xl bg-slate-950 p-6 overflow-y-auto space-y-4">



{messages.length===0 && (

<div className="text-center">


<h2 className="text-2xl font-bold">

👋 Welcome to MentorAI

</h2>


<p className="mt-3 text-slate-400">

What would you like to do?

</p>




<div className="mt-8 grid gap-3">


{suggestions[mode].map((item)=>(


<button

key={item}

onClick={()=>askAI(item)}

className="rounded-xl border border-slate-700 p-4 text-left hover:border-cyan-400"

>

{item}

</button>


))}


</div>


</div>

)}






{messages.map((msg,index)=>(


<div

key={index}

className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-wrap ${
msg.role==="user"

?

"ml-auto bg-cyan-500 text-slate-950"

:

"bg-slate-800"

}`}

>

{msg.content}

</div>


))}






{loading && (

<div className="text-cyan-400">

🤖 MentorAI is thinking...

</div>

)}



</div>





<textarea

rows={3}

value={message}

onChange={(e)=>setMessage(e.target.value)}

onKeyDown={handleKey}

placeholder="Ask MentorAI anything..."

className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-950 p-5 focus:border-cyan-400 outline-none"

/>




<button

onClick={()=>askAI()}

disabled={loading}

className="mt-4 rounded-xl bg-cyan-500 px-8 py-3 font-bold text-slate-950"

>

{loading ? "Thinking..." : "Send Message"}

</button>



</div>



</div>


</main>

);

}