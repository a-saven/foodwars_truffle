import { getRestaurants } from "@/source/utils/getMongo";
import { getData } from "@/source/utils/getData";
import Link from "next/link";
export const revalidate = 0; // revalidate the data at most every hour

type RestaurantItem = {
  _id: string;
  title: string;
  info: any;
  contact: string;
  owner: string;
  limited: boolean;
  totalTips?: Number; // Add this field for the merge
  rankId?: number; // Add this field for the merge
};

type Document = {
  _id: string;
  title: string;
  address: string;
  info: string;
  contact: string;
  owner: string;
  limited: boolean;
  totalTips?: Number; // Add this field for the merged data
  rankId?: number; // Add this field for the merge
};

type Rank = {
  id: number;
  name: string;
  identifier: string;
  owner: string;
  totalTips: number;
};

async function mergeData(): Promise<RestaurantItem[]> {
  const documents: Document[] = await getRestaurants();
  const ranks: Rank[] = await getData();

  return documents
    .filter((doc) => ranks.some((rank) => rank.identifier === doc._id))
    .map((doc) => {
      const matchingRank = ranks.find((rank) => rank.identifier === doc._id);
      if (matchingRank) {
        doc.totalTips = matchingRank.totalTips;
        doc.rankId = matchingRank.id; // Added this line
      }
      return doc;
    });
}

export async function Restaurants() {
  const documents = await mergeData();
  return (
    <div className="flex flex-col">
      {documents.map((item: RestaurantItem, index: number) => (
        <div key={item._id} className="flex flex-row justify-between items-center">
          <div className="m-4">{index + 1}</div>
          <div className="flex-1 m-4 justify-start">
            <a href={`https://u-menu.app/${item._id}`} className="text-blue-500 hover:underline font-semibold text-xl">
              <h1>{item.title}</h1>
            </a>
          </div>
          <div className="m-4">{`${item?.totalTips}`}</div>
          <div>
            <button className="bg-amber-500 text-white p-2 rounded-md ml-1">
              <Link href={`/tip/${item?.rankId}`}>TIP</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
