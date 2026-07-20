import Link from "next/link";
import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  buttonText: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  href,
  buttonText,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-slate-700 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-2xl"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">
          {icon}
        </div>

        <span className="text-2xl text-slate-500 transition group-hover:text-cyan-400">
          →
        </span>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        {description}
      </p>

      <div className="mt-8 inline-flex items-center rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950">
        {buttonText}
      </div>
    </Link>
  );
}