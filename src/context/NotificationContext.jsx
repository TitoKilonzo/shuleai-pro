import { createContext, useContext } from 'react';
import { useNotificationStore } from '../store/notificationStore';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const store = useNotificationStore();

  // Helper function to add game completion notification
  const addGameCompletionNotification = (game, score, totalQuestions, pointsEarned) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    let type = 'success';

    if (percentage >= 90) {
      message = `🎉 Excellent! You scored ${percentage}% on "${game.title}" and earned ${pointsEarned} points!`;
    } else if (percentage >= 70) {
      message = `👏 Great job! You scored ${percentage}% on "${game.title}" and earned ${pointsEarned} points!`;
    } else if (percentage >= 50) {
      message = `👍 Good effort! You scored ${percentage}% on "${game.title}" and earned ${pointsEarned} points. Keep practicing!`;
    } else {
      message = `💪 Keep trying! You scored ${percentage}% on "${game.title}". Practice makes perfect!`;
      type = 'info';
    }

    store.addNotification({
      type,
      title: 'Game Completed!',
      message,
      gameId: game.id,
      score,
      totalQuestions,
      pointsEarned,
    });
  };

  // Helper function to add achievement notification
  const addAchievementNotification = (achievement) => {
    store.addNotification({
      type: 'achievement',
      title: '🏆 Achievement Unlocked!',
      message: achievement.message,
      achievement: achievement,
    });
  };

  // Helper function to add daily challenge notification
  const addDailyChallengeNotification = (challenge) => {
    store.addNotification({
      type: 'challenge',
      title: '🎯 Daily Challenge Available!',
      message: `New challenge: ${challenge.title}`,
      challenge,
    });
  };

  const value = {
    ...store,
    addGameCompletionNotification,
    addAchievementNotification,
    addDailyChallengeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};