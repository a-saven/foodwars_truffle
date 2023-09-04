import { getRestaurants } from "@/source/utils/getRestaurants";
import { getRanks } from "@/source/utils/getRanks";
import Link from "next/link";
import { RestaurantDocument, MergedRestaurant, Rank } from "@/source/types";

export const revalidate = 0;

async function fetchAndMergeData(): Promise<MergedRestaurant[]> {
  const [restaurantDocs, blockchainRankings]: [RestaurantDocument[], Rank[]] = await Promise.all([
    getRestaurants(),
    getRanks(),
  ]);

  return restaurantDocs
    .filter((doc) => blockchainRankings?.some((rank) => rank.identifier === doc._id))
    .map((doc): MergedRestaurant => {
      const matchedRank = blockchainRankings?.find((rank) => rank.identifier === doc._id);

      if (!matchedRank) {
        throw new Error(`No matching rank found for restaurant with id ${doc._id}`);
      }

      return {
        ...doc,
        totalTips: matchedRank.totalTips,
        rankId: matchedRank.id,
      };
    });
}

export async function Restaurants() {
  const mergedData: MergedRestaurant[] = await fetchAndMergeData();
  return (
    <div className="flex flex-col">
      {mergedData.map((item: MergedRestaurant, index: number) => (
        <div key={item._id} className="flex flex-row justify-between items-center">
          <div className="m-4">{index + 1}</div>
          <div className="flex-1 m-4 justify-start">
            <Link
              href={`https://u-menu.app/${item._id}`}
              className="text-blue-500 hover:underline font-semibold text-xl"
            >
              <h1>{item.title}</h1>
            </Link>
          </div>
          <div className="m-4">{item.totalTips}</div>
          <div>
            <Link href={`/tip/${item.rankId}`}>
              <button className="bg-amber-500 text-white p-2 rounded-md ml-1">TIP</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
