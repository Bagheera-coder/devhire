import { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import './Toast.css';

export function Toast({ id, message, type = 'success', onClose, autoClose = 3000 }) {
  // Manage the auto-dismiss timer directly inside the individual Toast component
  // to avoid memory leaks and ensure cleanup if it unmounts early.
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon toast-icon-success" />,
    error: <AlertCircle size={18} className="toast-icon toast-icon-error" />,
    info: <Info size={18} className="toast-icon toast-icon-info" />
  };

  return (
    <div className={`toast toast-${type}`} role="alert">
      {icons[type]}
      <span className="toast-message">{message}</span>
      <button onClick={onClose} className="toast-close" aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
