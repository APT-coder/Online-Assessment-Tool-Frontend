export interface CheckAttended {
    isSuccess: boolean;
    result: {
      exists: boolean;
    };
    statusCode: number;
    message: string[];
  }
  