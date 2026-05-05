import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VotingModule = buildModule("VotingModule", (m) => {
  const voting = m.contract("Voting");

  // ✅ Give each call a unique ID
  m.call(voting, "addCandidate", ["Alice", "Delhi"], {
    id: "addCandidateAlice",
  });

  m.call(voting, "addCandidate", ["Bob", "Delhi"], {
    id: "addCandidateBob",
  });

  m.call(voting, "addCandidate", ["Charlie", "Karnataka"], {
    id: "addCandidateCharlie",
  });

  return { voting };
});

export default VotingModule;