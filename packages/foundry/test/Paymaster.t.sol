// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/Paymaster.sol";

// Mock contract to test paymaster
contract MockTarget {
    bool public called;
    address public lastCaller;
    
    function mockFunction() external {
        called = true;
        lastCaller = msg.sender;
    }
}

contract PaymasterTest is Test {
    Paymaster public paymaster;
    MockTarget public mockTarget;
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    
    function setUp() public {
        vm.startPrank(owner);
        paymaster = new Paymaster();
        mockTarget = new MockTarget();
        vm.stopPrank();
    }
    
    function testSponsorGas() public {
        bytes memory callData = abi.encodeWithSelector(
            MockTarget.mockFunction.selector
        );
        
        vm.startPrank(owner);
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        vm.stopPrank();
        
        assertTrue(mockTarget.called());
        assertEq(mockTarget.lastCaller(), address(paymaster));
        assertEq(paymaster.sponsoredTxs(user1), 1);
    }
    
    function testSponsorMultipleTimes() public {
        bytes memory callData = abi.encodeWithSelector(
            MockTarget.mockFunction.selector
        );
        
        vm.startPrank(owner);
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        vm.stopPrank();
        
        assertEq(paymaster.sponsoredTxs(user1), 3);
    }
    
    function testMaxSponsoredTxsReached() public {
        bytes memory callData = abi.encodeWithSelector(
            MockTarget.mockFunction.selector
        );
        
        vm.startPrank(owner);
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        
        // This should fail because MAX_SPONSORED_TXS = 3
        vm.expectRevert("Max transactions reached");
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        vm.stopPrank();
    }
    
    function testOnlyOwnerCanSponsor() public {
        bytes memory callData = abi.encodeWithSelector(
            MockTarget.mockFunction.selector
        );
        
        vm.startPrank(user2);
        vm.expectRevert();
        paymaster.sponsorGas(user1, address(mockTarget), callData);
        vm.stopPrank();
    }
    
    function testSponsorGasFailed() public {
        // Create malformed calldata that will fail
        bytes memory badCallData = hex"1234567890";
        
        vm.startPrank(owner);
        vm.expectRevert("Sponsored call failed");
        paymaster.sponsorGas(user1, address(mockTarget), badCallData);
        vm.stopPrank();
    }
} 