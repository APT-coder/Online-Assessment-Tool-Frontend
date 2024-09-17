export interface ScheduledResponse {
    isSuccess: boolean;
    result: ScheduledAssessment[];
    statusCode: number;
    message: string[];
  }

  interface ScheduledAssessment {
    batchId: number;
    assessmentId: number;
    assessmentName: string;
    scheduledDate: string;
    assessmentDuration: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    status: number;
    canRandomizeQuestion: boolean;
    canDisplayResult: boolean;
    canSubmitBeforeEnd: boolean;
  }