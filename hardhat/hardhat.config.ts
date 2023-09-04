import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/dev";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
};

export default config;
