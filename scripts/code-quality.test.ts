import { expect, test } from 'bun:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const launcher = join(import.meta.dir, 'code-quality.ts');

test.each(['lint', 'fmt'])(
  '%s uses the locked native tool without recursive script dispatch',
  async tool => {
    const root = mkdtempSync(join(tmpdir(), 'portfolio-tooling-'));
    try {
      // These scripts must never run: the launcher must select the native command.
      await Bun.write(
        join(root, 'package.json'),
        JSON.stringify({
          scripts: { lint: 'exit 97', fmt: 'exit 98' },
        }),
      );
      await Bun.write(
        join(root, 'bunfig.toml'),
        '[lint]\nmaxWarnings = 0\n[lint.rules]\n"prefer-const" = "error"\n[fmt]\nsingleQuote = true\n',
      );
      const file = join(root, 'example.js');
      const original = tool === 'lint' ? 'export let value = 1;\n' : 'export const value={a:1};';
      await Bun.write(file, original);

      const run = (...flags: string[]) =>
        Bun.spawnSync([process.execPath, launcher, tool, ...flags, 'example.js'], {
          cwd: root,
          env: { ...process.env, npm_lifecycle_event: `${tool}:fix` },
          stdout: 'pipe',
          stderr: 'pipe',
          timeout: 10_000,
        });

      const checkFlags = tool === 'fmt' ? ['--check'] : [];
      const dirty = run(...checkFlags);
      expect(dirty.exitCode).toBe(1);
      expect(dirty.stdout.toString() + dirty.stderr.toString()).toContain('example.js');
      expect(await Bun.file(file).text()).toBe(original);

      const fixed = run(...(tool === 'lint' ? ['--fix'] : []));
      expect(fixed.exitCode).toBe(0);
      expect(await Bun.file(file).text()).toBe(
        tool === 'lint' ? 'export const value = 1;\n' : 'export const value = { a: 1 };\n',
      );
      expect(run(...checkFlags).exitCode).toBe(0);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  },
);
