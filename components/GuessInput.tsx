"use client";

import { useState } from "react";

interface GuessInputProps {
  onSubmit: (guess: number) => void;
  isPercent?: boolean;
}

const MULTIPLIERS: { label: string; value: number }[] = [
  { label: "ones", value: 1 },
  { label: "thousands", value: 1e3 },
  { label: "millions", value: 1e6 },
  { label: "billions", value: 1e9 },
  { label: "trillions", value: 1e12 },
];

export default function GuessInput({ onSubmit, isPercent }: GuessInputProps) {
  const [value, setValue] = useState("");
  const [multiplier, setMultiplier] = useState(1e9);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) return;
    onSubmit(isPercent ? num : num * multiplier);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          step="any"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={isPercent ? "e.g. 45" : "Your guess..."}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        {isPercent ? (
          <div className="px-4 py-3 border border-gray-300 rounded-lg text-lg bg-gray-50 text-gray-500 flex items-center">
            %
          </div>
        ) : (
          <select
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
            className="px-3 py-3 border border-gray-300 rounded-lg text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {MULTIPLIERS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Submit Guess
      </button>
    </form>
  );
}
