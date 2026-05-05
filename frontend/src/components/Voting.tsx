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

  useEffect(() => {
    const loadCandidates = async () => {
      const contract = await getContract();

      let temp = [];

      // Fetch first 10 candidates (demo)
      const count = await contract.candidateCount();

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
    };

    loadCandidates();
  }, []);

  const handleVote = async () => {
    if (selected === null) return alert("Select a candidate");

    const contract = await getContract();

    // generate random receipt
    const receipt = ethers.keccak256(ethers.toUtf8Bytes(Date.now().toString()));

    const tx = await contract.vote(selected, receipt);
    await tx.wait();

    setReceipt(receipt);
    next();
  };

  return (
    <div>
      <h2 className="text-xl mb-2">
        Voting at {booth} (Constituency: {voter.constituency})
      </h2>

      {candidates.map((c) => (
        <div
          key={c.id}
          className={`p-3 border mb-2 cursor-pointer ${
            selected === c.id ? "bg-green-200" : ""
          }`}
          onClick={() => setSelected(c.id)}
        >
          {c.name}
        </div>
      ))}

      <button
        onClick={handleVote}
        className="mt-4 px-4 py-2 bg-blue-500 text-white"
      >
        Confirm Vote
      </button>
    </div>
  );
};

export default Voting;
