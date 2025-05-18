// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TaskPlatform is ERC721, Ownable {
    struct TaskResult {
        uint256 taskId;
        string ipfsCid;
        address creator;
    }

    mapping(uint256 => TaskResult) public results;
    uint256 private nftCounter;
    address public paymaster;

    constructor(address _paymaster) ERC721("IdeaResult", "IDR") Ownable(msg.sender) {
        paymaster = _paymaster;
    }

    function submitTask(uint256 taskId, string memory ipfsCid, address user) external {
        require(msg.sender == user || msg.sender == paymaster, "Unauthorized");
        nftCounter++;
        _mint(user, nftCounter);
        results[nftCounter] = TaskResult(taskId, ipfsCid, user);
    }

    function getTaskResult(uint256 taskId) external view returns (TaskResult memory) {
        return results[taskId];
    }
} 