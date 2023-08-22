"use client";
import { useState } from "react";
import { parseEther } from "ethers";
import { useEthers } from "@/source/utils/hook";
import { BigNumberish, Contract } from "ethers";
import FoodWars from "@/contracts/FoodWars.json"; // Adjust the path accordingly
import CA from "@/contracts/contractAddress.json";

const CONTRACT_ADDRESS = CA.address;
const CONTRACT_ABI = FoodWars.abi;

export function Tip({ restaurantId }: { restaurantId: number }) {
  const { signer } = useEthers();
  const [tipAmount, setTipAmount] = useState<string>("");

  const handleTip = async (restaurantId: number) => {
    if (!signer) {
      alert("Signer not available");
      return;
    }

    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    try {
      const amount = parseEther(tipAmount);
      const tx = await contract.tipRestaurant(restaurantId, { value: amount });
      await tx.wait();
      console.log("TX:", tx);
      alert("Tip sent successfully!");
      setTipAmount(""); // Reset the input field after successful tip
    } catch (error) {
      console.error(`Error sending tip: ${error}`);
      alert("Failed to send tip");
    }
  };

  if (!signer) return null;

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Tip Amount (ETH)"
        value={tipAmount}
        onChange={(e) => setTipAmount(e.target.value)}
        className="p-1 border rounded mr-2"
      />
      <button onClick={() => handleTip(restaurantId)} className="p-1 bg-blue-500 rounded text-white">
        {`\🌟`}
      </button>
    </div>
  );
}
