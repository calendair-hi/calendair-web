# Self-hosted fonts

`inter-latin.woff2` and `inter-latin-ext.woff2` are the Inter variable font (weight axis
100–900), latin and latin-ext subsets, taken from the files Google Fonts serves for
`Inter:wght@400;500;600;700;800`. Both weights and subsets are declared in
[`../fonts.css`](../fonts.css), mirroring Google's own `@font-face` blocks so rendering is
unchanged — verified by pixel-identical screenshots before and after the switch.

Self-hosted on purpose: loading them from `fonts.googleapis.com` sent every visitor's IP
address to Google before any consent, which the privacy policy would have to disclose.

Licence: SIL Open Font License 1.1, see [LICENSE-Inter.txt](LICENSE-Inter.txt).

## Updating

Fetch the CSS with a current browser user agent, take the `latin` and `latin-ext` URLs, and
replace both files plus the `unicode-range` values in `../fonts.css`:

```sh
curl -A "<a current Chrome UA>" \
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
```

Requesting a single weight returns a static instance instead of the variable font, so always
ask for the full weight list.
