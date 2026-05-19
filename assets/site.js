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

document.addEventListener("DOMContentLoaded", () => {
  applyAppView();
  setCurrentYear();
  setGoogleCalendarDate();
  openFaqFromLocation();
  enhanceFaqLinks();
});


