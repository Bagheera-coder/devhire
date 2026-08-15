import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { tasks as initialTasks } from '../data/mockData';

const TaskContext = createContext(null);

const initialColumns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'In Review' },
  { id: 'done', title: 'Done' }
];

const initialLabels = [
  { id: 'label-1', name: 'Feature', color: '#0052cc' }, // accent-primary
  { id: 'label-2', name: 'Bug', color: '#de350b' },     // error
  { id: 'label-3', name: 'Design', color: '#ff991f' },  // warning
  { id: 'label-4', name: 'DevOps', color: '#00875a' }   // success
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('flowboard-tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        console.error("Failed to parse tasks from local storage");
      }
    }
    return initialTasks.map(t => ({ ...t, labelIds: t.labelIds || [] })); // Migration safeguard
  });

  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('flowboard-columns');
    if (savedColumns) {
      try { return JSON.parse(savedColumns); } catch (e) {}
    }
    return initialColumns;
  });

  const [labels, setLabels] = useState(() => {
    const savedLabels = localStorage.getItem('flowboard-labels');
    if (savedLabels) {
      try { return JSON.parse(savedLabels); } catch (e) {}
    }
    return initialLabels;
  });

  useEffect(() => { localStorage.setItem('flowboard-tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('flowboard-columns', JSON.stringify(columns)); }, [columns]);
  useEffect(() => { localStorage.setItem('flowboard-labels', JSON.stringify(labels)); }, [labels]);

  const addColumn = useCallback((title) => {
    setColumns(prev => [...prev, { id: `col-${Date.now()}`, title }]);
  }, []);

  const updateColumn = useCallback((id, newTitle) => {
    setColumns(prev => prev.map(col => col.id === id ? { ...col, title: newTitle } : col));
  }, []);

  const deleteColumn = useCallback((id) => {
    const hasTasks = tasks.some(t => t.status === id);
    if (hasTasks) throw new Error("Cannot delete a column that contains tasks.");
    setColumns(prev => prev.filter(col => col.id !== id));
  }, [tasks]);

  const reorderColumn = useCallback((sourceId, targetId) => {
    setColumns(prev => {
      const newCols = [...prev];
      const sourceIndex = newCols.findIndex(c => c.id === sourceId);
      const targetIndex = newCols.findIndex(c => c.id === targetId);
      if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return prev;
      const [movedCol] = newCols.splice(sourceIndex, 1);
      newCols.splice(targetIndex, 0, movedCol);
      return newCols;
    });
  }, []);

  const addLabel = useCallback((name, color) => {
    const newLabel = { id: `label-${Date.now()}`, name, color };
    setLabels(prev => [...prev, newLabel]);
    return newLabel.id; // Return ID so the UI can immediately assign it to a task
  }, []);

  return (
    <TaskContext.Provider value={{ 
      tasks, setTasks, 
      columns, setColumns, 
      labels, setLabels,
      addColumn, updateColumn, deleteColumn, reorderColumn,
      addLabel
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
}
