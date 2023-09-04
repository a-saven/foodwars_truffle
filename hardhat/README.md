# Sample Hardhat Project for Next.js

This project demonstrates a basic Hardhat use case and development cycle with Next.js.
It comes with a sample contract, a test for that contract, and a script that deploys that contract.
In hardhat.config.js, you can find two tasks, for compiling and deploying the contract for local dev & update Next.js app with contract address and abi.
And there is a script to do it all at once.

## Quick start

In first terminal run:

```shell
npx hardhat node
```

In second terminal run:

```shell
yarn && yarn dev YouContractName
```

For tests run:

```shell
npx hardhat test --parallel
```

## What's a catch?

Write contract in hardhat/contracts/YourContractName.sol
Compile & add to next in one command

## Commands

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
# to comple, deploy and pass contract address and abi to next app
npx hardhat dev --contract YouContractName
# same as above but with a name
yarn dev YouContractName
```
