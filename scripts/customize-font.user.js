// ==UserScript==
// @name         Customize Website Fonts
// @namespace    BTGS:Font
// @version      0.5
// @description  Customizes website fonts to Ubuntu Nerd Font as the default sans-serif font and UbuntuMono Nerd Font as the monospace font.
// @author       bhanutejags
// @match        https://*/*
// @exclude      *.google.com/*
// @exclude      *.google.dev/*
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

    /* Universal selector for maximum coverage */
    * {
        font-family: var(--custom-sans-font) !important;
    }

    /* Apply monospace font to code and technical elements */
    /* IMPORTANT: This must come AFTER the universal selector to override it */
    pre, pre *, code, code *, kbd, kbd *, samp, samp *, tt, tt *, var, var *,
    .highlight, .highlight *, .code, .code *, .Code, .Code *, .CODE, .CODE *,
    [class*="code"], [class*="code"] *,
    [class*="Code"], [class*="Code"] *,
    [class*="CODE"], [class*="CODE"] *,
    [class*="mono"], [class*="mono"] *,
    [class*="Mono"], [class*="Mono"] *,
    [class*="MONO"], [class*="MONO"] *,
    [class*="highlight"], [class*="highlight"] *,
    [class*="Highlight"], [class*="Highlight"] *,
    [class*="source"], [class*="source"] *,
    [class*="Source"], [class*="Source"] *,
    /* GitHub-specific selectors */
    .blob-code, .blob-code *,
    .blob-code-content, .blob-code-content *,
    .blob-code-marker, .blob-code-marker *,
    .blob-code-inner, .blob-code-inner *,
    .react-blob-print-hide, .react-blob-print-hide *,
    .react-code-text, .react-code-text *,
    .react-code-line-contents, .react-code-line-contents *,
    .react-code-line-contents-no-virtualization, .react-code-line-contents-no-virtualization *,
    .react-file-line, .react-file-line *,
    /* Editor-specific selectors */
    .cm-editor, .cm-editor *,
    .CodeMirror, .CodeMirror *,
    [class*="editor"], [class*="editor"] *,
    /* Terminal-like elements */
    [class*="terminal"], [class*="terminal"] *,
    [class*="console"], [class*="console"] * {
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
