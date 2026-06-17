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
// @grant        none
// ==/UserScript==

location.hostname = "old.reddit.com";
