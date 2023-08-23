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

export function Table({ restaurants }: { restaurants: IndexedRestaurant[] }) {
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
                <td>{restaurant.totalTips}</td>
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
