// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    // Event to log when a new candidate is added
    event CandidateAdded(uint indexed candidateId, string name);

    // Event to log when a vote is cast
    event Voted(address indexed voter, uint indexed candidateId, uint indexed round);

    // Event to log the start of a new voting round
    event NewVotingRoundStarted(uint indexed round);
    
    mapping(address => mapping(uint => bool)) public voterRounds; // To track which rounds a voter has voted in
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    uint public currentRound = 1; // Start with round 1

    constructor() {
        _addCandidate("Candidate 1");
        _addCandidate("Candidate 2");
    }
    
    function _addCandidate(string memory _name) private {
        candidates[candidatesCount] = Candidate(_name, 0);
        emit CandidateAdded(candidatesCount, _name);  // Emitting event when a candidate is added
        candidatesCount++;
    }
    
    function vote(uint _candidateId) public {
        require(!voterRounds[msg.sender][currentRound], "You have already voted in this round.");
        require(_candidateId >= 0 && _candidateId < candidatesCount, "Invalid candidate ID.");
        
        voterRounds[msg.sender][currentRound] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId, currentRound);  // Emitting event when a vote is cast
    }

    function startNewVotingRound() public {
        currentRound++;
        for(uint i = 0; i < candidatesCount; i++) {
            candidates[i].voteCount = 0; // Reset vote count for each candidate
        }
        emit NewVotingRoundStarted(currentRound);
    }
}

