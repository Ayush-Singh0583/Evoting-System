import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

const Results = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      const contract = await getContract();

      let temp = [];

      for (let i = 1; i <= 10; i++) {
        try {
          const c = await contract.getCandidate(i);

          temp.push({
            id: i,
            name: c[0],
            constituency: c[1],
            votes: Number(c[2]),
          });
        } catch {
          break;
        }
      }

      // Sort by votes descending
      temp.sort((a, b) => b.votes - a.votes);
      setCandidates(temp);
      setLoading(false);
    };

    loadResults();
  }, []);

  const maxVotes = Math.max(...candidates.map((c) => c.votes), 1);
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-icon" aria-hidden="true">
          📊
        </div>
        <div className="section-header-text">
          <h2>Election Results</h2>
          <p>
            Live results from the blockchain
            {!loading && totalVotes > 0 && (
              <span style={{ marginLeft: "8px" }}>
                •{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  {totalVotes}
                </strong>{" "}
                total votes
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Results List */}
      <div className="results-grid" id="results-grid">
        {loading ? (
          // Skeleton loading
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`result-card animate-fade-in-up stagger-${i}`}
              >
                <div className="result-card-header">
                  <div className="result-candidate-info">
                    <div
                      className="skeleton"
                      style={{ width: "32px", height: "32px" }}
                    ></div>
                    <div>
                      <div
                        className="skeleton"
                        style={{
                          width: "120px",
                          height: "16px",
                          marginBottom: "6px",
                        }}
                      ></div>
                      <div
                        className="skeleton"
                        style={{ width: "80px", height: "12px" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  className="skeleton"
                  style={{ width: "100%", height: "6px", marginTop: "4px" }}
                ></div>
              </div>
            ))}
          </>
        ) : candidates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p className="empty-state-text">
              No results available yet. Check back after voting.
            </p>
          </div>
        ) : (
          candidates.map((c, i) => (
            <div
              key={c.id}
              className={`result-card animate-fade-in-up stagger-${i + 1} ${
                i === 0 && c.votes > 0 ? "winner" : ""
              }`}
              id={`result-${c.id}`}
            >
              <div className="result-card-header">
                <div className="result-candidate-info">
                  <div className="result-rank">
                    {i === 0 && c.votes > 0 ? "👑" : i + 1}
                  </div>
                  <div>
                    <p className="result-candidate-name">{c.name}</p>
                    <p className="result-candidate-constituency">
                      {c.constituency}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="result-votes">{c.votes}</p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {totalVotes > 0
                      ? `${((c.votes / totalVotes) * 100).toFixed(1)}%`
                      : "0%"}
                  </p>
                </div>
              </div>
              <div className="result-bar-track">
                <div
                  className="result-bar-fill"
                  style={{
                    width: `${maxVotes > 0 ? (c.votes / maxVotes) * 100 : 0}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Results;