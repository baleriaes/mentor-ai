import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-white">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  );
}