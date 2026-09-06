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
    -   `site.css`: Global styles. The palette block at the top mirrors the app's `AppColors`.
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

### 3. Design System - derived from the app, not invented
The single source of truth for colour is `AppColors` in the Flutter app
(`calendar-matcher/flutter_app/lib/shared/theme/app_theme.dart`). `site.css` mirrors it
verbatim at the top of the file. **Never introduce a hex value that is not in `AppColors`.**
Derived values are permitted only as alpha variants of those colours (the app itself tints
with 0.05 / 0.1 / 0.15 / 0.3).

Three rules read straight out of the app's code: check them before adding anything:

| Rule | Evidence in the app |
| --- | --- |
| **No gradients.** Ever, as decoration. | The Flutter code contains zero `LinearGradient` / `RadialGradient`. |
| **Radii are 8 or 12**, 20 and 32 for large surfaces. No `9999px` pills. | `BorderRadius.circular(12)` 67x, `(8)` 59x, largest is 32. |
| **Shadows are black at low alpha, blur 4 or 8.** No large tinted glows. | Every `BoxShadow` in the app uses `blurRadius: 4` or `8`. |

Colour roles on the site:
*   **Vibrant Teal `#00A3A5`**: primary action, the CTA band, all interactive accents.
*   **Electric Purple `#9B59FF`, Warm Coral `#FF5E7E`, Sunny Yellow `#FFD93D`**: the rails on
    the feature cards and the highlighter stroke in the hero. One accent per element, never mixed.
*   **Success `#28A745`**: reserved for availability that matched, mirroring the app's status chips.
*   **Dark Navy `#2C2C38`**: all body text, and the phone bezel.
*   **Soft Grey `#EDEDED`**: every hairline border and the calendar-sheet grid lines.

Note: the logo SVGs in `/assets/` are drawn in `#175f65` and `#3cdf9e`, which are **not** in
`AppColors`. That discrepancy is unresolved; do not copy those two values into the stylesheet.

### 4. Recurring design motifs
Keep these: they are what stops the site looking like a generic template:
-   **The calendar sheet**: the `--sheet` custom property draws hairline grid lines. Used masked
    behind the hero and etched into the CTA band. It is the site's only background texture.
-   **Event-shaped cards**: `.feature-card` has a coloured left rail and a squared top-left corner,
    so it reads as a calendar event. The rail widens on hover; the card does not float or lift.
-   **The day cell**: `.step-num` is a rounded teal square with two pins on top: the app icon's shape.
-   **Hairlines over boxes**: steps are divided by column rules, the FAQ is a divided list.
    Reach for a 1px `--card` border before reaching for a shadow.

### 5. Phone Mockups & Screenshots
The hero shows **two real app screens**, never a mocked-up one:
-   `.phone-mockup` holds `assets/Dashboard.png` (home: required actions, Quick Meet, upcoming events).
    Bezel `#2C2C38`, inner area 278x620 px, which is the 0.448 aspect ratio of the PNGs (1280x2856),
    so `object-fit: cover` crops nothing. **If you swap it, match that ratio or resize the mockup.**
-   `.slot-detail` holds a **crop** of `assets/available_time_slots.png`, overlapping at bottom left.

**Watch the display scale.** The screenshots are 3x captures of a ~427 pt wide screen, so the app's
~15 pt body text only survives above roughly 0.6 scale. A whole screen inside a 160 px small phone
renders that text at ~5 px, which just looks like mush; that is why the second screen is a cropped
detail rather than a second phone. The crop is done in CSS: `.slot-detail-view` is a fixed-height box
with `object-fit: cover; object-position: center 50%`, which lands the window on the
"Available time slots" heading plus three slot rows. **If you change that box's height or width,
re-check the 50%.** Baking the crop into the asset instead would be the region y 857-2013 at full
width; if you do that, drop the `object-position` line.

`.phone-fallback-content` is a mock conversation that only appears if `Dashboard.png` fails to load.
(`assets/screenshot-placeholder.png` is the old, now unreferenced hero image.)

**Never illustrate a screen the app does not have.** The availability diagram (`.slot-finder`) used to
sit in the hero, where it read as an app screenshot; it now lives in `.match-panel` under the steps,
captioned as an explanation of the mechanic. Keep that separation.

### 6. Copy must match the legal texts
The privacy policy and terms are approved and describe exactly what the app does. The landing pages
must not overstate them. Two claims were wrong and have been fixed: do not reintroduce them:
-   ❌ *"only ever asks for free/busy times"*: the policy says event data **is** requested from the
    provider's API and processed in memory; only the *storing* of titles, locations, notes and attendee
    lists is ruled out. Say "we read when your events start and end", not "we only get free/busy".
-   ❌ *"No tracking"* as a blanket claim: Firebase Analytics, Crashlytics and AdMob run in the app
    with consent. Only the **website** embeds no third-party content.
-   ❌ *"Accept a slot, done"*: accepting a suggestion does not by itself create the calendar event.
    `respondToMeeting/handler.go` creates the shared event on the **first response** from an invitee
    (`isFirstResponse := meetingRec.ICalUID == ""`), and skips it entirely if the only attendee of a
    two-party meeting declines. Phrase it as "as soon as the first person accepts".

**Do not name the AI vendor on the landing pages.** The privacy policy names Google Gemini because it
has to; marketing copy does not, and the vendor may change. Say "the AI". For the same reason, keep the
copy on *what stays private* rather than on how matching works: competitors read landing pages.

Careful with the tempting shorthand "we never send your data to the AI" - the sentence the user types
**is** sent. The accurate and equally strong claim is that the calendars, the events and the invitees
are never sent.

Before adding a feature to the landing page, confirm it exists in `calendar-matcher`. A card promising
automated reminders/nudges was removed because no such feature exists: the only push trigger in the
backend is `internal/features/respondToMeeting`.

### 7. No em dashes
There is not a single em dash (`&mdash;` or the literal character) anywhere in the HTML, and it should
stay that way. They read as a tell for machine-written copy. Write two sentences, use a comma, or use a
colon before a definition. A plain hyphen is fine where one is genuinely needed. Check with:

```
grep -rn $'\u2014\|&mdash;' --include='*.html' .
```

## 📜 Guidelines for Agents
1.  **Keep it Simple**: Prioritize readability and standard HTML/CSS.
2.  **Maintain Language Parity**: If you update `index.html` (EN), check if `/de/index.html` needs a corresponding update.
3.  **Strict Light Theme**: Do not introduce dark mode style overrides. The layout must remain pure, high-contrast light to match the mobile app.
4.  **Never invent a colour**: if a hex is not in `AppColors`, it does not belong in `site.css`. Alpha variants of those colours are fine.
5.  **No Badge Borders/Backgrounds**: Do not apply background colors, margins, paddings, or border outlines directly to the `.store-badge` element, as the App Store and Google Play SVG assets already contain native borders and black capsules.
6.  **Verification**: Always check that any new CSS doesn't break the "App View" mode (`.is-app`).
7.  **SEO**: Ensure every page has a unique `<title>` and `<meta description>`.
8.  **No third-party assets**: Fonts, icons, scripts and styles are served from our own domain.
    Do **not** add `fonts.googleapis.com`, `jsdelivr`, `cdnjs`, `unpkg` or any other CDN link -
    an external asset sends every visitor's IP to that provider before consent, and the privacy
    policy states that the site embeds no third-party content. Inter lives in
    `/assets/fonts/` (see its README), the two language-switcher flags in `/assets/flags/`.

---
*Created by Antigravity AI*
