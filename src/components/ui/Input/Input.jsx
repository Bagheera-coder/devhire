import React from 'react';
import styles from './Input.module.css';

export const Input = React.forwardRef(({
  className = '',
  label,
  error,
  leftIcon,
  rightIcon,
  id,
  ...props
}, ref) => {
  // Generate a unique ID if none is provided, useful for linking label to input
  const inputId = id || React.useId();

  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
        <input
          id={inputId}
          ref={ref}
          className={`
            ${styles.input} 
            ${leftIcon ? styles.hasLeftIcon : ''} 
            ${rightIcon ? styles.hasRightIcon : ''}
          `}
          {...props}
        />
        {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
