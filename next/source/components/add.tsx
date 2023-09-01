"use client";
import { useState, useEffect } from "react";
import { Signer, Contract } from "ethers";
import FoodWars from "@/contracts/FoodWars.json";
import CA from "@/contracts/ContractAddress.json";
import { useEthers } from "@/source/utils/hook";
import { getData } from "@/source/utils/getData";
import { SearchInput } from "@/source/elements/searchInput";
import { DropdownComponent } from "@/source/elements/dropdown";
import { AddRestaurantButton } from "@/source/elements/button";
import { RestaurantDocument } from "@/source/types";

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
  const [suggestions, setSuggestions] = useState<RestaurantDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filteredSuggestions = suggestions.filter((suggestion: any) =>
    suggestion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchRestaurantsNotInBlockchain();
  }, []);

  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const fetchRestaurantsNotInBlockchain = async () => {
    const blockchainRestaurantsRes = await fetch("/api/restaurants");
    const blockchainRestaurantsData = await blockchainRestaurantsRes.json();
    const blockchainRestaurants = blockchainRestaurantsData.data || [];

    const mongoRestaurantsRes = await fetch("/api/mongo");
    const mongoRestaurantsData = await mongoRestaurantsRes.json();
    const mongoRestaurants = mongoRestaurantsData.data || [];

    const blockchainRestaurantIdentifiers = blockchainRestaurants.map((r: any) => r.identifier);
    const notInBlockchain = mongoRestaurants.filter((r: any) => !blockchainRestaurantIdentifiers.includes(r._id));
    setSuggestions(notInBlockchain);
  };

  const handleRestaurantChange = (_id: string) => {
    const selectedRestaurant: any = suggestions.find((s: any) => s._id === _id);
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

  return (
    <div className="flex flex-col space-y-2">
      <div className="relative w-full">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsDropdownVisible={setIsDropdownVisible}
        />
        {isDropdownVisible && (
          <DropdownComponent
            suggestions={filteredSuggestions}
            handleRestaurantChange={handleRestaurantChange}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
      <input type="hidden" value={restaurantIdentifier} />
      <AddRestaurantButton handleAddRestaurant={handleAddRestaurant} />
    </div>
  );
}
