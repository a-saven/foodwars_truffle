"use client";
import { useState } from "react";
import { useEthers } from "@/source/utils/hook"; // Adjust the path accordingly

export function Connect() {
  const { provider, signer, loading, error } = useEthers();
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const connectToMetaMask = async () => {
    if (!signer) {
      alert("Unable to connect to MetaMask.");
      return;
    }
    try {
      const address = await signer.getAddress();
      setUserAddress(address);
    } catch (err) {
      console.error("Error connecting to MetaMask:", err);
    }
  };

  const logout = () => {
    setUserAddress(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mb-5">
      {!userAddress ? (
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <button onClick={connectToMetaMask} className="bg-blue-500 text-white p-2 rounded-md">
            Connect to MetaMask
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-xl font-bold mb-2">
            <p>Connected as: {userAddress}</p>
          </div>
          <button onClick={logout} className="bg-red-500 text-white p-2 rounded-md">
            Logout
          </button>
          {/* Here you can add the logic and UI for adding a restaurant and tipping */}
        </div>
      )}
    </div>
  );
}
