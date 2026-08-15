import React from 'react';
import styles from './StaticPage.module.css';

export const Terms = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header} style={{ marginBottom: 'var(--space-8)' }}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </header>

        <div className={styles.content}>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-8)' }}>
            <strong>Disclaimer:</strong> This is a demonstration frontend project. These Terms of Service are fictional and do not represent a legally binding agreement.
          </div>

          <h2>1. Introduction</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the DevHire demonstration application. By accessing or using the platform, you agree to be bound by these Terms.
          </p>

          <h2>2. Use of the Platform</h2>
          <p>
            DevHire is provided as an interactive portfolio project to demonstrate frontend development capabilities, including React architecture, state management, and CSS design systems. You may use this platform to explore its features, but you acknowledge that it is not a functional production service.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            When interacting with the platform, you agree not to attempt to exploit, disrupt, or maliciously attack the application. As all state is stored locally, any modifications you make will only affect your local browser environment.
          </p>

          <h2>4. Job Listings</h2>
          <p>
            All job listings, company names, logos, and salary figures displayed on this platform are entirely fictional and generated for demonstration purposes. They do not represent real job openings or real companies.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The design, layout, code architecture, and styling of this application are the intellectual property of the developer who created this portfolio piece. Open-source libraries used (e.g., React, Lucide Icons, Vite) remain under their respective licenses.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            The platform is provided "as is" without warranties of any kind. The developer assumes no responsibility for any perceived loss of data (e.g., if your local storage is cleared) or any issues arising from the use of this demonstration application.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these fictional terms at any time without notice, as this project is subject to ongoing development and iterations.
          </p>

          <h2>8. Contact</h2>
          <p>
            For inquiries related to the development of this project, please reach out via the provided GitHub repository or portfolio contact links.
          </p>
        </div>
      </div>
    </div>
  );
};
