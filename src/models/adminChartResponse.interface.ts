import { AdminChart } from "./adminChart.interface"; 

export interface AdminChartResponse {
    isSuccess: boolean;
    result: AdminChart[];
    statusCode: number;
    message: string[];
  }