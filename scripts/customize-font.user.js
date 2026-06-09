// ==UserScript==
// @name         Customize Website Fonts
// @namespace    BTGS:Font
// @version      1.4
// @description  Customizes website fonts to Ubuntu Nerd Font as the default sans-serif font and UbuntuMono Nerd Font as the monospace font.
// @author       bhanutejags
// @match        https://*/*
// @exclude      *.google.com/*
// @exclude      *.google.dev/*
// @exclude      *notebooklm.google/*
// @exclude      *.youtube.com/*
// @exclude      *.gov/*
// @exclude      *.*.gov/*
// @exclude      *outlook.live.com/*
// @exclude      *outlook.office.com/*
// @exclude      *proton.me/*
// @exclude      *figma.com/*
// @exclude      *canva.com/*
// @exclude      *.bank/*
// @exclude      *.banking.*/*
// @exclude      *chase.com/*
// @exclude      *discover.com/*
// @exclude      *capitalone.com/*
// @exclude      *bilt.com/*
// @exclude      *wellsfargo.com/*
// @exclude      *americanexpress.com/*
// @exclude      *bankofamerica.com/*
// @exclude      *citi.com/*
// @exclude      *citibank.com/*
// @exclude      *usbank.com/*
// @exclude      *pnc.com/*
// @exclude      *tdbank.com/*
// @exclude      *truist.com/*
// @exclude      *fidelity.com/*
// @exclude      *schwab.com/*
// @exclude      *vanguard.com/*
// @exclude      *etrade.com/*
// @exclude      *robinhood.com/*
// @exclude      *navyfederal.org/*
// @exclude      *ally.com/*
// @exclude      *chime.com/*
// @exclude      *sofi.com/*
// @exclude      *paypal.com/*
// @exclude      *venmo.com/*
// @exclude      *zellepay.com/*
// @exclude      *stripe.com/*
// @exclude      *creditkarma.com/*
// @exclude      *experian.com/*
// @exclude      *transunion.com/*
// @exclude      *equifax.com/*
// @exclude      *ballard.amazon.com/*
// @exclude      *amazon.dev/*
// @exclude      *oncall.corp.amazon.com/*
// @exclude      *lhh.com/*
// @exclude      *kaggle.com/*
// @exclude      *quip-amazon.com/*
// @exclude      *antigravity.google/*
// @exclude      *.antigravity.google/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_addStyle
// ==/UserScript==

/*
 * CONFIGURATION
 *
 * To customize fonts, edit the --custom-sans-font and --custom-mono-font values below.
 *
 * Font Stack Format:
 * - First font: Your preferred custom font
 * - Following fonts: Fallback fonts in order of preference
 * - Last font: Generic font family (sans-serif, monospace, etc.)
 *
 * Example:
 *   --custom-sans-font: 'My Font', 'Fallback Font', sans-serif;
 */

/*
 * ICON-FONT EXCLUSION
 *
 * Icon fonts render glyphs from Private-Use codepoints or ligatures. Forcing
 * our font onto them shows garbage (and because a Nerd Font carries its own
 * glyphs in those same codepoints, the icon renders as the WRONG glyph rather
 * than blank -- easy to miss). We can't "restore" an icon font after the fact
 * (revert/inherit just fall back to our font, and an author !important rule
 * beats the icon's non-important inline style), so the only reliable fix is to
 * never override these elements in the first place.
 *
 * This chain is wrapped in :where() at every use site, so it contributes ZERO
 * specificity -- selectors keep their natural specificity and the cascade is
 * unchanged. Defined once here and reused in BOTH the universal sans rule and
 * the monospace block (icons nested inside code/editor/source containers were
 * otherwise caught by the mono block's broad descendant selectors).
 *
 * Class-less icons that set the font inline are matched by attribute, e.g.
 * Claude's design system: <span data-cds="Icon" style="font-family:
 * var(--font-anthropicons, Anthropicons-Variable)">.
 *
 * Icon-font libraries that set their font WITHOUT !important (e.g. PrimeIcons'
 * `.pi { font-family: 'primeicons' }`) lose to our universal `* !important`
 * rule, so their <i class="pi pi-copy"> ::before glyphs render as tofu. Match
 * the library's base class (`.pi`) -- every PrimeIcon carries it, so :not(.pi)
 * excludes them all with no false positives.
 */
