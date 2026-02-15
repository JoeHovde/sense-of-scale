"use client";

import { useState, useEffect } from "react";
import { Question, getRandomQuestions } from "@/lib/questions";
import GuessInput from "@/components/GuessInput";
import RevealCard from "@/components/RevealCard";
import ScoreBoard from "@/components/ScoreBoard";
import GlossaryText from "@/components/GlossaryText";

const QUESTIONS_PER_GAME = 10;

type GamePhase = "guessing" | "reveal" | "results";

interface GameResult {
  question: Question;
  guess: number;
}

export default function PlayPage() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("guessing");
  const [currentGuess, setCurrentGuess] = useState<number>(0);
  const [results, setResults] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data: Question[]) => {
        setAllQuestions(data);
        setGameQuestions(getRandomQuestions(data, QUESTIONS_PER_GAME));
        setLoading(false);
      });
  }, []);

  function startNewGame() {
    setGameQuestions(getRandomQuestions(allQuestions, QUESTIONS_PER_GAME));
    setCurrentIndex(0);
    setPhase("guessing");
    setCurrentGuess(0);
    setResults([]);
  }

  function handleGuess(guess: number) {
    setCurrentGuess(guess);
    setPhase("reveal");
  }

  function handleNext() {
    const newResults = [
      ...results,
      { question: gameQuestions[currentIndex], guess: currentGuess },
    ];
    setResults(newResults);

    if (currentIndex + 1 >= gameQuestions.length) {
      setPhase("results");
    } else {
      setCurrentIndex(currentIndex + 1);
      setPhase("guessing");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <p className="text-gray-500">Loading questions...</p>
      </main>
    );
  }

  const currentQuestion = gameQuestions[currentIndex];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {phase === "results" ? (
        <ScoreBoard results={results} onPlayAgain={startNewGame} />
      ) : (
        <>
          <div className="text-sm text-gray-400 mb-8">
            Question {currentIndex + 1} of {gameQuestions.length}
          </div>

          {phase === "guessing" && (
            <div className="w-full max-w-lg text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                {currentQuestion.company}
              </p>
              <h2 className="text-2xl font-bold mb-8">
                <GlossaryText text={currentQuestion.question} />
              </h2>
              <GuessInput key={currentIndex} onSubmit={handleGuess} isPercent={currentQuestion.unit === "percent"} />
            </div>
          )}

          {phase === "reveal" && (
            <RevealCard
              question={currentQuestion}
              guess={currentGuess}
              onNext={handleNext}
              isLast={currentIndex + 1 >= gameQuestions.length}
            />
          )}
        </>
      )}
    </main>
  );
}
