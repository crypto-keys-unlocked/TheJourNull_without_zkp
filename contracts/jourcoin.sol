// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract JourCoin is ERC20, ReentrancyGuard {
    address public admin;
    uint256 public constant tokenPrice = 0.0001 ether; // Price per 100 tokens
    uint256 public constant minPurchase = 100;
    uint256 public constant maxPurchase = 1000;

    constructor() ERC20("JourCoin", "JRC") {
        admin = msg.sender;
        _mint(address(this), 1000000 * 10**18); // Initial supply to the contract itself
    }

    function buyTokens() public payable nonReentrant {
        require(msg.value >= tokenPrice, "Minimum purchase is 0.0001 ETH for 100 tokens");
        uint256 amountToBuy = (msg.value / tokenPrice) * 100;
        require(amountToBuy >= minPurchase && amountToBuy <= maxPurchase, "Can buy between 100 and 1000 tokens only");

        _transfer(address(this), msg.sender, amountToBuy * 10**18);
    }

    function withdraw() public {
        require(msg.sender == admin, "Only admin can withdraw");
        payable(admin).transfer(address(this).balance);
    }
}
