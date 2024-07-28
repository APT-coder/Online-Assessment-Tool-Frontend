export interface Assessment {
    isSuccess: boolean;
    result: Result;
    statusCode: number;
    message: string[];
  }
  
 export interface Result {
    assessmentId: number;
    assessmentName: string;
    createdOn: string;
    createdBy: number;
    questions: Question[];
  }
  
 export interface Question {
    questionId: number;
    assessmentId: number;
    questionType: string;
    questionText: string;
    points: number;
    createdBy: number;
    createdOn: string;
    questionOptions: QuestionOption[];
    questionNo:number
  }
  
  interface QuestionOption {
    questionOptionId: number;
    questionId: number;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: string;
  }
  