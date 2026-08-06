// ==UserScript==
// @name         Redirect Medium to FreeMedium
// @namespace    https://github.com/user/tapermonkey-scripts
// @version      1.2
// @description  Auto-redirect medium.com to freedium-mirror.cfd
// @author       User
// @match        *://medium.com/*
// @match        *://www.medium.com/*
// @match        *://*.medium.com/*
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const url = new URL(window.location.href);
  window.location.replace(`https://freedium-mirror.cfd${url.pathname}${url.search}`);
})();
