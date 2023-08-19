import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("Voting");

  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log(`Voting with  deployed to ${contract.target}. And ${JSON.stringify(contract)}. And owner is ${address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
