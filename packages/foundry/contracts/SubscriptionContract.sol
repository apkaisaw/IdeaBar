// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionContract is Ownable {
    ERC20 public ideaToken;
    mapping(address => uint256) public subscriptions; // 0: None, >0: Expiry timestamp
    uint256 public constant MONTHLY_FEE = 10 * 10**18; // 10 IDEA tokens
    address public paymaster;

    constructor(address _ideaToken, address _paymaster) Ownable(msg.sender) {
        ideaToken = ERC20(_ideaToken);
        paymaster = _paymaster;
    }

    function subscribe(address user, uint256 duration) external {
        require(msg.sender == user || msg.sender == paymaster, "Unauthorized");
        ideaToken.transferFrom(user, address(this), MONTHLY_FEE);
        subscriptions[user] = block.timestamp + duration;
    }

    function autoDeduct(address user) external {
        require(msg.sender == paymaster, "Only paymaster");
        require(subscriptions[user] > block.timestamp, "Subscription expired");
        ideaToken.transferFrom(user, address(this), MONTHLY_FEE);
        subscriptions[user] += 30 days;
    }

    function checkSubscription(address user) external view returns (bool) {
        return subscriptions[user] > block.timestamp;
    }
} 