// scripts/checkBalance.js
const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x8FeAc7235123BC4Ac9228e37541489F8074A048D";
    const accountAddress = "YOUR_ACCOUNT_ADDRESS";
    const contractABI = ["function balanceOf(address owner) view returns (uint256)"];

    const provider = ethers.getDefaultProvider("sepolia");
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const balance = await contract.balanceOf(accountAddress);

    console.log(`Balance of ${accountAddress}: ${ethers.utils.formatEther(balance)} JourCoin`);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
