// ==UserScript==
// @name         Redirect X/Twitter to xcancel
// @namespace    https://github.com/user/tapermonkey-scripts
// @version      1.1
// @description  Auto-redirect x.com and twitter.com to xcancel.com
// @author       User
// @match        *://x.com/*
// @match        *://www.x.com/*
// @match        *://twitter.com/*
// @match        *://www.twitter.com/*
// @grant        none
// ==/UserScript==

location.hostname = "xcancel.com";
