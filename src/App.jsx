import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ParentDashboard from './pages/ParentDashboard';
import GamesPage from './pages/GamesPage';
import GamePlayer from './pages/GamePlayer';
import Features from './pages/Features';
import Subjects from './pages/Subjects';
import Pricing from './pages/Pricing';

function PrivateRoute({ children, requireRole }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="loader" /></div>;
  if (!user) return <Navigate to="/signin" replace />;
  if (requireRole && user.role !== requireRole) {
    return <Navigate to={user.role === 'parent' ? '/parent' : '/dashboard'} replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="loader" /></div>;
  if (user) return <Navigate to={user.role === 'parent' ? '/parent' : '/dashboard'} replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/parent" element={<PrivateRoute requireRole="parent"><ParentDashboard /></PrivateRoute>} />
      <Route path="/games" element={<PrivateRoute><GamesPage /></PrivateRoute>} />
      <Route path="/games/:id" element={<PrivateRoute><GamePlayer /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
