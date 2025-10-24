// ==UserScript==
// @name         Customize Website Fonts
// @namespace    BTGS:Font
// @version      0.4
// @description  Customizes website fonts to Ubuntu Nerd Font as the default sans-serif font and UbuntuMono Nerd Font as the monospace font.
// @author       bhanutejags
// @match        https://*/*
// @exclude      *.google.com/*
// @exclude      *.youtube.com/*
// @exclude      *.gov/*
// @exclude      *.*.gov/*
// @exclude      *mail.google.com/*
// @exclude      *outlook.live.com/*
// @exclude      *outlook.office.com/*
// @exclude      *proton.me/*
// @exclude      *figma.com/*
// @exclude      *canva.com/*
// @exclude      *.bank/*
// @exclude      *.banking.*/*
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
    pre, code, kbd, samp, tt, var,
    .highlight, .code, .Code, .CODE,
    [class*="code"], [class*="Code"], [class*="CODE"],
    [class*="mono"], [class*="Mono"], [class*="MONO"],
    [class*="highlight"], [class*="Highlight"],
    [class*="source"], [class*="Source"],
    /* GitHub-specific selectors */
    .blob-code, .blob-code-content, .blob-code-marker, .blob-code-inner,
    .react-blob-print-hide, .react-code-text,
    /* Editor-specific selectors */
    .cm-editor, .CodeMirror, [class*="editor"],
    /* Terminal-like elements */
    [class*="terminal"], [class*="console"] {
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
