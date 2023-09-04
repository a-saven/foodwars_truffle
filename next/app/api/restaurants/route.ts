import { Contract } from "ethers";
import { initializeEthers } from "@/source/utils/initializeEthers";
import FoodWars from "@/contracts/FoodWars.json";
import CA from "@/contracts/ContractAddress.json";
import { NextResponse } from "next/server";

const CONTRACT_ADDRESS = CA.address;
const CONTRACT_ABI = FoodWars.abi;

function weiToEth(wei: number) {
  const eth = wei / 1e18;
  return eth;
}

export async function GET() {
  try {
    const { provider } = await initializeEthers();

    const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    // Directly fetch all restaurants
    const restaurantsArray = await contractInstance.getAllRestaurants();

    const fetchedRestaurants = restaurantsArray.map((restaurant: any, index: any) => ({
      id: index + 1,
      name: restaurant.name,
      identifier: restaurant.identifier,
      owner: restaurant.owner,
      totalTips: weiToEth(Number(restaurant.totalTips)),
    }));

    fetchedRestaurants.sort((a: any, b: any) => Number(b.totalTips) - Number(a.totalTips));
    return NextResponse.json({ data: fetchedRestaurants }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
