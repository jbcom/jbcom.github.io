# AGENTS.md

Comprehensive instructions for AI agents working with this repository.

## Agent Types

| Agent | Best For | Context File |
|-------|----------|--------------|
| **Claude** | Complex reasoning, architecture, cross-repo work | `CLAUDE.md` |
| **Copilot** | Issue kickoffs, targeted fixes, code generation | `.github/copilot-instructions.md` |
| **Cursor** | IDE-integrated development | `.cursor/rules/*.mdc` |

## Before Starting Any Task

### 1. Check Context
```bash
# Current focus and recent decisions
cat memory-bank/activeContext.md

# Session progress
cat memory-bank/progress.md
```

### 2. Understand the Request
- Read the issue/PR description completely
- Check for linked issues or PRs
- Look for acceptance criteria

### 3. Check Existing Patterns
```bash
# Recent commits show coding patterns
git log --oneline -10

# Similar files show conventions
find . -name "*.py" | head -5 | xargs head -50
```

## Development Commands

<!-- These will be overridden by language-specific instructions -->

### Testing
```bash
# Run tests (check package.json or pyproject.toml for exact command)
npm test        # Node.js
uv run pytest   # Python
go test ./...   # Go
```

### Linting
```bash
npm run lint    # Node.js
uvx ruff check  # Python
golangci-lint run  # Go
```

### Building
```bash
npm run build   # Node.js
uv build        # Python
go build        # Go
```

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature (minor version bump)
- `fix`: Bug fix (patch version bump)
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code restructure, no behavior change
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(auth): add OAuth2 support
fix(api): handle null response correctly
docs: update installation instructions
test(utils): add edge case coverage
chore(deps): update dependencies
```

## Error Recovery

### Tests Failing
1. Read the error message carefully
2. Check if it's a flaky test (run again)
3. Check recent commits that might have caused it
4. Fix the root cause, not just the symptom

### Lint Errors
1. Run auto-fix first (`--fix` flag)
2. Manually fix remaining issues
3. Don't disable rules without justification

### Build Errors
1. Check for type errors first
2. Ensure dependencies are installed
3. Check for missing files or imports

## Memory Bank Protocol

### Reading Context
```bash
# Always check before starting
cat memory-bank/activeContext.md
```

### Updating Context
```bash
# After completing significant work
cat >> memory-bank/activeContext.md << 'EOF'

## Session: $(date +%Y-%m-%d)

### Completed
- [x] Description of completed work

### For Next Agent
- [ ] Remaining tasks
EOF
```

## What NOT To Do

- ❌ Don't make unrelated changes
- ❌ Don't skip tests
- ❌ Don't ignore linting errors
- ❌ Don't commit without meaningful message
- ❌ Don't push directly to main (use PRs)
- ❌ Don't add dependencies without justification

## Repository-Specific Instructions

<!-- Add repository-specific agent instructions below -->

