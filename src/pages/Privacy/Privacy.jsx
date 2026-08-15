export function Privacy() {
  return (
    <div className="section-container" style={{ padding: 'var(--space-12) var(--space-4)', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="section-title">Privacy Policy</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>1. Information Collection</h2>
          <p>
            FlowBoard is currently a demonstration and educational project. We do not collect, process, or store personal information on any external servers.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>2. Local Storage Usage</h2>
          <p>
            All data created within FlowBoard—including tasks, columns, tags, and team members—is strictly stored locally on your device using the browser's `localStorage` API. No data is transmitted over the internet.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>3. Third-Party Services</h2>
          <p>
            This application does not use any third-party tracking, analytics, or advertising cookies.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>4. Data Security & Choices</h2>
          <p>
            Because your data lives exclusively in your browser, you maintain complete control over it. You can export your data via the Settings page, or permanently wipe it by clearing your browser's site data.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>5. Contact Information</h2>
          <p>
            For any questions regarding this privacy policy, please contact <a href="mailto:kumarabhishek5968@gmail.com" style={{ color: 'var(--accent-primary)' }}>kumarabhishek5968@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
