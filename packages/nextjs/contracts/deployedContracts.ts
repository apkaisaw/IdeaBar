/**
 * This file contains the deployment addresses of the contracts.
 */
import { Address } from "viem";

interface AllowedNetwork {
  name: string;
  chainId: number;
  contracts: {
    [contractName: string]: {
      address: Address;
      abi: any[];
      [key: string]: any;
    };
  };
}

const deployedContracts: Record<number, AllowedNetwork> = {
  31337: {
    name: "localhost",
    chainId: 31337,
    contracts: {
      IdeaPieSplit: {
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: [
          {
            inputs: [
              {
                internalType: "address[]",
                name: "members",
                type: "address[]"
              },
              {
                internalType: "uint256[]",
                name: "percentages",
                type: "uint256[]"
              },
              {
                internalType: "string",
                name: "projectName",
                type: "string"
              },
              {
                internalType: "string",
                name: "metadataURI",
                type: "string"
              }
            ],
            name: "submitSplit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "splitId",
                type: "uint256"
              }
            ],
            name: "getSplit",
            outputs: [
              {
                components: [
                  {
                    internalType: "address[]",
                    name: "members",
                    type: "address[]"
                  },
                  {
                    internalType: "uint256[]",
                    name: "percentages",
                    type: "uint256[]"
                  },
                  {
                    internalType: "string",
                    name: "projectName",
                    type: "string"
                  },
                  {
                    internalType: "string",
                    name: "metadataURI",
                    type: "string"
                  },
                  {
                    internalType: "uint256",
                    name: "timestamp",
                    type: "uint256"
                  }
                ],
                internalType: "struct IdeaPieSplit.Allocation",
                name: "",
                type: "tuple"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32"
              }
            ],
            name: "getSplitByHash",
            outputs: [
              {
                components: [
                  {
                    internalType: "address[]",
                    name: "members",
                    type: "address[]"
                  },
                  {
                    internalType: "uint256[]",
                    name: "percentages",
                    type: "uint256[]"
                  },
                  {
                    internalType: "string",
                    name: "projectName",
                    type: "string"
                  },
                  {
                    internalType: "string",
                    name: "metadataURI",
                    type: "string"
                  },
                  {
                    internalType: "uint256",
                    name: "timestamp",
                    type: "uint256"
                  }
                ],
                internalType: "struct IdeaPieSplit.Allocation",
                name: "",
                type: "tuple"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [],
            name: "splitCounter",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "uint256",
                name: "splitId",
                type: "uint256"
              },
              {
                indexed: false,
                internalType: "string",
                name: "projectName",
                type: "string"
              },
              {
                indexed: true,
                internalType: "address",
                name: "submitter",
                type: "address"
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256"
              }
            ],
            name: "SplitRecorded",
            type: "event"
          }
        ]
      }
    }
  }
};

export default deployedContracts;
