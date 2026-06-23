# Best Practices for AI Coding Tools

This guide covers cross-cutting best practices that apply to all AI coding tools, followed by tool-specific guidance for each tool this project supports.

---

## Cross-Cutting Principles

These principles apply regardless of which AI coding tool you use.

### 1. Write a Lean Instruction File

Every AI coding tool supports a project-level instruction file (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or `.github/copilot-instructions.md`). This is the single most impactful thing you can do. Keep it short — only include things the tool cannot infer from reading your code.

**Include:**
- Build/test/lint commands the tool can't guess
- Code style rules that differ from language defaults
- Testing preferences (framework, colocation, mocking policy)
- Security rules (no hardcoded secrets)
- Repository conventions (branch naming, PR workflow)

**Exclude:**
- Standard language conventions the tool already knows
- Detailed API documentation (link to it instead)
- File-by-file descriptions of the codebase
- Information that changes frequently
- Self-evident practices ("write clean code")

> If you've corrected the AI more than twice on the same issue, add a rule. If the AI ignores a rule, the file is probably too long and the rule is getting lost.

### 2. Use Rules for File-Scoped Conventions

Most tools support **rules** — files that activate only when the AI is working in specific directories or file types. Use these to keep your main instruction file lean:

- `src/components/**/*.tsx` → component conventions
- `*.test.ts` → testing conventions
- `src/api/**` → API design patterns

Rules are scoped and only load when needed, preserving valuable context window space.

For Claude Code (`.claude/rules/*.md`), use YAML frontmatter with a `paths` field to scope a rule. Rules without `paths` load unconditionally at launch:

```
---
paths:
  - "src/api/**/*.ts"
---

# API Rules
- All endpoints must include input validation
- Use the standard error response format
```

### 3. Use Skills for Reusable Workflows

Skills (`SKILL.md` files) package domain knowledge or repeatable workflows that the AI loads on demand. Unlike rules, they don't bloat every conversation — they're invoked only when relevant.

Good candidates for skills:
- Commit message workflows
- Code review checklists
- Deployment procedures
- Domain-specific terminology and patterns

### 4. Use Agents for Delegation

Sub-agents run in their own context window with their own tool permissions. Use them for tasks that:
- Read many files (codebase exploration)
- Need a fresh perspective (code review)
- Require specialized focus (security audit, performance analysis)

This keeps your main conversation context clean and prevents exploration from consuming the window needed for implementation.

### 5. Provide Verification Criteria

AI tools stop when the work "looks done." Give them a check that produces a pass/fail signal: a test suite, a build command, a linter. This closes the loop so the tool iterates until the check passes, rather than waiting for you to spot mistakes.

### 6. Separate Planning from Implementation

Before asking an AI to write code, ask it to explore and plan first (most tools have a **plan mode** or equivalent). Review the plan, then switch to implementation. This prevents solving the wrong problem and saves time on corrections.

For simple tasks (fixing a typo, renaming a variable), skip planning and go directly to implementation.

### 7. Manage Context Aggressively

The AI's context window is your most constrained resource. Every file read, command output, and conversation turn consumes it.

- Use `/clear` between unrelated tasks
- Delegate exploration to sub-agents so file reads don't consume your main context
- Use tab-scoped rules instead of always-on rules where possible
- Prune your instruction file regularly

### 8. Use Hooks for Deterministic Guardrails

Hooks run scripts automatically at specific points (before/after tool execution, file edits, etc.). Unlike instruction file rules which are advisory, hooks are deterministic. Use them for:

- Preventing edits to sensitive files (`.env`, `package-lock.json`)
- Running formatters after every file edit
- Auditing tool calls for compliance
- Enforcing that tests pass before the session ends

### 9. Connect External Tools via MCP

Model Context Protocol (MCP) servers let AI tools interact with external services: databases, issue trackers, APIs, design tools. Configure project-scoped MCP servers to give the AI context it can't get from your code alone.

---

## Tool-Specific Best Practices

### Claude Code

**Instruction file:** `CLAUDE.md`

