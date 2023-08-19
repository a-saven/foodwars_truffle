"use client";
import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import Lock from "@/contracts/Lock.json";

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const CONTRACT_ABI = Lock.abi;

export default function LockPage() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [unlockTime, setUnlockTime] = useState(0);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    async function Initialize() {
      if (typeof window.ethereum !== "undefined") {
        try {
          const providerInstance = new BrowserProvider(window.ethereum);
          setProvider(providerInstance);
          const signerInstance = await providerInstance.getSigner();
          setSigner(signerInstance);
          const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerInstance);
          setContract(contractInstance);
        } catch (error) {
          console.error(`Initialize: ${error}`);
        }
      }
    }
    Initialize();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (contract) {
        try {
          const time = await contract.unlockTime();
          const contractOwner = await contract.owner();

          // Check if time is a bigint and convert
          if (typeof time === "bigint") {
            setUnlockTime(Number(time));
          } else if (typeof time === "number") {
            setUnlockTime(time);
          } else {
            console.error("Unexpected type for unlockTime:", typeof time);
          }

          setOwner(contractOwner);
        } catch (error) {
          console.error("Error fetching contract data:", error);
        }
      }
    }
    fetchData();
  }, [contract]);

  const handleWithdraw = async () => {
    if (contract) {
      try {
        const tx = await contract.withdraw();
        await tx.wait();
        alert("Withdrawal successful!");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Lock Contract</h1>
      <p>
        <strong>Unlock Time:</strong> {new Date(unlockTime * 1000).toLocaleString()}
      </p>
      <p>
        <strong>Owner:</strong> {owner}
      </p>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}
