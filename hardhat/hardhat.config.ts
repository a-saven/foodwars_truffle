import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { TaskArguments } from "hardhat/types";
const fs = require("fs");
const path = require("path");
const { task } = require("hardhat/config");

const config: HardhatUserConfig = {
  solidity: "0.8.19",
};

export default config;

const CONTRACT_NAME = "Voting";
// Task to compile contracts and update the Next.js app with the ABI
task("compileAndUpdate", "Compiles the contracts and updates the Next.js app").setAction(
  async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    await hre.run("compile");

    const contractArtifact = await hre.artifacts.readArtifact(CONTRACT_NAME);

    const outputPath = path.join(__dirname, "..", "next", "contracts", `${CONTRACT_NAME}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(contractArtifact, null, 2));

    console.log(`Contract ABI for ${CONTRACT_NAME} has been updated in the Next.js app.`);
  }
);

// Task to deploy contracts and update the Next.js app with the contract address
task("deployAndUpdate", "Deploys the contract and updates the Next.js app").setAction(
  async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    const contractFactory = await hre.ethers.getContractFactory(CONTRACT_NAME);
    const contract = await contractFactory.deploy(/* constructor arguments if any */);

    await contract.waitForDeployment();
    const address = await contract.getAddress();
    const contractAddressPath = path.join(__dirname, "..", "next", "contracts", `ContractAddress.json`);
    fs.writeFileSync(contractAddressPath, JSON.stringify({ address }));

    console.log(`Contract deployed to address ${address} and updated in the Next.js app.`);
  }
);

// Combined task to compile, deploy, and update using the localhost network
task("dev", "Compiles, deploys, and updates the Next.js app using the localhost network").setAction(
  async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    // Set the network to localhost
    hre.network.name = "localhost";

    await hre.run("compileAndUpdate");
    await hre.run("deployAndUpdate");
    console.log("Completed compile, deploy, and update tasks on localhost network.");
  }
);