Claude Code is an agentic coding environment that can read files, run commands, and make changes autonomously.

| Feature | Location | Purpose |
|---------|----------|---------|
| Instructions | `CLAUDE.md` | Project context, loaded every session |
| Rules | `.claude/rules/*.md` | File-scoped conventions |
| Hooks | `.claude/hooks/*.sh` + `.claude/settings.json` | Deterministic pre/post tool scripts |
| Sub-agents | `.claude/agents/*.md` | Delegated tasks in separate context |
| Skills | `.claude/skills/*/SKILL.md` | Reusable workflows and domain knowledge |
| Commands | `.claude/commands/*.md` | Custom slash commands |
| MCP | `.mcp.json` | External tool connections |
| Ignore | `.claudeignore` | Files excluded from context |
| Persistent | `.claude/settings.local.json` | Personal overrides (gitignored) |

**Key practices:**

- Run `/init` to generate a starter `CLAUDE.md` from your project structure, then refine
- Use **plan mode** (`/plan`) to scope work before implementation
- Give Claude a verification check (test suite, build, screenshot comparison) to close the feedback loop
- Use **sub-agents** for codebase investigation so file reads don't fill the main context
- Use **hooks** for actions that must happen every time (e.g., running eslint after edits)
- Run `/clear` between unrelated tasks to reset context
- Use `claude -p "prompt"` in CI pipelines for non-interactive automation
- Name sessions with `/rename` and resume with `claude --continue`
- Use `/rewind` (double-tap Esc) to checkpoint and revert changes

**CLAUD.md file:**

Run `/init` to generate a starter. Keep it under ~50 lines. For each line ask: "Would removing this cause Claude to make mistakes?" If not, cut it.

```
# CLI Commands
- Build: npm run build
- Test: npm test -- --run
- Lint: npm run lint
```

### Codex CLI

**Instruction file:** `AGENTS.md`

Codex CLI (by OpenAI) is a lightweight, local coding agent that runs in your terminal.

| Feature | Location | Purpose |
|---------|----------|---------|
| Instructions | `AGENTS.md` | Project context |
| Rules | `.codex/rules/*.toml` | File-scoped conventions |
| Hooks | `.codex/hooks.json` + `.codex/hooks/*.sh` | Pre/post tool scripts |
| Sub-agents | `.codex/agents/*.toml` | Delegated tasks in separate context |
| Skills | `.codex/skills/*/SKILL.md` | Reusable workflows |
| Commands | `.codex/commands/*.toml` | Custom slash commands |
| Config | `.codex/config.toml` | Model, sandbox mode, approval policy |
| Ignore | `.codexignore` | Files excluded from context |

**Key practices:**

