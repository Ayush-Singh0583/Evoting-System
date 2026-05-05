import React, { useState } from "react";

const Confirm = ({ receipt }: { receipt: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(receipt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = receipt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="confirm-container" id="confirm-screen">
      {/* Animated Checkmark */}
      <div className="success-checkmark">
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="check-path"
            d="M14 27l8 8 16-16"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Success Text */}
      <h2 className="confirm-title">Vote Recorded Successfully</h2>
      <p className="confirm-subtitle">
        Your vote has been securely stored on the Ethereum blockchain.
      </p>

      {/* Receipt Card */}
      <div className="receipt-card" id="receipt-card">
        <div style={{ textAlign: "left" }}>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginBottom: "4px",
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.05em",
            }}
          >
            Receipt ID
          </p>
          <p className="receipt-hash">{receipt}</p>
        </div>
        <button
          className="copy-btn"
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
          aria-label="Copy receipt to clipboard"
          id="copy-receipt-btn"
        >
          {copied ? "✓" : "📋"}
        </button>
      </div>

      {/* Info Note */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          padding: "14px 18px",
          background: "var(--accent-bg)",
          border: "1px solid var(--border-accent)",
          borderRadius: "var(--radius-md)",
          textAlign: "left",
          fontSize: "0.8125rem",
          color: "var(--text-accent)",
          lineHeight: "1.5",
        }}
      >
        <span style={{ flexShrink: 0, fontSize: "1rem" }} aria-hidden="true">
          💡
        </span>
        <span>
          Save this receipt ID. You can use it to verify your vote was counted
          without revealing your identity. Go to the{" "}
          <strong>Verify</strong> tab to check anytime.
        </span>
      </div>
    </div>
  );
};

export default Confirm;