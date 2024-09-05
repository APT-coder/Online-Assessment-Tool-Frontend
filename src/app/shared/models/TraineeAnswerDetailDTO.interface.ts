import { QuestionOptionDTO } from "./QuestionOptionDTO.interface";

export interface TraineeAnswerDetailDTO {
    result: any;
    questionId: number;
    answer: string;
    isCorrect: boolean;
    score: number;
    questionText: string;
    questionType: string;
    points:number;
    questionOptions: QuestionOptionDTO;
  }