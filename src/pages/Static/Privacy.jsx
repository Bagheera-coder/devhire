import React from 'react';
import styles from './StaticPage.module.css';

export const Privacy = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header} style={{ marginBottom: 'var(--space-8)' }}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </header>

        <div className={styles.content}>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-8)' }}>
            <strong>Disclaimer:</strong> This is a demonstration frontend project. No real user data is collected, transmitted to a server, or processed by any third parties. This policy is for demonstration purposes only.
          </div>

          <h2>1. Introduction</h2>
          <p>
            Welcome to DevHire. We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how your information is handled when you use our web application.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            As this is a frontend-only demonstration application, we do not collect any real personal data. Any information you input into the application (such as job searches, saved jobs, or application notes) is stored entirely locally on your device.
          </p>

          <h2>3. How Information is Used</h2>
          <p>
            The data you generate while using this demo app is used strictly to simulate the functionality of a real job board and application tracking system. It allows the UI to respond to your actions (e.g., showing a job as "Saved").
          </p>

          <h2>4. Data Storage and Local Storage</h2>
          <p>
            We use your browser's Local Storage to persist your application state across page reloads. This includes:
          </p>
          <ul>
            <li>Your theme preference (Light or Dark mode).</li>
            <li>Your saved job IDs.</li>
            <li>Your application tracker data.</li>
            <li>Mock authentication state.</li>
          </ul>
          <p>
            Because this data is stored in your browser, clearing your browser cache or local storage will completely erase all your data. We have no access to this data.
          </p>

          <h2>5. User Choices</h2>
          <p>
            You have complete control over your data. You can delete individual applications from the Application Tracker, or you can clear your browser's local storage to remove all DevHire data instantly.
          </p>

          <h2>6. Contact</h2>
          <p>
            If you have any questions about this demo privacy policy, you can contact the developer by reviewing the source code repository associated with this project.
          </p>
        </div>
      </div>
    </div>
  );
};
