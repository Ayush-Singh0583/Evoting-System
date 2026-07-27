import { useState } from "react";
import Voting from "../components/Voting";
import Confirm from "../components/Confirm";
import Verify from "../components/Verify";
import Results from "../components/Results";

export default function Home() {
  const [step, setStep] = useState(0);
  const [receipt, setReceipt] = useState("");
  const [activeTab, setActiveTab] = useState<"vote" | "verify" | "results">(
    "vote"
  );

  const voter = sessionStorage.getItem("voterObject")
    ? JSON.parse(sessionStorage.getItem("voterObject")!)
    : null;

  const votingSteps = [
    { label: "Cast Vote", icon: "🗳️" },
    { label: "Confirmation", icon: "✅" }
  ];

  const getStepState = (index: number) => {
    if (index + 1 < step) return "completed";
    if (index + 1 === step) return "active";
    return "pending";
  };

  const handleTabChange = (tab: "vote" | "verify" | "results") => {
    setActiveTab(tab);
    if (tab === "vote") setStep(1);
    else if (tab === "verify") setStep(3);
    else setStep(4);
  };

  const tabClass = (isActive: boolean) =>
    `inline-flex items-center gap-2 rounded-3xl px-5 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
        : "bg-white text-slate-700 shadow-sm hover:bg-slate-100"
    }`;

  const renderStepProgress = () => (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        {votingSteps.map((s, i) => {
          const state = getStepState(i);
          return (
            <div key={i} className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-semibold ${
                  state === "completed"
                    ? "bg-blue-600 text-white"
                    : state === "active"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {state === "completed" ? "✓" : i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{s.label}</p>
                <p className="text-xs text-slate-500">{s.icon}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-600 text-2xl text-white shadow">
              🗳️
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">VoteChain</p>
              <p className="text-lg font-semibold text-slate-900">E-Voting Dashboard</p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm">
            {voter ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                {voter.name} • {voter.email}
              </span>
            ) : (
              <span>Guest voter</span>
            )}
          </div>
        </header>

        <main className="flex-1 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <button
                  className={tabClass(activeTab === "vote")}
                  onClick={() => handleTabChange("vote")}
                  aria-current={activeTab === "vote" ? "page" : undefined}
                  id="nav-vote"
                >
                  <span aria-hidden="true">🗳️</span> Vote
                </button>
                <button
                  className={tabClass(activeTab === "verify")}
                  onClick={() => handleTabChange("verify")}
                  aria-current={activeTab === "verify" ? "page" : undefined}
                  id="nav-verify"
                >
                  <span aria-hidden="true">🔍</span> Verify
                </button>
                <button
                  className={tabClass(activeTab === "results")}
                  onClick={() => handleTabChange("results")}
                  aria-current={activeTab === "results" ? "page" : undefined}
                  id="nav-results"
                >
                  <span aria-hidden="true">📊</span> Results
                </button>
              </div>
              <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-500 shadow-sm">
                Live Blockchain Voting
              </div>
            </nav>
          </div>

          {activeTab === "vote" && step >= 1 && step <= 3 && renderStepProgress()}

          {step === 0 && (
            <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white shadow-lg">
              <div className="space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-3xl shadow-sm">
                  🗳️
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-semibold">Decentralized E-Voting</h1>
                  <p className="max-w-2xl text-base leading-7 text-blue-100">
                    Vote from anywhere, verified privately on the Ethereum blockchain. Your voice, secured by cryptography.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: "🔒", label: "Privacy Preserved" },
                    { icon: "🌐", label: "Vote Anywhere" },
                    { icon: "⛓️", label: "Blockchain Verified" },
                  ].map((feature) => (
                    <div key={feature.label} className="rounded-3xl bg-white/10 p-4 text-sm text-blue-100 shadow-sm">
                      <div className="flex items-center gap-3 font-semibold">
                        <span>{feature.icon}</span>
                        {feature.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="inline-flex items-center justify-center rounded-3xl bg-white px-7 py-4 text-base font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5"
                  onClick={() => {
                    setActiveTab("vote");
                    setStep(1);
                  }}
                  id="start-voting-btn"
                >
                  Start Voting →
                </button>
              </div>
            </section>
          )}

          {step === 1 && (
            <div className="animate-fade-in-up">
              <Voting voter={voter} booth={voter.constituency} setReceipt={setReceipt} next={() => setStep(2)} />
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in-up">
              <Confirm receipt={receipt} />
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in-up">
              <Verify />
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in-up">
              <Results />
            </div>
          )}
        </main>

        <footer className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-500 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-lg">⟠</span>
            <span>Powered by Ethereum Blockchain</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
