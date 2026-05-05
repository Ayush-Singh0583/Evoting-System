import React, { useState } from "react";
import { getContract } from "../utils/contract";

const Verify = () => {
  const [receipt, setReceipt] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleVerify = async () => {
    const contract = await getContract();

    const exists = await contract.verifyVote(receipt);

    if (exists) {
      setResult("Vote exists in system ✅");
    } else {
      setResult("No vote found ❌");
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-3">Verify Your Vote</h2>

      <input
        type="text"
        placeholder="Enter receipt ID"
        className="border p-2 w-full"
        onChange={(e) => setReceipt(e.target.value)}
      />

      <button
        onClick={handleVerify}
        className="mt-3 px-4 py-2 bg-green-500 text-white"
      >
        Verify
      </button>

      {result && <p className="mt-3">{result}</p>}
    </div>
  );
};

export default Verify;