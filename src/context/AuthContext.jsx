import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, subscriptionService } from '../lib/appwrite';

const AuthContext = createContext(null);

// Demo credentials — referenced in README only, not exposed in UI
const DEMO_ACCOUNTS = {
  'demo@shuleaipro.co.ke': { password: 'Demo@2026', role: 'student' },
  'parent@shuleaipro.co.ke': { password: 'Demo@2026', role: 'parent' },
};

const DEMO_USER = {
  $id: 'demo_user_001',
  name: 'Demo Student',
  email: 'demo@shuleaipro.co.ke',
  role: 'student',
  phone: '0712345678',
  isDemo: true,
};

const DEMO_PARENT = {
  $id: 'demo_parent_001',
  name: 'Demo Parent',
  email: 'parent@shuleaipro.co.ke',
  role: 'parent',
  phone: '0712345679',
  isDemo: true,
};

const DEMO_SUBSCRIPTION = {
  plan: 'monthly',
  status: 'active',
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  isDemo: true,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async (userId, isDemo) => {
    if (isDemo) {
      setSubscription(DEMO_SUBSCRIPTION);
      return;
    }
    try {
      const sub = await subscriptionService.getUserSubscription(userId);
      setSubscription(sub);
    } catch {
      setSubscription(null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      // Check demo session
      const demoSession = sessionStorage.getItem('shuleai_demo_session');
      if (demoSession) {
        try {
          const parsed = JSON.parse(demoSession);
          setUser(parsed);
          await fetchSubscription(parsed.$id, true);
          setLoading(false);
          return;
        } catch {
          sessionStorage.removeItem('shuleai_demo_session');
        }
      }

      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          await fetchSubscription(currentUser.$id, false);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [fetchSubscription]);

  const login = async (email, password) => {
    // Demo mode check
    if (DEMO_ACCOUNTS[email] && DEMO_ACCOUNTS[email].password === password) {
      const demoUser = email.includes('parent') ? DEMO_PARENT : DEMO_USER;
      sessionStorage.setItem('shuleai_demo_session', JSON.stringify(demoUser));
      setUser(demoUser);
      setSubscription(DEMO_SUBSCRIPTION);
      return demoUser;
    }

    const session = await authService.login(email, password);
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      await fetchSubscription(currentUser.$id, false);
    }
    return session;
  };

  const register = async (userData) => {
    const newUser = await authService.register(userData);
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
    return newUser;
  };

  const logout = async () => {
    sessionStorage.removeItem('shuleai_demo_session');
    if (!user?.isDemo) {
      try { await authService.logout(); } catch { /* ignore */ }
    }
    setUser(null);
    setSubscription(null);
  };

  const refreshSubscription = async () => {
    if (user) await fetchSubscription(user.$id, user.isDemo);
  };

  const isSubscribed = () => {
    if (!subscription) return false;
    if (subscription.isDemo) return true;
    return new Date(subscription.expiresAt) > new Date();
  };

  return (
    <AuthContext.Provider value={{
      user, subscription, loading,
      login, register, logout,
      refreshSubscription, isSubscribed,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
