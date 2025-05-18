// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./TokenSystem.sol";

contract QualityAssessment is AccessControl {
    bytes32 public constant SCORER_ROLE = keccak256("SCORER_ROLE");
    TokenSystem public tokenSystem;
    mapping(uint256 => uint256[]) public scores;
    mapping(uint256 => bool) public finalized;

    event HighScore(uint256 taskId, string ipfsCid, address creator);

    constructor(address _tokenSystem) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        tokenSystem = TokenSystem(_tokenSystem);
    }

    function scoreResult(uint256 taskId, uint256 score, address scorer) external onlyRole(SCORER_ROLE) {
        require(score <= 100, "Invalid score");
        scores[taskId].push(score);
    }

    function finalizeScore(uint256 taskId, string memory ipfsCid, address creator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!finalized[taskId], "Already finalized");
        uint256 totalScore;
        for (uint256 i = 0; i < scores[taskId].length; i++) {
            totalScore += scores[taskId][i];
        }
        uint256 avgScore = totalScore / scores[taskId].length;
        finalized[taskId] = true;

        if (avgScore >= 85) {
            tokenSystem.mintIdea(creator, 5 * 10**18); // 5 IDEA tokens
            tokenSystem.updateReputation(creator, 50); // 50 reputation points
            emit HighScore(taskId, ipfsCid, creator);
        }
    }
} 