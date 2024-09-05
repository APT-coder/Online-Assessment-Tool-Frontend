import { filter } from "rxjs";

export const adminAssessmentTable = [
    { field: 'assessmentName', header: 'Assessment Name', fixed: true, filter: true },
    { field: 'date', header: 'Date', type: 'date', filter: true },
    { field: 'trainer', header: 'Trainer', filter: true },
    { field: 'batchName', header: 'Batch Name', fixed: true, filter: true },
    { field: 'status', header: 'Status', fixed: true, filter: true, type: 'status' }
  ];

export const trainerAssessmentTable = [
    { field: 'assessmentName', header: 'Assessment Name', fixed: true, filter: true },
    { field: 'batchName', header: 'Batch Name', fixed: true, filter: true },
    { field: 'createdOn', header: 'Created On', type: 'date' },
    { field: 'scheduledDate', header: 'Scheduled On', type: 'date', filter: true },    
    { field: 'status', header: 'Status', fixed: true, filter: true, type: 'status' }
  ];

export const trainerAssessmentTableFiltered = [
    { field: 'assessmentName', header: 'Assessment Name', fixed: true, filter: true },
    { field: 'batchName', header: 'Batch Name', fixed: true, filter: true },
    { field: 'createdOn', header: 'Created On', type: 'date' },
    { field: 'scheduledDate', header: 'Scheduled On', type: 'date', filter: true },    
  ];

export const traineeTable = [
    { field: 'rankInBatch', header: 'Rank', filter: true, fixed: true, type: 'numeric' },
    { field: 'traineeName', header: 'Trainee Name', fixed: true, filter: true },
    { field: 'averagePercentageScore', header: 'Average % Score', fixed: true, filter: true, type: 'numeric' },
    { field: 'totalAssessmentsCompleted', header: 'Assessments Taken', type: 'numeric', filter: true },
    { field: 'totalScore', header: 'Total Score', type: 'numeric', fixed: false, filter: true },    
    { field: 'lastAssessmentDate', header: 'Last Test Date', filter: true, type: 'date' },
];

export const status = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
  { label: 'Evaluated', value: 'evaluated' },
  { label: 'Cancelled', value: 'cancelled' }
];