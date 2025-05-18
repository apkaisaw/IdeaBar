// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/TaskPlatform.sol";
import "../contracts/Paymaster.sol";

contract TaskPlatformTest is Test {
    TaskPlatform public taskPlatform;
    Paymaster public paymaster;
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    
    function setUp() public {
        vm.startPrank(owner);
        paymaster = new Paymaster();
        taskPlatform = new TaskPlatform(address(paymaster));
        vm.stopPrank();
    }
    
    function testSubmitTask() public {
        uint256 taskId = 1;
        string memory ipfsCid = "Qm123456789abcdef";
        
        vm.startPrank(user1);
        taskPlatform.submitTask(taskId, ipfsCid, user1);
        vm.stopPrank();
        
        TaskPlatform.TaskResult memory result = taskPlatform.getTaskResult(1);
        assertEq(result.taskId, taskId);
        assertEq(result.ipfsCid, ipfsCid);
        assertEq(result.creator, user1);
        assertEq(taskPlatform.ownerOf(1), user1);
    }
    
    function testSubmitTaskViaPaymaster() public {
        uint256 taskId = 1;
        string memory ipfsCid = "Qm123456789abcdef";
        
        vm.startPrank(owner);
        bytes memory data = abi.encodeWithSelector(
            taskPlatform.submitTask.selector,
            taskId,
            ipfsCid,
            user1
        );
        paymaster.sponsorGas(user1, address(taskPlatform), data);
        vm.stopPrank();
        
        TaskPlatform.TaskResult memory result = taskPlatform.getTaskResult(1);
        assertEq(result.taskId, taskId);
        assertEq(result.ipfsCid, ipfsCid);
        assertEq(result.creator, user1);
        assertEq(taskPlatform.ownerOf(1), user1);
    }
    
    function testUnauthorizedSubmit() public {
        // User2 trying to submit on behalf of User1
        vm.startPrank(user2);
        vm.expectRevert("Unauthorized");
        taskPlatform.submitTask(1, "Qm123456789abcdef", user1);
        vm.stopPrank();
    }
    
    function testTaskNFTInfoAndCounter() public {
        assertEq(taskPlatform.name(), "IdeaResult");
        assertEq(taskPlatform.symbol(), "IDR");
        
        vm.startPrank(user1);
        taskPlatform.submitTask(1, "Cid1", user1);
        taskPlatform.submitTask(2, "Cid2", user1);
        vm.stopPrank();
        
        assertEq(taskPlatform.ownerOf(1), user1);
        assertEq(taskPlatform.ownerOf(2), user1);
        
        // Verify NFT counter increments correctly
        TaskPlatform.TaskResult memory result1 = taskPlatform.getTaskResult(1);
        TaskPlatform.TaskResult memory result2 = taskPlatform.getTaskResult(2);
        
        assertEq(result1.ipfsCid, "Cid1");
        assertEq(result2.ipfsCid, "Cid2");
    }
} 