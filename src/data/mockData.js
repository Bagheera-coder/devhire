// Initial structure for future mock data
export const users = [
  {
    id: "user-1",
    name: "Alex Doe",
    avatar: "https://i.pravatar.cc/150?u=user-1",
    role: "Admin",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?u=user-2",
    role: "Member",
  }
];

export const projects = [
  {
    id: "proj-1",
    name: "FlowBoard Development",
    description: "Building a modern project management tool",
    members: ["user-1", "user-2"],
  }
];

export const tasks = [
  {
    id: "task-1",
    projectId: "proj-1",
    title: "Project Setup & Architecture",
    description: "Initialize React app, define routes, setup layout.",
    status: "done", // 'todo', 'in-progress', 'review', 'done'
    priority: "high", // 'low', 'medium', 'high'
    assigneeId: "user-1",
    tags: ["frontend", "setup"],
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    projectId: "proj-1",
    title: "Implement Kanban Board",
    description: "Create columns and drag-and-drop functionality.",
    status: "todo",
    priority: "medium",
    assigneeId: "user-2",
    tags: ["feature"],
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
