import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { useTeam } from '../../context/TeamContext';
import { useTasks } from '../../context/TaskContext';
import './NewTaskModal.css';

export function NewTaskModal({ isOpen, onClose, onCreateTask, defaultStatus = 'todo' }) {
  const { teamMembers } = useTeam();
  const { columns } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState(defaultStatus);
  const [assigneeId, setAssigneeId] = useState('');

  useEffect(() => {
    setStatus(defaultStatus);
  }, [defaultStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      assigneeId: assigneeId || null,
      labelIds: [],
      subtasks: [],
      tags: [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onCreateTask(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setAssigneeId('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title">Title <span className="required">*</span></label>
          <input 
            id="task-title"
            type="text" 
            placeholder="What needs to be done?" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">Description</label>
          <textarea 
            id="task-desc"
            placeholder="Add more details..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-assignee">Assign To</label>
          <select id="task-assignee" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
            <option value="">Unassigned</option>
            {teamMembers.map(member => (
              <option key={member.id} value={member.id}>{member.name} ({member.role})</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-status">Status</label>
            <select id="task-status" value={status} onChange={(e) => setStatus(e.target.value)}>
              {columns.map(col => (
                <option key={col.id} value={col.id}>{col.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="task-priority">Priority</label>
            <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={!title.trim()}>Create Task</button>
        </div>
      </form>
    </Modal>
  );
}
