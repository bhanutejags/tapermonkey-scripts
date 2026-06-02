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

1. **Extract the injected CSS.** If the script passes a plain template literal to
   `GM_addStyle()`, grab it directly. If it builds the CSS with JS (variables/interpolation,
   e.g. an `ICON_EXCLUDE`/`MONO_SELECTOR` reused across rules), don't regex the literal — run
   the script's JS with a stub to capture the real output:
   `node -e 'const fs=require("fs"); global.GM_addStyle=c=>fs.writeFileSync("/tmp/font.css",c); eval(fs.readFileSync("scripts/<name>.user.js","utf8"))'`
   (the `// ==UserScript==` metadata is just comments, so `eval` ignores it).
2. **Build a static HTML fixture** that reproduces the relevant markup. Crucially, include a
   `<style>` block that mimics how real sites declare their own rules (e.g. icon fonts on
   `.octicon` / `.material-icons` / `.fa`, some with `!important`), loaded _before_ the
   injected style so cascade/specificity behaves like production. Replicate the **exact**
   shape that breaks — e.g. a class-less `<span data-cds="Icon" style="font-family: ...">`
   nested inside a container whose class contains a mono keyword (`editor`/`source`/etc.),
   which is how a real icon got clobbered by the mono block's `<sel> *` descendant selectors.
3. **Run Playwright via `uv`** — `uv run --with playwright python <script>.py` (first run also
   needs the browser binary: `uv run --with playwright python -m playwright install chromium`).
   The script injects the CSS into a `<style id="injected">` element, then asserts on
   `getComputedStyle(el).fontFamily` for representative elements.
4. **Assert both directions**: the targeted elements get the new behavior _and_ elements that
   must be left alone (icon fonts, code/mono blocks) keep their original values. Specificity
   regressions are easy to miss otherwise — e.g. a `:not()` chain inflating specificity and
   clobbering a later rule, fixed by wrapping exclusions in `:where()` (zero specificity). When
   excluding icons, exclude them from **every** rule with `!important` (both the universal sans
   rule and the mono block) — an author `!important` rule beats an icon's non-important inline
   `font-family`, so missing one rule still breaks the icon.
5. **Clean up** the temp fixture/script when done.

Always bump `@version` and re-run the harness after edits.

### Cross-browser caveat (verify in Firefox too)

Playwright Chromium is a fast first pass, but it can't catch everything: sites serve different
markup per engine. Claude.ai, for instance, renders icons as inline `<svg>` in Chrome (immune
to `font-family`) but as an **icon font** (`Anthropicons-Variable` on `<span data-cds="Icon">`)
in Firefox — so a font-clobbering bug was invisible in Chromium yet broke every icon in
Firefox. When a font/CSS change could interact with icons or engine-specific rendering, also
sanity-check the real site in Firefox. A no-DOM-access way to triage from the page's own
console: select candidate elements, toggle the injected `<style>` (or `adoptedStyleSheets`)
off, and compare `getComputedStyle(el).fontFamily` before/after to see what the site _intended_
vs. what we forced. Note Violentmonkey/Tampermonkey may inject `GM_addStyle` via constructable
`document.adoptedStyleSheets` rather than a `<style>` element, so scan both.

## Modern JavaScript Syntax (Optional Build Toolchain)

The current scripts are single-file `GM_addStyle()` CSS injectors with no JS logic, so they
ship as-is with **no build step**. If a script ever grows real DOM/JS logic and needs modern
syntax (TypeScript, ES modules, JSX/components, CSS Modules), Violentmonkey supports a build
toolchain instead of hand-writing a single `.user.js`:

- Scaffold with their Yeoman generator:
  `npx -p github:violentmonkey/generator-userscript -p yo yo @violentmonkey/userscript`
- It sets up Babel + Rollup, with optional TypeScript, CSS Modules, UnoCSS, and SolidJS
  (remove the plugins you don't want — they're all optional).
- Source lives in `src/` (`meta.js` for the metadata block, `index.ts` entry point); `npm run
dev` watches and `npm run build` compiles to a single `dist/index.user.js` for install.
- Version/author auto-sync from `package.json`.
- Guide: https://violentmonkey.github.io/guide/using-modern-syntax/

Only adopt this when a script's complexity justifies it; keep simple CSS-injection scripts
build-less.

## API Reference

- Violentmonkey API: https://violentmonkey.github.io/api/gm/
