# Installation

## Requirements

- Python 3.9+
- [uv](https://docs.astral.sh/uv/) (recommended) or pip

## Install from PyPI

```bash
# Using uv (recommended)
uv add jbcom.github.io

# Using pip
pip install jbcom.github.io
```

## Install from Source

```bash
git clone https://github.com/jbcom/jbcom.github.io.git
cd jbcom.github.io
uv sync
```

## Development Installation

```bash
# Clone and install with dev dependencies
git clone https://github.com/jbcom/jbcom.github.io.git
cd jbcom.github.io
uv sync --extra dev --extra docs
```
