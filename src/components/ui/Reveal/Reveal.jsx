import React from 'react';
import { useInView } from '../../../hooks/useInView';
import styles from './Reveal.module.css';

export const Reveal = ({ children, delay = 0, threshold = 0.1, className = '', type = 'fadeUp' }) => {
  const [ref, isInView] = useInView({ threshold, triggerOnce: true });

  const getAnimationClass = () => {
    switch (type) {
      case 'fadeUp': return styles.fadeUp;
      case 'fadeIn': return styles.fadeIn;
      default: return styles.fadeUp;
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${getAnimationClass()} ${isInView ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
