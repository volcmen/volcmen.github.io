# VOLCMEN // DIGITAL ARCHIVE

> "Logic is just a frequency I broadcast."

**STATUS:** `ONLINE`  
**LOCATION:** `EARTH // CYBERSPACE`

---

## // 00_IDENTIFICATION

This isn't just a portfolio. It's a compiled executable of my journey.

[ACCESS_PORTFOLIO_UPLINK](https://volcmen.github.io/)

---

## // 01_BOOT_SEQUENCE

To initialize the development environment locally:

This project uses **stable Bun 1.4.3** (`.bun-version`). Install it using
[Bun's installation guide](https://bun.sh/docs/installation).
`bun install` also installs a locked, project-local Bun prerelease for native
linting and formatting. No global canary installation or PATH change is needed.

```bash
# INSTALL_DEPENDENCIES
bun install --frozen-lockfile

# IGNITE_SERVER
bun dev
# Uplink established at http://localhost:3000
```

### Protocol Commands

| Command             | Purpose                                                     |
| ------------------- | ----------------------------------------------------------- |
| `bun dev`           | Start the local Next.js server                              |
| `bun lint`          | Run Bun's native linter; warnings fail the check            |
| `bun lint --fix`    | Apply safe lint fixes                                       |
| `bun fmt`           | Format source, content, configuration, and docs             |
| `bun fmt --check`   | Check formatting without writing                            |
| `bun run typecheck` | Generate Next.js route types, then run `bun check`          |
| `bun test`          | Test content, animation seeds, tooling, and static preview  |
| `bun run validate`  | Run lint, format checks, type checks, and tests in parallel |
| `bun run build`     | Build the static site into `out/`                           |
| `bun run start`     | Preview the built `out/` site at http://127.0.0.1:3000      |

All scripts use Bun's runtime and shell via `bunfig.toml`. Use `bun run build`
for the Next.js build; `bun build` invokes Bun's general-purpose bundler.
Next.js 16.4 uses the TypeScript 7 CLI for its own build checks; the standalone
`typecheck` script continues to use stable Bun's native checker.
This site uses static export, so `start` serves the export using `Bun.serve`.
Run the build first; use `bun run start --port 3001` to choose another port.
Cache Components/PPR is incompatible with this static export and stays disabled.

The `lint`, `fmt`, and `format` package scripts call `scripts/code-quality.ts`,
which selects the official `@oven/bun-*` binary pinned to
`1.4.3-canary.20261016.1` in the manifest and lockfile. Only linting and
formatting use this prerelease; development, builds, tests, and type checking
use stable Bun. The launcher supports macOS and glibc Linux on arm64/x64 and
fails clearly if its binary is missing. `bun run tooling:doctor` reports native
rule and formatter coverage. Once stable Bun includes these commands, verify
it before removing the launcher and tooling dependencies.

Lint and format configuration lives in `bunfig.toml`. The native linter retains
the previous core, TypeScript, import, and Next.js rules. React checks use Bun's
built-in React and Hooks rules; the old React X naming, leak-detection, and
API-preference rules without native equivalents are no longer included.
Formatting uses single quotes, semicolons, sorted imports, and Tailwind class
sorting. Vendored Doom files, generated UI components, and build outputs are
excluded. Existing `eslint-disable` comments remain supported by Bun's linter.

GitHub Actions uses stable Bun 1.4.3 and the same locked tooling packages. It
runs validation and a production build on pull requests and pushes to `main`.
Only pushes to `main` and manual runs on `main` deploy to Pages. Deployment
permissions are limited to the deploy job; superseded pull request checks are
canceled while production deployments finish.

Dependabot checks Bun dependencies and GitHub Actions weekly, grouping updates
into one pull request per ecosystem. The four `@oven/bun-*` tooling packages
are excluded: update their pinned canary versions together and run
`bun run tooling:doctor`, `bun run validate`, and `bun run build` before accepting
them. Keep `.bun-version` and `packageManager` in sync when updating stable Bun.

For a manual refresh, `bun update --latest --no-optional --exact` updates the
application and development packages, including compatible transitive updates,
while preserving the native tooling pins. Follow it with `bun run validate`,
`bun run build`, and `bun audit`.

VS Code's **Run Task** menu provides Bun validate, format, and lint-fix tasks.
The workspace does not set `typescript.tsdk`: TypeScript 7 no longer ships the
JavaScript language server used by that setting.
