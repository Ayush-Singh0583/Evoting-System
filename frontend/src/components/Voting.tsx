import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { ethers } from "ethers";

interface Props {
  voter: any;
  booth: string;
  setReceipt: (r: string) => void;
  next: () => void;
}

const Voting: React.FC<Props> = ({ voter, booth, setReceipt, next }) => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCandidates = async () => {
      const contract = await getContract();

      let temp = [];

      // Fetch first 10 candidates (demo)
      console.log(contract)
      const count = await contract.candidateCount();
      console.log(count)

      for (let i = 0; i < Number(count); i++) {
        const c = await contract.getCandidate(i);

        console.log("Candidate:", c);

        if (c[1].toString() === voter.constituency) {
          temp.push({
            id: i,
            name: c[0],
            constituency: c[1],
            votes: Number(c[2]),
          });
        }
      }

      setCandidates(temp);
      setLoading(false);
    };

    loadCandidates();
  }, []);

  const handleVote = async () => {
    if (selected === null) return;

    setSubmitting(true);

    try {
      const contract = await getContract();

      // generate random receipt
      const receipt = ethers.keccak256(
        ethers.toUtf8Bytes(Date.now().toString())
      );

      const tx = await contract.vote(selected, receipt);
      await tx.wait();

      setReceipt(receipt);
      next();
    } catch (err) {
      console.error("Vote failed:", err);
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-icon" aria-hidden="true">
          🗳️
        </div>
        <div className="section-header-text">
          <h2>Cast Your Vote</h2>
          <p>Select your preferred candidate below</p>
        </div>
      </div>

      {/* Context Bar */}
      <div className="voting-context" id="voting-context">
        <span>📍 {booth}</span>
        <span className="voting-context-divider"></span>
        <span>🏛️ Constituency: {voter.constituency}</span>
      </div>

      {/* Candidate List */}
      <div className="candidate-list" id="candidate-list">
        {loading ? (
          // Skeleton loading cards
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`candidate-card animate-fade-in-up stagger-${i}`}
                style={{ pointerEvents: "none" }}
              >
                <div className="candidate-radio">
                  <div className="candidate-radio-dot"></div>
                </div>
                <div className="candidate-info">
                  <div
                    className="skeleton"
                    style={{ width: "140px", height: "18px", marginBottom: "6px" }}
                  ></div>
                  <div
                    className="skeleton"
                    style={{ width: "100px", height: "14px" }}
                  ></div>
                </div>
              </div>
            ))}
          </>
        ) : candidates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p className="empty-state-text">
              No candidates found for {voter.constituency}
            </p>
          </div>
        ) : (
          candidates.map((c, i) => (
            <div
              key={c.id}
              className={`candidate-card animate-fade-in-up stagger-${i + 1} ${
                selected === c.id ? "selected" : ""
              }`}
              onClick={() => setSelected(c.id)}
              role="radio"
              aria-checked={selected === c.id}
              tabIndex={0}
              id={`candidate-${c.id}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(c.id);
                }
              }}
            >
              <div className="candidate-radio">
                <div className="candidate-radio-dot"></div>
              </div>
              <div className="candidate-info">
                <p className="candidate-name">{c.name}</p>
                <p className="candidate-constituency">{c.constituency}</p>
              </div>
              {selected === c.id && (
                <span
                  className="badge badge-accent animate-fade-in"
                  style={{ marginLeft: "auto" }}
                >
                  Selected
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Submit Button */}
      {!loading && candidates.length > 0 && (
        <button
          onClick={handleVote}
          className={`btn btn-primary btn-lg ${
            selected === null ? "" : ""
          }`}
          disabled={selected === null || submitting}
          id="confirm-vote-btn"
          style={{
            width: "100%",
            opacity: selected === null ? 0.5 : 1,
            cursor: selected === null ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? (
            <>
              <div className="spinner"></div>
              Submitting to Blockchain...
            </>
          ) : (
            <>🗳️ Confirm Vote</>
          )}
        </button>
      )}
    </div>
  );
};

export default Voting;
