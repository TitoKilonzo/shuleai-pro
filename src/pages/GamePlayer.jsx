import { useParams, useNavigate } from "react-router-dom";

export default function GamePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", height: "100vh", background: "#000" }}>
      
      {/* Header */}
      <div style={{
        padding: "10px",
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <span>🎮 Game Player</span>
        <button onClick={() => navigate("/games")}>
          Exit
        </button>
      </div>

      {/* GAME FRAME */}
      <iframe
        src={`/cbc-games/${id}.html`}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="game"
      />
    </div>
  );
}