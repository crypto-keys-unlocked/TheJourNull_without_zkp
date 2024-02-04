const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const JourCoin = await ethers.getContractFactory("JourCoin");

    const jourCoin = await JourCoin.deploy();

    await jourCoin.deployed();

    console.log("JourCoin deployed to:", jourCoin.address);
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});