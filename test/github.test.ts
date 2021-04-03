import { assertEquals, assertThrowsAsync } from 'asserts';
import { createRepoUrl, getRepoTags } from '../util/github.ts';
import { fetchMocks } from './fetchMocks.ts';

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
  window.fetch = fetchMocks.successTags;

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
  window.fetch = fetchMocks.notFound;

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

Deno.test('GitHub API: Check throwed error when failed to fetch(Not Status Error)', () => {
  window.fetch = fetchMocks.throws;

  assertThrowsAsync(
    async () => {
      await getRepoTags(
        'denoland',
        'deno',
      );
    },
    undefined,
    'Failed to fetch repository tags: Error: This is example error!',
  );
});

Deno.test('GitHub API: Check throwed error when response body JSON incorrect', () => {
  window.fetch = fetchMocks.incorrectJSON;

  assertThrowsAsync(
    async () => {
      await getRepoTags(
        'denoland',
        'deno',
      );
    },
    undefined,
    'Failed to parse repository tags:',
  );
});
