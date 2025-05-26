import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

// Import pages (to be created)
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ResourcesPage from './pages/ResourcesPage';
import CrisisPage from './pages/CrisisPage';
import SettingsPage from './pages/SettingsPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Import layout components (to be created)
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Router>
        <Routes>
          {/* Public routes with main layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="crisis" element={<CrisisPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>
          
          {/* Auth routes with auth layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          
          {/* Protected dashboard route */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Settings route */}
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
