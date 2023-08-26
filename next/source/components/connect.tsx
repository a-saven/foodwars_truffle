"use client";
import { useState } from "react";
import { useEthers } from "@/source/utils/hook"; // Adjust the path accordingly

export function Connect() {
  const { signer, loading, error } = useEthers();
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

  function shortenAddress(address: string): string {
    if (!address || address.length < 6) return address;
    return `${address.substring(0, 3)}...${address.substring(address.length - 3)}`;
  }

  return (
    <div className="flex justify-end">
      {!userAddress ? (
        <button onClick={connectToMetaMask} className="bg-amber-500 text-white p-2 rounded-md">
          Connect to MetaMask
        </button>
      ) : (
        <button onClick={logout} className="bg-amber-500	 text-white p-2 rounded-md">
          Logout as {shortenAddress(userAddress)}
        </button>
      )}
    </div>

    //<Actions signer={signer} getData={getData} />
  );
}
