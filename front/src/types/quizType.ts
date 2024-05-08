export interface Choice {
  [key: string]: string
}

export interface QuizData {
  quizId : number;
  question : string
  answer: string;
  choice: Choice | null;
  quizType: '객관식' | '주관식' | 'OX';
  previewUrl?: string;
  quizImage?: string
}

