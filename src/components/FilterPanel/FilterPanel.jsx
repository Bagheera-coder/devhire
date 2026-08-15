import React from 'react';
import { Button } from '../ui/Button/Button';
import styles from './FilterPanel.module.css';

export const FilterPanel = ({ filters, setFilters, onClear }) => {
  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      
      return { ...prev, [category]: updated };
    });
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance'];
  const workModes = ['Remote', 'Hybrid', 'On-site'];
  const experienceLevels = ['Entry Level', '1-3 years', '3-5 years', '5+ years'];

  return (
    <aside className={styles.filterPanel}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className={styles.filterTitle} style={{ fontSize: '1.25rem' }}>Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClear}>Clear all</Button>
      </div>
      
      <hr className={styles.divider} />

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Work Mode</h3>
        {workModes.map(mode => (
          <label key={mode} className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              className={styles.checkbox}
              checked={filters.workModes?.includes(mode) || false}
              onChange={() => handleCheckboxChange('workModes', mode)}
            />
            {mode}
          </label>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Job Type</h3>
        {jobTypes.map(type => (
          <label key={type} className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              className={styles.checkbox}
              checked={filters.jobTypes?.includes(type) || false}
              onChange={() => handleCheckboxChange('jobTypes', type)}
            />
            {type}
          </label>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Experience</h3>
        {experienceLevels.map(exp => (
          <label key={exp} className={styles.checkboxLabel}>
            <input 
              type="checkbox" 
              className={styles.checkbox}
              checked={filters.experienceLevels?.includes(exp) || false}
              onChange={() => handleCheckboxChange('experienceLevels', exp)}
            />
            {exp}
          </label>
        ))}
      </div>
    </aside>
  );
};
