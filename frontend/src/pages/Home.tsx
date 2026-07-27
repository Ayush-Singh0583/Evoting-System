import { useState } from "react";
import BoothSelect from "../components/BoothSelect";
import Voting from "../components/Voting";
import Confirm from "../components/Confirm";
import Verify from "../components/Verify";
import Results from "../components/Results";

export default function Home() {
  const [step, setStep] = useState(0);
  const [booth, setBooth] = useState("");
  const [receipt, setReceipt] = useState("");
  const [activeTab, setActiveTab] = useState<"vote" | "verify" | "results">(
    "vote"
  );

  const voter = {
    name: "Surya",
    constituency: "Delhi",
  };

  // Step progress for the voting flow
  const votingSteps = [
    { label: "Select Booth", icon: "📍" },
    { label: "Cast Vote", icon: "🗳️" },
    { label: "Confirmation", icon: "✅" },
  ];

  const getStepState = (index: number) => {
    if (index + 1 < step) return "completed";
    if (index + 1 === step) return "active";
    return "pending";
  };

  const handleTabChange = (tab: "vote" | "verify" | "results") => {
    setActiveTab(tab);
    if (tab === "vote") {
      setStep(1);
    } else if (tab === "verify") {
      setStep(4);
    } else {
      setStep(5);
    }
  };

  return (
    <div className="app-shell">
      {/* ─── Header ─── */}
      <header className="app-header" id="app-header">
        <div className="app-logo">
          <div className="app-logo-icon" aria-hidden="true">
            🗳️
          </div>
          <span className="app-logo-text">VoteChain</span>
        </div>
        <div className="header-right">
          <div className="voter-badge">
            <span className="voter-badge-dot" aria-hidden="true"></span>
            <span>
              {voter.name} • {voter.constituency}
            </span>
          </div>
        </div>
      </header>

      {/* ─── Navigation Tabs ─── */}
      <div className="main-content">
        <nav className="nav-tabs" aria-label="Main navigation" id="main-nav">
          <button
            className={`nav-tab ${activeTab === "vote" ? "active" : ""}`}
            onClick={() => handleTabChange("vote")}
            aria-current={activeTab === "vote" ? "page" : undefined}
            id="nav-vote"
          >
            <span aria-hidden="true">🗳️</span>
            Vote
          </button>
          <button
            className={`nav-tab ${activeTab === "verify" ? "active" : ""}`}
            onClick={() => handleTabChange("verify")}
            aria-current={activeTab === "verify" ? "page" : undefined}
            id="nav-verify"
          >
            <span aria-hidden="true">🔍</span>
            Verify
          </button>
          <button
            className={`nav-tab ${activeTab === "results" ? "active" : ""}`}
            onClick={() => handleTabChange("results")}
            aria-current={activeTab === "results" ? "page" : undefined}
            id="nav-results"
          >
            <span aria-hidden="true">📊</span>
            Results
          </button>
        </nav>

        {/* ─── Step Progress (Voting flow only) ─── */}
        {activeTab === "vote" && step >= 1 && step <= 3 && (
          <div
            className="step-progress animate-fade-in"
            role="progressbar"
            aria-label="Voting progress"
          >
            {votingSteps.map((s, i) => (
              <div className="step-item" key={i}>
                <div className={`step-circle ${getStepState(i)}`}>
                  {getStepState(i) === "completed" ? "✓" : i + 1}
                </div>
                <span className="step-label">{s.label}</span>
                {i < votingSteps.length - 1 && (
                  <div
                    className={`step-connector ${getStepState(i) === "completed" ? "completed" : ""} ${getStepState(i) === "active" ? "active" : ""}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── Welcome Screen ─── */}
        {step === 0 && (
          <div className="welcome-container" id="welcome-screen">
            <div className="welcome-icon">🗳️</div>
            <h1 className="welcome-title">
              Decentralized E-Voting
            </h1>
            <p className="welcome-subtitle">
              Vote from anywhere, verified privately on the Ethereum blockchain.
              Your voice, secured by cryptography.
            </p>
            <div className="welcome-features">
              <div className="welcome-feature">
                <span className="welcome-feature-icon">🔒</span>
                Privacy Preserved
              </div>
              <div className="welcome-feature">
                <span className="welcome-feature-icon">🌐</span>
                Vote Anywhere
              </div>
              <div className="welcome-feature">
                <span className="welcome-feature-icon">⛓️</span>
                Blockchain Verified
              </div>
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                setActiveTab("vote");
                setStep(1);
              }}
              id="start-voting-btn"
            >
              Start Voting →
            </button>
          </div>
        )}

        {/* ─── Step Views ─── */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <BoothSelect setBooth={setBooth} next={() => setStep(2)} />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <Voting
              voter={voter}
              booth={booth}
              setReceipt={setReceipt}
              next={() => setStep(3)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <Confirm receipt={receipt} />
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in-up">
            <Verify />
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in-up">
            <Results />
          </div>
        )}
      </div>

      {/* ─── Footer ─── */}
      <footer className="app-footer" id="app-footer">
        <div className="footer-content">
          <span className="footer-eth-icon" aria-hidden="true">
            ⟠
          </span>
          <span>Powered by Ethereum Blockchain</span>
        </div>
      </footer>
    </div>
  );
}