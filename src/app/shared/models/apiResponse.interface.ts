import { AdminChart } from "./adminChart.interface"; 
import { AssessmentOverview } from "./assessmentOverview.interface"; 

export interface ApiResponses {
    isSuccess: boolean;
    result: AssessmentOverview[]  // Specify the type of result if possible
    statusCode: number;
    message: string[];
}
