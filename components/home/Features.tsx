"use client";

import Link from "next/link";

import {
  FileText,
  Brain,
  CircleHelp,
  Bot,
} from "@/components/ui/Icons";


const features = [

  {
    icon: FileText,
    number: "01",
    title: "Understand Your Material",
    subtitle: "AI Summary",
    href: "/summary",
    description:
      "MentorAI analyzes your uploaded documents and creates clear summaries that highlight the most important concepts.",
  },


  {
    icon: Brain,
    number: "02",
    title: "Remember What You Learn",
    subtitle: "AI Flashcards",
    href: "/flashcards",
    description:
      "Turn your study material into interactive flashcards designed for active recall and better memory.",
  },


  {
    icon: CircleHelp,
    number: "03",
    title: "Test Your Knowledge",
    subtitle: "AI Quiz",
    href: "/quiz",
    description:
      "Practice with AI-generated questions based on your own uploaded materials.",
  },


  {
    icon: Bot,
    number: "04",
    title: "Master Difficult Topics",
    subtitle: "AI Tutor",
    href: "/chat",
    description:
      "Ask questions and receive personalized explanations with your AI learning assistant.",
  },

];



export default function Features() {


  return (

    <section className="py-24">


      <div className="mx-auto max-w-7xl px-8">





        <div className="mx-auto max-w-3xl text-center">


          <p className="font-semibold uppercase tracking-[0.25em] text-cyan-400">

            Your AI Study Workflow

          </p>



          <h2 className="mt-4 text-4xl font-bold md:text-5xl">

            From PDF To Mastery

          </h2>




          <p className="mt-6 text-lg leading-8 text-slate-400">

            MentorAI transforms your study materials into a complete learning
            experience designed to help you understand, remember, and master
            new concepts.

          </p>


        </div>








        <div className="mt-16 grid gap-8 md:grid-cols-2">



          {features.map((feature)=>{


            const Icon = feature.icon;



            return (


              <Link

                href={feature.href}

                key={feature.title}

                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-1 hover:border-cyan-400"

              >



                <div className="flex items-start justify-between">


                  <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">

                    <Icon size={32}/>

                  </div>



                  <span className="text-4xl font-black text-slate-700">

                    {feature.number}

                  </span>



                </div>






                <p className="mt-8 text-sm font-semibold text-cyan-400">

                  {feature.subtitle}

                </p>




                <h3 className="mt-3 text-2xl font-bold">

                  {feature.title}

                </h3>




                <p className="mt-4 leading-8 text-slate-400">

                  {feature.description}

                </p>




              </Link>


            );


          })}



        </div>



      </div>


    </section>

  );

}