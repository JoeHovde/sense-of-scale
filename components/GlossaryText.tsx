"use client";

import { useState } from "react";
import GLOSSARY from "@/lib/glossary";

interface GlossaryTextProps {
  text: string;
}

function GlossaryTerm({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative">
      <span
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="underline decoration-dotted decoration-gray-400 underline-offset-4 cursor-help"
      >
        {term}
      </span>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-lg bg-gray-900 text-white text-sm px-4 py-3 z-10 leading-relaxed shadow-lg">
          <span className="font-semibold">{term}:</span> {definition}
        </span>
      )}
    </span>
  );
}

export default function GlossaryText({ text }: GlossaryTextProps) {
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

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
          return <GlossaryTerm key={i} term={part} definition={definition} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
