export interface ApplicationRecord {
  id: string;
  companyName: string;
  roleTitle: string;
  status: 'Applied' | 'Online Assessment' | 'Interview Scheduled' | 'Offer Received' | 'Rejected';
  appliedDate: string;
  notes?: string;
}

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app_1',
    companyName: 'Google',
    roleTitle: 'Software Engineering Intern 2026',
    status: 'Interview Scheduled',
    appliedDate: '2026-07-05',
    notes: 'Technical Interview 1 scheduled for Aug 4.',
  },
  {
    id: 'app_2',
    companyName: 'Amazon',
    roleTitle: 'SDE-1 Graduate 2026',
    status: 'Online Assessment',
    appliedDate: '2026-07-10',
    notes: 'Completed OA1 (Work Styles & Debugging).',
  },
];

class InternshipTrackerService {
  private applications: ApplicationRecord[] = INITIAL_APPLICATIONS;

  public getApplications(): ApplicationRecord[] {
    return this.applications;
  }
}

export const internshipTrackerService = new InternshipTrackerService();
