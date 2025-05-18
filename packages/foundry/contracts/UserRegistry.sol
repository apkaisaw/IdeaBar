// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UserRegistry is ERC721, Ownable {
    struct User {
        string skills;
        uint256 reputation;
        uint256 soulCoinId;
    }

    mapping(address => User) public users;
    uint256 private soulCoinCounter;

    constructor() ERC721("SoulCoin", "SOUL") Ownable(msg.sender) {}

    function registerUser(string memory skills, address user) external onlyOwner {
        soulCoinCounter++;
        _mint(user, soulCoinCounter);
        users[user] = User(skills, 0, soulCoinCounter);
    }

    function updateReputation(address user, uint256 points) external onlyOwner {
        users[user].reputation += points;
    }

    function getUser(address user) external view returns (User memory) {
        return users[user];
    }
} 