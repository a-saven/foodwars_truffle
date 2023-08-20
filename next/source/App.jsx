"use client";
import React, { useReducer, useEffect } from "react";
//import votingAbi from "@/build/contracts/Voting.json";
import { Contract, formatEther } from "ethers";
import { WalletConnection, Dashboard, VoteForm, CandidateList } from "./voting";
import { reducer, initialState } from "./voting/state";
import { useEthers } from "./voting/hookEthers";
import Voting from "@/contracts/Voting.json";
import CA from "@/contracts/contractAddress.json";

const CONTRACT_ADDRESS = CA.address;
const CONTRACT_ABI = Voting.abi;
console.log("CONTRACT_ADDRESS", CONTRACT_ADDRESS);
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ethers = useEthers();
  const isConnected = state.accounts && state.accounts.address ? true : false;

  const connect = async () => {
    if (ethers) {
      try {
        const signer = await ethers.getSigner();
        dispatch({ type: "SET_ACCOUNTS", payload: signer });
        const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        dispatch({ type: "SET_VOTING_CONTRACT", payload: contractInstance });
      } catch (error) {
        console.error("Error while connecting:", error);
      }
    }
  };

  useEffect(() => {
    console.log("Rerender____>", state);
    const fetchData = async () => {
      if (state.votingContract) {
        try {
          const round = await state.votingContract.currentRound();
          const roundNumber = Number(round);
          dispatch({ type: "SET_CURRENT_ROUND", payload: roundNumber });
        } catch (error) {
          console.error("Error fetching current round:", error);
        }
        try {
          const balance = await state.accounts.provider.getBalance(state.accounts.address);
          const formattedBalance = formatEther(balance);
          dispatch({ type: "SET_USER_BALANCE", payload: formattedBalance });
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
        try {
          const history = [];
          for (let i = 1; i <= state.currentRound; i++) {
            const hasVoted = await state.votingContract.voterRounds(state.accounts.address, 1);
            if (hasVoted) history.push(i);
          }
          dispatch({ type: "SET_VOTING_HISTORY", payload: history });
        } catch (error) {
          console.error("Error fetching voting history:", error);
        }
        try {
          const count = await state.votingContract.candidatesCount();
          const candidatesList = [];
          for (let i = 0; i < count; i++) {
            const candidate = await state.votingContract.candidates(i);
            candidatesList.push({
              id: i,
              name: candidate.name,
              voteCount: parseInt(candidate.voteCount),
            });
          }
          dispatch({ type: "SET_CANDIDATES", payload: candidatesList });
        } catch (error) {
          console.error("Error fetching candidates:", error);
        }
      }
    };
    fetchData();
  }, [state.votingContract, state.currentRound]);

  const handleVote = async () => {
    if (state.votingContract && state.accounts.address) {
      try {
        console.log("selectedCandidate", state.selectedCandidate);
        const tx = await state.votingContract.vote(state.selectedCandidate);
        await tx.wait();
        alert("Vote successful");
      } catch (error) {
        console.error("Error while voting:", error);
      }
    }
  };

  const startNewRound = async () => {
    if (state.votingContract && state.accounts.address) {
      try {
        const tx = await state.votingContract.startNewVotingRound();
        await tx.wait();
        alert("New voting round started!");
      } catch (error) {
        console.error("Error while starting a new round:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <WalletConnection
        isConnected={isConnected}
        accounts={state.accounts}
        onDisconnect={() => dispatch({ type: "SET_ACCOUNTS", payload: [] })}
        onConnect={connect}
      />
      {isConnected && (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
          <div className="flex-1">
            <Dashboard
              userBalance={state.userBalance}
              currentRound={state.currentRound}
              votingHistory={state.votingHistory}
              onStartNewRound={startNewRound}
            />
          </div>
          <div className="flex-1">
            <CandidateList candidates={state.candidates} />
            <VoteForm
              candidates={state.candidates}
              onVote={handleVote}
              selectedCandidate={state.selectedCandidate}
              onSelectChange={(event) =>
                dispatch({ type: "SET_SELECTED_CANDIDATE", payload: parseInt(event.target.value) })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
