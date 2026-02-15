"use client";

import GLOSSARY from "@/lib/glossary";

interface GlossaryTextProps {
  text: string;
}

export default function GlossaryText({ text }: GlossaryTextProps) {
  // Sort terms by length (longest first) to match longer phrases before shorter ones
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

  // Build a regex that matches any glossary term (case-insensitive)
  const pattern = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );

  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const key = part.toLowerCase();
        const definition = GLOSSARY[key];
        if (definition) {
          return (
            <span key={i} className="relative group/tip">
              <span className="underline decoration-dotted decoration-gray-400 underline-offset-4 cursor-help">
                {part}
              </span>
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-lg bg-gray-900 text-white text-sm px-4 py-3 opacity-0 group-hover/tip:opacity-100 transition-opacity z-10 leading-relaxed">
                <span className="font-semibold">{part}:</span> {definition}
              </span>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
