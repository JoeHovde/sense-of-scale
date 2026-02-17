"use client";

import { useState } from "react";
import { Question } from "@/lib/questions";
import { calculateScore, formatNumber } from "@/lib/scoring";
import { saveScore } from "@/lib/supabase";
import Link from "next/link";

interface GameResult {
  question: Question;
  guess: number;
}

interface ScoreBoardProps {
  results: GameResult[];
  onPlayAgain: () => void;
}

export default function ScoreBoard({ results, onPlayAgain }: ScoreBoardProps) {
  const [playerName, setPlayerName] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const scores = results.map((r) => calculateScore(r.guess, r.question.answer));
  const totalScore = scores.reduce((sum, s) => sum + s, 0);
  const maxScore = results.length * 100;

  const overallLabel =
    totalScore >= maxScore * 0.85
      ? "You really know your stuff"
      : totalScore >= maxScore * 0.65
        ? "Solid business intuition"
        : totalScore >= maxScore * 0.45
          ? "Not bad — room to sharpen up"
          : totalScore >= maxScore * 0.25
            ? "Getting there — keep reading those 10-Ks"
            : "Time to hit the annual reports";

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!playerName.trim() || saving) return;
    setSaving(true);
    try {
      await saveScore(playerName.trim(), totalScore, maxScore, results.length);
      setSaved(true);
    } catch {
      alert("Failed to save score. Try again.");
    }
    setSaving(false);
  }

  return (
    <div className="w-full max-w-lg">
      <img
        src="/bridge_building_finish.jpeg"
        alt="Results"
        className="w-full h-40 object-cover rounded-xl mb-6"
      />
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {totalScore} / {maxScore}
        </h2>
        <p className="text-lg text-gray-500">{overallLabel}</p>
      </div>

      {!saved ? (
        <form onSubmit={handleSave} className="mb-8">
          <p className="text-sm text-gray-500 mb-2 text-center">
            Save your score to the leaderboard
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name..."
              maxLength={30}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={saving || !playerName.trim()}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 text-center">
          <p className="text-sm text-green-600 mb-2">Score saved!</p>
          <Link
            href="/leaderboard"
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            View leaderboard
          </Link>
        </div>
      )}

      <div className="space-y-3 mb-8">
        {results.map((r, i) => {
          const score = scores[i];
          const barWidth = `${score}%`;
          const barColor =
            score >= 80
              ? "bg-green-500"
              : score >= 50
                ? "bg-yellow-500"
                : "bg-red-500";

          return (
            <div
              key={r.question.id}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium flex-1 pr-4">
                  {r.question.question}
                </p>
                <span className="text-sm font-bold whitespace-nowrap">
                  +{score}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>You: {r.question.unit === "percent" ? `${r.guess}%` : formatNumber(r.guess)}</span>
                <span>Actual: {r.question.displayAnswer}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`${barColor} h-2 rounded-full transition-all`}
                  style={{ width: barWidth }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}
