"use client";
import { useState } from "react";
import { useEthers } from "@/source/utils/hook"; // Adjust the path accordingly
import { Actions } from "@/source/components/actions";

export function Connect({ getData }: { getData: any }) {
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
    <div className="mb-5 flex-col justify-center">
      {!userAddress ? (
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <p className="pr-4">{`To tip -> `}</p>
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
          <Actions signer={signer} getData={getData} />
        </div>
      )}
    </div>
  );
}
