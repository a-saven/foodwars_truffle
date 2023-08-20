import { Contract } from "ethers";
import { initializeEthers } from "@/source/utils/initializeEthers";
import FoodWars from "@/contracts/FoodWars.json";
import CA from "@/contracts/contractAddress.json";
import { ethers, formatEther } from "ethers";

const CONTRACT_ADDRESS: string = CA.address;
const CONTRACT_ABI: any[] = FoodWars.abi;

interface Restaurant {
  name: string;
  identifier: string;
  owner: string;
  totalTips: ethers.BigNumberish;
}

async function fetchRatings(): Promise<Restaurant[]> {
  const { provider } = await initializeEthers();
  const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const count: ethers.BigNumberish = await contractInstance.restaurantsCount();
  const numberCount: number = Number(count);

  const fetchedRestaurants: Restaurant[] = [];
  for (let i = 1; i <= numberCount; i++) {
    const restaurant: Restaurant = await contractInstance.restaurants(i);
    fetchedRestaurants.push(restaurant);
  }

  // Sort by tips in descending order
  fetchedRestaurants.sort((a, b) => Number(BigInt(b.totalTips) - BigInt(a.totalTips)));

  return fetchedRestaurants;
}

export async function Table() {
  const restaurants: Restaurant[] = await fetchRatings();

  return (
    <div>
      <h2>Ratings</h2>
      <table className="table-auto border-collapse border border-gray-800">
        <thead>
          <tr>
            <th>Name</th>
            <th>Identifier</th>
            <th>Total Tips</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length > 0 &&
            restaurants.map((restaurant, index) => (
              <tr key={index}>
                <td>{restaurant.name}</td>
                <td>{restaurant.identifier}</td>
                <td>{formatEther(restaurant.totalTips)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
