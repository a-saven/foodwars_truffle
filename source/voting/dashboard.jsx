import React from "react";

export function Dashboard({ userBalance, currentRound, votingHistory, onStartNewRound }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <hr className="my-4 w-1/2 mx-auto border-t border-gray-200" />
      <h3 className="text-xl font-semibold mb-2">Voting History:</h3>
      <ul>
        {votingHistory.map((round) => (
          <li key={round}>Voted in Round: {round}</li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2 mt-4">Account Balance:</h3>
      <p>{userBalance} ETH</p>
      <h3 className="text-xl font-semibold mb-2">Current Round: {currentRound}</h3>
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={onStartNewRound}>
        Start New Round
      </button>
    </div>
  );
}
