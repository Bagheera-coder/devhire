import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import styles from './Profile.module.css';

export const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Your Profile</h1>
          <p className={styles.subtitle}>Manage your account settings and preferences.</p>
        </header>

        <div className={styles.profileCard}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--brand-light)' }} />
              )}
            </div>
            <div className={styles.details}>
              <h2>{user?.name || 'User'}</h2>
              <p>{user?.email}</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: 0 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <Input value={user?.name || ''} readOnly className={styles.readonlyInput} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <Input value={user?.email || ''} readOnly className={styles.readonlyInput} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Profile editing is disabled in this demo environment.
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-4)' }}>
            <Button variant="outline" onClick={logout} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
