export const adminAssessmentTable = [
    { field: 'assessmentName', header: 'Assessment Name', fixed: true, filter: true },
    { field: 'date', header: 'Date', type: 'date' },
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