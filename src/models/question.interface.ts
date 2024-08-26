export interface Question {
  id: number;
  type: string;
  score: number;
  content: string;
  options: string[];
  correctAnswer: string[];
}