// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UserRegistry.sol";

contract TokenSystem is ERC20, Ownable {
    UserRegistry public userRegistry;
    
    constructor(address _userRegistry) ERC20("IdeaToken", "IDEA") Ownable(msg.sender) {
        userRegistry = UserRegistry(_userRegistry);
    }
    
    function mintIdea(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    function updateReputation(address user, uint256 points) external onlyOwner {
        userRegistry.updateReputation(user, points);
    }
} 