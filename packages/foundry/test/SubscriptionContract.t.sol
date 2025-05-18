// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/SubscriptionContract.sol";
import "../contracts/TokenSystem.sol";
import "../contracts/UserRegistry.sol";
import "../contracts/Paymaster.sol";

contract SubscriptionContractTest is Test {
    SubscriptionContract public subscriptionContract;
    TokenSystem public tokenSystem;
    UserRegistry public userRegistry;
    Paymaster public paymaster;
    
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);
    
    function setUp() public {
        vm.startPrank(owner);
        userRegistry = new UserRegistry();
        tokenSystem = new TokenSystem(address(userRegistry));
        paymaster = new Paymaster();
        subscriptionContract = new SubscriptionContract(address(tokenSystem), address(paymaster));
        
        // Register users and mint tokens for testing
        userRegistry.registerUser("Developer", user1);
        tokenSystem.mintIdea(user1, 100 * 10**18);
        
        userRegistry.registerUser("Designer", user2);
        tokenSystem.mintIdea(user2, 50 * 10**18);
        vm.stopPrank();
    }
    
    function testSubscribe() public {
        uint256 duration = 30 days;
        
        vm.startPrank(user1);
        tokenSystem.approve(address(subscriptionContract), subscriptionContract.MONTHLY_FEE());
        subscriptionContract.subscribe(user1, duration);
        vm.stopPrank();
        
        assertTrue(subscriptionContract.checkSubscription(user1));
        assertEq(tokenSystem.balanceOf(user1), 90 * 10**18); // 100 - 10
        assertEq(tokenSystem.balanceOf(address(subscriptionContract)), 10 * 10**18);
    }
    
    function testAutoDeduct() public {
        // First subscribe
        uint256 duration = 30 days;
        vm.startPrank(user1);
        tokenSystem.approve(address(subscriptionContract), subscriptionContract.MONTHLY_FEE() * 2); // Approve for two payments
        subscriptionContract.subscribe(user1, duration);
        vm.stopPrank();
        
        uint256 initialExpiry = subscriptionContract.subscriptions(user1);
        
        // Fast forward 15 days
        vm.warp(block.timestamp + 15 days);
        
        // Auto-deduct via paymaster
        vm.startPrank(address(paymaster));
        subscriptionContract.autoDeduct(user1);
        vm.stopPrank();
        
        // Check subscription was extended by 30 days
        uint256 newExpiry = subscriptionContract.subscriptions(user1);
        assertEq(newExpiry, initialExpiry + 30 days);
        assertEq(tokenSystem.balanceOf(user1), 80 * 10**18); // 100 - 10 - 10
        assertEq(tokenSystem.balanceOf(address(subscriptionContract)), 20 * 10**18);
    }
    
    function testUnauthorizedSubscribe() public {
        // User2 trying to subscribe on behalf of user1 without being paymaster
        vm.startPrank(user2);
        tokenSystem.approve(address(subscriptionContract), subscriptionContract.MONTHLY_FEE());
        vm.expectRevert("Unauthorized");
        subscriptionContract.subscribe(user1, 30 days);
        vm.stopPrank();
    }
    
    function testOnlyPaymasterCanAutoDeduct() public {
        // Setup a valid subscription first
        vm.startPrank(user1);
        tokenSystem.approve(address(subscriptionContract), subscriptionContract.MONTHLY_FEE() * 2);
        subscriptionContract.subscribe(user1, 30 days);
        vm.stopPrank();
        
        // User1 trying to auto-deduct themselves
        vm.startPrank(user1);
        vm.expectRevert("Only paymaster");
        subscriptionContract.autoDeduct(user1);
        vm.stopPrank();
    }
    
    function testSubscriptionExpiry() public {
        uint256 duration = 10 days;
        
        vm.startPrank(user1);
        tokenSystem.approve(address(subscriptionContract), subscriptionContract.MONTHLY_FEE());
        subscriptionContract.subscribe(user1, duration);
        vm.stopPrank();
        
        // Fast forward 5 days
        vm.warp(block.timestamp + 5 days);
        assertTrue(subscriptionContract.checkSubscription(user1));
        
        // Fast forward another 6 days (total 11 days, past expiry)
        vm.warp(block.timestamp + 6 days);
        assertFalse(subscriptionContract.checkSubscription(user1));
    }
} 