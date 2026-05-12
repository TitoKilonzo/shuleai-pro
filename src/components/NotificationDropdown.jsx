import { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, CheckCheck, Trophy, Target, Info } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { notifications, getUnreadCount, markAsRead, markAllAsRead, clearNotification, clearAllNotifications } = useNotifications();

  const unreadCount = getUnreadCount();
  const recentNotifications = notifications.slice(0, 10);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Trophy size={16} color="#F59E0B" />;
      case 'challenge':
        return <Target size={16} color="#8B5CF6" />;
      case 'success':
        return <Check size={16} color="#10B981" />;
      case 'info':
        return <Info size={16} color="#3B82F6" />;
      default:
        return <Bell size={16} color="#6B7280" />;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--muted)',
          padding: '0.4rem',
          position: 'relative',
          borderRadius: 'var(--radius-sm)',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--surface-alt)')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 7,
              height: 7,
              background: 'var(--coral)',
              borderRadius: '50%',
              border: '2px solid var(--surface)',
            }}
          />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            width: 380,
            maxHeight: 500,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 1000,
            overflow: 'hidden',
            marginTop: '0.5rem',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Notifications {unreadCount > 0 && `(${unreadCount})`}
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {notifications.length > 0 && (
                <>
                  <button
                    onClick={markAllAsRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--muted)',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--forest)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
                  >
                    <CheckCheck size={14} />
                  </button>
                  <button
                    onClick={clearAllNotifications}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--muted)',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--error)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
                  >
                    <X size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {recentNotifications.length === 0 ? (
              <div
                style={{
                  padding: '2rem 1.25rem',
                  textAlign: 'center',
                  color: 'var(--muted)',
                }}
              >
                <Bell size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                <p style={{ margin: 0, fontSize: '0.9rem' }}>No notifications yet</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem' }}>
                  Complete games to see achievements here!
                </p>
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid var(--border-light)',
                    background: notification.read ? 'transparent' : 'rgba(245, 158, 11, 0.05)',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, marginTop: '0.1rem' }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <h4
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              margin: '0 0 0.25rem',
                              color: 'var(--ink)',
                            }}
                          >
                            {notification.title}
                          </h4>
                          <p
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--muted)',
                              margin: 0,
                              lineHeight: 1.4,
                            }}
                          >
                            {notification.message}
                          </p>
                          <p
                            style={{
                              fontSize: '0.7rem',
                              color: 'var(--muted)',
                              margin: '0.25rem 0 0',
                            }}
                          >
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--amber)',
                                padding: '0.25rem',
                                borderRadius: 'var(--radius-sm)',
                                transition: 'background-color 0.15s',
                              }}
                              onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.1)')}
                              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                              title="Mark as read"
                            >
                              <Check size={12} />
                            </button>
                          )}
                          <button
                            onClick={() => clearNotification(notification.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: 'var(--muted)',
                              padding: '0.25rem',
                              borderRadius: 'var(--radius-sm)',
                              transition: 'color 0.15s',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = 'var(--error)')}
                            onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
                            title="Clear notification"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;