// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/QualityAssessment.sol";
import "../contracts/TokenSystem.sol";
import "../contracts/UserRegistry.sol";

contract QualityAssessmentTest is Test {
    QualityAssessment public qualityAssessment;
    TokenSystem public tokenSystem;
    UserRegistry public userRegistry;
    
    address owner = address(1);
    address scorer1 = address(2);
    address scorer2 = address(3);
    address creator = address(4);
    
    bytes32 constant SCORER_ROLE = keccak256("SCORER_ROLE");
    
    function setUp() public {
        vm.startPrank(owner);
        userRegistry = new UserRegistry();
        tokenSystem = new TokenSystem(address(userRegistry));
        qualityAssessment = new QualityAssessment(address(tokenSystem));
        
        // Register a creator
        userRegistry.registerUser("Content Creator", creator);
        
        // Add scorers
        qualityAssessment.grantRole(SCORER_ROLE, scorer1);
        qualityAssessment.grantRole(SCORER_ROLE, scorer2);
        vm.stopPrank();
    }
    
    function testScoreResult() public {
        uint256 taskId = 1;
        
        vm.startPrank(scorer1);
        qualityAssessment.scoreResult(taskId, 80, scorer1);
        vm.stopPrank();
        
        vm.startPrank(scorer2);
        qualityAssessment.scoreResult(taskId, 90, scorer2);
        vm.stopPrank();
        
        // Check that scores were recorded (through scores array)
        assertEq(qualityAssessment.scores(taskId, 0), 80);
        assertEq(qualityAssessment.scores(taskId, 1), 90);
    }
    
    function testFinalizeScoreHighQuality() public {
        uint256 taskId = 1;
        string memory ipfsCid = "Qm123456789abcdef";
        
        // Add scores that will average to 85 or more
        vm.startPrank(scorer1);
        qualityAssessment.scoreResult(taskId, 90, scorer1);
        vm.stopPrank();
        
        vm.startPrank(scorer2);
        qualityAssessment.scoreResult(taskId, 80, scorer2);
        vm.stopPrank();
        
        uint256 initialBalance = tokenSystem.balanceOf(creator);
        
        // Finalize score and check rewards
        vm.startPrank(owner);
        vm.expectEmit(true, true, true, false);
        emit QualityAssessment.HighScore(taskId, ipfsCid, creator);
        qualityAssessment.finalizeScore(taskId, ipfsCid, creator);
        vm.stopPrank();
        
        // Check token reward
        assertEq(tokenSystem.balanceOf(creator), initialBalance + 5 * 10**18);
        
        // Check reputation increase
        (,uint256 reputation,) = userRegistry.getUser(creator);
        assertEq(reputation, 50);
        
        // Check finalized status
        assertTrue(qualityAssessment.finalized(taskId));
    }
    
    function testFinalizeScoreLowQuality() public {
        uint256 taskId = 2;
        string memory ipfsCid = "Qm123456789abcdef";
        
        // Add scores that will average below 85
        vm.startPrank(scorer1);
        qualityAssessment.scoreResult(taskId, 70, scorer1);
        vm.stopPrank();
        
        vm.startPrank(scorer2);
        qualityAssessment.scoreResult(taskId, 80, scorer2);
        vm.stopPrank();
        
        uint256 initialBalance = tokenSystem.balanceOf(creator);
        
        // Finalize score
        vm.startPrank(owner);
        qualityAssessment.finalizeScore(taskId, ipfsCid, creator);
        vm.stopPrank();
        
        // Check no token reward
        assertEq(tokenSystem.balanceOf(creator), initialBalance); // No change
        
        // Check no reputation increase
        (,uint256 reputation,) = userRegistry.getUser(creator);
        assertEq(reputation, 0); // Still 0
        
        // Check finalized status
        assertTrue(qualityAssessment.finalized(taskId));
    }
    
    function testOnlyScorerCanScore() public {
        vm.startPrank(creator); // Not a scorer
        vm.expectRevert();
        qualityAssessment.scoreResult(1, 80, creator);
        vm.stopPrank();
    }
    
    function testOnlyAdminCanFinalize() public {
        vm.startPrank(scorer1); // Not admin
        vm.expectRevert();
        qualityAssessment.finalizeScore(1, "ipfs", creator);
        vm.stopPrank();
    }
    
    function testCannotFinalizeAlreadyFinalized() public {
        uint256 taskId = 1;
        
        vm.startPrank(scorer1);
        qualityAssessment.scoreResult(taskId, 50, scorer1);
        vm.stopPrank();
        
        vm.startPrank(owner);
        qualityAssessment.finalizeScore(taskId, "ipfs", creator);
        
        // Try to finalize again
        vm.expectRevert("Already finalized");
        qualityAssessment.finalizeScore(taskId, "ipfs", creator);
        vm.stopPrank();
    }
} 