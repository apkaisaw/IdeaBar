// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import "../contracts/UserRegistry.sol";
import "../contracts/TokenSystem.sol";
import "../contracts/TaskPlatform.sol";
import "../contracts/SubscriptionContract.sol";
import "../contracts/Paymaster.sol";
import "../contracts/QualityAssessment.sol";

/**
 * @notice Deploy script for Ideabar contracts
 * @dev Inherits ScaffoldETHDeploy
 */
contract DeployIdeabarContracts is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        // Step 1: Deploy UserRegistry
        UserRegistry userRegistry = new UserRegistry();
        console.log("UserRegistry deployed at:", address(userRegistry));
        deployments.push(Deployment("UserRegistry", address(userRegistry)));
        
        // Step 2: Deploy TokenSystem
        TokenSystem tokenSystem = new TokenSystem(address(userRegistry));
        console.log("TokenSystem deployed at:", address(tokenSystem));
        deployments.push(Deployment("TokenSystem", address(tokenSystem)));
        
        // Step 3: Deploy Paymaster
        Paymaster paymaster = new Paymaster();
        console.log("Paymaster deployed at:", address(paymaster));
        deployments.push(Deployment("Paymaster", address(paymaster)));
        
        // Step 4: Deploy TaskPlatform
        TaskPlatform taskPlatform = new TaskPlatform(address(paymaster));
        console.log("TaskPlatform deployed at:", address(taskPlatform));
        deployments.push(Deployment("TaskPlatform", address(taskPlatform)));
        
        // Step 5: Deploy SubscriptionContract
        SubscriptionContract subscriptionContract = new SubscriptionContract(
            address(tokenSystem),
            address(paymaster)
        );
        console.log("SubscriptionContract deployed at:", address(subscriptionContract));
        deployments.push(Deployment("SubscriptionContract", address(subscriptionContract)));
        
        // Step 6: Deploy QualityAssessment
        QualityAssessment qualityAssessment = new QualityAssessment(address(tokenSystem));
        console.log("QualityAssessment deployed at:", address(qualityAssessment));
        deployments.push(Deployment("QualityAssessment", address(qualityAssessment)));
        
        // Step 7: Grant SCORER_ROLE to deployer in QualityAssessment
        qualityAssessment.grantRole(qualityAssessment.SCORER_ROLE(), deployer);
    }
} 