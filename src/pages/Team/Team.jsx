import { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { useToast } from '../../context/ToastContext';
import { UserPlus, Mail, Shield, Trash2 } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import './Team.css';

export default function Team() {
  const { teamMembers, addMember, removeMember } = useTeam();
  const { addToast } = useToast();

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Member');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addMember({ name: newName.trim(), role: newRole });
    addToast(`${newName} added to the team`, 'success');
    
    setNewName('');
    setNewRole('Member');
    setIsAdding(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the team?`)) {
      removeMember(id);
      addToast(`${name} removed from the team`, 'info');
    }
  };

  return (
    <div className="team-container">
      <div className="team-header">
        <div>
          <h2>Team Directory</h2>
          <p>Manage project members, roles, and permissions.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsAdding(!isAdding)}
        >
          <UserPlus size={16} style={{ marginRight: '8px' }} />
          {isAdding ? 'Cancel' : 'Add Member'}
        </button>
      </div>

      {isAdding && (
        <div className="team-add-card">
          <h3>Add New Team Member</h3>
          <form onSubmit={handleAddMember} className="team-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Jane Doe" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={!newName.trim()}>
                Save Member
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="team-grid">
        {teamMembers.map(member => (
          <div key={member.id} className="team-card">
            <div className="team-card-header">
              <Avatar src={member.avatar} alt={member.name} fallback={member.name.charAt(0)} size="large" />
              <button 
                className="icon-button delete-btn" 
                onClick={() => handleDelete(member.id, member.name)}
                aria-label="Remove member"
                title="Remove member"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <h3 className="team-member-name">{member.name}</h3>
            
            <div className="team-member-details">
              <div className="team-detail-item">
                <Shield size={14} />
                <span>{member.role}</span>
              </div>
              <div className="team-detail-item">
                <Mail size={14} />
                <span>{member.name.split(' ')[0].toLowerCase()}@flowboard.app</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
