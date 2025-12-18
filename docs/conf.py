# Configuration file for the Sphinx documentation builder.
# Synced from jbcom-control-center - customize as needed

import json
import os
import sys

# Add source to path (not used for this TypeScript project, but kept for compatibility)
sys.path.insert(0, os.path.abspath("../src"))

# -- Project information -----------------------------------------------------
project = "jbcom.github.io"
copyright = "2025, Jon Bogaty"
author = "Jon Bogaty"

# Get version from package.json
try:
    with open("../package.json") as f:
        release = json.load(f).get("version", "0.0.0")
except Exception:
    release = "0.0.0"

# -- General configuration ---------------------------------------------------

extensions = [
    # Markdown support
    "myst_parser",
    # Note: Python-specific extensions (autodoc, autosummary, napoleon, etc.)
    # are not used as this is a TypeScript project
]

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# Source file suffixes
source_suffix = {
    ".rst": "restructuredtext",
    ".md": "markdown",
}

# -- Options for HTML output -------------------------------------------------

html_theme = "sphinx_rtd_theme"
html_static_path = ["_static"]
html_title = f"{project} Documentation"

html_theme_options = {
    "navigation_depth": 4,
    "collapse_navigation": False,
    "sticky_navigation": True,
    "includehidden": True,
    "titles_only": False,
}

# -- Extension configuration -------------------------------------------------

# myst_parser settings
myst_enable_extensions = [
    "colon_fence",
    "deflist",
    "fieldlist",
    "tasklist",
]
myst_heading_anchors = 3
