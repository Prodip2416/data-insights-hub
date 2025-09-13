import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Dashboard } from './components/pages/dashboard';
import { Visualizations } from './components/pages/visualizations';
import { BarChart } from './components/pages/visualizations';
import {
  LineChart,
  PieChart,
  HeatmapChart,
  ScatterChart,
  AreaChart,
  GaugeChart,
  TreeChart,
} from './components/pages/charts';
import { Settings } from './components/pages/settings';
import {
  Documentation,
  UserGuide,
  FAQ,
  APIDocumentation,
} from './components/pages/help';
import {
  Reports,
  SalesReports,
  UserAnalytics,
  PerformanceMetrics,
  FinancialSummary,
  MarketingROI,
  CustomReports,
} from './components/pages/reports';
import { Login } from './components/pages/auth';
import { Notification } from './components/common';
import ErrorBoundary from './components/ErrorBoundary';

const MainApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  console.log('MainApp component rendering...', { isAuthenticated });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onMenuToggle={toggleSidebar}
      />
      
      {/* Main Layout: Sidebar + Content */}
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className="flex-1 p-6 ml-0 lg:ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/visualizations" element={<ProtectedRoute><Visualizations /></ProtectedRoute>} />
            <Route path="/bar-chart" element={<ProtectedRoute><BarChart /></ProtectedRoute>} />
            <Route path="/line-chart" element={<ProtectedRoute><LineChart /></ProtectedRoute>} />
            <Route path="/pie-chart" element={<ProtectedRoute><PieChart /></ProtectedRoute>} />
            <Route path="/heatmap" element={<ProtectedRoute><HeatmapChart /></ProtectedRoute>} />
            <Route path="/scatter-chart" element={<ProtectedRoute><ScatterChart /></ProtectedRoute>} />
            <Route path="/area-chart" element={<ProtectedRoute><AreaChart /></ProtectedRoute>} />
            <Route path="/gauge-chart" element={<ProtectedRoute><GaugeChart /></ProtectedRoute>} />
            <Route path="/tree-chart" element={<ProtectedRoute><TreeChart /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/reports/sales" element={<ProtectedRoute><SalesReports /></ProtectedRoute>} />
            <Route path="/reports/users" element={<ProtectedRoute><UserAnalytics /></ProtectedRoute>} />
            <Route path="/reports/performance" element={<ProtectedRoute><PerformanceMetrics /></ProtectedRoute>} />
            <Route path="/reports/financial" element={<ProtectedRoute><FinancialSummary /></ProtectedRoute>} />
            <Route path="/reports/marketing" element={<ProtectedRoute><MarketingROI /></ProtectedRoute>} />
            <Route path="/reports/custom" element={<ProtectedRoute><CustomReports /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
            <Route path="/help/user-guide" element={<ProtectedRoute><UserGuide /></ProtectedRoute>} />
            <Route path="/help/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
            <Route path="/help/api" element={<ProtectedRoute><APIDocumentation /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
      
      <Notification />
    </div>
  );
};

function App() {
  console.log('App component rendering...');

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <SettingsProvider>
            <NotificationProvider>
              <Router>
                <MainApp />
              </Router>
            </NotificationProvider>
          </SettingsProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;