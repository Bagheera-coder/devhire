import { useParams, useNavigate } from 'react-router-dom';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 'var(--space-4)' }}>
      <button 
        onClick={() => navigate('/board')}
        className="icon-button"
        style={{ marginBottom: 'var(--space-4)' }}
      >
        &larr; Back to Board
      </button>
      
      <h2>Task Details: {id}</h2>
      <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
        Detailed view and advanced editing capabilities for individual tasks are scheduled for development in a future phase.
      </p>
    </div>
  );
}