const ICON_EXCLUDE =
  ':not([class*="icon" i])' +
  ':not([class*="material-symbols"])' +
  ":not([data-icon])" +
  ':not([data-cds="Icon"])' +
  ':not([style*="Anthropicons" i])' +
  ':not([style*="font-anthropicons" i])' +
  ":not(.fa):not(.fas):not(.far):not(.fal):not(.fad):not(.fab)" +
  ":not(.fa-solid):not(.fa-regular):not(.fa-light):not(.fa-thin):not(.fa-brands):not(.fa-duotone)" +
  ':not([class*="fa-"])' +
  ':not(.bi):not([class^="bi-"]):not([class*=" bi-"])' +
  ":not(.pi)" +
  ':not(.lucide):not([class*="lucide"])' +
  ':not(.feather):not([class*="feather"])' +
  ":not(.glyphicon):not(.anticon):not(.ionicon)";

const ICON_GUARD = `:where(${ICON_EXCLUDE})`;

/* Monospace targets. Each becomes "<sel>, <sel> *" so code containers and the
 * tokens nested inside them get the mono font -- with the icon guard appended
 * so icon glyphs inside those containers are left alone. */
const MONO_BASE = [
  "pre",
  "code",
  "kbd",
  "samp",
  "tt",
  "var",
  ".highlight",
  ".code",
  ".Code",
  ".CODE",
  '[class*="code"]',
  '[class*="Code"]',
  '[class*="CODE"]',
  '[class*="mono"]',
  '[class*="Mono"]',
  '[class*="MONO"]',
  '[class*="highlight"]',
  '[class*="Highlight"]',
  '[class*="source"]',
  '[class*="Source"]',
  // GitHub-specific
  ".blob-code",
  ".blob-code-content",
  ".blob-code-marker",
  ".blob-code-inner",
  ".react-blob-print-hide",
  ".react-code-text",
  ".react-code-line-contents",
  ".react-code-line-contents-no-virtualization",
  ".react-file-line",
  // Editors
  ".cm-editor",
  ".CodeMirror",
  '[class*="editor"]',
  // Terminals
  '[class*="terminal"]',
  '[class*="console"]',
];
const MONO_SELECTOR = MONO_BASE.map(
  (s) => `${s}${ICON_GUARD}, ${s} *${ICON_GUARD}`,
).join(",\n    ");

GM_addStyle(`
    /* CSS Custom Properties for easy configuration */
    :root {
        --custom-sans-font: 'Ubuntu Nerd Font', 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        --custom-mono-font: 'UbuntuMono Nerd Font', 'Ubuntu Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 'Droid Sans Mono', 'Source Code Pro', monospace;
    }

    /* Apply custom sans-serif font globally */
    html, body {
        font-family: var(--custom-sans-font) !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    /* Universal selector for maximum coverage (icons excluded, see ICON_EXCLUDE). */
    *${ICON_GUARD} {
        font-family: var(--custom-sans-font) !important;
    }

    /* Apply monospace font to code and technical elements.
     * IMPORTANT: This must come AFTER the universal selector to override it. */
    ${MONO_SELECTOR} {
        font-family: var(--custom-mono-font) !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Keep textareas and inputs as sans-serif for better UX */
    textarea, input[type="text"], input[type="search"], input[type="email"],
    [contenteditable="true"] {
        font-family: var(--custom-sans-font) !important;
    }

    /* Override for read-only/code display text areas */
    textarea[readonly], textarea.code, textarea[class*="code"],
    textarea[class*="Code"], textarea[class*="mono"] {
        font-family: var(--custom-mono-font) !important;
    }
`);
