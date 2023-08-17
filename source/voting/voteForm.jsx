import React from "react";

export function VoteForm({ candidates, onVote, selectedCandidate, onSelectChange }) {
  return (
    <form className="space-y-4">
      <div>
        <label className="block mb-2 font-medium" htmlFor="candidate">
          Select a candidate:
        </label>
        <select
          className="border-2 border-gray-300 rounded px-4 py-2 w-64" // Adjusted width to w-64 and added padding
          id="candidate"
          value={selectedCandidate}
          onChange={onSelectChange}
        >
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition duration-200 w-64" // Adjusted width to w-64
        type="button"
        onClick={onVote}
      >
        Vote
      </button>
    </form>
  );
}
