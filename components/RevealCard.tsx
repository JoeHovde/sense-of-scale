"use client";

import { Question } from "@/lib/questions";
import { calculateScore, scoreLabel, formatNumber } from "@/lib/scoring";
import GlossaryText from "@/components/GlossaryText";

interface RevealCardProps {
  question: Question;
  guess: number;
  onNext: () => void;
  isLast: boolean;
}

export default function RevealCard({
  question,
  guess,
  onNext,
  isLast,
}: RevealCardProps) {
  const score = calculateScore(guess, question.answer);
  const label = scoreLabel(score);

  const scoreColor =
    score >= 80
      ? "text-green-600"
      : score >= 50
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <p className="text-sm text-gray-500 mb-2">{question.company}</p>
        <p className="text-lg font-medium mb-6"><GlossaryText text={question.question} /></p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Your guess</p>
            <p className="text-2xl font-bold">
              {question.unit === "percent" ? `${guess}%` : formatNumber(guess)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Actual answer</p>
            <p className="text-2xl font-bold">{question.displayAnswer}</p>
          </div>
        </div>

        <div className="text-center py-4 border-t border-gray-100">
          <p className={`text-3xl font-bold ${scoreColor}`}>+{score}</p>
          <p className="text-gray-500 mt-1">{label}</p>
        </div>

        {question.chartImage && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <img
              src={question.chartImage}
              alt={`Chart for ${question.company}`}
              className="w-full rounded-lg"
            />
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Source: {question.source}
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
      >
        {isLast ? "See Results" : "Next Question"}
      </button>
    </div>
  );
}
