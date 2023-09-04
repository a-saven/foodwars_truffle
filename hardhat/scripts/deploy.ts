import { ethers } from "hardhat";

const name = "FoodWars";

async function main(): Promise<string> {
  const contract = await ethers.deployContract(name);

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log(`${name} deployed to ${address}.`);
  return address;
}

main()
  .then((address) => {
    console.log(address); // This will print the address to stdout
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
