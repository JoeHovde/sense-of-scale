"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLeaderboard } from "@/lib/supabase";

interface Score {
  id: string;
  player_name: string;
  score: number;
  max_score: number;
  question_count: number;
  created_at: string;
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard(50).then((data) => {
      setScores(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <p className="text-gray-500">Loading leaderboard...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 pt-16">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Leaderboard</h1>
        <p className="text-gray-500 text-center mb-8">Top scores</p>

        {scores.length === 0 ? (
          <p className="text-center text-gray-400">
            No scores yet. Be the first!
          </p>
        ) : (
          <div className="space-y-2">
            {scores.map((s, i) => {
              const pct = Math.round((s.score / s.max_score) * 100);
              const date = new Date(s.created_at).toLocaleDateString();
              const rankStyle =
                i === 0
                  ? "text-yellow-500"
                  : i === 1
                    ? "text-gray-400"
                    : i === 2
                      ? "text-amber-600"
                      : "text-gray-300";

              return (
                <div
                  key={s.id}
                  className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 px-4 py-3"
                >
                  <span
                    className={`text-lg font-bold w-8 text-center ${rankStyle}`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{s.player_name}</p>
                    <p className="text-xs text-gray-400">{date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {s.score}/{s.max_score}
                    </p>
                    <p className="text-xs text-gray-400">{pct}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <Link
            href="/play"
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
          >
            Play
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg text-center font-medium hover:bg-gray-300 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
