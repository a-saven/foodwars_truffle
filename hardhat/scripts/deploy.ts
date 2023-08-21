import { ethers } from "hardhat";

async function main(contractName: string): Promise<string> {
  const contract = await ethers.deployContract("FoodWars");

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`${contractName} deployed to ${address}.`);
  return address;
}
const contractName = process.argv[2];
main(contractName)
  .then((address) => {
    console.log(address); // This will print the address to stdout
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
