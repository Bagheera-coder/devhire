import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import { useTeam } from '../../context/TeamContext';
import { 
  CheckCircle2, Clock, ListTodo, AlertCircle, 
  ChevronRight, Activity, Plus, LayoutDashboard, Users, Calendar
} from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import './Home.css';

// Reusable IntersectionObserver wrapper for scroll reveals
function RevealCard({ children, delay = 0 }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`premium-card ${isRevealed ? 'revealed' : ''}`}>
      {children}
    </div>
  );
}

// Animated Counter Hook
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp = null;
    const duration = 1000;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeProgress * (value - startValue) + startValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value]);

  return <>{displayValue}</>;
}

export default function Home() {
  const navigate = useNavigate();
  const { tasks, columns } = useTasks();
  const { currentUser, getMember } = useTeam();

  // Dynamic Date
  const today = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  }).format(new Date());

  // Statistics Calculation
  const stats = useMemo(() => {
    const total = tasks.length;
    
    // We assume the last column is "Done"
    const doneColId = columns.length > 0 ? columns[columns.length - 1].id : null;
    const completed = doneColId ? tasks.filter(t => t.status === doneColId).length : 0;
    
    // We assume the second column is "In Progress"
    const inProgressColId = columns.length > 1 ? columns[1].id : null;
    const inProgress = inProgressColId ? tasks.filter(t => t.status === inProgressColId).length : 0;
    
    // Overdue: Assuming mock implementation of overdue based on createdAt being old if incomplete
    // Since we don't have a formal dueDate field in the schema, we'll simulate overdue if high priority and not done
    const overdue = tasks.filter(t => t.priority === 'high' && t.status !== doneColId).length;

    const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const high = tasks.filter(t => t.priority === 'high').length;
    const medium = tasks.filter(t => t.priority === 'medium').length;
    const low = tasks.filter(t => t.priority === 'low').length;

    return { total, completed, inProgress, overdue, progressPct, high, medium, low, doneColId };
  }, [tasks, columns]);

  // Derived Lists
  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
      .slice(0, 5);
  }, [tasks]);

  // Synthesize Activity Timeline based on comments or created tasks
  const activities = useMemo(() => {
    let allActivities = [];
    
    tasks.forEach(task => {
      // Creation event
      allActivities.push({
        id: `create-${task.id}`,
        text: `Created task "${task.title}"`,
        timestamp: task.createdAt,
        icon: Plus
      });
      
      // Comments
      if (task.comments && task.comments.length > 0) {
        task.comments.forEach(c => {
          allActivities.push({
            id: c.id,
            text: `Commented on "${task.title}"`,
            timestamp: c.timestamp,
            icon: Activity
          });
        });
      }
    });

    return allActivities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 4);
  }, [tasks]);

  const handleTaskClick = (taskId) => {
    navigate(`/board?taskId=${taskId}`);
  };

  return (
    <div className="overview-container">
      <header className="overview-header">
        <h1 className="overview-greeting">
          Good morning{currentUser ? `, ${currentUser.name.split(' ')[0]}` : ''}
        </h1>
        <p className="overview-subtitle">
          {today} &mdash; Here's what's happening with your projects today.
        </p>
      </header>

      <section className="stats-grid">
        <RevealCard delay={0}>
          <div className="stat-accent"></div>
          <div className="stat-card-header">
            <ListTodo size={16} /> Total Tasks
          </div>
          <div className="stat-value"><AnimatedNumber value={stats.total} /></div>
          <div className="stat-footer">Across all active boards</div>
        </RevealCard>

        <RevealCard delay={50}>
          <div className="stat-accent" style={{ background: 'var(--warning)' }}></div>
          <div className="stat-card-header">
            <Clock size={16} /> In Progress
          </div>
          <div className="stat-value"><AnimatedNumber value={stats.inProgress} /></div>
          <div className="stat-footer">Actively being worked on</div>
        </RevealCard>

        <RevealCard delay={100}>
          <div className="stat-accent success"></div>
          <div className="stat-card-header">
            <CheckCircle2 size={16} /> Completed
          </div>
          <div className="stat-value"><AnimatedNumber value={stats.completed} /></div>
          <div className="stat-footer">Tasks successfully finished</div>
        </RevealCard>

        <RevealCard delay={150}>
          <div className="stat-accent error"></div>
          <div className="stat-card-header">
            <AlertCircle size={16} /> Attention
          </div>
          <div className="stat-value"><AnimatedNumber value={stats.overdue} /></div>
          <div className="stat-footer">High priority incomplete</div>
        </RevealCard>
      </section>

      <section className="dashboard-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Project Progress */}
          <RevealCard delay={200}>
            <div className="progress-header">
              <span className="progress-title">Project Progress</span>
              <span className="progress-stats">
                {stats.completed} of {stats.total} tasks completed
              </span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${stats.progressPct}%` }}
              />
            </div>
            
            {/* Priority Distribution */}
            <div style={{ marginTop: 'var(--space-6)' }}>
              <span className="stat-card-header" style={{ marginBottom: '8px' }}>Priority Distribution</span>
              <div className="priority-bar">
                <div className="priority-segment high" style={{ width: `${stats.total ? (stats.high/stats.total)*100 : 0}%` }} title="High" />
                <div className="priority-segment medium" style={{ width: `${stats.total ? (stats.medium/stats.total)*100 : 0}%` }} title="Medium" />
                <div className="priority-segment low" style={{ width: `${stats.total ? (stats.low/stats.total)*100 : 0}%` }} title="Low" />
              </div>
              <div className="priority-legend">
                <div className="legend-item"><div className="legend-dot high"></div>High ({stats.high})</div>
                <div className="legend-item"><div className="legend-dot medium"></div>Medium ({stats.medium})</div>
                <div className="legend-item"><div className="legend-dot low"></div>Low ({stats.low})</div>
              </div>
            </div>
          </RevealCard>

          {/* Recent Tasks */}
          <RevealCard delay={300}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <span className="progress-title">Recent Tasks</span>
              <button 
                className="icon-button" 
                onClick={() => navigate('/board')}
                style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}
              >
                View all <ChevronRight size={14} />
              </button>
            </div>

            {recentTasks.length > 0 ? (
              <div className="task-list">
                {recentTasks.map(task => {
                  const assignee = getMember(task.assigneeId);
                  const isDone = task.status === stats.doneColId;
                  
                  return (
                    <div 
                      key={task.id} 
                      className="recent-task-row"
                      onClick={() => handleTaskClick(task.id)}
                    >
                      <div className="recent-task-left">
                        <span className="recent-task-title" style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                          {task.title}
                        </span>
                        <div className="recent-task-meta">
                          <Badge variant={task.priority}>{task.priority}</Badge>
                          <span>{columns.find(c => c.id === task.status)?.title || 'Unknown'}</span>
                        </div>
                      </div>
                      <div className="recent-task-right">
                        {assignee && (
                          <Avatar src={assignee.avatar} alt={assignee.name} fallback={assignee.name.charAt(0)} size="small" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <CheckCircle2 size={32} className="empty-state-icon" />
                <p>No recent tasks found.</p>
              </div>
            )}
          </RevealCard>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Quick Actions */}
          <RevealCard delay={250}>
            <span className="progress-title">Quick Actions</span>
            <div className="quick-actions-grid">
              <button className="action-btn" onClick={() => navigate('/board')}>
                <Plus size={16} /> New Task
              </button>
              <button className="action-btn" onClick={() => navigate('/board')}>
                <LayoutDashboard size={16} /> Board
              </button>
              <button className="action-btn" onClick={() => navigate('/dashboard')}>
                <Activity size={16} /> Analytics
              </button>
              <button className="action-btn" onClick={() => navigate('/team')}>
                <Users size={16} /> Team
              </button>
            </div>
          </RevealCard>

          {/* Recent Activity Timeline */}
          <RevealCard delay={350}>
            <span className="progress-title">Recent Activity</span>
            
            {activities.length > 0 ? (
              <div className="activity-timeline">
                {activities.map(activity => {
                  const Icon = activity.icon;
                  const date = new Date(activity.timestamp).toLocaleString(undefined, {
                    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                  });
                  return (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        <Icon size={16} />
                      </div>
                      <div className="activity-content">
                        <span className="activity-text">{activity.text}</span>
                        <span className="activity-time">{date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <Calendar size={32} className="empty-state-icon" />
                <p>No recent activity.</p>
              </div>
            )}
          </RevealCard>

        </div>
      </section>
    </div>
  );
}
