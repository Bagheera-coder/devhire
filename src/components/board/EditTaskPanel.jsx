import { useState, useEffect } from 'react';
import { SlidePanel } from '../ui/SlidePanel';
import { Trash2, Plus, CheckSquare, MessageSquare, Send } from 'lucide-react';
import { useTeam } from '../../context/TeamContext';
import { useTasks } from '../../context/TaskContext';
import { Avatar } from '../ui/Avatar';
import { RichText } from '../utils/RichText';
import './NewTaskModal.css';

export function EditTaskPanel({ isOpen, onClose, task, onUpdateTask, onDeleteTask }) {
  const { teamMembers, getMember, currentUser } = useTeam();
  const { columns, labels, addLabel } = useTasks();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');
  const [assigneeId, setAssigneeId] = useState('');
  
  // Labels State
  const [labelIds, setLabelIds] = useState([]);
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#0052cc');
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Subtasks State
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  // Comments State
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(task.priority || 'medium');
      setStatus(task.status || 'todo');
      setAssigneeId(task.assigneeId || '');
      setLabelIds(task.labelIds || []);
      setSubtasks(task.subtasks || []);
      setComments(task.comments || []);
      setIsCreatingLabel(false);
    }
  }, [task, isOpen]);

  const handleToggleLabel = (id) => {
    setLabelIds(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };

  const handleCreateLabel = (e) => {
    e.preventDefault();
    if (!newLabelName.trim()) return;
    const newId = addLabel(newLabelName.trim(), newLabelColor);
    setLabelIds(prev => [...prev, newId]); // auto assign it
    setNewLabelName('');
    setIsCreatingLabel(false);
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    const newSubtask = {
      id: `subtask-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false
    };
    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle('');
  };

  const handleToggleSubtask = (id) => {
    setSubtasks(subtasks.map(st => 
      st.id === id ? { ...st, completed: !st.completed } : st
    ));
  };

  const handleDeleteSubtask = (id) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleAddComment = () => {
    if (!newCommentText.trim() || !currentUser) return;
    
    const newComment = {
      id: `comment-${Date.now()}`,
      authorId: currentUser.id,
      text: newCommentText.trim(),
      timestamp: new Date().toISOString()
    };
    
    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !task) return;

    const updatedTask = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      assigneeId: assigneeId || null,
      labelIds,
      subtasks,
      comments,
      updatedAt: new Date().toISOString()
    };

    onUpdateTask(updatedTask);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
      onClose();
    }
  };

  // Calculate progress
  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const progressPercentage = subtasks.length > 0 
    ? Math.round((completedSubtasks / subtasks.length) * 100) 
    : 0;

  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} title="Edit Task">
      {task && (
        <form onSubmit={handleSubmit} className="task-form" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="edit-task-title">Title <span className="required">*</span></label>
              <input 
                id="edit-task-title"
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-row" style={{ marginBottom: 0 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="edit-task-status">Status</label>
                <select id="edit-task-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {columns.map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="edit-task-priority">Priority</label>
                <select id="edit-task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="edit-task-assignee">Assign To</label>
              <select id="edit-task-assignee" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
                <option value="">Unassigned</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>{member.name} ({member.role})</option>
                ))}
              </select>
            </div>

            {/* Labels Section */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Labels</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {labels.map(label => {
                  const isActive = labelIds.includes(label.id);
                  return (
                    <button
                      key={label.id}
                      type="button"
                      onClick={() => handleToggleLabel(label.id)}
                      style={{
                        backgroundColor: isActive ? label.color : 'transparent',
                        color: isActive ? '#fff' : 'var(--text-primary)',
                        border: `1px solid ${isActive ? label.color : 'var(--border-color)'}`,
                        fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '16px',
                        cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center'
                      }}
                    >
                      {label.name}
                    </button>
                  );
                })}
                <button type="button" onClick={() => setIsCreatingLabel(!isCreatingLabel)} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px dashed var(--border-color)', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '16px', cursor: 'pointer' }}>
                  + New Label
                </button>
              </div>

              {isCreatingLabel && (
                <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="color" value={newLabelColor} onChange={e => setNewLabelColor(e.target.value)} style={{ width: '24px', height: '24px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                  <input type="text" placeholder="Label name" value={newLabelName} onChange={e => setNewLabelName(e.target.value)} style={{ flex: 1, padding: '4px 8px', fontSize: '13px' }} autoFocus />
                  <button type="button" className="btn btn-primary" onClick={handleCreateLabel} disabled={!newLabelName.trim()} style={{ padding: '4px 12px', fontSize: '13px' }}>Add</button>
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label htmlFor="edit-task-desc" style={{ marginBottom: 0 }}>Description</label>
                <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
                  <button 
                    type="button" 
                    onClick={() => setIsPreviewMode(false)}
                    style={{ background: !isPreviewMode ? 'var(--bg-surface)' : 'transparent', border: 'none', padding: '2px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '4px', color: !isPreviewMode ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', boxShadow: !isPreviewMode ? 'var(--shadow-sm)' : 'none' }}
                  >
                    Write
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsPreviewMode(true)}
                    style={{ background: isPreviewMode ? 'var(--bg-surface)' : 'transparent', border: 'none', padding: '2px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '4px', color: isPreviewMode ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', boxShadow: isPreviewMode ? 'var(--shadow-sm)' : 'none' }}
                  >
                    Preview
                  </button>
                </div>
              </div>
              
              {isPreviewMode ? (
                <div style={{ minHeight: '80px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  {description.trim() ? <RichText text={description} /> : <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Nothing to preview...</span>}
                </div>
              ) : (
                <textarea 
                  id="edit-task-desc"
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Supports Markdown: **bold**, *italic*, `code`, [link](url)"
                />
              )}
            </div>

            {/* Checklist Section */}
            <div className="form-group checklist-section" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckSquare size={14} /> Checklist
                </label>
                {subtasks.length > 0 && (
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {completedSubtasks}/{subtasks.length} ({progressPercentage}%)
                  </span>
                )}
              </div>
              
              {subtasks.length > 0 && (
                <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: progressPercentage === 100 ? 'var(--success)' : 'var(--accent-primary)', transition: 'width 0.3s ease, background-color 0.3s ease' }} />
                </div>
              )}

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {subtasks.map(st => (
                  <li key={st.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                    <input 
                      type="checkbox" 
                      checked={st.completed} 
                      onChange={() => handleToggleSubtask(st.id)} 
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ flex: 1, fontSize: '14px', textDecoration: st.completed ? 'line-through' : 'none', color: st.completed ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                      {st.title}
                    </span>
                    <button type="button" className="icon-button" onClick={() => handleDeleteSubtask(st.id)} style={{ padding: '2px', color: 'var(--text-secondary)' }}>
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Add an item..." 
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubtask();
                    }
                  }}
                  style={{ flex: 1 }}
                />
                <button type="button" className="btn btn-secondary" onClick={handleAddSubtask} disabled={!newSubtaskTitle.trim()}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="form-group comments-section" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                <MessageSquare size={14} style={{ color: 'var(--text-secondary)' }} /> 
                <label style={{ margin: 0 }}>Activity & Comments</label>
              </div>

              {comments.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
                  {comments.map(comment => {
                    const author = getMember(comment.authorId);
                    const date = new Date(comment.timestamp).toLocaleString(undefined, {
                      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                    });
                    
                    return (
                      <div key={comment.id} style={{ display: 'flex', gap: '12px' }}>
                        {author ? (
                          <Avatar src={author.avatar} alt={author.name} fallback={author.name.charAt(0)} size="small" />
                        ) : (
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                              {author ? author.name : 'Unknown User'}
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{date}</span>
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: '0 8px 8px 8px', display: 'inline-block' }}>
                            <RichText text={comment.text} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ padding: '16px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                  No comments yet. Be the first to share an update!
                </div>
              )}

              {currentUser && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Avatar src={currentUser.avatar} alt={currentUser.name} fallback={currentUser.name.charAt(0)} size="small" />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <textarea 
                      placeholder="Write a comment..." 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      rows={2}
                      style={{ resize: 'none' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                          e.preventDefault();
                          handleAddComment();
                        }
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Pro tip: Press Cmd/Ctrl + Enter to send</span>
                      <button type="button" className="btn btn-primary" onClick={handleAddComment} disabled={!newCommentText.trim()}>
                        <Send size={14} style={{ marginRight: '6px' }} /> Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="form-actions" style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
            <button type="button" className="btn btn-secondary" onClick={handleDelete} style={{ color: 'var(--error)' }}>
              <Trash2 size={16} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
              Delete Task
            </button>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={!title.trim()}>Save Changes</button>
            </div>
          </div>
        </form>
      )}
    </SlidePanel>
  );
}
