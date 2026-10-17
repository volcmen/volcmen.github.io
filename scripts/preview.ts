import { resolve } from 'node:path';
import { parseArgs } from 'node:util';

export async function createPreviewHandler(directory: string) {
  if (!(await Bun.file(resolve(directory, 'index.html')).exists())) {
    throw new Error('Static export is missing. Run bun run build before bun run start.');
  }

  // Requests can only select files discovered inside the export, never arbitrary paths.
  const files = new Map<string, Bun.BunFile>();
  for await (const file of new Bun.Glob('**/*').scan({
    cwd: directory,
    onlyFiles: true,
    followSymlinks: false,
  })) {
    files.set(`/${file}`, Bun.file(resolve(directory, file)));
  }

  return (request: Request) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }

    const url = new URL(request.url);
    let pathname: string;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return new Response('Bad Request', { status: 400 });
    }

    let file = files.get(pathname);
    if (!file) {
      const directoryPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
      file = files.get(`${directoryPath}index.html`);
      if (file && !pathname.endsWith('/')) {
        url.pathname += '/';
        return Response.redirect(url, 308);
      }
    }

    const body = file ?? files.get('/404.html');
    return new Response(request.method === 'HEAD' ? null : (body ?? 'Not Found'), {
      status: file ? 200 : 404,
      headers: { 'Content-Type': body?.type ?? 'text/plain; charset=utf-8' },
    });
  };
}

if (import.meta.main) {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      hostname: { type: 'string', short: 'H', default: '127.0.0.1' },
      port: { type: 'string', short: 'p', default: process.env.PORT ?? '3000' },
    },
  });
  const port = Number(values.port);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error('Port must be an integer between 0 and 65535.');
  }
  const server = Bun.serve({
    hostname: values.hostname,
    port,
    fetch: await createPreviewHandler(resolve(import.meta.dir, '../out')),
  });
  console.log(`Static preview running at ${server.url}`);
}
