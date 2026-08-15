import { MessageSquare, MoreHorizontal, CheckSquare } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { useTeam } from '../../context/TeamContext';
import { useTasks } from '../../context/TaskContext';
import { RichText } from '../utils/RichText';
import './TaskCard.css';

export function TaskCard({ task, onTaskClick }) {
  const { getMember } = useTeam();
  const { labels } = useTasks();
  const assignee = getMember(task.assigneeId);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id); // Legacy fallback
    e.dataTransfer.setData('application/x-task', task.id); // Explicit task drop
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };

  const handleClick = (e) => {
    if (onTaskClick) onTaskClick(task.id);
  };

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const completedSubtasks = hasSubtasks ? task.subtasks.filter(s => s.completed).length : 0;
  const allSubtasksDone = hasSubtasks && completedSubtasks === task.subtasks.length;

  return (
    <div 
      className="task-card" 
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <div className="task-card-header">
        <div className="task-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          <Badge variant={task.priority}>{task.priority}</Badge>
          
          {/* Support both legacy tags and new dynamic labels for backward compatibility */}
          {task.tags?.map(tag => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
          
          {task.labelIds?.map(id => {
            const label = labels.find(l => l.id === id);
            if (!label) return null;
            return (
              <span 
                key={id} 
                style={{
                  backgroundColor: label.color,
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}
              >
                {label.name}
              </span>
            );
          })}
        </div>
        <button 
          className="icon-button" 
          aria-label="Task options"
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <h4 className="task-title">{task.title}</h4>
      {task.description && (
        <div className="task-description">
          <RichText text={task.description} />
        </div>
      )}
      
      <div className="task-card-footer">
        <div style={{ display: 'flex', gap: '12px' }}>
          {task.comments?.length > 0 && (
            <div className="task-icon-stat" title="Comments" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '12px' }}>
              <MessageSquare size={14} />
              <span>{task.comments.length}</span>
            </div>
          )}
          
          {hasSubtasks && (
            <div 
              className="task-icon-stat" 
              title="Checklist items" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                fontSize: '12px',
                color: allSubtasksDone ? 'var(--success)' : 'var(--text-secondary)',
                fontWeight: allSubtasksDone ? '600' : 'normal'
              }}
            >
              <CheckSquare size={14} />
              <span>{completedSubtasks}/{task.subtasks.length}</span>
            </div>
          )}
        </div>
        
        {assignee && (
          <Avatar 
            src={assignee.avatar} 
            alt={assignee.name} 
            fallback={assignee.name.charAt(0)} 
          />
        )}
      </div>
    </div>
  );
}
