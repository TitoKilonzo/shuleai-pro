import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService, subscriptionService } from '../lib/appwrite'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      subscription: null,
      isLoading: false,
      isAuthenticated: false,
      accessCodeSession: null, // for access-code-only login

      // ── Actions ────────────────────────────────────────────────────────────
      setLoading: (v) => set({ isLoading: v }),

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          await authService.login(email, password)
          const userData = await authService.getUser()
          if (!userData) throw new Error('Failed to get user data')
          const sub = await subscriptionService.getUserSubscription(userData.$id)
          set({ user: userData, profile: userData.profile, subscription: sub, isAuthenticated: true })
          return { success: true }
        } catch (err) {
          return { success: false, error: err.message }
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (email, password, name, role, grade) => {
        set({ isLoading: true })
        try {
          await authService.register(email, password, name, role, grade)
          const userData = await authService.getUser()
          set({ user: userData, profile: userData?.profile, isAuthenticated: true })
          return { success: true }
        } catch (err) {
          return { success: false, error: err.message }
        } finally {
          set({ isLoading: false })
        }
      },

      loginWithAccessCode: async (accessCode) => {
        set({ isLoading: true })
        try {
          const result = await authService.loginWithAccessCode(accessCode)
          set({ accessCodeSession: result, isAuthenticated: true })
          return { success: true, result }
        } catch (err) {
          return { success: false, error: err.message }
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        try { await authService.logout() } catch (err) { console.error('Logout error', err) }
        set({ user: null, profile: null, subscription: null, isAuthenticated: false, accessCodeSession: null })
      },

      refreshUser: async () => {
        try {
          const userData = await authService.getUser()
          if (userData) {
            const sub = await subscriptionService.getUserSubscription(userData.$id)
            set({ user: userData, profile: userData.profile, subscription: sub, isAuthenticated: true })
          }
        } catch {
          set({ isAuthenticated: false })
        }
      },

      hasActiveSubscription: () => {
        const { subscription } = get()
        return subscription && !subscriptionService.isExpired(subscription)
      },
    }),
    {
      name: 'shuleai-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        accessCodeSession: state.accessCodeSession,
      }),
    }
  )
)

export default useAuthStore
