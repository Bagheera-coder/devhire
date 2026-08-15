import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './SlidePanel.css';

export function SlidePanel({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="slide-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="slide-content" role="dialog" aria-modal="true" aria-labelledby="slide-title">
        <div className="slide-header">
          <h3 id="slide-title">{title}</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close panel">
            <X size={20} />
          </button>
        </div>
        <div className="slide-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
