import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BoardColumn } from '../../components/board/BoardColumn';
import { BoardListView } from '../../components/board/BoardListView';
import { NewTaskModal } from '../../components/board/NewTaskModal';
import { EditTaskPanel } from '../../components/board/EditTaskPanel';
import { BoardFilters } from '../../components/board/BoardFilters';
import { useToast } from '../../context/ToastContext';
import { useTasks } from '../../context/TaskContext';
import { Plus } from 'lucide-react';
import './Board.css';

export default function Board() {
  const { addToast } = useToast();
  const { tasks, setTasks, columns, addColumn, reorderColumn } = useTasks();
  
  // URL-driven state for deep linking
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTaskId = searchParams.get('taskId');

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [modalDefaultStatus, setModalDefaultStatus] = useState(columns[0]?.id || 'todo');

  // Filtering and View state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('manual');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'

  const handleTaskClick = (id) => {
    if (id) {
      setSearchParams({ taskId: id });
    } else {
      setSearchParams({}); // Clear query params
    }
  };

  const handleTaskDrop = (taskId, newStatusId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status !== newStatusId) {
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId ? { ...t, status: newStatusId, updatedAt: new Date().toISOString() } : t
        )
      );
      addToast(`Moved "${task.title}" to ${columns.find(c => c.id === newStatusId)?.title}`, 'success');
    }
  };

  const handleCreateTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    addToast('Task created successfully', 'success');
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
    addToast('Task updated successfully', 'success');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    addToast('Task deleted permanently', 'info');
    handleTaskClick(null); // close panel
  };

  const handleAddColumn = () => {
    const title = window.prompt("Enter new column name:");
    if (title && title.trim()) {
      addColumn(title.trim());
      addToast('Column added', 'success');
    }
  };

  const filteredTasks = useMemo(() => {
    // 1. Filter
    let result = tasks.filter(task => {
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch = 
        task.title.toLowerCase().includes(lowerQuery) || 
        (task.description && task.description.toLowerCase().includes(lowerQuery));

      const matchesPriority = 
        priorityFilter === 'all' || 
        task.priority === priorityFilter;

      const matchesAssignee = 
        assigneeFilter === 'all' 
          ? true 
          : assigneeFilter === 'unassigned' 
            ? !task.assigneeId 
            : task.assigneeId === assigneeFilter;

      return matchesSearch && matchesPriority && matchesAssignee;
    });

    // 2. Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'priority') {
      const weights = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => (weights[b.priority] || 0) - (weights[a.priority] || 0));
    }

    return result;
  }, [tasks, searchQuery, priorityFilter, assigneeFilter, sortBy]);

  const selectedTask = useMemo(() => {
    return tasks.find(t => t.id === selectedTaskId) || null;
  }, [tasks, selectedTaskId]);

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>FlowBoard Development</h2>
        <div className="board-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setModalDefaultStatus(columns[0]?.id || 'todo');
              setIsNewTaskModalOpen(true);
            }}
          >
            + New Task
          </button>
        </div>
      </div>
      
      <BoardFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        assigneeFilter={assigneeFilter}
        setAssigneeFilter={setAssigneeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === 'kanban' ? (
        <div className="board-canvas">
          {columns.map(col => {
            const columnTasks = filteredTasks.filter(task => task.status === col.id);
            return (
              <BoardColumn 
                key={col.id} 
                id={col.id}
                title={col.title} 
                count={columnTasks.length} 
                tasks={columnTasks}
                onTaskDrop={handleTaskDrop}
                onColumnDrop={reorderColumn}
                onAddTask={() => {
                  setModalDefaultStatus(col.id);
                  setIsNewTaskModalOpen(true);
                }}
                onTaskClick={handleTaskClick}
              />
            );
          })}
          
          <button className="add-column-btn" onClick={handleAddColumn}>
            <Plus size={20} />
            <span>Add Column</span>
          </button>
        </div>
      ) : (
        <BoardListView 
          tasks={filteredTasks} 
          columns={columns}
          onTaskClick={handleTaskClick} 
        />
      )}

      <NewTaskModal 
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
        defaultStatus={modalDefaultStatus}
      />

      <EditTaskPanel
        isOpen={!!selectedTaskId}
        onClose={() => handleTaskClick(null)}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
