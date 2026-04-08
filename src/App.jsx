import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ParentDashboard from './pages/ParentDashboard';
import GamesPage from './pages/GamesPage';
import GamePlay from './pages/GamePlay';
import Features from './pages/Features';
import LearningArea from './pages/LearningArea';
import Pricing from './pages/Pricing';

/* =========================
   PROTECTED ROUTES
========================= */
function PrivateRoute({ children, requireRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loader" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <Navigate
        to={user.role === 'parent' ? '/parent' : '/dashboard'}
        replace
      />
    );
  }

  return children;
}

/* =========================
   PUBLIC ROUTES
========================= */
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loader" />
      </div>
    );
  }

  if (user) {
    return (
      <Navigate
        to={user.role === 'parent' ? '/parent' : '/dashboard'}
        replace
      />
    );
  }

  return children;
}

/* =========================
   APP ROUTES
========================= */
function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/learning-areas" element={<LearningArea />} />
      <Route path="/pricing" element={<Pricing />} />

      {/* Auth */}
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* Dashboards */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/parent"
        element={
          <PrivateRoute requireRole="parent">
            <ParentDashboard />
          </PrivateRoute>
        }
      />

      {/* Games */}
      <Route
        path="/games"
        element={
          <PrivateRoute>
            <GamesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/games/:id"
        element={
          <PrivateRoute>
            <GamePlay />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* =========================
   MAIN APP
========================= */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}