// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/TokenSystem.sol";
import "../contracts/UserRegistry.sol";

contract TokenSystemTest is Test {
    TokenSystem public tokenSystem;
    UserRegistry public userRegistry;
    address owner = address(1);
    address user1 = address(2);
    
    function setUp() public {
        vm.startPrank(owner);
        userRegistry = new UserRegistry();
        tokenSystem = new TokenSystem(address(userRegistry));
        
        // Register a test user
        userRegistry.registerUser("Developer", user1);
        vm.stopPrank();
    }
    
    function testMintIdea() public {
        vm.startPrank(owner);
        uint256 mintAmount = 10 * 10**18;
        tokenSystem.mintIdea(user1, mintAmount);
        vm.stopPrank();
        
        assertEq(tokenSystem.balanceOf(user1), mintAmount);
    }
    
    function testOnlyOwnerCanMint() public {
        vm.startPrank(user1);
        vm.expectRevert();
        tokenSystem.mintIdea(user1, 5 * 10**18);
        vm.stopPrank();
    }
    
    function testUpdateReputation() public {
        vm.startPrank(owner);
        tokenSystem.updateReputation(user1, 100);
        
        (, uint256 reputation, ) = userRegistry.getUser(user1);
        vm.stopPrank();
        
        assertEq(reputation, 100);
    }
    
    function testTokenInfo() public {
        assertEq(tokenSystem.name(), "IdeaToken");
        assertEq(tokenSystem.symbol(), "IDEA");
    }
} 