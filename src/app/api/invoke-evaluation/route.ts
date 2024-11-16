import {
  http,
  createPublicClient,
  stringify,
  createWalletClient,
  keccak256,
} from "viem";
import { mantleSepoliaTestnet } from "viem/chains";
import * as github from "../../github/github";
import superjson from "superjson";
import { TappdClient } from "@phala/dstack-sdk";
import { privateKeyToAccount } from "viem/accounts";
import { config } from "../../lib/config";
import { NextRequest } from "next/server";

const client = createPublicClient({
  chain: mantleSepoliaTestnet,
  transport: http(),
});

const endpoint =
  process.env.DSTACK_SIMULATOR_ENDPOINT || "http://localhost:8090";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { fellowshipId: string } }
) {
  const fellowshipId = params.fellowshipId;

  console.log("Preparing to update KPIs on smart contract...");
  const publicClient = createPublicClient({
    chain: mantleSepoliaTestnet,
    transport: http(),
  });

  const walletClient = createWalletClient({
    chain: mantleSepoliaTestnet,
    transport: http(),
  });

  const client = new TappdClient(endpoint);
  const testDeriveKey = await client.deriveKey("/", "test");
  const keccakPrivateKey = keccak256(testDeriveKey.asUint8Array());
  const account = privateKeyToAccount(keccakPrivateKey);
  const gweiAmount = 420;

  let fellowshipApplicants: any = [];
  let applicantsIndex = 0;
  // Get all fellowship applicants from the contract
  try {
    while (true) {
      try {
        fellowshipApplicants = await publicClient.readContract({
          address: config.contract as `0x${string}`,
          abi: config.abi,
          functionName: "applications",
          args: [BigInt(fellowshipId), BigInt(applicantsIndex)],
        });

        if (fellowshipApplicants.length === 0) {
          break;
        }

        applicantsIndex += 1;
      } catch (error) {
        console.error(
          `Error reading contract at index ${applicantsIndex}:`,
          error
        );
        break;
      }
    }
  } catch (error) {
    console.error("Fatal error reading fellowship applicants:", error);
    throw new Error("Failed to fetch fellowship applicants");
  }

  console.log("Fellowship applicants:", fellowshipApplicants);

  // TODO: Remove this hardcoded data - for hack demo purposes
  const fellowApplicants = [
    {
      fellowshipId: 1,
      applicantId: 123,
      githubHandle: "thedanielmark",
      githubOrg: "fellowfund",
      fellowAddress: "",
      fellowshipStartDate: "2024-01-01",
      fellowshipEndDate: "2024-11-16",
      kpiTargets: {
        totalCommits: {
          targetValue: 3,
          weight: 0.7,
        },
        poapEvents: {
          targetValue: 1,
          weight: 0.3,
        },
      },
    },
    {
      fellowshipId: 1,
      githubHandle: "gsmachado",
      githubOrg: "fellowfund",
      fellowAddress: "0x9DaD0C0903dcD9a691504c674D8D87bF570e4fC4",
      fellowshipStartDate: "2024-01-01",
      fellowshipEndDate: "2024-11-16",
      kpiTargets: {
        totalCommits: {
          targetValue: 1,
          weight: 0.7,
        },
        poapEvents: {
          targetValue: 1,
          weight: 0.3,
        },
      },
    },
  ];

  var kpiStatus = [];

  // Iterate through each fellowship applicant
  for (const applicant of fellowApplicants) {
    console.log(`Processing applicant: ${applicant.githubHandle}`);

    let totalMeasuredCommits = 0;
    let totalMeasuredPoapEvents = 0;
    // Get commits
    try {
      const commits = await github.getCommitsHandler(
        "fellowfund",
        applicant.githubHandle,
        `${applicant.fellowshipStartDate}T00:00:00Z`,
        `${applicant.fellowshipEndDate}T00:00:00Z`
      );
      totalMeasuredCommits = commits?.totalCommits ?? 0;
      console.log(
        `Total commits for ${applicant.githubHandle}: ${totalMeasuredCommits}`
      );
    } catch (error) {
      console.error(
        `Error fetching commits for ${applicant.githubHandle}:`,
        error
      );
      // Keep totalCommits as 0 on error
    }

    // Get POAP events if fellow address exists
    if (applicant.fellowAddress) {
      try {
        const poapResponse = await fetch(
          `https://api.poap.tech/actions/scan/${applicant.fellowAddress}`,
          {
            headers: {
              accept: "application/json",
              "x-api-key": process.env.POAP_API_KEY || "",
            },
          }
        );

        if (poapResponse.ok) {
          const poapEvents = await poapResponse.json();
          totalMeasuredPoapEvents = Array.isArray(poapEvents)
            ? poapEvents.length
            : 0;
        }
        console.log(
          `Total POAP events for ${applicant.githubHandle} / ${applicant.fellowAddress}: ${totalMeasuredPoapEvents}`
        );
      } catch (error) {
        console.error(
          `Error fetching POAP data for ${applicant.githubHandle}:`,
          error
        );
        // Keep totalPoapEvents as 0 on error
      }
    }

    const commitWeight = applicant.kpiTargets.totalCommits.weight ?? 0.0;
    const poapWeight = applicant.kpiTargets.poapEvents.weight ?? 0.0;
    const commitTarget = applicant.kpiTargets.totalCommits.targetValue;
    const poapTarget = applicant.kpiTargets.poapEvents.targetValue;
    const weightedScoreTarget =
      commitTarget * commitWeight + poapTarget * poapWeight;
    const weightedScoreAchieved =
      totalMeasuredCommits * commitWeight +
      totalMeasuredPoapEvents * poapWeight;

    // KPI is achieved if weightedScoreTarget <= weightedScoreAchieved
    const kpiAchieved: boolean = weightedScoreTarget <= weightedScoreAchieved;

    console.log(`
      Weighted KPI calculation for ${applicant.githubHandle} / ${applicant.fellowAddress}:
      Achieved Commits: ${totalMeasuredCommits}
      Achieved POAPs: ${totalMeasuredPoapEvents}
      Weighted Score Target: ${weightedScoreTarget}
      Weighted Score Achieved: ${weightedScoreAchieved}
      KPI Achieved: ${kpiAchieved}
    `);

    kpiStatus.push({
      fellowshipId: applicant.fellowshipId,
      applicantId: applicant.applicantId,
      kpiAchieved: kpiAchieved,
    });
  }

  // call the smart contract to update the fellowship kpis/metrics (if they were met or not)

  let result = {
    derivedPublicKey: account.address,
    contractAddress: config.contract as `0x${string}`,
    gweiAmount,
    hash: "",
    receipt: {},
  };
  try {
    const hash = await walletClient.writeContract({
      account,
      address: config.contract as `0x${string}`,
      abi: config.abi,
      functionName: "setApplicantImpact",
      args: [
        kpiStatus.map((status) => ({
          fellowshipId: BigInt(status.fellowshipId || 0),
          applicantId: BigInt(status.applicantId || 0),
          kpiAchieved: Boolean(status.kpiAchieved),
        })),
      ],
    });

    console.log(`Transaction Hash: ${hash}`);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(`Transaction Status: ${receipt.status}`);

    const blockNumber = receipt.blockNumber;
    const block = await publicClient.getBlock({ blockNumber });
  } catch (e) {
    console.error("Error updating KPIs:", e);
    return Response.json({ error: e });
  }

  const { json: jsonResult, meta } = superjson.serialize(result);
  console.log(`transaction: ${Response.json({ jsonResult })}`);

  return Response.json({ jsonResult });
}
