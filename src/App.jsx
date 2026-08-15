import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { TaskProvider } from "./context/TaskContext";
import { TeamProvider } from "./context/TeamContext";
import { Layout } from "./components/layout/Layout";
import { PublicLayout } from "./components/layout/PublicLayout";

import { Landing } from "./pages/Landing/Landing";
import { Privacy } from "./pages/Privacy/Privacy";
import { Terms } from "./pages/Terms/Terms";
import Home from "./pages/Home/Home";
import Board from "./pages/Board/Board";
import TaskDetails from "./pages/TaskDetails/TaskDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Team from "./pages/Team/Team";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <TeamProvider>
          <TaskProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                </Route>

                {/* App Routes */}
                <Route element={<Layout />}>
                  <Route path="/overview" element={<Home />} />
                  <Route path="/board" element={<Board />} />
                  <Route path="/tasks/:id" element={<TaskDetails />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TaskProvider>
        </TeamProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
