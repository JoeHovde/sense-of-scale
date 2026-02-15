export interface Question {
  id: string;
  question: string;
  answer: number;
  displayAnswer: string;
  unit: string;
  category: string;
  company: string;
  ticker: string;
  source: string;
  chartImage: string | null;
  difficulty: "easy" | "medium" | "hard";
}

export function getRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
