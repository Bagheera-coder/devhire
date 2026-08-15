import { Search, Filter, LayoutGrid, List, ArrowDownWideNarrow, Users } from 'lucide-react';
import { useTeam } from '../../context/TeamContext';
import './BoardFilters.css';

export function BoardFilters({ 
  searchQuery, setSearchQuery, 
  priorityFilter, setPriorityFilter,
  assigneeFilter, setAssigneeFilter,
  sortBy, setSortBy,
  viewMode, setViewMode 
}) {
  const { teamMembers } = useTeam();

  return (
    <div className="board-filters">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          className="search-input"
          placeholder="Search tasks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-controls">
        <div className="filter-container">
          <Filter size={16} className="filter-icon" />
          <select 
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div className="filter-container">
          <Users size={16} className="filter-icon" />
          <select 
            className="filter-select"
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          >
            <option value="all">All Assignees</option>
            <option value="unassigned">Unassigned</option>
            <optgroup label="Team Members">
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="filter-container">
          <ArrowDownWideNarrow size={16} className="filter-icon" />
          <select 
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="manual">Sort: Manual (Default)</option>
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="priority">Sort: Highest Priority</option>
          </select>
        </div>
      </div>

      <div className="view-toggles" style={{ display: 'flex', marginLeft: 'auto', gap: '4px', backgroundColor: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
        <button 
          className={`icon-button ${viewMode === 'kanban' ? 'active-view' : ''}`}
          onClick={() => setViewMode('kanban')}
          aria-label="Kanban View"
          style={{ backgroundColor: viewMode === 'kanban' ? 'var(--bg-surface)' : 'transparent', boxShadow: viewMode === 'kanban' ? 'var(--shadow-sm)' : 'none' }}
        >
          <LayoutGrid size={18} />
        </button>
        <button 
          className={`icon-button ${viewMode === 'list' ? 'active-view' : ''}`}
          onClick={() => setViewMode('list')}
          aria-label="List View"
          style={{ backgroundColor: viewMode === 'list' ? 'var(--bg-surface)' : 'transparent', boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none' }}
        >
          <List size={18} />
        </button>
      </div>
    </div>
  );
}
