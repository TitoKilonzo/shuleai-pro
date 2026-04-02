import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';
import { useState } from 'react';

export default function GamesPage() {
  const { isSubscribed } = useAuth();
  const [payModal, setPayModal] = useState(false);

  const handleOpenGames = () => {
    if (!isSubscribed()) {
      setPayModal(true);
      return;
    }

    // open your HTML dashboard
    window.location.href = "/cbc-games/index.html";
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      color: 'white',
      flexDirection: 'column'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>🎮 Game Library</h1>

      <p style={{ marginBottom: '2rem', opacity: 0.7 }}>
        Click below to open all CBC games
      </p>

      <button
        onClick={handleOpenGames}
        style={{
          padding: '12px 24px',
          borderRadius: '10px',
          border: 'none',
          background: '#22c55e',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Open Games
      </button>

      <PaymentModal isOpen={payModal} onClose={() => setPayModal(false)} />
    </div>
  );
}