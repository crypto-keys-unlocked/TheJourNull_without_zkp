require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const { PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      // For local development
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
