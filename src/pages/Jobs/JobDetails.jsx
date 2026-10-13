import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, Building2, Bookmark, Share2, DollarSign } from 'lucide-react';
import { mockJobs } from '../../data/mockJobs';
import { Button } from '../../components/ui/Button/Button';
import { Card, CardContent } from '../../components/ui/Card/Card';
import { Badge } from '../../components/ui/Badge/Badge';
import { useSavedJobs } from '../../hooks/useSavedJobs';
import { useApplications } from '../../hooks/useApplications';
import { useToast } from '../../context/ToastContext';
import styles from './JobDetails.module.css';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isJobSaved, toggleSavedJob } = useSavedJobs();
  const { hasApplied, applyToJob } = useApplications();
  const { showToast } = useToast();
  
  // Find job, in a real app this would be an API call
  const job = mockJobs.find(j => j.id === parseInt(id));
  
  if (!job) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Job not found</h2>
        <Button variant="outline" onClick={() => navigate('/jobs')} style={{ marginTop: '1rem' }}>
          Back to Jobs
        </Button>
      </div>
    );
  }

  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  const handleApply = () => {
    applyToJob(job);
    showToast('Application added to your tracker.');
  };

  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>
        <Link to="/jobs" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to all jobs
        </Link>

        <Card className={styles.headerCard}>
          <div className={styles.headerTop}>
            <div>
              <div className={styles.companyInfo}>
                <div className={styles.logoContainer}>
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Building2 color="var(--text-secondary)" size={32} />
                  )}
                </div>
                <h2 className={styles.companyName}>{job.company}</h2>
              </div>
              
              <h1 className={styles.title}>{job.title}</h1>
              
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <MapPin size={18} /> {job.location}
                </div>
                <div className={styles.metaItem}>
                  <Briefcase size={18} /> {job.type}
                </div>
                <div className={styles.metaItem}>
                  <DollarSign size={18} /> {job.salary}
                </div>
                <div className={styles.metaItem}>
                  <Clock size={18} /> Posted {job.postedDate}
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button 
                variant={saved ? "secondary" : "outline"}
                leftIcon={<Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />}
                onClick={() => toggleSavedJob(job.id)}
              >
                {saved ? 'Saved' : 'Save Job'}
              </Button>
              
              {applied ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <Button variant="secondary" leftIcon={<CheckCircle size={18} color="var(--brand-primary)" />} disabled>
                    Applied ✓
                  </Button>
                  <Link to="/applications" style={{ textDecoration: 'none' }}>
                    <Button variant="primary" style={{ width: '100%' }} leftIcon={<ExternalLink size={18} />}>
                      View Application
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button 
                  variant="primary"
                  onClick={handleApply}
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>
        </Card>

        <div className={styles.contentGrid}>
          <div>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>About the role</h3>
              <p className={styles.description}>{job.description}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Key Responsibilities</h3>
              <ul className={styles.list}>
                {job.responsibilities?.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Requirements</h3>
              <ul className={styles.list}>
                {job.requirements?.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>
          </div>

          <div>
            <Card className={styles.sidebarCard}>
              <CardContent style={{ padding: 'var(--space-6)' }}>
                <div className={styles.section} style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 className={styles.sectionTitle} style={{ fontSize: '1rem' }}>Required Skills</h3>
                  <div className={styles.skills}>
                    {job.skills.map(skill => (
                      <Badge key={skill} variant="default">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className={styles.section} style={{ marginBottom: 0 }}>
                  <h3 className={styles.sectionTitle} style={{ fontSize: '1rem' }}>Benefits</h3>
                  <ul className={styles.list} style={{ paddingLeft: '1rem', fontSize: '0.875rem' }}>
                    {job.benefits?.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
