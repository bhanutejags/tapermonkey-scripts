// ==UserScript==
// @name         Redirect arXiv to alphaXiv
// @namespace    https://github.com/user/tapermonkey-scripts
// @version      1.0
// @description  Auto-redirect arxiv.org to alphaxiv.org for interactive paper summaries
// @author       User
// @match        *://arxiv.org/*
// @match        *://www.arxiv.org/*
// @grant        none
// ==/UserScript==

location.hostname = "www.alphaxiv.org";
