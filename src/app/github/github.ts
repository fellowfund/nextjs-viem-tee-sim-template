import axios from "axios";

export async function getTotalCommitsForOrg(
  org: string,
  username: string,
  from: string,
  to: string
) {
  let totalCommits = 0;

  try {
    const reposResponse = await axios.get(
      `https://api.github.com/orgs/${org}/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const repositories = reposResponse.data;

    for (const repo of repositories) {
      const repoName = repo.name;
      console.log(`repoName: ${repoName}`)

      const commitsResponse = await axios.get(
        `https://api.github.com/repos/${org}/${repoName}/commits`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
          params: {
            author: username,
            since: from,
            until: to,
          },
        }
      );

      //console.log(`commitsResponse: ${JSON.stringify(commitsResponse.data, null, 2)}`)

      const repoCommits = commitsResponse.data.length;
      totalCommits += repoCommits;
      console.log(`Commits by ${username} in ${repoName}:`, repoCommits);
    }

    console.log(
      `Total commits by ${username} in organization ${org} from ${from} to ${to}:`,
      totalCommits
    );
    return totalCommits;
  } catch (error: any) {
    console.error("Request failed:", error.response?.data || error.message);
    throw error;
  }
}

export const getCommitsHandler = async (
    org: string,
    username: string,
    from: string,
    to: string
  ) => {
    try {
      const totalCommits = await getTotalCommitsForOrg(org, username, from, to);
      return { status: true, totalCommits };
    } catch (error: any) {
      console.error("Error in getCommitsHandler:", error);
      return { status: false, message: error.message };
    }
  };

