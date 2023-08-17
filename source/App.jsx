import React, { useReducer, useEffect } from "react";
import votingAbi from "./contracts/voting.json";
import { WalletConnection, Dashboard, VoteForm, CandidateList } from "./voting";
import { reducer, initialState } from "./voting/state";
import { useWeb3Initialization } from "./voting/hookWeb3";

const CONTRACT_ADDRESS = "0xef61287b986d2d5c0c743fa7324b32473601d226";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const web3 = useWeb3Initialization();
  const isConnected = state.accounts && state.accounts.length > 0;

  const connect = async () => {
    if (web3) {
      const accounts = await web3.eth.requestAccounts();
      dispatch({ type: "SET_ACCOUNTS", payload: accounts });

      const contractInstance = new web3.eth.Contract(votingAbi.abi, CONTRACT_ADDRESS);
      dispatch({ type: "SET_VOTING_CONTRACT", payload: contractInstance });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (state.votingContract) {
        const round = await state.votingContract.methods.currentRound().call();
        dispatch({ type: "SET_CURRENT_ROUND", payload: round });

        const balance = await web3.eth.getBalance(state.accounts[0]);
        dispatch({ type: "SET_USER_BALANCE", payload: web3.utils.fromWei(balance, "ether") });

        const history = [];
        for (let i = 1; i <= state.currentRound; i++) {
          const hasVoted = await state.votingContract.methods.voterRounds(state.accounts[0], i).call();
          if (hasVoted) history.push(i);
        }
        dispatch({ type: "SET_VOTING_HISTORY", payload: history });

        const count = await state.votingContract.methods.candidatesCount().call();
        const candidatesList = [];
        for (let i = 0; i < count; i++) {
          const candidate = await state.votingContract.methods.candidates(i).call();
          candidatesList.push({
            id: i,
            name: candidate.name,
            voteCount: parseInt(candidate.voteCount),
          });
        }
        dispatch({ type: "SET_CANDIDATES", payload: candidatesList });
      }
    };
    fetchData();
  }, [state.votingContract, state.accounts, state.currentRound, web3]);

  const handleVote = async () => {
    if (state.votingContract && state.accounts.length > 0) {
      try {
        await state.votingContract.methods.vote(1).send({ from: state.accounts[0] });
        alert("Vote successful");
      } catch (error) {
        console.error("Error while voting:", error);
      }
    }
  };

  const startNewRound = async () => {
    if (state.votingContract && state.accounts.length > 0) {
      try {
        await state.votingContract.methods.startNewVotingRound().send({ from: state.accounts[0] });
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
