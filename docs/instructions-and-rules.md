# Instructions & Rules

How each AI coding tool handles **instruction files** (project-level context) and **rules** (file-scoped conventions).

---

## 1. Claude Code

**Instruction file:** `AGENTS.md`  
**Rule files:** `.claude/rules/*.md`

`AGENTS.md` is loaded at the start of every conversation. Keep it under ~50 lines and include only what Claude can't infer from your code. Run `/init` to generate a starter.

```
# Project

## Commands
- Build: `npm run build`
- Test: `npm test -- --run`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`

## Code Style
- ES modules, not CommonJS
- Named exports only, no defaults
- Prefer `const` over `let`
- Destructure imports: `import { foo } from 'bar'`

## Workflow
- Typecheck after every series of changes
- Run a single test, not the full suite
- Never commit directly to `main`

## Banned Patterns
- No `console.log` in production — use a logger
- No `any` in TypeScript without a comment
- No hardcoded secrets — use environment variables
```

Rules in `.claude/rules/*.md` come in two forms:

- **Unconditional** (no `paths` frontmatter) — loaded at launch alongside the instruction file, applies to all files
- **Path-scoped** (with `paths` frontmatter) — loaded only when Claude works with files matching the specified glob patterns

The root `AGENTS.md` is always loaded; instruction files in subdirectories load when Claude reads files there. User-level instructions apply across all projects.

Example path-scoped rule (`.claude/rules/api.md`):

```
---
paths:
  - "src/api/**/*.ts"
---

# API Rules

- All endpoints must include input validation
- Use the standard error response format
- Include OpenAPI documentation comments
```

You can specify multiple patterns and use brace expansion:

```
---
paths:
  - "src/**/*.{ts,tsx}"
  - "tests/**/*.test.ts"
---
```

Hooks (`.claude/settings.json`) are deterministic scripts that run at specific lifecycle events — unlike instruction files (advisory), hooks **always execute**.

```json
{
  "hooks": {
    "postToolUse": [{ "command": "./hooks/audit-tool.sh" }],
    "afterFileEdit": [{ "command": "./format.sh" }]
  }
}
```

Sub-agents (`.claude/agents/*.md`) run in their own context with their own tool set.

## 2. Codex CLI

**Instruction file:** `AGENTS.md`  
**Rule files:** `.codex/rules/*.toml`

`AGENTS.md` is loaded as `user_instructions`. Its scope is the entire directory tree rooted at the folder containing the file. More-deeply-nested files take precedence over parents. The contents of the root `AGENTS.md` plus any from CWD upward are included in the developer message — no need to re-read.

```
# Project

## Architecture
- Express API → PostgreSQL via Prisma
- React frontend in /web

## Commands
- Build: `npm run build`
- Test: `npm test`

## Coding conventions
- ES modules, named exports
- TypeScript strict mode
- Tests colocated: `foo.ts` → `foo.test.ts`

## Agent permissions
- Read all files freely
- Edit source files in `src/`
- Do not modify `package-lock.json`, `.env`, or CI config
```

Rules in `.codex/rules/*.toml` — TOML format, not markdown. Codex has three instruction layers: `user_instructions` (from `AGENTS.md`), `base_instructions` (override), and `developer_instructions` (separate message). Sub-agents use `developer_instructions` fields in TOML rather than preloaded skills.

```toml
# .codex/rules/testing.toml
description = "Test conventions"
scope = "*.test.ts"

[rules]
- "Use vitest, not jest"
- "Name tests: foo.test.ts for foo.ts"
- "Mock external APIs, not internal modules"
```

Config: `.codex/config.toml` (`approval_policy`, `sandbox_mode`, `network_access`).

## 3. Cursor

**Instruction file:** `AGENTS.md`  
**Rule files:** `.cursor/rules/*.mdc`

`AGENTS.md` at the project root is the always-on context — plain markdown. Analysed by `/init`.

```
# Project Instructions

## Code Style
- TypeScript for all new files
- Prefer functional components in React
- Snake_case for database columns

## Architecture
- Follow the repository pattern
- Keep business logic in service layers
```

Rules are `.cursor/rules/*.mdc` — markdown with `---` frontmatter. The `alwaysApply` and `description` fields control behaviour:

```markdown
---
description: "React component conventions for the project"
alwaysApply: false
---

# Components

- Use named exports, not defaults
- Props interface should be at the top
- Use React.FC for component type
```

| File | `alwaysApply` | Scoped to |
|------|--------------|-----------|
| `general.mdc` | `true` | Whole project |
| `components.mdc` | `false` | `src/components/**/*.tsx` |
| `testing.mdc` | `false` | `*.test.ts` |

When `alwaysApply: false`, the rule only activates when Cursor works on files matching the rule's path. When `true`, it's always loaded.

Hooks (`.cursor/hooks.json`) — deterministic scripts at lifecycle events (`sessionStart`, `preToolUse`, `postToolUse`).

```json
{
  "version": 1,
  "hooks": {
    "sessionStart": [{ "command": "./session-init.sh" }],
    "postToolUse": [{ "command": "./hooks/audit-tool.sh" }]
  }
}
```

Plugins (`.cursor-plugin/` directory) bundle rules, skills, agents, hooks, and MCP in a single package.

## 4. Gemini CLI

**Instruction file:** `GEMINI.md`  
**No rule files** — all context is per-session

`GEMINI.md` is the only context file. Loaded into every session. Configured via `.gemini/settings.json` > `context.fileName`. You can include `AGENTS.md`, `CONTEXT.md`, or any custom filenames. Files in subdirectories project their paths as context automatically.

```
# Project Instructions

