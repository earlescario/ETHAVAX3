// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Get the account used for deployment
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the EthersTransfer contract
  const EthersTransfer = await ethers.getContractFactory("EthersTransfer");
  const ethersTransfer = await EthersTransfer.deploy();

  // Wait for the contract to be deployed
  await ethersTransfer.deployed();  

  console.log("EthersTransfer contract deployed to:", ethersTransfer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });