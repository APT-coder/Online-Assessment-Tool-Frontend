export interface Score {
    isSuccess: boolean;
    result: Scores[];
    statusCode: number;
    message: string[];
  }

  interface Scores{
    assessmentScoreId: number;
    scheduledAssessmentId: number;
    assessmentName: string;
    scheduledDate: Date;
    score: number;
    calculatedOn: Date;
  }

