// ==UserScript==
// @name         Redirect Medium to FreeMedium
// @namespace    https://github.com/user/tapermonkey-scripts
// @version      1.0
// @description  Auto-redirect medium.com to freemedium.cfd (with fallback mirror)
// @author       User
// @match        *://medium.com/*
// @match        *://www.medium.com/*
// @match        *://*.medium.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      freemedium.cfd
// @connect      freemedium-mirror.cfd
// ==/UserScript==

(function () {
  "use strict";

  const url = new URL(window.location.href);
  const primaryMirror = "freemedium.cfd";
  const fallbackMirror = "freemedium-mirror.cfd";

  function redirectTo(mirror) {
    const newUrl = `https://${mirror}${url.pathname}${url.search}`;
    window.location.replace(newUrl);
  }

  // Try primary first, fallback if it fails
  GM_xmlhttpRequest({
    method: "HEAD",
    url: `https://${primaryMirror}`,
    timeout: 3000,
    onload: function () {
      redirectTo(primaryMirror);
    },
    onerror: function () {
      redirectTo(fallbackMirror);
    },
    ontimeout: function () {
      redirectTo(fallbackMirror);
    },
  });
})();
