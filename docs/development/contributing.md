# Contributing

Thank you for your interest in contributing to jbcom.github.io!

## Development Setup

```bash
# Clone the repository
git clone https://github.com/jbcom/jbcom.github.io.git
cd jbcom.github.io

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Running Type Checks

```bash
# Run TypeScript type checking
pnpm typecheck
```

## Code Style

This project uses:
- [Biome](https://biomejs.dev/) for linting and formatting
- TypeScript with strict type checking

```bash
# Check code style
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

## Building

```bash
# Create production build
pnpm build

# Preview the build
pnpm preview
```

## Building Documentation

```bash
# Install docs dependencies (requires Python)
pip install sphinx sphinx-rtd-theme myst-parser

# Build docs
cd docs
make html
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure `pnpm typecheck` and `pnpm lint` pass
4. Submit PR - an AI agent will review and merge

## Commit Messages

Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Maintenance tasks
