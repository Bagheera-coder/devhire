import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkMinus } from 'lucide-react';
import { mockJobs } from '../../data/mockJobs';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import { JobCard } from '../../components/JobCard/JobCard';
import { Button } from '../../components/ui/Button/Button';
import styles from './Saved.module.css';

export const Saved = () => {
  const { savedJobIds } = useSavedJobs();
  const navigate = useNavigate();

  // Filter the mock data to only include jobs whose IDs are in savedJobIds
  const savedJobs = mockJobs.filter(job => savedJobIds.includes(job.id));

  return (
    <div className={styles.savedPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Saved Jobs</h1>
            <p className={styles.subtitle}>Review and apply to jobs you've bookmarked.</p>
          </div>
        </header>

        {savedJobs.length > 0 ? (
          <div className={styles.jobsGrid}>
            {savedJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <BookmarkMinus className={styles.emptyIcon} size={48} />
            <h3 className={styles.emptyTitle}>No saved jobs yet</h3>
            <p className={styles.emptyDesc}>When you find a job you like, click the bookmark icon to save it here for later.</p>
            <Button variant="primary" onClick={() => navigate('/jobs')}>
              Discover Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
