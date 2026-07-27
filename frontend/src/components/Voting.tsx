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
      try {
        console.log("Loading candidates for booth:", booth);
        const contract = await getContract();

        if (!contract) {
          console.error("Contract is undefined");
          return;
        }

        const temp = [];
        const count = Number(await contract.candidateCount());

        for (let i = 1; i <= count; i++) {
  const [name, constituency, votes] = await contract.getCandidate(i);

  console.log("Booth:", booth);
  console.log("Candidate constituency:", constituency);
  console.log("Match:", constituency === booth);

  if (constituency === booth) {
    temp.push({
      id: i,
      name,
      constituency,
      votes: Number(votes),
    });
  }
}

        setCandidates(temp);
        console.log("Loaded candidates:", temp);
      } catch (err) {
        console.error("Failed to load candidates:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, [booth]);

  const handleVote = async () => {
    if (selected === null) return;

    setSubmitting(true);

    try {
      const contract = await getContract();

      if (!contract) {
        console.error("Contract is undefined");
        setSubmitting(false);
        return;
      }

      // generate random receipt
      const receipt = ethers.keccak256(
        ethers.toUtf8Bytes(Date.now().toString()),
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
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl">
            🗳️
          </div>

          <div>
            <h2 className="text-3xl font-bold">Cast Your Vote</h2>

            <p className="mt-2 text-blue-100">
              Select one candidate for your constituency.
            </p>
          </div>
        </div>
      </div>

      {/* Context */}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Booth</p>

          <h3 className="mt-2 text-xl font-semibold text-slate-800">
            📍 {booth}
          </h3>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Constituency</p>

          <h3 className="mt-2 text-xl font-semibold text-slate-800">
            🏛️ {voter.constituency}
          </h3>
        </div>
      </div>

      {/* Candidate List */}

      <div className="space-y-4">
        {loading &&
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="h-8 w-8 rounded-full bg-slate-200" />

                <div className="flex-1">
                  <div className="mb-3 h-5 w-48 rounded bg-slate-200" />

                  <div className="h-4 w-32 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          ))}

        {!loading && candidates.length === 0 && (
          <div className="rounded-2xl border bg-white p-16 text-center shadow">
            <div className="mb-5 text-6xl">🔍</div>

            <h2 className="text-2xl font-semibold text-slate-700">
              No Candidates Found
            </h2>

            <p className="mt-3 text-slate-500">
              No candidates are available for
              <span className="font-semibold"> {voter.constituency}</span>
            </p>
          </div>
        )}

        {!loading &&
          candidates.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              onClick={() => setSelected(candidate.id)}
              className={`w-full rounded-2xl border p-6 text-left transition-all duration-300

            ${
              selected === candidate.id
                ? "border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-200"
                : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
            }

            `}
            >
              <div className="flex items-center">
                <div
                  className={`mr-5 flex h-8 w-8 items-center justify-center rounded-full border-2

                ${
                  selected === candidate.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300"
                }

                `}
                >
                  {selected === candidate.id ? "✓" : ""}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {candidate.name}
                  </h3>

                  <p className="mt-1 text-slate-500">
                    {candidate.constituency}
                  </p>
                </div>

                {selected === candidate.id && (
                  <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                    Selected
                  </span>
                )}
              </div>
            </button>
          ))}
      </div>

      {/* Bottom Action */}

      {!loading && candidates.length > 0 && (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Selected Candidate */}

            <div>
              <p className="text-sm uppercase tracking-wide text-slate-500">
                Selected Candidate
              </p>

              {selected === null ? (
                <h2 className="mt-2 text-2xl font-semibold text-slate-400">
                  No candidate selected
                </h2>
              ) : (
                <>
                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    {candidates.find((c) => c.id === selected)?.name}
                  </h2>

                  <p className="mt-1 text-slate-500">
                    {candidates.find((c) => c.id === selected)?.constituency}
                  </p>
                </>
              )}
            </div>

            {/* Vote Button */}

            <button
              onClick={handleVote}
              disabled={selected === null || submitting}
              className={`flex min-w-[240px] items-center justify-center gap-3 rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300

            ${
              selected === null || submitting
                ? "cursor-not-allowed bg-slate-300 text-slate-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 hover:shadow-2xl"
            }

            `}
            >
              {submitting ? (
                <>
                  <svg
                    className="h-6 w-6 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>🗳️ Confirm Vote</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Security Notice */}

      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔒</div>

          <div>
            <h3 className="text-lg font-bold text-green-800">
              Your vote is secure
            </h3>

            <p className="mt-2 leading-7 text-green-700">
              Once submitted, your vote will be signed, recorded on the Ethereum
              blockchain, and cannot be modified. After the transaction is
              confirmed, you'll receive a unique receipt that can later be used
              to verify your vote without revealing your chosen candidate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;
