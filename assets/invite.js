// Invite landing: read ?code=&from=, show the matching store badge(s).
(function () {
  var PLAY =
    "https://play.google.com/store/apps/details?id=com.calendair.calendair_app";
  var APP_STORE = "https://apps.apple.com/app/id6755298945";

  var params = new URLSearchParams(window.location.search);
  var code = (params.get("code") || "").trim().toUpperCase();
  var from = (params.get("from") || "").trim();

  var ok = document.getElementById("invite-ok");
  var missing = document.getElementById("invite-missing");
  var codeEl = document.getElementById("invite-code");
  var fromEl = document.getElementById("invite-from");

  if (code) {
    if (ok) ok.hidden = false;
    if (missing) missing.hidden = true;
    if (codeEl) codeEl.textContent = code;
    if (fromEl) {
      if (from) {
        var template =
          fromEl.getAttribute("data-from-template") || "{from} wants to connect with you.";
        fromEl.textContent = template.replace("{from}", from);
        fromEl.hidden = false;
      } else {
        fromEl.hidden = true;
      }
    }
  } else {
    if (ok) ok.hidden = true;
    if (missing) missing.hidden = false;
  }

  var ua = navigator.userAgent || "";
  var isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/.test(ua);

  document.querySelectorAll("[data-store]").forEach(function (el) {
    var store = el.getAttribute("data-store");
    if (store === "ios") {
      el.setAttribute("href", APP_STORE);
      el.hidden = isAndroid;
    } else if (store === "android") {
      el.setAttribute("href", PLAY);
      el.hidden = isIOS;
    }
  });

  var qs = window.location.search || "";
  document.querySelectorAll("[data-invite-path]").forEach(function (el) {
    el.setAttribute("href", el.getAttribute("data-invite-path") + qs);
  });
})();
