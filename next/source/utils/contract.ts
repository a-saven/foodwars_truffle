import { Contract } from "ethers";
import FoodWars from "@/contracts/FoodWars.json";
import CA from "@/contracts/ContractAddress.json";
import { Signer, Provider } from "ethers";

export function getContract(signerOrProvider: Signer | Provider): Contract {
  return new Contract(CA.address, FoodWars.abi, signerOrProvider);
}
