import { Contract } from "ethers";
import { initializeEthers } from "@/source/utils/initializeEthers";
import FoodWars from "@/contracts/FoodWars.json";
import CA from "@/contracts/contractAddress.json";
import { BigNumberish, formatEther } from "ethers";
import { Tip } from "@/source/components/tip";

const CONTRACT_ADDRESS: string = CA.address;
const CONTRACT_ABI: any[] = FoodWars.abi;

interface Restaurant {
  name: string;
  identifier: string;
  owner: string;
  totalTips: BigInt;
}

interface IndexedRestaurant extends Restaurant {
  id: number;
}

async function fetchRatings(): Promise<IndexedRestaurant[]> {
  const { provider } = await initializeEthers();
  const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const count: BigInt = await contractInstance.restaurantsCount();
  const numberCount: number = Number(count);

  const fetchedRestaurants: IndexedRestaurant[] = [];
  for (let i = 1; i <= numberCount; i++) {
    const restaurant: Restaurant = await contractInstance.restaurants(i);
    console.log("restaurants", restaurant);

    fetchedRestaurants.push({
      id: i, // This is the restaurant's ID
      name: restaurant.name,
      identifier: restaurant.identifier,
      owner: restaurant.owner,
      totalTips: restaurant.totalTips,
    });
  }

  // Sort by tips in descending order
  //fetchedRestaurants.sort((a, b) => Number(b.totalTips) - Number(a.totalTips));
  console.log("fetchedRestaurants", fetchedRestaurants);
  return fetchedRestaurants;
}

export async function Table() {
  const restaurants: IndexedRestaurant[] = await fetchRatings();

  return (
    <div>
      <h2>Ratings</h2>
      <table className="table-auto border-collapse border border-gray-800">
        <thead>
          <tr>
            <th>Name</th>
            <th>Identifier</th>
            <th>Total</th>
            <th>Tip</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length > 0 &&
            restaurants.map((restaurant, index) => (
              <tr key={index}>
                <td>{restaurant.name}</td>
                <td>{restaurant.identifier}</td>
                <td>{formatEther(restaurant.totalTips as BigNumberish)}</td>
                <td>
                  <Tip restaurantId={restaurant.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
