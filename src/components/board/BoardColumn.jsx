import { Plus, Trash2, GripHorizontal } from 'lucide-react';
import { useState } from 'react';
import { TaskCard } from './TaskCard';
import { useTasks } from '../../context/TaskContext';
import { useToast } from '../../context/ToastContext';
import './BoardColumn.css';

export function BoardColumn({ id, title, count, tasks, onTaskDrop, onColumnDrop, onAddTask, onTaskClick }) {
  const { updateColumn, deleteColumn } = useTasks();
  const { addToast } = useToast();
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Check if a TASK was dropped
    const taskId = e.dataTransfer.getData('application/x-task') || e.dataTransfer.getData('text/plain');
    if (taskId && !taskId.startsWith('col-')) {
      if (onTaskDrop) onTaskDrop(taskId, id);
      return;
    }

    // Check if a COLUMN was dropped
    const sourceColId = e.dataTransfer.getData('application/x-column');
    if (sourceColId && onColumnDrop && sourceColId !== id) {
      onColumnDrop(sourceColId, id);
    }
  };

  const handleRename = () => {
    if (editTitle.trim() && editTitle !== title) {
      updateColumn(id, editTitle.trim());
      addToast('Column renamed', 'success');
    } else {
      setEditTitle(title); // revert if empty
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    try {
      if (window.confirm(`Are you sure you want to delete the "${title}" column?`)) {
        deleteColumn(id);
        addToast('Column deleted', 'info');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleColumnDragStart = (e) => {
    e.dataTransfer.setData('application/x-column', id);
    e.dataTransfer.effectAllowed = 'move';
    // Visual feedback for dragging a column
    setTimeout(() => { e.target.closest('.board-column').style.opacity = '0.5'; }, 0);
  };

  const handleColumnDragEnd = (e) => {
    e.target.closest('.board-column').style.opacity = '1';
  };

  return (
    <div 
      className={`board-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <div 
          className="column-drag-handle" 
          draggable 
          onDragStart={handleColumnDragStart}
          onDragEnd={handleColumnDragEnd}
          title="Drag to reorder column"
          style={{ cursor: 'grab', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
        >
          <GripHorizontal size={14} />
        </div>

        <div className="column-title-wrapper" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
              autoFocus
              className="column-title-input"
              style={{ width: '100%', padding: '2px 4px', fontSize: '14px', fontWeight: 600, border: '1px solid var(--accent-primary)', borderRadius: '4px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          ) : (
            <>
              <h3 className="column-title" onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }} title="Click to rename">
                {title}
              </h3>
              <span className="column-count">{count}</span>
            </>
          )}
        </div>
        
        <div style={{ display: 'flex' }}>
          <button className="icon-button" aria-label="Delete column" onClick={handleDelete} title="Delete column">
            <Trash2 size={14} />
          </button>
          <button className="icon-button" aria-label="Add task" onClick={onAddTask} title="Add task">
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="column-content">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  );
}
