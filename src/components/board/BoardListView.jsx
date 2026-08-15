import { useTeam } from '../../context/TeamContext';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import './BoardListView.css';

export function BoardListView({ tasks, columns, onTaskClick }) {
  const { getMember } = useTeam();

  const getStatusTitle = (statusId) => {
    const col = columns.find(c => c.id === statusId);
    return col ? col.title : statusId;
  };

  if (tasks.length === 0) {
    return (
      <div className="list-view-empty">
        <p>No tasks found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="board-list-view">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            const assignee = getMember(task.assigneeId);
            const date = new Date(task.updatedAt).toLocaleDateString(undefined, { 
              month: 'short', day: 'numeric' 
            });

            return (
              <tr key={task.id} onClick={() => onTaskClick(task.id)} className="task-row">
                <td className="cell-title">
                  <span className="task-row-title">{task.title}</span>
                  {task.comments?.length > 0 && (
                    <span className="task-row-comments">({task.comments.length} comments)</span>
                  )}
                </td>
                <td>
                  <Badge variant="default">{getStatusTitle(task.status)}</Badge>
                </td>
                <td>
                  <Badge variant={task.priority}>{task.priority}</Badge>
                </td>
                <td>
                  {assignee ? (
                    <div className="cell-assignee">
                      <Avatar src={assignee.avatar} alt={assignee.name} fallback={assignee.name.charAt(0)} />
                      <span>{assignee.name}</span>
                    </div>
                  ) : (
                    <span className="unassigned">Unassigned</span>
                  )}
                </td>
                <td className="cell-date">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
