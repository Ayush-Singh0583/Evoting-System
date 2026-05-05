import React, { useState } from "react";
import { getContract } from "../utils/contract";

const Verify = () => {
  const [receipt, setReceipt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!receipt.trim()) return;

    setLoading(true);
    setResult(null);
    setVerified(null);

    try {
      const contract = await getContract();
      const exists = await contract.verifyVote(receipt);

      if (exists) {
        setResult("Your vote has been recorded and verified on the blockchain.");
        setVerified(true);
      } else {
        setResult(
          "No vote found with this receipt. Please check and try again."
        );
        setVerified(false);
      }
    } catch (err) {
      setResult("Verification failed. Please check your receipt ID.");
      setVerified(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-icon" aria-hidden="true">
          🔍
        </div>
        <div className="section-header-text">
          <h2>Verify Your Vote</h2>
          <p>Enter your receipt ID to confirm your vote was counted</p>
        </div>
      </div>

      {/* Input Group */}
      <div className="verify-input-group" id="verify-form">
        <input
          type="text"
          placeholder="Paste your receipt ID here (0x...)"
          className="input"
          value={receipt}
          onChange={(e) => setReceipt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleVerify();
          }}
          aria-label="Receipt ID"
          id="verify-input"
        />
        <button
          onClick={handleVerify}
          className="btn btn-success"
          disabled={loading || !receipt.trim()}
          style={{
            opacity: !receipt.trim() ? 0.5 : 1,
            cursor: !receipt.trim() ? "not-allowed" : "pointer",
            minWidth: "120px",
          }}
          id="verify-btn"
        >
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <>🛡️ Verify</>
          )}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div
          className={`verify-result ${verified ? "success" : "error"}`}
          id="verify-result"
          role="alert"
        >
          <span className="verify-result-icon" aria-hidden="true">
            {verified ? "✅" : "❌"}
          </span>
          <div>
            <p style={{ fontWeight: 600, marginBottom: "2px" }}>
              {verified ? "Vote Verified" : "Not Found"}
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                opacity: 0.85,
                fontWeight: 400,
              }}
            >
              {result}
            </p>
          </div>
        </div>
      )}

      {/* Privacy Note */}
      <div
        style={{
          marginTop: "24px",
          padding: "14px 18px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          fontSize: "0.8125rem",
          color: "var(--text-secondary)",
          lineHeight: "1.5",
        }}
      >
        <span style={{ flexShrink: 0, fontSize: "1rem" }} aria-hidden="true">
          🔒
        </span>
        <span>
          <strong>Privacy preserved.</strong> Verification only confirms that
          your vote exists — it does not reveal which candidate you voted for.
        </span>
      </div>
    </div>
  );
};

export default Verify;