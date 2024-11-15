import { http, createPublicClient, stringify } from 'viem'
import { mantleSepoliaTestnet } from 'viem/chains'
import * as github from '../../github/github'
import superjson from 'superjson'

const client = createPublicClient({
  chain: mantleSepoliaTestnet,
  transport: http(),
})

export const dynamic = 'force-dynamic'

export async function GET() {

  // The following code is just an example
  const [blockNumber, block] = await Promise.all([
    client.getBlockNumber(),
    client.getBlock()
  ]);

  // get all fellowship applicants (including Ids, github handle, and metric targets)
  // [ 
  //  { 
  //    fellowshipId: 1,
  //    githubHandle: 'thedanielmark',
  //    githubOrg: 'fellowfund',
  //    fellowshipStartDate: '2024-01-01',  
  //    fellowshipEndDate: '2024-11-16',
  //    kpiTargets: {
  //     totalCommits: 100,
  //     poapEvents: 10
  //    }
  //  }
  // ]

  // for each applicant, get total commits and poap events for the fellowship period
  const commits = await github.getCommitsHandler('fellowfund', 'thedanielmark', '2024-01-01T00:00:00Z', '2024-11-16T00:00:00Z')
  console.log(`commits: ${JSON.stringify(commits, null, 2)}`)
  console.log(`total commits: ${commits.totalCommits}`)

  // evaluate if the applicant met the kpi targets or not

  // call the smart contract to update the fellowship kpis/metrics (if they were met or not)


  // the following code is just an example...
  console.log(`Block Number: ${superjson.serialize(blockNumber).json}`);
  return Response.json({blockNumber: superjson.serialize(blockNumber).json, block: superjson.serialize(block).json});
}