// Shared helpers for CalendAIr static pages

function setCurrentYear() {
  const yearEl = document.querySelector("[data-current-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function openFaqFromLocation() {
  const url = new URL(window.location);
  const target = url.searchParams.get("q") || url.hash.replace("#", "");
  if (!target) return;
  const el = document.getElementById(target);
  if (!el || el.tagName.toLowerCase() !== "details") return;
  el.open = true;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function enhanceFaqLinks() {
  document.querySelectorAll(".faq details").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        history.replaceState({}, "", `#${item.id}`);
      }
    });
  });
}

function applyAppView() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("app") === "true") {
    document.documentElement.classList.add("is-app");
    document.body.classList.add("is-app");
  }
}

function setGoogleCalendarDate() {
  const today = new Date().getDate();
  document.querySelectorAll(".google-cal-date").forEach((el) => {
    el.textContent = today;
  });
}

// The navbar sits flush on the page and only lifts once you scroll,
// instead of carrying a permanent shadow.
function trackNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const update = () => navbar.classList.toggle("is-stuck", window.scrollY > 4);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  applyAppView();
  trackNavbarScroll();
  setCurrentYear();
  setGoogleCalendarDate();
  openFaqFromLocation();
  enhanceFaqLinks();
});


