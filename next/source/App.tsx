import { Table } from "@/source/components/table";
import { Connect } from "@/source/components/connect";
import { dataSlice } from "ethers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function App() {
  const res = await fetch(`${BASE_URL}/api/restaurants`, { method: "GET" });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("res", res);
  }
  const { data } = await res.json();
  console.log("data", data);
  //const data = await getData();
  //console.log("data", res);
  return (
    <div>
      <Connect />
      <Table restaurants={data} />
    </div>
  );
}
