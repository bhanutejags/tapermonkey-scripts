# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a collection of userscripts for browser extensions like Tampermonkey and Violentmonkey.

## Repository Structure

- `scripts/` - Contains `.user.js` userscript files
- Each script is standalone with a metadata header block

## UserScript Metadata Format

Each `.user.js` file begins with a metadata block:

```javascript
// ==UserScript==
// @name         Script Name
// @namespace    Namespace
// @version      X.Y
// @description  Description
// @author       Author
// @match        https://*/*
// @exclude      *.example.com/*
// @grant        GM_addStyle
// ==/UserScript==
```

Key metadata fields:

- `@match` - URL patterns where the script runs
- `@exclude` - URL patterns to exclude
- `@grant` - GM API permissions (e.g., GM_addStyle for CSS injection)
- `@version` - Script version number

## Development Workflow

1. **Testing**: Install scripts directly in Tampermonkey or Violentmonkey browser extension
2. **No build step**: Scripts run directly without compilation
3. **Version management**: Update `@version` in the metadata header when making changes

## Script Implementation Pattern

Scripts use `GM_addStyle()` to inject CSS styles into matched web pages for customization.

## Verifying Changes

Since these scripts run against live third-party sites, verify CSS/behavior changes with a
local Playwright harness instead of relying only on manual browser installs. Always run Python
through `uv` — never `pip install` or bare `python`/`python3`. `uv run --with <pkg>` provisions
dependencies in an ephemeral environment, so nothing is installed globally. Pattern used for
the font script:

1. **Extract the injected CSS** from the script's `GM_addStyle()` template literal.
2. **Build a static HTML fixture** that reproduces the relevant markup. Crucially, include a
   `<style>` block that mimics how real sites declare their own rules (e.g. icon fonts on
   `.octicon` / `.material-icons` / `.fa`, some with `!important`), loaded _before_ the
   injected style so cascade/specificity behaves like production.
3. **Run Playwright via `uv`** — `uv run --with playwright python <script>.py` (first run also
   needs the browser binary: `uv run --with playwright python -m playwright install chromium`).
   The script injects the CSS into a `<style id="injected">` element, then asserts on
   `getComputedStyle(el).fontFamily` for representative elements.
4. **Assert both directions**: the targeted elements get the new behavior _and_ elements that
   must be left alone (icon fonts, code/mono blocks) keep their original values. Specificity
   regressions are easy to miss otherwise — e.g. a `:not()` chain inflating specificity and
   clobbering a later rule, fixed by wrapping exclusions in `:where()` (zero specificity).
5. **Clean up** the temp fixture/script when done.

Always bump `@version` and re-run the harness after edits.

## API Reference

- Violentmonkey API: https://violentmonkey.github.io/api/gm/
