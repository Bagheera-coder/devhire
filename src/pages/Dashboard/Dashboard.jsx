import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Briefcase, Bookmark, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../hooks/useApplications';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import { Button } from '../../components/ui/Button/Button';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { applications } = useApplications();
  const { savedJobIds } = useSavedJobs();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const interviews = applications.filter(app => app.status === 'interview').length;

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome back, {user?.name || 'User'}!</h1>
          <p className={styles.subtitle}>Here is a summary of your job search progress.</p>
        </header>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Briefcase size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>{applications.length}</h3>
              <p>Active Applications</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <TrendingUp size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>{interviews}</h3>
              <p>Interviews Scheduled</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Bookmark size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>{savedJobIds.length}</h3>
              <p>Saved Jobs</p>
            </div>
          </div>
        </div>

        <div className={styles.recentSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Quick Actions</h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link to="/jobs">
              <Button variant="primary">Find New Jobs</Button>
            </Link>
            <Link to="/applications">
              <Button variant="outline">View Kanban Board</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline">Update Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
