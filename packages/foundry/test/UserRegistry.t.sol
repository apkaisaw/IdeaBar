// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/UserRegistry.sol";

contract UserRegistryTest is Test {
    UserRegistry public userRegistry;
    address owner = address(1);
    address user1 = address(2);
    address user2 = address(3);

    function setUp() public {
        vm.startPrank(owner);
        userRegistry = new UserRegistry();
        vm.stopPrank();
    }

    function testRegisterUser() public {
        string memory skills = "Solidity, React, TypeScript";
        
        vm.startPrank(owner);
        userRegistry.registerUser(skills, user1);
        
        (string memory userSkills, uint256 reputation, uint256 soulCoinId) = userRegistry.getUser(user1);
        vm.stopPrank();
        
        assertEq(userSkills, skills);
        assertEq(reputation, 0);
        assertEq(soulCoinId, 1);
        assertEq(userRegistry.ownerOf(1), user1);
    }
    
    function testUpdateReputation() public {
        string memory skills = "Solidity, React, TypeScript";
        
        vm.startPrank(owner);
        userRegistry.registerUser(skills, user1);
        userRegistry.updateReputation(user1, 50);
        
        (,uint256 reputation,) = userRegistry.getUser(user1);
        vm.stopPrank();
        
        assertEq(reputation, 50);
    }
    
    function testOnlyOwnerCanRegister() public {
        vm.startPrank(user2);
        vm.expectRevert();
        userRegistry.registerUser("Skills", user1);
        vm.stopPrank();
    }
    
    function testOnlyOwnerCanUpdateReputation() public {
        vm.startPrank(user2);
        vm.expectRevert();
        userRegistry.updateReputation(user1, 10);
        vm.stopPrank();
    }
} 