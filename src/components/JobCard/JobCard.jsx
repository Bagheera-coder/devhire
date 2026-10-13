import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Bookmark, Building2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card/Card';
import { Badge } from '../ui/Badge/Badge';
import { Button } from '../ui/Button/Button';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import { useApplications } from '../../hooks/useApplications';
import { useToast } from '../../context/ToastContext';
import styles from './JobCard.module.css';

export const JobCard = ({ job }) => {
  const { isJobSaved, toggleSavedJob } = useSavedJobs();
  const { hasApplied, applyToJob } = useApplications();
  const { showToast } = useToast();
  
  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  const handleApply = () => {
    applyToJob(job);
    showToast('Application added to your tracker.');
  };

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className={styles.logo} />
            ) : (
              <Building2 className={styles.placeholderLogo} size={24} />
            )}
          </div>
          <div className={styles.headerInfo}>
            <h3 className={styles.title}>{job.title}</h3>
            <p className={styles.company}>{job.company}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`${styles.saveBtn} ${saved ? styles.savedBtnActive : ''}`} 
            aria-label="Save job"
            onClick={() => toggleSavedJob(job.id)}
          >
            <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
          </Button>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className={styles.metaItem}>
            <Briefcase size={16} />
            <span>{job.experience}</span>
          </div>
          <div className={styles.metaItem}>
            <Clock size={16} />
            <span>{job.postedDate}</span>
          </div>
        </div>

        <div className={styles.tags}>
          <Badge variant="primary">{job.workMode}</Badge>
          <Badge variant="outline">{job.type}</Badge>
          <Badge variant="success">{job.salary}</Badge>
        </div>
        
        <div className={styles.skills}>
          {job.skills.slice(0, 3).map(skill => (
            <span key={skill} className={styles.skill}>{skill}</span>
          ))}
          {job.skills.length > 3 && (
            <span className={styles.skill}>+{job.skills.length - 3}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className={styles.footer}>
        <Link to={`/jobs/${job.id}`} style={{ flex: 1, display: 'flex' }}>
          <Button variant="outline" style={{ width: '100%' }}>View Details</Button>
        </Link>
        {applied ? (
          <Link to="/applications" style={{ flex: 1, display: 'flex' }}>
            <Button variant="secondary" style={{ width: '100%' }}>Applied ✓</Button>
          </Link>
        ) : (
          <Button variant="primary" style={{ flex: 1 }} onClick={handleApply}>Apply Now</Button>
        )}
      </CardFooter>
    </Card>
  );
};
