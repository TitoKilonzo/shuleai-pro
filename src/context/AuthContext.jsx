import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, subscriptionService, functions, client, account } from '../lib/appwrite';

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
    } catch (error) {
      console.warn('Failed to fetch subscription:', error.message);
      setSubscription(null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        // Check for demo user in sessionStorage first
        const demoUserData = sessionStorage.getItem('shuleai_demo_user');
        if (demoUserData) {
          const demoUser = JSON.parse(demoUserData);
          setUser(demoUser);
          setSubscription(DEMO_SUBSCRIPTION);
          setLoading(false);
          return;
        }

        // Check for regular Appwrite user
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
    // Demo mode check - handle demo accounts locally
    if (email === 'demo@shuleaipro.co.ke' && password === 'Demo@2026') {
      sessionStorage.setItem('shuleai_demo_user', JSON.stringify(DEMO_USER));
      setUser(DEMO_USER);
      setSubscription(DEMO_SUBSCRIPTION);
      return DEMO_USER;
    }

    if (email === 'parent@shuleaipro.co.ke' && password === 'Demo@2026') {
      sessionStorage.setItem('shuleai_demo_user', JSON.stringify(DEMO_PARENT));
      setUser(DEMO_PARENT);
      setSubscription(DEMO_SUBSCRIPTION);
      return DEMO_PARENT;
    }

    // Regular login flow
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
    // Clear demo user from sessionStorage
    sessionStorage.removeItem('shuleai_demo_user');

    // Only call Appwrite logout for non-demo users
    if (user && !user.isDemo) {
      try {
        await authService.logout();
      } catch (error) {
        console.warn('Logout error:', error);
      }
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
