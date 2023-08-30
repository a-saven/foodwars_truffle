"use client";
import { useState } from "react";
import { parseEther } from "ethers";
import { useEthers } from "@/source/utils/hook";
import { Contract } from "ethers";
import FoodWars from "@/contracts/FoodWars.json"; // Adjust the path accordingly
import CA from "@/contracts/ContractAddress.json";
import { toUtf8String } from "ethers";
import { getData } from "@/source/utils/getData";

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
      const restaurantIndex = restaurantId - 1;
      console.log("restaurantIndex", restaurantIndex);
      const tx = await contract.tipRestaurant(restaurantIndex, { value: amount });
      await tx.wait();
      console.log("TX:", tx);
      alert("Tip sent successfully!");
      setTipAmount(""); // Reset the input field after successful tip
    } catch (error) {
      console.error(`Error sending tip: ${error}`);
      alert("Failed to send tip");
    }

    //   try {
    //     contract.on("Tipped", async (restaurantId, tipAmount, authorFee, event) => {
    //       try {
    //         console.log("Tipped");
    //         await getData();
    //       } catch (error) {
    //         console.error("ErrorRevalidatingAfterTipGiven:", (error as Error).message);
    //       } finally {
    //         event.removeListener();
    //       }
    //     });
    //   } catch (error) {
    //     console.error("contract.on(TipGiven)", (error as Error).message);
    //   }
  };

  if (!signer) return null;

  return (
    <div className="flex flex-col justify-center items-center">
      <div> Tip {restaurantId}</div>
      <div className="flex-row justify-center items-center">
        <input
          type="text"
          placeholder="ETH"
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          className="p-1 border rounded mr-2 w-16"
        />
        <button onClick={() => handleTip(restaurantId)} className="p-1 bg-blue-500 rounded text-white">
          TIP
        </button>
      </div>
    </div>
  );
}
