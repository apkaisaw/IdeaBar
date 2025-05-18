// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Paymaster is Ownable {
    mapping(address => uint256) public sponsoredTxs; // Track user transactions
    uint256 public constant MAX_SPONSORED_TXS = 3;

    constructor() Ownable(msg.sender) {}

    function sponsorGas(address user, address target, bytes calldata data) external onlyOwner {
        require(sponsoredTxs[user] < MAX_SPONSORED_TXS, "Max transactions reached");
        sponsoredTxs[user]++;
        (bool success, ) = target.call(data); // EIP-7702 delegatecall
        require(success, "Sponsored call failed");
    }
} 