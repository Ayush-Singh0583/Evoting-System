import React from "react";

interface Props {
  setBooth: (b: string) => void;
  next: () => void;
}

const BoothSelect: React.FC<Props> = ({ setBooth, next }) => {
  const booths = [
    { name: "Bangalore Booth", emoji: "🏙️", city: "Karnataka", queue: 5 },
    { name: "Delhi Booth", emoji: "🏛️", city: "New Delhi", queue: 2 },
    { name: "Mumbai Booth", emoji: "🌊", city: "Maharashtra", queue: 7 },
  ];

  const getQueueBadge = (queue: number) => {
    if (queue <= 3) return "badge-success";
    if (queue <= 5) return "badge-warning";
    return "badge-error";
  };

  const getQueueLabel = (queue: number) => {
    if (queue <= 3) return "Low";
    if (queue <= 5) return "Medium";
    return "High";
  };

  const handleSelect = (booth: string) => {
    setBooth(booth);
    next();
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-icon" aria-hidden="true">
          📍
        </div>
        <div className="section-header-text">
          <h2>Select Voting Booth</h2>
          <p>Choose any available booth — vote from anywhere</p>
        </div>
      </div>

      <div className="booth-grid" id="booth-grid">
        {booths.map((b, i) => (
          <div
            key={i}
            className={`booth-card animate-fade-in-up stagger-${i + 1}`}
            onClick={() => handleSelect(b.name)}
            role="button"
            tabIndex={0}
            aria-label={`Select ${b.name}`}
            id={`booth-${i}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(b.name);
              }
            }}
          >
            <span className="booth-emoji" aria-hidden="true">
              {b.emoji}
            </span>
            <p className="booth-name">{b.name}</p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                marginBottom: "12px",
              }}
            >
              {b.city}
            </p>
            <span className={`badge ${getQueueBadge(b.queue)}`}>
              <span style={{ fontSize: "0.6rem" }}>●</span>
              {getQueueLabel(b.queue)} — {b.queue} in queue
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoothSelect;