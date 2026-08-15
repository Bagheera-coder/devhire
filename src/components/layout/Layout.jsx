import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CommandPalette } from "../ui/CommandPalette";
import "./Layout.css";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 40 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="layout-main">
        <Topbar onToggleSidebar={() => setIsSidebarOpen(true)} />
        <div className="content-area">
          <Outlet />
        </div>
      </main>

      {/* Global Command Palette */}
      <CommandPalette />
    </div>
  );
}
