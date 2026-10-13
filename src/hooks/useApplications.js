import { useLocalStorage } from './useLocalStorage';

export const APPLICATION_STATUSES = {
  APPLIED: 'applied',
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  TECHNICAL: 'technical',
  HR: 'hr',
  OFFER: 'offer',
  REJECTED: 'rejected'
};

export function useApplications() {
  const [applications, setApplications] = useLocalStorage('devhire_applications_v2', []);

  // For adding an application from the Job Details page (where we only have jobId)
  const applyToJob = (jobDetails) => {
    setApplications((prev) => {
      if (prev.some(app => app.jobId === jobDetails.id)) return prev;
      
      const newApp = {
        id: crypto.randomUUID(),
        jobId: jobDetails.id,
        jobTitle: jobDetails.title,
        company: jobDetails.company,
        companyLogo: jobDetails.companyLogo,
        location: jobDetails.location,
        salary: jobDetails.salary,
        jobType: jobDetails.type,
        workMode: jobDetails.workMode,
        status: APPLICATION_STATUSES.APPLIED,
        dateApplied: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        notes: ''
      };
      return [...prev, newApp];
    });
  };

  // For adding a custom application from the tracker
  const addCustomApplication = (appData) => {
    setApplications((prev) => {
      const newApp = {
        ...appData,
        id: crypto.randomUUID(),
      };
      return [...prev, newApp];
    });
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications((prev) => 
      prev.map(app => app.id === applicationId ? { ...app, status: newStatus } : app)
    );
  };

  const updateApplicationNotes = (applicationId, newNotes) => {
    setApplications((prev) => 
      prev.map(app => app.id === applicationId ? { ...app, notes: newNotes } : app)
    );
  };

  const removeApplication = (applicationId) => {
    setApplications((prev) => prev.filter(app => app.id !== applicationId));
  };

  const hasApplied = (jobId) => {
    return applications.some(app => app.jobId === jobId);
  };

  return {
    applications,
    applyToJob,
    addCustomApplication,
    updateApplicationStatus,
    updateApplicationNotes,
    removeApplication,
    hasApplied
  };
}
