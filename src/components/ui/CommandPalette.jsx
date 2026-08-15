import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useTasks } from '../../context/TaskContext';
import { 
  Search, Home, LayoutDashboard, CheckSquare, 
  Settings, Users, Moon, Sun 
} from 'lucide-react';
import './CommandPalette.css';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { tasks } = useTasks();
  
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K (Mac) or Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Timeout ensures the element is rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  // Define static routes
  const staticRoutes = [
    { id: 'home', label: 'Go to Overview', icon: Home, action: () => navigate('/overview') },
    { id: 'board', label: 'Go to Board', icon: CheckSquare, action: () => navigate('/board') },
    { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, action: () => navigate('/dashboard') },
    { id: 'team', label: 'Go to Team', icon: Users, action: () => navigate('/team') },
    { id: 'settings', label: 'Go to Settings', icon: Settings, action: () => navigate('/settings') },
    { 
      id: 'theme', 
      label: `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 
      icon: theme === 'light' ? Moon : Sun, 
      action: toggleTheme 
    }
  ];

  // Dynamic Task Routes (Deep Links)
  const taskRoutes = tasks.map(t => ({
    id: `task-${t.id}`,
    label: `Task: ${t.title}`,
    icon: CheckSquare,
    action: () => {
      navigate(`/board?taskId=${t.id}`);
      setIsOpen(false);
    }
  }));

  // Combine and filter
  const allOptions = [...staticRoutes, ...taskRoutes];
  
  const filteredOptions = allOptions.filter(option => 
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (filteredOptions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filteredOptions[selectedIndex].action();
      if (filteredOptions[selectedIndex].id !== 'theme') {
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay" onClick={() => setIsOpen(false)}>
      <div 
        className="command-palette-modal" 
        onClick={e => e.stopPropagation()}
      >
        <div className="command-palette-header">
          <Search size={18} className="command-palette-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tasks, jump to pages, or change settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="command-palette-input"
          />
        </div>

        <div className="command-palette-list" ref={listRef}>
          {filteredOptions.length === 0 ? (
            <div className="command-palette-empty">No results found.</div>
          ) : (
            filteredOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = index === selectedIndex;
              
              return (
                <div
                  key={option.id}
                  className={`command-palette-item ${isSelected ? 'selected' : ''}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    option.action();
                    if (option.id !== 'theme') setIsOpen(false);
                  }}
                >
                  <Icon size={16} className="item-icon" />
                  <span>{option.label}</span>
                </div>
              );
            })
          )}
        </div>
        
        <div className="command-palette-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>Enter</kbd> to select</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
