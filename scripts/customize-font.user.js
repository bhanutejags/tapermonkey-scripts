// ==UserScript==
// @name         Customize Font on Mozilla Firefox
// @namespace    BTGS:Font
// @version      0.3
// @description  Customizes website font to Ubuntu Sans as the default san-serif font and SauceCodePro Nerd Font as the monospace font.
// @author       bhanutejags
// @match        https://*/*
// @exclude      *.google.com/*
// @exclude      *.youtube.com/*
// @exclude      *.gov/*
// @exclude      *.*.gov/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle ( `
    html {
        font-family: 'Ubuntu Nerd Font', sans-serif !important;
    }

    body {
        font-family: 'Ubuntu Nerd Font', sans-serif !important;
    }

    pre, code, .highlight, .code, .blob-code, .blob-code-content, .blob-code-marker, .blob-code-inner, .react-blob-print-hide, .react-code-text, .cm-editor, textbox, textarea, [class^="Box"], read-only-cursor-text-area {
      font-family: 'UbuntuMono Nerd Font', monospace !important;
    }
` );
