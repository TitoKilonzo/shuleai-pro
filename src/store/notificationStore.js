import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],

      // Add a new notification
      addNotification: (notification) => {
        const newNotification = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          read: false,
          ...notification,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));

        return newNotification.id;
      },

      // Mark notification as read
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif
          ),
        }));
      },

      // Mark all notifications as read
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notif) => ({
            ...notif,
            read: true,
          })),
        }));
      },

      // Clear a specific notification
      clearNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((notif) => notif.id !== id),
        }));
      },

      // Clear all notifications
      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      // Get unread count
      getUnreadCount: () => {
        return get().notifications.filter((notif) => !notif.read).length;
      },

      // Get recent notifications (last 10)
      getRecentNotifications: () => {
        return get().notifications.slice(0, 10);
      },
    }),
    {
      name: 'notifications-storage',
    }
  )
);