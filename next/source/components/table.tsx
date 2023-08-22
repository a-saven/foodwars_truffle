import { Tip } from "@/source/components/tip";

interface Restaurant {
  name: string;
  identifier: string;
  owner: string;
  totalTips: number;
}

interface IndexedRestaurant extends Restaurant {
  id: number;
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function ethToWei(wei: number) {
  const eth = wei / 1e18;
  return eth;
}

export async function Table({ restaurants }: { restaurants: IndexedRestaurant[] }) {
  const res = await fetch(`${BASE_URL}/api/restaurants`, { method: "GET" });
  const rest = await res.json();
  console.log("rest", rest);

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
                <td>{ethToWei(restaurant.totalTips)}</td>
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
