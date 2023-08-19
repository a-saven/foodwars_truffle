import React from "react";

export function CandidateList({ candidates }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Candidate List</h3>
      <hr className="my-4 w-1/2 mx-auto border-t border-gray-200" />
      <ul className="list-none">
        {candidates.map((candidate) => (
          <li key={candidate.id} className="py-2">
            <div>Id: {candidate.id}</div>
            <div>Name: {candidate.name}</div>
            <div>Vote Count: {candidate.voteCount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
