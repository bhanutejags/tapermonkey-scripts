# AGENTS.md

Standalone Tampermonkey/Violentmonkey userscripts live in `scripts/*.user.js`.
No build step is required; install or update them in the userscript manager.

## Repository rules

- Bump `@version` for every `.user.js` change, including CSS and metadata.
- Keep scripts standalone. Do not add a build toolchain without a concrete need.
- Preserve unrelated working-copy changes when committing.

## Validation

For live-site bugs, inspect the affected browser first and use its actual markup
to shape any fixture:

- **`firefox-tabs` (`fftabs`)**: inspect computed styles and markup in the user's
  live Firefox tab.
- **`chrome-browser`**: inspect an isolated Chrome/Chromium page; attach to live
  tabs only when explicitly requested.
- **Playwright**: run reproducible cross-browser regression checks.

### Checks

- Run `node --check scripts/<name>.user.js` after edits.
- Metadata-only changes: check the intended URL matches/exclusions; browser installs
  and CSS fixtures are unnecessary.
- Font/CSS changes: reproduce the relevant markup in a scratch fixture and verify
  computed styles in **Chromium and Firefox** with Playwright. Check both the
  intended change and unaffected prose, code, inputs, and icons.
- Run Python through `uv`, not bare Python or global pip installs:
  `uv run --with playwright python <check.py>`.
- If test browser binaries are missing, install the required engines with
  `uv run --with playwright python -m playwright install chromium firefox`.
- Keep ad-hoc fixtures outside the repo. Add persistent tests only for behavior
  worth maintaining; do not introduce a test framework for metadata changes.

## Font selector constraints

- Target semantic code elements and explicit code/editor classes. Avoid arbitrary
  substring matches: `[class*="code"]` also matches the page-wide WordPress theme
  class `wp-child-theme-code-fb-com`, turning all descendant prose monospace.
- Exclude icon-font elements from **every** font override, including descendants
  of code/editor containers. Author `!important` rules override non-important
  inline icon fonts.
- Keep icon exclusions inside `:where()` so they do not inflate specificity.
- Extract generated CSS by executing the userscript with a stubbed `GM_addStyle`;
  do not regex a template literal containing JavaScript interpolation.
- Browsers may serialize font-family names with different quotes. Normalize
  quoting before comparing computed font names.
- Userscript CSS may appear in `document.styleSheets` or
  `document.adoptedStyleSheets`; inspect both when diagnosing overrides.

## Reference

- Violentmonkey API: https://violentmonkey.github.io/api/gm/
