import { resolve } from 'node:path';

import { optionalDependencies } from '../package.json';

// Keep the application runtime stable; only lint and format use this locked Bun build.
const [tool, ...flags] = process.argv.slice(2);

try {
  if (tool !== 'lint' && tool !== 'fmt') {
    throw new Error('Usage: bun scripts/code-quality.ts <lint|fmt> [flags and paths]');
  }

  const arch = process.arch === 'arm64' ? 'aarch64' : process.arch;
  const name = `@oven/bun-${process.platform}-${arch}`;
  if (!Object.hasOwn(optionalDependencies, name)) {
    throw new Error(`Native code tooling supports macOS and glibc Linux on arm64/x64; got ${name}`);
  }

  const binary = resolve(import.meta.dir, '../node_modules', name, 'bin/bun');
  if (!(await Bun.file(binary).exists())) {
    throw new Error('Native code tooling is missing. Run bun install --frozen-lockfile.');
  }

  const result = Bun.spawnSync([binary, tool, ...flags], {
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
    timeout: 120_000,
    env: {
      ...process.env,
      // Select the native command instead of dispatching this package script again.
      npm_lifecycle_event: tool,
      npm_package_json: resolve('package.json'),
    },
  });
  process.exitCode = result.signalCode ? 1 : result.exitCode;
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
