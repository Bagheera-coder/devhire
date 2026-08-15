import { useRef } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useTeam } from '../../context/TeamContext';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { Download, Upload, Trash2, Moon, Sun } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const { tasks, setTasks } = useTasks();
  const { teamMembers, setTeamMembers } = useTeam();
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  
  const fileInputRef = useRef(null);

  const handleExportData = () => {
    const data = {
      tasks,
      teamMembers,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowboard-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Data exported successfully', 'success');
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        
        // Basic schema validation
        if (parsedData.tasks && Array.isArray(parsedData.tasks) && 
            parsedData.teamMembers && Array.isArray(parsedData.teamMembers)) {
          
          setTasks(parsedData.tasks);
          setTeamMembers(parsedData.teamMembers);
          addToast('Data imported successfully. Board updated.', 'success');
        } else {
          throw new Error('Invalid backup file format');
        }
      } catch (error) {
        addToast(`Import failed: ${error.message}`, 'error');
      }
      
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleWipeData = () => {
    const confirmMessage = "DANGER: Are you absolutely sure you want to wipe all local data? This will delete all tasks and team members permanently unless you have exported a backup.";
    
    if (window.confirm(confirmMessage)) {
      setTasks([]);
      setTeamMembers([]);
      addToast('All data has been permanently wiped', 'info');
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your application preferences and project data.</p>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">Preferences</h3>
        <div className="settings-card">
          <div className="settings-row">
            <div>
              <h4>Application Theme</h4>
              <p className="settings-description">Toggle between Light and Dark mode for the interface.</p>
            </div>
            <button className="btn btn-secondary" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={16} style={{ marginRight: '8px' }} /> : <Sun size={16} style={{ marginRight: '8px' }}/>}
              {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">Data Management</h3>
        <div className="settings-card">
          <div className="settings-row">
            <div>
              <h4>Export Data</h4>
              <p className="settings-description">Download a JSON backup of all your tasks, subtasks, and team members.</p>
            </div>
            <button className="btn btn-primary" onClick={handleExportData}>
              <Download size={16} style={{ marginRight: '8px' }} />
              Export Backup
            </button>
          </div>

          <div className="settings-row">
            <div>
              <h4>Import Data</h4>
              <p className="settings-description">Restore your project from a previous JSON backup file. This will overwrite current data.</p>
            </div>
            <div>
              <input 
                type="file" 
                accept=".json" 
                style={{ display: 'none' }} 
                ref={fileInputRef}
                onChange={handleImportData}
              />
              <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
                <Upload size={16} style={{ marginRight: '8px' }} />
                Import Backup
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title danger-title">Danger Zone</h3>
        <div className="settings-card danger-card">
          <div className="settings-row">
            <div>
              <h4 className="danger-text">Wipe All Data</h4>
              <p className="settings-description">Permanently delete all tasks and team members from this browser. This action cannot be undone.</p>
            </div>
            <button className="btn btn-danger" onClick={handleWipeData}>
              <Trash2 size={16} style={{ marginRight: '8px' }} />
              Wipe Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
