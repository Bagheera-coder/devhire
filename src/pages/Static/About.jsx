import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import styles from './StaticPage.module.css';

export const About = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>About DevHire</h1>
          <p className={styles.subtitle}>
            We're on a mission to connect the world's best tech talent with the companies building the future.
          </p>
        </header>

        <div className={styles.content}>
          <h2>The Problem We're Solving</h2>
          <p>
            Job hunting in the tech industry is broken. Engineers spend countless hours sifting through irrelevant listings, managing chaotic spreadsheets to track applications, and waiting in the dark for recruiter responses. We believe it doesn't have to be this way.
          </p>

          <h2>Our Mission</h2>
          <p>
            DevHire was built to streamline the tech job search. We provide a clean, modern, and noise-free platform that respects your time. Our goal is to empower developers with the tools they need to discover great roles, manage their applications seamlessly, and ultimately land their dream job.
          </p>

          <h2>Platform Features</h2>
          <ul>
            <li><strong>Curated Job Listings:</strong> Focus on roles in software engineering, design, and product management.</li>
            <li><strong>Advanced Filtering:</strong> Find exactly what you're looking for with robust salary, location, and remote filters.</li>
            <li><strong>Integrated Application Tracker:</strong> Say goodbye to spreadsheets. Move applications through a Kanban board from "Applied" to "Offer".</li>
            <li><strong>Privacy First:</strong> Your data is yours. We use local storage and respect your privacy settings.</li>
          </ul>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Ready to find your next role?</h3>
            <Link to="/jobs">
              <Button variant="primary" size="lg">Explore Open Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
