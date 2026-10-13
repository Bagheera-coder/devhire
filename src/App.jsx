import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home/Home';
import { Jobs } from './pages/Jobs/Jobs';
import { JobDetails } from './pages/Jobs/JobDetails';
import { Saved } from './pages/Saved/Saved';
import { Applications } from './pages/Applications/Applications';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Profile } from './pages/Profile/Profile';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { About } from './pages/Static/About';
import { Careers } from './pages/Static/Careers';
import { Help } from './pages/Static/Help';
import { Privacy } from './pages/Static/Privacy';
import { Terms } from './pages/Static/Terms';
import { Contact } from './pages/Static/Contact';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="saved" element={<Saved />} />
          <Route path="applications" element={<Applications />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="help" element={<Help />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<div style={{ padding: '4rem 0', textAlign: 'center' }}><h2>404 - Not Found</h2></div>} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
