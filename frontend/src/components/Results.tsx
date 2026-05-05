import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contract";

const Results = () => {
  const [candidates, setCandidates] = useState<any[]>([]);

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

      setCandidates(temp);
    };

    loadResults();
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Election Results</h2>

      {candidates.map((c) => (
        <div key={c.id} className="p-3 border mb-2">
          <p className="font-semibold">{c.name}</p>
          <p>{c.constituency}</p>
          <p className="text-blue-600">Votes: {c.votes}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;