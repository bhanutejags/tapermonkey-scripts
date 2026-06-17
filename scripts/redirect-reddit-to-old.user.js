// ==UserScript==
// @name         Redirect Reddit to Old Reddit
// @namespace    https://github.com/user/tapermonkey-scripts
// @version      1.0
// @description  Auto-redirect reddit.com to old.reddit.com
// @author       User
// @match        *://reddit.com/*
// @match        *://www.reddit.com/*
// @match        *://new.reddit.com/*
// @match        *://sh.reddit.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// Don't redirect media links — they break on old.reddit.com
if (!/^\/media\b/.test(location.pathname)) {
  location.hostname = "old.reddit.com";
}
