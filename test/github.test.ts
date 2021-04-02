import { assertEquals, assertThrowsAsync } from 'asserts';
import { createRepoUrl, getRepoTags } from '../util/github.ts';

let responseStatus = {
  code: 200,
  text: 'OK',
};

// deno-lint-ignore require-await
const fetchMock = async function (
  _input: string | Request | URL,
  _init?: RequestInit | undefined,
): Promise<Response> {
  const content = JSON.stringify([
    {
      name: 'v1.0.0',
      commit: {
        sha: 'thisIsMock',
        url: 'thisIsMock',
      },
      zipball_url: 'thisIsMock',
      tarball_url: 'thisIsMock',
      node_id: 'thisIsMock',
    },
    {
      name: 'v1.1.0',
      commit: {
        sha: 'thisIsMock',
        url: 'thisIsMock',
      },
      zipball_url: 'thisIsMock',
      tarball_url: 'thisIsMock',
      node_id: 'thisIsMock',
    },
    {
      name: 'v1.1.2',
      commit: {
        sha: 'thisIsMock',
        url: 'thisIsMock',
      },
      zipball_url: 'thisIsMock',
      tarball_url: 'thisIsMock',
      node_id: 'thisIsMock',
    },
  ]);

  return new Response(content, {
    status: responseStatus.code,
    statusText: responseStatus.text,
  });
};

Deno.test('GitHub API: Check created URL correctly', () => {
  const result = createRepoUrl(
    'denoland',
    'deno',
    'tags',
  );

  assertEquals('https://api.github.com/repos/denoland/deno/tags', result);
});

Deno.test('GitHub API: Check created URL correctly #2', () => {
  const result = createRepoUrl(
    'denolib',
    'awesome-deno',
    'releases',
  );

  assertEquals(
    'https://api.github.com/repos/denolib/awesome-deno/releases',
    result,
  );
});

Deno.test('GitHub API: Check got repository tags correctly', async () => {
  responseStatus = {
    code: 200,
    text: 'OK',
  };

  window.fetch = fetchMock;

  const tags = await getRepoTags(
    'denoland',
    'deno',
  );

  assertEquals([
    {
      name: 'v1.0.0',
      commit: { sha: 'thisIsMock', url: 'thisIsMock' },
      zipball_url: 'thisIsMock',
      tarball_url: 'thisIsMock',
      node_id: 'thisIsMock',
    },
    {
      name: 'v1.1.0',
      commit: { sha: 'thisIsMock', url: 'thisIsMock' },
      zipball_url: 'thisIsMock',
      tarball_url: 'thisIsMock',
      node_id: 'thisIsMock',
    },
    {
      name: 'v1.1.2',
      commit: { sha: 'thisIsMock', url: 'thisIsMock' },
      zipball_url: 'thisIsMock',
      tarball_url: 'thisIsMock',
      node_id: 'thisIsMock',
    },
  ], tags);
});

Deno.test('GitHub API: Check throwed error when error code is invalid', () => {
  responseStatus = {
    code: 404,
    text: 'Not Found',
  };

  window.fetch = fetchMock;

  assertThrowsAsync(
    async () => {
      await getRepoTags(
        'denoland',
        'deno',
      );
    },
    undefined,
    'Failed to fetch repository tags: 404 Not Found',
  );
});
