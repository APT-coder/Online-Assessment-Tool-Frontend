// export enum AssessmentStatus {
    
//     Completed = 'Completed',
//     Evaluated='Evaluated',
//     Upcoming = 'Upcoming',
//     Cancelled = 'Cancelled'
//   }
export enum AssessmentStatus {
  Upcoming = 0,
  Evaluated = 1,
  Completed = 2,
  Cancelled = 3
}

  
  export interface AssessmentTableDTO {
    assessmentId: number;
    assessmentName: string;
    batchName: string;
    createdOn: Date; // Use `Date` type for date fields
    scheduledDate: Date; // Use `Date` type for date fields
    status: AssessmentStatus;
  }