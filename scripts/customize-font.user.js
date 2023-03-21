// ==UserScript==
// @name         Customize Font on Mozilla Firefox
// @namespace    BTGS:Font
// @version      0.1
// @description  Customizes website font to OpenSans as the default san-serif font and SauceCodePro Nerd Font as the monospace font.
// @author       bhanutejags
// @match        https://*/*
// @exclude      *.google.com/*
// @exclude      *.youtube.com/*
// @exclude      *.gov/*
// @exclude      *.*.gov/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_addStyle
// @downloadUrl  https://raw.githubusercontent.com/bhanutejags/tapermonkey-scripts/main/scripts/customize-font.user.js
// @updateUrl    https://raw.githubusercontent.com/bhanutejags/tapermonkey-scripts/main/scripts/customize-font.user.js
// ==/UserScript==
GM_addStyle ( `
    body {
        font-family: 'Open Sans', sans-serif !important;
    }

    pre, code, .highlight, .highlighttable, [class$="code-nav-container"] {
      font-family: 'SauceCodePro Nerd Font', monospace !important;
    }
` );
