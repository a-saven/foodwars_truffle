import { useState, useEffect } from "react";

export const initialState = {
  web3: null,
  accounts: [],
  votingContract: null,
  candidates: [],
  selectedCandidate: 0,
  currentRound: 1,
  userBalance: "0",
  votingHistory: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3":
      return { ...state, web3: action.payload };
    case "SET_ACCOUNTS":
      return { ...state, accounts: action.payload };
    case "SET_VOTING_CONTRACT":
      return { ...state, votingContract: action.payload };
    case "SET_CANDIDATES":
      return { ...state, candidates: action.payload };
    case "SET_SELECTED_CANDIDATE":
      return { ...state, selectedCandidate: action.payload };
    case "SET_CURRENT_ROUND":
      return { ...state, currentRound: action.payload };
    case "SET_USER_BALANCE":
      return { ...state, userBalance: action.payload };
    case "SET_VOTING_HISTORY":
      return { ...state, votingHistory: action.payload };
    default:
      return state;
  }
}


