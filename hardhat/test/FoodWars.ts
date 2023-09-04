import { ethers } from "hardhat";
import { expect } from "chai";
import { FoodWars } from "../typechain-types/FoodWars";
import { Signer, BigNumberish, parseEther } from "ethers";
import hre from "hardhat";

describe("FoodWars", function () {
  let foodWars: FoodWars;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    const contractName = "FoodWars";
    await hre.run("compile");
    foodWars = (await hre.ethers.deployContract(contractName)) as FoodWars;
    await foodWars.waitForDeployment();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await foodWars.contractAuthor()).to.equal(await owner.getAddress());
    });
  });

  describe("Restaurants", function () {
    it("Should add a new restaurant", async function () {
      await foodWars.connect(addr1).addRestaurant("Test Restaurant", "TR01");
      const restaurant = await foodWars.restaurants(0);
      expect(restaurant.name).to.equal("Test Restaurant");
      expect(restaurant.identifier).to.equal("TR01");
      expect(restaurant.owner).to.equal(await addr1.getAddress());
      expect(restaurant.totalTips.toString()).to.equal("0");
    });

    it("Should tip a restaurant", async function () {
      await foodWars.connect(addr1).addRestaurant("Test Restaurant", "TR01");

      // Check owner balance before the tip
      const ownerAddress = await owner.getAddress();
      const initialOwnerBalance: BigNumberish = await ethers.provider.getBalance(ownerAddress);

      await foodWars.connect(addr2).tipRestaurant("TR01", { value: parseEther("1.0") });

      // Check the restaurant's tips after the tip action
      const restaurant = await foodWars.restaurants(0);
      expect(restaurant.totalTips.toString()).to.equal(parseEther("0.95").toString());

      // Check contract balance after the tip
      const contractAddress = await foodWars.getAddress();
      const contractBalance = await ethers.provider.getBalance(contractAddress);
      expect(contractBalance.toString()).to.equal(parseEther("0").toString());
    });

    it("Should get all restaurants", async function () {
      await foodWars.connect(addr1).addRestaurant("Test Restaurant 1", "TR01");
      await foodWars.connect(addr1).addRestaurant("Test Restaurant 2", "TR02");

      const allRestaurants = await foodWars.getAllRestaurants();
      expect(allRestaurants.length).to.equal(2);
      expect(allRestaurants[0].name).to.equal("Test Restaurant 1");
      expect(allRestaurants[1].name).to.equal("Test Restaurant 2");
    });

    it("Should get restaurants count", async function () {
      await foodWars.connect(addr1).addRestaurant("Test Restaurant 1", "TR01");
      await foodWars.connect(addr1).addRestaurant("Test Restaurant 2", "TR02");

      const count = await foodWars.getRestaurantsCount();
      expect(count).to.equal(2);
    });
  });
});
