import { useMemo } from 'react';
import { useTasks } from '../../context/TaskContext';
import { LayoutDashboard, CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const { tasks, columns } = useTasks();

  // Compute analytics data dynamically based on active columns
  const stats = useMemo(() => {
    const total = tasks.length;
    const highPriority = tasks.filter(t => t.priority === 'high').length;
    
    // Group tasks by their column ID
    const byColumn = {};
    columns.forEach(col => {
      byColumn[col.id] = {
        title: col.title,
        count: tasks.filter(t => t.status === col.id).length
      };
    });

    // We assume the *last* column in the array represents "Done" / Completion
    const doneColumnId = columns.length > 0 ? columns[columns.length - 1].id : null;
    const done = doneColumnId ? tasks.filter(t => t.status === doneColumnId).length : 0;
    
    // We assume the *second* column usually represents "In Progress"
    const inProgressColumnId = columns.length > 1 ? columns[1].id : null;
    const inProgress = inProgressColumnId ? tasks.filter(t => t.status === inProgressColumnId).length : 0;
    
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

    return { total, done, inProgress, highPriority, completionRate, byColumn };
  }, [tasks, columns]);

  // Generate distinct colors for dynamic columns
  const getColumnColor = (index, totalColumns) => {
    const hue = (index * (360 / totalColumns)) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Analytics Dashboard</h2>
        <p>Overview of your team's project velocity and task distribution.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card highlight-card">
          <div className="stat-card-header">
            <h3 className="stat-title">Completion Rate</h3>
            <LayoutDashboard className="stat-icon" size={20} />
          </div>
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${stats.completionRate}%` }} 
            />
          </div>
          <p className="stat-subtitle">{stats.done} of {stats.total} tasks completed</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-title">Total Tasks</h3>
            <Circle className="stat-icon" size={20} />
          </div>
          <div className="stat-value">{stats.total}</div>
          <p className="stat-subtitle">Across all boards</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-title">Active Work</h3>
            <Clock className="stat-icon" size={20} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div className="stat-value">{stats.inProgress}</div>
          <p className="stat-subtitle">In second column</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-title">High Priority</h3>
            <AlertCircle className="stat-icon" size={20} style={{ color: 'var(--error)' }} />
          </div>
          <div className="stat-value">{stats.highPriority}</div>
          <p className="stat-subtitle">Requires immediate attention</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <h3 className="chart-title">Task Distribution by Column</h3>
          <div className="distribution-bar">
            {stats.total > 0 ? (
              columns.map((col, index) => {
                const count = stats.byColumn[col.id].count;
                if (count === 0) return null;
                const percentage = (count / stats.total) * 100;
                
                // Fallback to legacy css classes if it's a default column, otherwise generate a dynamic color
                const legacyClasses = {
                  'todo': 'dist-todo',
                  'in-progress': 'dist-in-progress',
                  'review': 'dist-review',
                  'done': 'dist-done'
                };
                
                const cssClass = legacyClasses[col.id] || '';
                const style = cssClass ? { width: `${percentage}%` } : { width: `${percentage}%`, backgroundColor: getColumnColor(index, columns.length) };

                return (
                  <div 
                    key={col.id}
                    className={`dist-segment ${cssClass}`} 
                    style={style} 
                    title={`${col.title}: ${count}`} 
                  />
                );
              })
            ) : (
              <div className="dist-segment dist-empty" style={{ width: '100%' }}>No Data</div>
            )}
          </div>
          
          <div className="legend">
            {columns.map((col, index) => {
              const legacyClasses = {
                'todo': 'dist-todo',
                'in-progress': 'dist-in-progress',
                'review': 'dist-review',
                'done': 'dist-done'
              };
              const cssClass = legacyClasses[col.id] || '';
              const colorStyle = cssClass ? {} : { backgroundColor: getColumnColor(index, columns.length) };

              return (
                <div key={col.id} className="legend-item">
                  <span className={`legend-color ${cssClass}`} style={colorStyle}></span> 
                  {col.title} ({stats.byColumn[col.id].count})
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
