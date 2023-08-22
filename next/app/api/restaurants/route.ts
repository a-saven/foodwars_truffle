import { Contract } from "ethers";
import { initializeEthers } from "@/source/utils/initializeEthers";
import FoodWars from "@/contracts/FoodWars.json";
import CA from "@/contracts/contractAddress.json";
import { NextResponse } from "next/server";
import { formatEther } from "ethers";

const CONTRACT_ADDRESS = CA.address;
const CONTRACT_ABI = FoodWars.abi;



export async function GET() {
  try {
    const { provider } = await initializeEthers();

    const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const count = await contractInstance.restaurantsCount();
    const numberCount = Number(count);

    const fetchedRestaurants = [];
    for (let i = 1; i <= numberCount; i++) {
      const restaurant = await contractInstance.restaurants(i);
      fetchedRestaurants.push({
        id: i,
        name: restaurant.name,
        identifier: restaurant.identifier,
        owner: restaurant.owner,
        totalTips: restaurant.totalTips,
      });
    }
    fetchedRestaurants.sort((a, b) => Number(b.totalTips) - Number(a.totalTips));
    return NextResponse.json({ data: fetchedRestaurants }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
