import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { createPreviewHandler } from './preview';

describe('Bun static preview', () => {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-preview-'));
  let server: ReturnType<typeof Bun.serve>;

  beforeAll(async () => {
    await Bun.write(join(root, 'index.html'), '<h1>Home</h1>');
    await Bun.write(join(root, 'projects/example/index.html'), '<h1>Project</h1>');
    await Bun.write(join(root, '_next/static/style.css'), 'body { color: red; }');
    await Bun.write(join(root, '404.html'), '<h1>Page missing</h1>');
    server = Bun.serve({
      hostname: '127.0.0.1',
      port: 0,
      fetch: await createPreviewHandler(root),
    });
  });

  afterAll(async () => {
    await server?.stop(true);
    rmSync(root, { recursive: true, force: true });
  });

  test.each([
    ['/', '<h1>Home</h1>', 'text/html'],
    ['/projects/example/', '<h1>Project</h1>', 'text/html'],
    ['/_next/static/style.css', 'body { color: red; }', 'text/css'],
  ])('serves %s with the correct content and MIME type', async (path, body, type) => {
    const response = await fetch(new URL(path, server.url));
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain(type);
    expect(await response.text()).toBe(body);
  });

  test('redirects directory pages to trailing slashes and preserves the query', async () => {
    const response = await fetch(new URL('/projects/example?from=home', server.url), {
      redirect: 'manual',
    });
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(
      new URL('/projects/example/?from=home', server.url).href,
    );
  });

  test('HEAD returns headers without the file body', async () => {
    const response = await fetch(server.url, { method: 'HEAD' });
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/html');
    expect(await response.text()).toBe('');
  });

  test('returns the exported 404 page for missing files and encoded traversal', async () => {
    for (const path of ['/missing', '/..%2Fpackage.json', '/%2e%2e%2fpackage.json']) {
      const response = await fetch(new URL(path, server.url));
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('<h1>Page missing</h1>');
    }
  });

  test('rejects unsupported methods and malformed URL encoding', async () => {
    const post = await fetch(server.url, { method: 'POST' });
    expect(post.status).toBe(405);
    expect(post.headers.get('allow')).toBe('GET, HEAD');
    const malformed = await fetch(new URL('/%ZZ', server.url));
    expect(malformed.status).toBe(400);
  });

  test('fails clearly before starting if the site has not been built', async () => {
    await expect(createPreviewHandler(join(root, 'missing-output'))).rejects.toThrow(
      'Run bun run build',
    );
  });
});
