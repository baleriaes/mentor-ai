import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-slate-700
        bg-slate-900
        p-8
        shadow-xl
        transition-all
        duration-300
        hover:border-cyan-400
        hover:shadow-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}