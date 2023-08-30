"use client";
import { useState, useEffect } from "react";
import { Signer, Contract } from "ethers";
import FoodWars from "@/contracts/FoodWars.json"; // Adjust the path accordingly
import CA from "@/contracts/ContractAddress.json";
import { useEthers } from "@/source/utils/hook"; // Adjust the path accordingly
import { getData } from "@/source/utils/getData";

const CONTRACT_ADDRESS = CA.address;
const CONTRACT_ABI = FoodWars.abi;

export function AddRestaurant() {
  const { signer } = useEthers();

  return (
    <div className="flex flex-col items-center justify-center m-5">
      {signer && <AddRestaurantForm signer={signer} />}
    </div>
  );
}

interface AddRestaurantFormProps {
  signer: Signer;
}

function AddRestaurantForm({ signer }: AddRestaurantFormProps) {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantIdentifier, setRestaurantIdentifier] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    fetchRestaurantsNotInBlockchain();
  }, []);

  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const fetchRestaurantsNotInBlockchain = async () => {
    const blockchainRestaurantsData = await fetch("/api/restaurants").then((res) => res.json());
    const blockchainRestaurants = blockchainRestaurantsData?.data;
    console.log("blockchainRestaurants", blockchainRestaurants);
    const mongoRestaurantsData = await fetch("/api/mongo").then((res) => res.json());
    const mongoRestaurants = mongoRestaurantsData?.data;
    console.log("mongoRestaurants", mongoRestaurants);
    const blockchainRestaurantIdentifiers = blockchainRestaurants.map((r: any) => r.identifier);
    const notInBlockchain = mongoRestaurants.filter(
      (r: any) => !blockchainRestaurantIdentifiers.includes(r.identifier)
    );

    setSuggestions(notInBlockchain);
  };

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRestaurant: any = suggestions.find((s: any) => s._id === e.target.value);
    if (selectedRestaurant) {
      setRestaurantIdentifier(selectedRestaurant._id);
      setRestaurantName(selectedRestaurant.title);
    }
  };

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
  console.log("suggestions", suggestions);

  return (
    <div className="flex flex-col space-y-2">
      <select
        value={restaurantIdentifier}
        onChange={handleRestaurantChange}
        className="p-2 border rounded bg-gray-100 text-black"
      >
        <option value="" disabled>
          Select a restaurant
        </option>
        {suggestions.map((suggestion: any) => (
          <option value={suggestion._id} key={suggestion._id}>
            {suggestion.title}
          </option>
        ))}
      </select>
      {/* Hidden input for the identifier */}
      <input type="hidden" value={restaurantIdentifier} />
      <button onClick={handleAddRestaurant} className="bg-blue-500 text-white p-2 rounded">
        Add Restaurant
      </button>
    </div>
  );
}
