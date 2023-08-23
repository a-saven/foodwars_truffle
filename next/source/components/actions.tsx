"use client";
import { useState } from "react";
import { Signer, Contract } from "ethers";
import FoodWars from "@/contracts/FoodWars.json"; // Adjust the path accordingly
import CA from "@/contracts/contractAddress.json";

const CONTRACT_ADDRESS = CA.address;
const CONTRACT_ABI = FoodWars.abi;

export function Actions({ signer, getData }: { signer: Signer | null; getData: Function }) {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantIdentifier, setRestaurantIdentifier] = useState("");

  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const handleAddRestaurant = async () => {
    if (!signer) {
      alert("Signer not available");
      return;
    }

    try {
      const tx = await contract.addRestaurant(restaurantName, restaurantIdentifier);
      await tx.wait();
      alert("Restaurant added successfully!");
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Failed to add restaurant");
    }
  };

  try {
    contract.on("RestaurantAdded", async (restaurantId, name, identifier, owner, event) => {
      try {
        console.log("RestaurantAdded");
        await getData();
      } catch (error) {
        console.error("ErrorRevalidatingAfterRestaurantAdded:", (error as Error).message);
      } finally {
        event.removeListener();
      }
    });
  } catch (error) {
    console.error(" contract.on(RestaurantAdded)", (error as Error).message);
  }
  try {
    contract.on("Tipped", async (restaurantId, tipAmount, authorFee, event) => {
      try {
        console.log("Tipped");
        await getData();
      } catch (error) {
        console.error("ErrorRevalidatingAfterTipGiven:", (error as Error).message);
      } finally {
        event.removeListener();
      }
    });
  } catch (error) {
    console.error("contract.on(TipGiven)", (error as Error).message);
  }

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
