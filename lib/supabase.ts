import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveScore(
  playerName: string,
  score: number,
  maxScore: number,
  questionCount: number
) {
  const { error } = await supabase.from("scores").insert({
    player_name: playerName,
    score,
    max_score: maxScore,
    question_count: questionCount,
  });
  if (error) throw error;
}

export async function getLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .order("score", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}
