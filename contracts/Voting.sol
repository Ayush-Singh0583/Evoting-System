// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    struct Vote {
        uint candidateId;
        bytes32 receipt;
    }

    struct Candidate {
        uint id;
        string name;
        string constituency;
        uint voteCount;
    }

    mapping(bytes32 => bool) public usedReceipts;
    mapping(uint => Candidate) public candidates;

    uint public candidateCount;

    event VoteCast(bytes32 receipt);

    function addCandidate(string memory _name, string memory _constituency) public {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, _constituency, 0);
    }

    function vote(uint _candidateId, bytes32 _receipt) public {
        require(!usedReceipts[_receipt], "Already voted");

        candidates[_candidateId].voteCount++;
        usedReceipts[_receipt] = true;

        emit VoteCast(_receipt);
    }

    function verifyVote(bytes32 _receipt) public view returns (bool) {
        return usedReceipts[_receipt];
    }

    function getCandidate(uint _id) public view returns (
        string memory,
        string memory,
        uint
    ) {
        Candidate memory c = candidates[_id];
        return (c.name, c.constituency, c.voteCount);
    }
}