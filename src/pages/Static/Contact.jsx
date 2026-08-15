import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../../components/ui/Button/Button';
import { Input } from '../../components/ui/Input/Input';
import { useToast } from '../../context/ToastContext';
import styles from './StaticPage.module.css';

export const Contact = () => {
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Message sent! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Have a question, feedback, or need support? We'd love to hear from you.
          </p>
        </header>

        <div style={{ display: 'grid', gap: 'var(--space-8)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
              Whether you're looking for a new role or looking to hire, our team is here to help you navigate the process.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--text-secondary)' }}>
                <Mail className={styles.categoryIcon} size={24} style={{ color: 'var(--brand-primary)', backgroundColor: 'var(--brand-light)', padding: 8, borderRadius: 8, width: 40, height: 40 }} />
                <span>support@devhire.demo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--text-secondary)' }}>
                <Phone className={styles.categoryIcon} size={24} style={{ color: 'var(--brand-primary)', backgroundColor: 'var(--brand-light)', padding: 8, borderRadius: 8, width: 40, height: 40 }} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--text-secondary)' }}>
                <MapPin className={styles.categoryIcon} size={24} style={{ color: 'var(--brand-primary)', backgroundColor: 'var(--brand-light)', padding: 8, borderRadius: 8, width: 40, height: 40 }} />
                <span>123 Innovation Drive, Tech City, CA 94103</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-primary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Full Name</label>
                <Input required placeholder="John Doe" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Email Address</label>
                <Input type="email" required placeholder="john@example.com" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Message</label>
                <textarea required placeholder="How can we help you?" style={{ width: '100%', minHeight: '120px', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', backgroundColor: 'transparent', color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical' }} />
              </div>
              <Button type="submit" variant="primary" style={{ width: '100%', marginTop: 'var(--space-2)' }}>Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
