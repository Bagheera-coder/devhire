import React, { useState, useEffect } from 'react';
import { useInView } from '../../../hooks/useInView';

export const CountUp = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    // Handle reduced motion - jump straight to end
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setCount(end);
      return;
    }

    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * end));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  // Handle numbers with decimals formatting nicely (e.g., 2.5K+)
  const formattedCount = Number.isInteger(end) ? count : (count * (end / Math.floor(end))).toFixed(1);
  
  // Actually since our stats might be strings like "10K+", this component takes a number `end` and we append the suffix
  // e.g. end={10} suffix="K+" -> "10K+"

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};
