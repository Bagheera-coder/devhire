import React from 'react';
import styles from './Badge.module.css';

export const Badge = React.forwardRef(({ 
  className = '', 
  variant = 'default',
  children,
  ...props 
}, ref) => {
  const classes = [
    styles.badge,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Badge.displayName = "Badge";
