var Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Voting);
};
