export function Terms() {
  return (
    <div className="section-container" style={{ padding: 'var(--space-12) var(--space-4)', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="section-title">Terms of Service</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>1. Acceptance of Terms</h2>
          <p>
            By accessing and using FlowBoard, you accept and agree to be bound by the terms and provisions of this agreement. Note that this is a demonstration project, and usage is primarily for educational or personal productivity purposes.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>2. Use of the Application</h2>
          <p>
            You agree to use this application as provided, without attempting to exploit, overload, or disrupt the frontend interfaces. All data created is your responsibility and remains solely on your local device.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>3. Intellectual Property</h2>
          <p>
            The custom design, CSS architecture, and React components created for FlowBoard are the intellectual property of the author. 
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>4. Limitation of Liability</h2>
          <p>
            Because this application uses browser local storage for persistence, FlowBoard and its author are not liable for any data loss, corruption, or unintended deletion. Users are encouraged to frequently back up their data using the provided JSON Export tools.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>5. Contact Information</h2>
          <p>
            If you have questions regarding these terms, please contact <a href="mailto:kumarabhishek5968@gmail.com" style={{ color: 'var(--accent-primary)' }}>kumarabhishek5968@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
