export interface Choice {
  id: string;
  text: string;
}

export interface QuizData {
  quizId: number;
  question: string;
  choice: Choice[];
  quizType: "객관식" | "주관식" | "OX";
  previewUrl?: string;
  quizImage?: string;
}

export interface QuizResult {
  quizId: number;
  submit: string | null;
}

export interface QuizContent {
  name: string;
  status: boolean;
  active: boolean;
}
