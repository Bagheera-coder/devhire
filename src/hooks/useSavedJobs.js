import { useLocalStorage } from './useLocalStorage';

export function useSavedJobs() {
  const [savedJobIds, setSavedJobIds] = useLocalStorage('devhire_saved_jobs', []);

  const toggleSavedJob = (jobId) => {
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId) => {
    return savedJobIds.includes(jobId);
  };

  return {
    savedJobIds,
    toggleSavedJob,
    isJobSaved
  };
}
