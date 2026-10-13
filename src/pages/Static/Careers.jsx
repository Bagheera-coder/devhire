import React from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button/Button';
import { Badge } from '../../components/ui/Badge/Badge';
import styles from './StaticPage.module.css';

const jobs = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    workMode: "Hybrid",
    description: "Lead the development of our core React application. Build beautiful, accessible UI components and help scale our frontend architecture."
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "New York, NY",
    workMode: "Remote",
    description: "Design intuitive user experiences for our job seekers. Work closely with engineering and product to craft the future of DevHire."
  },
  {
    title: "Backend Engineer",
    department: "Engineering",
    location: "London, UK",
    workMode: "Remote",
    description: "Build scalable APIs and robust search infrastructure. Work with Node.js, PostgreSQL, and Elasticsearch."
  }
];

export const Careers = () => {
  return (
    <div className={styles.page}>
      <div className={styles.wideContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Build the future of job discovery with us.</h1>
          <p className={styles.subtitle}>
            Join a passionate team dedicated to making the job search process transparent, efficient, and humane. 
            <em>(Note: These are fictional example positions for this demo app)</em>
          </p>
        </header>

        <div className={styles.jobGrid}>
          {jobs.map((job, index) => (
            <div key={index} className={styles.jobCard}>
              <div style={{ marginBottom: 'var(--space-2)' }}>
                <span style={{ color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                  {job.department}
                </span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 var(--space-3) 0', color: 'var(--text-primary)' }}>
                {job.title}
              </h2>
              
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <Badge variant="outline"><MapPin size={12} style={{marginRight: 4}}/> {job.location}</Badge>
                <Badge variant="secondary"><Briefcase size={12} style={{marginRight: 4}}/> {job.workMode}</Badge>
              </div>

              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {job.description}
              </p>

              <Button variant="primary" style={{ width: '100%' }} onClick={() => alert("This is a demo application. Thanks for your interest!")}>
                Apply Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
