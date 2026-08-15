import { Menu, Search, Bell, Moon, Sun, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLocation } from "react-router-dom";
import "./Layout.css";

export function Topbar({ onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Basic route to title mapping for now
  const getPageTitle = (path) => {
    switch (path) {
      case "/overview": return "Overview";
      case "/board": return "Kanban Board";
      case "/dashboard": return "Dashboard";
      case "/team": return "Team";
      case "/settings": return "Settings";
      default: return "FlowBoard";
    }
  };

  return (
    <header className="layout-topbar">
      <div className="topbar-left">
        <button className="mobile-nav-toggle" onClick={onToggleSidebar} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
        <h1 className="topbar-title">{getPageTitle(location.pathname)}</h1>
      </div>
      <div className="topbar-right">
        <button aria-label="Search" style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
          <Search size={20} />
        </button>
        <button aria-label="Notifications" style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}>
          <Bell size={20} />
        </button>
        <button 
          onClick={toggleTheme} 
          aria-label="Toggle Theme"
          style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div style={{ 
          width: 32, height: 32, borderRadius: "50%", 
          backgroundColor: "var(--bg-hover)", display: "flex", 
          alignItems: "center", justifyContent: "center", color: "var(--text-secondary)"
        }}>
          <User size={20} />
        </div>
      </div>
    </header>
  );
}

