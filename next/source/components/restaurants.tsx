import { getRestaurants } from "@/source/utils/getMongo";

type RestaurantItem = {
  _id: string;
  title: string;
  info: any;
};

export async function Restaurants() {
  const documents = await getRestaurants();

  return (
    <div className="flex flex-col">
      {documents.map((item: RestaurantItem, index: number) => (
        <div key={item._id} className="flex flex-row justify-between">
          <div className="m-4">{index + 1}</div>
          <div className="flex-1 m-4 justify-start">
            <a
              href={`https://u-menu.app/${item._id}`}
              className="text-blue-500 underline hover:no-underline font-semibold text-xl"
            >
              <h1>{item.title}</h1>
            </a>
          </div>
          <div className="m-4">Tips</div>
        </div>
      ))}
    </div>
  );
}
