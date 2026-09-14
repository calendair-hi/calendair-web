// Invite landing: read the invite code, show the matching store badge(s).
// The inviter's name is deliberately not read or displayed: it would travel in
// the URL and end up in the host's access logs. See the privacy policy, B0.
(function () {
  var PLAY =
    "https://play.google.com/store/apps/details?id=com.calendair.calendair_app";
  var APP_STORE = "https://apps.apple.com/app/id6755298945";

  // Read from the URL fragment first, falling back to the query string.
  // A fragment is never sent to the server, so it keeps the inviter's first
  // name out of the host's access logs. The app still builds query links
  // today; this accepts both so the app can switch without a site change.
  var hash = (window.location.hash || "").replace(/^#/, "");
  var fragmentParams = new URLSearchParams(hash);
  var queryParams = new URLSearchParams(window.location.search);

  function param(name) {
    return (fragmentParams.get(name) || queryParams.get(name) || "").trim();
  }

  var code = param("code").toUpperCase();

  var ok = document.getElementById("invite-ok");
  var missing = document.getElementById("invite-missing");
  var codeEl = document.getElementById("invite-code");

  if (code) {
    if (ok) ok.hidden = false;
    if (missing) missing.hidden = true;
    if (codeEl) codeEl.textContent = code;
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

  // Carry only the code on to the language-switch links - rebuilt, not passed
  // through, so any extra parameters (such as an inviter name from an older
  // link) are dropped rather than travelling on.
  var carry = code ? "#code=" + encodeURIComponent(code) : "";
  document.querySelectorAll("[data-invite-path]").forEach(function (el) {
    el.setAttribute("href", el.getAttribute("data-invite-path") + carry);
  });
})();
