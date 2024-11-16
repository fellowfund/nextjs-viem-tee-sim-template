export const config = {
  contract: "0x54668Ac3E509020b2349b5e66851d9bf9Ee88B5A",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_phalaVerifier",
          type: "address",
        },
        {
          internalType: "address",
          name: "_operator",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "applicationId",
          type: "uint256",
        },
      ],
      name: "ApplicantAccepted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "applicationId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "achieved",
          type: "bool",
        },
      ],
      name: "ApplicationEvaluated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "applicationId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "applicant",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "metadata",
          type: "string",
        },
      ],
      name: "ApplicationSubmitted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
      ],
      name: "EpochResolved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "grantPerAccepted",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "acceptedCount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalApplications",
          type: "uint256",
        },
      ],
      name: "EpochStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "string",
              name: "metadata",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "funds",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "applicationDeadline",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "marketDeadline",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "epochEndTime",
              type: "uint256",
            },
            {
              internalType: "enum FellowshipStatus",
              name: "status",
              type: "uint8",
            },
          ],
          indexed: false,
          internalType: "struct Fellowship",
          name: "fellowship",
          type: "tuple",
        },
      ],
      name: "FellowshipCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
      ],
      name: "FellowshipResolved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "marketAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "applicationId",
          type: "uint256",
        },
      ],
      name: "MarketOpened",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "applications",
      outputs: [
        {
          internalType: "address",
          name: "applicant",
          type: "address",
        },
        {
          internalType: "string",
          name: "metadata",
          type: "string",
        },
        {
          internalType: "bool",
          name: "achieved",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "verified",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "accepted",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "grantAmount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "metadata",
          type: "string",
        },
      ],
      name: "applyToFellowship",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "metadata",
          type: "string",
        },
        {
          internalType: "address",
          name: "applicantAddress",
          type: "address",
        },
      ],
      name: "applyToFellowshipWithCustomAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_metadata",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_funds",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_applicationDeadline",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_marketDeadline",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_epochDeadline",
          type: "uint256",
        },
      ],
      name: "createFellowship",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
      ],
      name: "evaluateMarket",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "fellowshipCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "fellowships",
      outputs: [
        {
          internalType: "string",
          name: "metadata",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "funds",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "applicationDeadline",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "marketDeadline",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "epochEndTime",
          type: "uint256",
        },
        {
          internalType: "enum FellowshipStatus",
          name: "status",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "markets",
      outputs: [
        {
          internalType: "contract IMarket",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
      ],
      name: "openFellowshipMarkets",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "operator",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "phalaVerifier",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
      ],
      name: "resolveFellowship",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "fellowshipId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "applicationId",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "achieved",
          type: "bool",
        },
        {
          internalType: "bytes",
          name: "proof",
          type: "bytes",
        },
      ],
      name: "setApplicantImpact",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_operator",
          type: "address",
        },
      ],
      name: "setOperator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_verifier",
          type: "address",
        },
      ],
      name: "setVerifier",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
