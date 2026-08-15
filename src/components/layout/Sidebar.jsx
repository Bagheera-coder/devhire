import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, Settings, Users, Briefcase } from "lucide-react";
import "./Layout.css";

const navItems = [
  { path: "/overview", label: "Overview", icon: LayoutDashboard },
  { path: "/board", label: "Board", icon: CheckSquare },
  { path: "/dashboard", label: "Dashboard", icon: Briefcase },
  { path: "/team", label: "Team", icon: Users },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`layout-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">FlowBoard</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
              onClick={onClose}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

