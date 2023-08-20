import { Contract } from "ethers";
import { initializeEthers } from "@/source/utils/initializeEthers";
import FoodWars from "@/contracts/FoodWars.json";
import CA from "@/contracts/contractAddress.json";

const CONTRACT_ADDRESS = CA.address;
const CONTRACT_ABI = FoodWars.abi;

async function getList() {
  const { provider } = await initializeEthers();
  const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  try {
    const count = await contractInstance.restaurantsCount();
    const numberCount = Number(count);
    return numberCount;
  } catch (e) {
    console.log("e", e);
  }
}

export default async function App() {
  const numberCount = await getList();
  console.log("numberCount", numberCount);
  return <div className="App">Hi {numberCount}</div>;
}
