"use client";
import { useState } from "react";
import { Signer, Contract } from "ethers";
import FoodWars from "@/contracts/FoodWars.json"; // Adjust the path accordingly
import CA from "@/contracts/contractAddress.json";

const CONTRACT_ADDRESS = CA.address;
const CONTRACT_ABI = FoodWars.abi;

export function Actions({ signer, userAddress }: { signer: Signer | null; userAddress: string }) {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantIdentifier, setRestaurantIdentifier] = useState("");

  const handleAddRestaurant = async () => {
    if (!signer) {
      alert("Signer not available");
      return;
    }

    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    try {
      const tx = await contract.addRestaurant(restaurantName, restaurantIdentifier);
      await tx.wait();
      alert("Restaurant added successfully!");
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Failed to add restaurant");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      {signer && (
        <>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Restaurant Name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="p-2 border rounded bg-gray-100 text-black"
            />
            <input
              type="text"
              placeholder="Restaurant Identifier"
              value={restaurantIdentifier}
              onChange={(e) => setRestaurantIdentifier(e.target.value)}
              className="p-2 border rounded bg-gray-100 text-black"
            />
            <button onClick={handleAddRestaurant} className="bg-blue-500 text-white p-2 rounded">
              Add Restaurant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