## Tech stack
- React with Vite
- Tailwind CSS for all styling
- Vitest for unit tests

## Commands
- Build: `npm run build`
- Test: `npm test`

## Code conventions
- ES modules, named exports
- No default exports
- Prefer `const` over `let`

## Tone
- Be concise
- Don't explain basic React concepts
```

Hooks in `.gemini/settings.json`:

| Event | When |
|------|------|
| `SessionStart` | Gemini CLI starts |
| `BeforeToolSelection` | Before Gemini picks a tool |
| `BeforeTool` | Before a specific tool runs |
| `AfterModel` | After model responds |
| `AfterAgent` | After agent output |
| `SessionEnd` | Session ends |

```json
{
  "hooks": {
    "BeforeToolSelection": [
      { "matcher": "*", "hooks": [{ "name": "filter", "type": "command", "command": "node .gemini/hooks/filter.js" }] }
    ]
  }
}
```

---

## 5. GitHub Copilot

**Instruction file:** `.github/copilot-instructions.md` + `AGENTS.md`  
**Rule files:** `.github/instructions/*.instructions.md`

`.github/copilot-instructions.md` is the primary instruction file — Copilot reads it for every interaction within the repository. It should include Project Overview, Tech Stack, Conventions (naming, structure, error handling), and Workflow.

```
.github/
├── copilot-instructions.md         ← Always loaded, repo-wide
├── instructions/
│   ├── typescript.instructions.md  ← Language-specific
│   ├── testing.instructions.md     ← Domain-specific
│   ├── security.instructions.md
│   ├── documentation.instructions.md
│   └── code-review.instructions.md
├── agents/
│   └── code-reviewer.agent.md
└── skills/
    └── write-commit/
        └── SKILL.md
```

```
# Project — Copilot Instructions

## Priority Guidelines
1. **Version Compatibility**: Detect and respect exact versions
2. **Context Files**: Prioritize `.github/copilot` files
3. **Codebase Patterns**: Scan for established patterns
4. **Architectural Consistency**

## Technology Version Detection
- Check package.json, .csproj, pom.xml, requirements.txt
- Respect version constraints
- Never use features beyond detected versions

## Codebase Scanning
- Identify similar files; follow consistent patterns
- When conflicts exist, prefer newer files or higher coverage
- Never introduce patterns not found in the codebase
```

Instruction files (`.github/instructions/*.instructions.md`) split by domain — each focuses on one area: language conventions, testing, security, documentation, code review. Copilot also scans the codebase for established patterns when instructions don't provide specific guidance. `AGENTS.md` defines project-level instructions for Copilot agent mode, scoped to the directory tree rooted at that file.

---

## 6. OpenCode

**Instruction file:** `AGENTS.md`  
**Rule loading:** `opencode.json` `instructions` field

`AGENTS.md` is always-on context. OpenCode does **not** have directory-scoped rule files — instead, `opencode.json` specifies which instruction files to load via the `instructions` array. The `@path/` syntax in `AGENTS.md` tells OpenCode to read those files lazily when relevant.

```
# Project

## Architecture
- Express API → PostgreSQL via Prisma
- React frontend in /web

## Commands
- Build: `npm run build`
- Test: `npm test`

## Coding conventions
- ES modules, named exports
- TypeScript strict mode — no `any` without comment
- Tests colocated: `foo.ts` → `foo.test.ts`

## Agent permissions
- Read all files freely
- Edit source files in `src/`
- Do not modify `package-lock.json`, `.env`, or CI config
- Do not run destructive shell commands without asking
```

Rules loaded via `opencode.json`:

```json
{
  "instructions": [
    "AGENTS.md",
    "docs/development-standards.md",
    "test/testing-guidelines.md",
    "packages/*/AGENTS.md"
  ]
}
```

From within `AGENTS.md`, you can reference files lazily:

```
## Development Guidelines
- TypeScript style: @docs/typescript-guidelines.md
- React patterns: @docs/react-patterns.md
- API design: @docs/api-standards.md
```

Multiple agents in `opencode.json` with declared permissions:

```json
{
  "agent": {
    "build": {
      "model": "anthropic/claude-sonnet-4-6",
      "mode": "subagent",
      "description": "Primary build agent",
      "permission": { "edit": "allow" }
    },
    "plan": {
      "model": "anthropic/claude-sonnet-4-6",
      "mode": "subagent",
      "description": "Planning agent, read-only",
      "permission": { "edit": "deny" }
    }
  }
}
```

Each agent can have its own system prompt in `prompts/<agent-name>.txt`.

## 7. Devin

**Instruction file:** `AGENTS.md`  
**Rule files:** `.devin/rules/*.md`

Devin (formerly Windsurf, by Cognition) uses `AGENTS.md` at the repo root as an **always-on rule**. Devin reads the same standard names other tools use — `AGENTS.md`, `AGENT.md`, `.windsurfrules` — and `AGENTS.md` in subdirectories is scoped to that directory automatically. `.devin/` is the Devin-native location and takes precedence over the legacy `.windsurf/`.

```
<!-- Devin reads AGENTS.md from the repo root as an always-on rule. -->
<!-- Files in subdirectories are scoped to that directory automatically. -->

# Project
## Architecture
... describe ...

## Commands
- Build: `npm run build`
- Test: `npm test`

## Coding conventions
- ES modules, named exports
- TypeScript strict mode
- No hardcoded secrets
```

### AGENTS.md vs. Rules

| Feature | AGENTS.md | Rules |
|---------|-----------|-------|
| Location | In project directories | `.devin/rules/` or global |
| Scoping | Automatic based on file location | Manual (glob, always-on, model decision) |
| Format | Plain markdown | Markdown with frontmatter |
| Best for | Directory-specific conventions | Cross-cutting concerns, complex activation |

Rule files (`.devin/rules/*.md`) — markdown with frontmatter:

```markdown
---
description: "React component conventions"
alwaysApply: false
---

- Use named exports, not defaults
- Props interface at top of file
- Use React.FC for components
```

Rules support four activation modes: `always` (always loaded), `glob` (matches files by glob), `model` (model decides), `manual` (user invokes).

Hooks (`.devin/hooks.v1.json`) — the file *is* the hooks object, keyed by lifecycle event:

```json
{
  "PreToolUse": [
    {
      "matcher": "^(edit|write|apply_patch)$",
      "hooks": [{ "type": "command", "command": "bash .devin/scripts/protect-files.sh" }]
    }
  ],
  "PostToolUse": [
    {
      "matcher": "",
      "hooks": [{ "type": "command", "command": "bash .devin/scripts/audit-write.sh" }]
    }
  ]
}
```

---

## When to Use What

| Need | Tool |
|-----|------|
| Always-on project conventions | `AGENTS.md` (Claude Code, Devin, Codex, Cursor, OpenCode) / `GEMINI.md` / `copilot-instructions.md` |
| File-type-specific rules | `.mdc`, `.toml`, `.md` files in tool-specific rules directories |
| Deterministic pre/post execution | Hooks |
| Reusable workflows | Skills |
| External data sources | MCP servers |