- Codex CLI subagents use `developer_instructions` fields (TOML) rather than preloaded skills — inline the logic directly
- Use `.codex/config.toml` to configure sandbox mode and approval policies for safe autonomous execution
- Skills are the primary extension mechanism — make them focused and composable
- Reference best practice repos like [shanraisshan/codex-cli-best-practice](https://github.com/shanraisshan/codex-cli-best-practice) for the Agent → Skill orchestration pattern

### Cursor

**Instruction file:** `AGENTS.md`

Cursor is an AI-powered code editor with agent capabilities.

| Feature | Location | Purpose |
|---------|----------|---------|
| Instructions | `AGENTS.md` | Project context |
| Rules | `.cursor/rules/*.mdc` | File-scoped conventions with frontmatter |
| Hooks | `.cursor/hooks.json` + `.cursor/hooks/*.sh` | Pre/post tool scripts |
| Sub-agents | `.cursor/agents/*.md` | Delegated tasks |
| Skills | `.cursor/skills/*/SKILL.md` | Reusable workflows |
| Prompts | `.cursor/prompts/*.md` | Reusable prompt templates |
| MCP | `.cursor/mcp.json` | External tool connections |
| Ignore | `.cursorignore` | Files excluded from context |

**Key practices:**

- Rules use frontmatter (`---`) with `description` and `alwaysApply` fields. Set `alwaysApply: false` for scoped rules, `true` for cross-cutting conventions
- Use `.cursor/rules/general.mdc` with `alwaysApply: true` for conventions that span the whole project
- Use file-scoped rules for domain-specific patterns (e.g., `components.mdc` scoped to `src/components/**/*.tsx`)
- Cursor supports **Team Rules** from the dashboard on Team/Enterprise plans
- Hooks are configured in `.cursor/hooks.json` and support events from session start/end through file edits
- `AGENTS.md` is a simpler alternative to `.cursor/rules/` — use it for project-level instructions, rules for file-level conventions

### Gemini CLI

**Instruction file:** `GEMINI.md`

Gemini CLI (by Google) is a command-line AI workflow tool with tool integration.

| Feature | Location | Purpose |
|---------|----------|---------|
| Instructions | `GEMINI.md` | Project-wide rules loaded into every session |
| Config | `.gemini/settings.json` | Model, context, theme, MCP servers |
| Hooks | `.gemini/hooks/*.sh` | Pre/post tool scripts |
| Commands | `.gemini/commands/*.toml` | Custom slash commands |
| Skills | `.gemini/skills/*/SKILL.md` | Reusable workflows |
| Ignore | `.geminiignore` | Files excluded from context |

**Key practices:**

- `GEMINI.md` is loaded as context every session — keep it focused on rules the tool can't infer
- Configure additional context files via `settings.json` > `context.fileName` — can use `AGENTS.md`, `CONTEXT.md`, or custom filenames
- Use `.gemini/settings.json` for tool filtering, sandbox (Docker), MCP servers, and telemetry
- Gemini CLI supports **BeforeToolSelection hooks** to filter available tools based on intent
- Configuration layers: defaults → system → user → project → environment → CLI args (each overrides the previous)
- Use the `tools.exclude` setting to block dangerous tools from being available
- Since Gemini CLI doesn't support file-based sub-agents, document inline agent personas in `AGENT.md` or split instructions across multiple context files

### GitHub Copilot

**Instruction file:** `AGENTS.md` + `.github/copilot-instructions.md`

GitHub Copilot provides AI-powered code suggestions and agent-based assistance.

| Feature | Location | Purpose |
|---------|----------|---------|
| Instructions | `.github/copilot-instructions.md` | Repository-wide instructions |
| Sub-instructions | `.github/instructions/*.instructions.md` | Domain-specific conventions |
| Ignore | `.githubignore` | Files excluded from context |

**Key practices:**

- `.github/copilot-instructions.md` is the primary instruction file — Copilot reads it for every interaction
- Split instructions into domain-specific files under `.github/instructions/` (e.g., `typescript.instructions.md`, `testing.instructions.md`, `security.instructions.md`)
- Include sections for: Project Overview, Tech Stack, Conventions (naming, structure, error handling), and Workflow (PR conventions, branch naming, commit style)
- Instructions are most effective when they include specific, actionable rules with examples
- Copilot respects **version compatibility** — always specify language/framework/library versions
- Copilot scans the codebase for established patterns when instructions don't provide specific guidance — ensure your existing code is well-structured so Copilot follows good patterns by example

### OpenCode

**Instruction file:** `AGENTS.md` + `opencode.json`

OpenCode is an open-source AI coding agent available as a terminal, desktop, or IDE tool.

| Feature | Location | Purpose |
|---------|----------|---------|
| Instructions | `AGENTS.md` | Project context and agent permissions |
| Agent config | `opencode.json` | Agent definitions, models, permissions |
| Agent prompts | `prompts/*.txt` | System prompts per agent |
| Skills | `.opencode/skills/*/SKILL.md` | Reusable workflows |
| Config | `.opencode/config.json` | Custom rules, keybinds, formatters |

**Key practices:**

- Run `/init` to auto-generate `AGENTS.md` from your project structure
- Define multiple agents in `opencode.json` for role-based access (e.g., `build`, `plan`, `code-reviewer`)
- Use **Plan mode** (Tab key) to scope work before allowing edits
- Use `/undo` and `/redo` to revert/restore changes without manual git operations
- Run `/connect` to configure a provider, or use OpenCode Zen for tested model bundles
- Use `/share` to share conversations with your team
- Use `.opencode/config.json` for custom rules, themes, keybinds, and formatters
- Customize per-agent prompts in `prompts/*.txt` files for precise behavior control
- OpenCode supports **MCP servers**, **LSP servers**, **custom tools**, and **agent skills** — use these to extend its capabilities

### Devin

**Instruction file:** `AGENTS.md`

Devin (formerly Windsurf, by Codeium) is an AI IDE with agentic flows and context-aware features.

| Feature | Location | Purpose |
|---------|----------|---------|
| Instructions | `AGENTS.md` | Project-level instructions |
| Rules | `.devin/rules/*.md` | File-scoped conventions |
| Hooks | `.windsurf/hooks.json` + `.windsurf/scripts/*.sh` | Pre/post tool scripts |
| Agents | `.windsurf/agents/*.md` | Delegated tasks |
| Workflows | `.windsurf/workflows/*.md` | Step-by-step workflows |
| Skills | `.windsurf/skills/*/SKILL.md` | Reusable workflows |
| Ignore | `.codeiumignore` | Files excluded from context |

**Key practices:**

- AGENTS.md at the repo root is an **always-on rule**. Files in subdirectories are scoped to that directory automatically
- Use `.devin/rules/` for file-scoped rules — they support glob patterns and manual/auto activation
- Rules are limited to 12,000 characters each; split long rules into multiple files
- Devin discovers rules automatically from workspace directories and sub-directories
- Use **Workflows** in `.windsurf/workflows/` for multi-step procedures (commit, review, deploy)
- Unlike AGENTS.md (always-on), Rules in `.devin/rules/` support manual activation and glob patterns for precise scoping
- The `.codeiumignore` file controls which files Devin excludes from its context

---

## Quick Reference: Capabilities by Tool

| Capability | Claude Code | Codex CLI | Cursor | Gemini CLI | GitHub Copilot | OpenCode | Devin |
|-----------|-------------|-----------|--------|------------|----------------|----------|-------|
| Instruction file | `CLAUDE.md` | `AGENTS.md` | `AGENTS.md` | `GEMINI.md` | `copilot-instructions.md` | `AGENTS.md` | `AGENTS.md` |
| File-scoped rules | `.claude/rules/` | `.codex/rules/` | `.cursor/rules/` | via context config | `.github/instructions/` | via config | `.devin/rules/` |
| Sub-agents | `.claude/agents/` | `.codex/agents/` | `.cursor/agents/` | Inline in context | `.github/agents/` | `opencode.json` | `.windsurf/agents/` |
| Skills | `.claude/skills/` | `.codex/skills/` | `.cursor/skills/` | `.gemini/skills/` | `.github/skills/` | `.opencode/skills/` | `.windsurf/skills/` |
| Hooks | Yes | Yes | Yes | Yes | No | No | Yes |
| MCP support | Yes | No | Yes | Yes | No | Yes | No |
| Custom commands | `.claude/commands/` | `.codex/commands/` | No | `.gemini/commands/` | `.github/prompts/` | Custom | `.windsurf/workflows/` |
| Ignore file | `.claudeignore` | `.codexignore` | `.cursorignore` | `.geminiignore` | `.githubignore` | Via config | `.codeiumignore` |

---

## Evolving Your Configuration

Treat your AI tool configuration like code:

1. **Start with `/init`** — most tools can generate a starter file from your project structure
2. **Observe and add rules** — when you correct the AI on something, consider adding a rule so it doesn't repeat the mistake
3. **Prune regularly** — if the AI ignores your instructions, the file is too long. Remove rules the AI follows without being told
4. **Review with the team** — check your instruction file into git so everyone benefits. Use `.local` files for personal overrides
5. **Test changes** — after updating instructions, run a task you've done before and see if behavior improves

The best configuration is the one you actually maintain. A short, well-maintained file beats a long, neglected one every time.