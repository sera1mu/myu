/**
 * Create GitHub API's repository URL
 * @param { string } origin API origin
 * @param { string } owner Repository owner name
 * @param { string } repo Repository name
 * @param { string } params URL params (After /repos/{owner}/{repo}/)
 * @returns { string } URL
 */
export const createRepoUrl = function createGitHubAPIRepositoryUrl(
  origin: string,
  owner: string,
  repo: string,
  params: string,
): string {
  const url = `${origin}/repos/${owner}/${repo}/${params}`;
  return url;
};

/**
 * GitHub API Response of repository tags
 */
export interface RepositoryTag {
  /**
   * Tag name
   */
  name: string;

  /**
   * Tag commit
   */
  commit: {
    /**
     * Commit hash
     */
    sha: string;
    /**
     * Commit URL for GitHub API
     */
    url: string;
  };

  /**
   * Tag zipball url
   */
  // deno-lint-ignore camelcase
  zipball_url: string;

  /**
   * Tag tarball url
   */
  // deno-lint-ignore camelcase
  tarball_url: string;

  /**
   * Node ID
   */
  // deno-lint-ignore camelcase
  node_id: string;
}

/**
 * Get repository tags from GitHub API
 * @param { string } owner Repository owner name
 * @param { string } repo Repository name
 * @param { ((input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>) | undefined } fetcher Using fetcher(For the test)
 * @returns { Promise<RepositoryTag[] } Repository tags
 */
export const getRepoTags = async function getRepositoryTagsFromGitHubAPI(
  origin: string,
  owner: string,
  repo: string,
  fetcher?: (
    input: string | Request | URL,
    init?: RequestInit | undefined,
  ) => Promise<Response>,
): Promise<
  RepositoryTag[]
> {
  let response!: Response;

  try {
    const url = createRepoUrl(origin, owner, repo, 'tags');
    if (fetcher == undefined) {
      response = await fetch(url);
    } else {
      response = await fetcher(url);
    }
  } catch (err) {
    throw new Error(`Failed to fetch repository tags: ${err}`);
  }

  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch repository tags: ${response.status} ${response.statusText}`,
    );
  }

  let tags!: RepositoryTag[];

  try {
    tags = await response.json();
  } catch (err) {
    throw new Error(`Failed to parse repository tags: ${err}`);
  }

  return tags;
};
