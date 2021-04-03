export const fetchMocks = {
  // deno-lint-ignore require-await
  success: async function (
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
      status: 200,
      statusText: 'OK',
    });
  },
  // deno-lint-ignore require-await
  notFound: async function (
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
      status: 404,
      statusText: 'Not Found',
    });
  },
  // deno-lint-ignore require-await
  throws: async function (
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

    throw new Error('This is example error!');
  },
};
