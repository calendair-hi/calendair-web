// Invite landing: read ?code= and #from=, show the matching store badge(s).
// The display name lives only in the fragment, so it never reaches the host.
(function () {
  var PLAY =
    "https://play.google.com/store/apps/details?id=com.calendair.calendair_app";
  var APP_STORE = "https://apps.apple.com/app/id6755298945";

  var queryParams = new URLSearchParams(window.location.search);
  var fragmentParams = new URLSearchParams(
    (window.location.hash || "").replace(/^#/, "")
  );

  var code = (queryParams.get("code") || "").trim().toUpperCase();
  var from = (fragmentParams.get("from") || "").trim();

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
          fromEl.getAttribute("data-from-template") ||
          "{from} wants to connect with you.";
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

  // Language switch: rebuild with ?code= only. Never write `from` into the
  // href (or any other request). Keep #from= by appending it on navigation.
  var query = code ? "?code=" + encodeURIComponent(code) : "";
  var fromHash = from ? "#from=" + encodeURIComponent(from) : "";

  document.querySelectorAll("[data-invite-path]").forEach(function (el) {
    var path = el.getAttribute("data-invite-path");
    el.setAttribute("href", path + query);
    if (!fromHash) return;
    el.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      window.location.assign(path + query + fromHash);
    });
  });
})();
