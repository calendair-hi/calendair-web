# AGENTS.md - CalendAIr Web Homepage

This repository is the public face of **CalendAIr**. It is a lightweight, static website designed for speed, simplicity, and ease of maintenance.

## 🎯 Repository Mission
The primary goal of this repository is to provide:
1.  **Direct information**: Landing page, mission, and features.
2.  **Support**: FAQ and troubleshooting.
3.  **Legal/Regulatory Compliance**: Privacy Policy, Terms of Service, and Imprint.
4.  **In-App Content**: Some pages (like FAQ or Legal) are loaded directly within the mobile app.

## 🏗️ Technical Architecture
This project is built using **Vanilla Web Technologies** to remain lightweight and compatible with **GitHub Pages**.

-   **Frontend**: Plain HTML5, Vanilla CSS, and modern ES6 JavaScript.
-   **No Build Step**: Files are served exactly as they exist in the repository. Do not introduce complex build systems or bundlers (Webpack, Vite, Tailwind, etc.) unless strictly necessary and approved.
-   **Static Hosting**: Optimized for GitHub Pages.
-   **Multilingual Support**: Content is mirrored in different language directories (e.g., `/de/` for German).

## 📂 Project Structure
-   `/index.html`: The main English landing page.
-   `/faq.html`: FAQ page with deep-linking support.
-   `/de/`: Root for the German version of the site.
-   `/assets/`: Shared resources.
    -   `site.css`: Global styles (responsive, pure light mode matching the app).
    -   `site.js`: Shared logic (FAQ toggles, year updates, app view detection).
    -   Images, favicons, and manifests.
-   `CNAME`: Production domain configuration.
-   `app-ads.txt` / `admob.txt`: Mobile advertising verification files.

## 🛠️ Key Developer Features

### 1. In-App View Mode
Pages can be optimized for display inside the CalendAIr mobile app (WebViews) by adding `?app=true` to the URL.
-   **Logic**: `site.js` detects this parameter and adds the `.is-app` class to the `<html>` and `<body>`.
-   **Style**: `site.css` uses `.is-app` to hide navigation, breadcrumbs, and headers to save space.

### 2. FAQ Deep-Linking
The FAQ page supports opening specific questions via URL:
-   `faq.html?q=privacy` or `faq.html#privacy` will automatically expand the question with `id="privacy"`.

### 3. Pure Premium Light Theme & Core Brand Colors
The site uses a strict **Light Theme** matching the Flutter app's visual identity:
*   **Vibrant Teal (`#00A3A5`)**: The primary brand and action color.
*   **Electric Purple (`#9B59FF`)**: Secondary brand accent, combined with Teal in the primary gradient.
*   **Dark Navy (`#2C2C38`)**: Primary text color for high contrast and readability.
*   **Grey Light (`#F5F5F5`) & Soft Grey (`#EDEDED`)**: Neutral backgrounds and borders.
*   **White (`#FFFFFF`)**: Primary page canvas background.

### 4. Interactive Phone Mockup & Screenshot Placement
-   The hero section features a modern, clean charcoal-bezel smartphone mockup.
-   It is configured to display `/assets/screenshot-placeholder.png` directly via an `<img class="app-screenshot">` tag.
-   If `screenshot-placeholder.png` is not present, it hides itself gracefully via an `onerror="this.style.display='none';"` handler, showing a beautifully animated mockup of the conversational app dashboard as a fallback.

## 📜 Guidelines for Agents
1.  **Keep it Simple**: Prioritize readability and standard HTML/CSS.
2.  **Maintain Language Parity**: If you update `index.html` (EN), check if `/de/index.html` needs a corresponding update.
3.  **Strict Light Theme**: Do not introduce dark mode style overrides. The layout must remain pure, high-contrast light to match the mobile app.
4.  **No Badge Borders/Backgrounds**: Do not apply background colors, margins, paddings, or border outlines directly to the `.store-badge` element, as the App Store and Google Play SVG assets already contain native borders and black capsules.
5.  **Verification**: Always check that any new CSS doesn't break the "App View" mode (`.is-app`).
6.  **SEO**: Ensure every page has a unique `<title>` and `<meta description>`.
7.  **No third-party assets**: Fonts, icons, scripts and styles are served from our own domain.
    Do **not** add `fonts.googleapis.com`, `jsdelivr`, `cdnjs`, `unpkg` or any other CDN link —
    an external asset sends every visitor's IP to that provider before consent, and the privacy
    policy states that the site embeds no third-party content. Inter lives in
    `/assets/fonts/` (see its README), the two language-switcher flags in `/assets/flags/`.

---
*Created by Antigravity AI*
