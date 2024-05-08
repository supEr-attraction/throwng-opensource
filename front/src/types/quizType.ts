export interface Choice {
  id: string;
  text: string;
}

export interface QuizData {
  quizId: number;
  question: string;
  answer: string;
  choice: Choice[]
  quizType: "객관식" | "주관식" | "OX";
  previewUrl?: string;
  quizImage?: string;
}

