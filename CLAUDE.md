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

## API Reference

- Violentmonkey API: https://violentmonkey.github.io/api/gm/
