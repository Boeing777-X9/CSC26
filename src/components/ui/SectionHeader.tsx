import React from "react";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignment =
    align === "center"
      ? "text-center items-center mx-auto"
      : align === "right"
      ? "text-right items-end ml-auto"
      : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {kicker && (
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#FF8C32] bg-[#FF8C32]/10 border border-[#FF8C32]/30 mb-3">
          {kicker}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
        {title} {subtitle && <span className="text-zinc-400 font-normal">| {subtitle}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
