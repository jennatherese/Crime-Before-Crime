import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar      from './components/Navbar';
import Dashboard   from './pages/Dashboard';
import Environment from './pages/Environment';
import Threats     from './pages/Threats';
import Patrol      from './pages/Patrol';
import Community   from './pages/Community';
import './App.css';

function AppShell() {
  const { demoMode } = useApp();
  return (
    <div className={demoMode ? 'demo-banner-active' : ''}>
      <Navbar />
      {demoMode && (
        <div className="demo-banner">
          🎮 DEMO MODE ACTIVE — Simulating 11PM · Heavy Rain · 3 High-Risk Zones
        </div>
      )}
      <Routes>
        <Route path="/"            element={<Dashboard />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/threats"     element={<Threats />} />
        <Route path="/patrol"      element={<Patrol />} />
        <Route path="/community"   element={<Community />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  );
}
