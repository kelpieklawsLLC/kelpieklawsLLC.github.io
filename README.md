# Pixel Power — promotional website

A complete **responsive, static advertisement / landing page** based on the Pixel Power Swift app's real icon, sample photos, and feature list. No framework, npm installation, backend, or CDN is required.

## Files

- `index.html` — the advertisement page. **Standalone:** its CSS, JavaScript, icon, and product imagery are embedded. Double-click to open in a modern web browser or upload to any static host.
- `privacy.html` — public-page version of the previously drafted privacy policy, using the same branding. **Not ready for publication** until you replace the placeholders and verify the content.

## How to try it

Open `index.html` in Chrome, Firefox, Safari, or Edge. The interactive preview allows you to:

- Drag the divider to reveal more or less of the transformed image.
- Switch between the three free-style illustrations: Pixel Pop, Sunset Glow, and Candy Dream.
- Increase or decrease pixel size.
- Try the included dog and landscape images.
- Select your own JPEG, PNG, WebP, GIF, or AVIF photo (20 MB limit).
- Download a 960 × 720 demonstration PNG.

All demo effects run **inside the browser**; images aren't uploaded by this code. The JavaScript renderer is **an approximation for marketing**, not a port of Pixel Power's Swift processing engine. Static look thumbnails are likewise illustrations made from the app's bundled landscape artwork. No reviews, star ratings, or unverified App Store availability are claimed.

## Before publishing

1. In `index.html`, find this settings line near the bottom:

   ```javascript
   const SETTINGS = { appStoreUrl: "" };
   ```

   Replace the empty string with your **real** published listing URL, for example `https://apps.apple.com/app/id1234567890`. Until then, both **Get Pixel Power** buttons intentionally open an honest *coming soon* message instead of a broken link. Use your real app ID; the example is not a valid listing link.
2. In both `index.html` (the privacy dialog) and `privacy.html`, replace `REPLACE_WITH_YOUR_LEGAL_NAME_OR_BUSINESS` and `REPLACE_WITH_YOUR_SUPPORT_EMAIL` with real details.
3. **Review the actual privacy terms with the release build and legal guidance as needed**, including treatment of images, temporary exports, purchases, website hosting logs, analytics, and possible future features. Keep the Swift privacy text, the website dialog, and `privacy.html` synchronized. Remove the draft warning/label after finalizing.
4. Put `index.html` and `privacy.html` on the same static website. You can use the public `https://your-site.example/privacy.html` URL for Apple's privacy-policy requirement **only after** you finalize its content.
5. If the app is publicly released, update *Coming to iPhone & iPad* / *coming soon* messaging in the announcement, FAQ, and final CTA to reflect actual availability.
6. Recheck any claims about 30 looks, Free vs Pro features, transparent sprites, account requirements, and on-device processing against the final version you ship.
7. Replace the illustrative preview images with screenshots/renderings of actual app output if you want screenshots to represent the renderer exactly.

## Deployment

This is a fully static site: upload both HTML files to any standard website hosting service (GitHub Pages, Netlify, Cloudflare Pages, Vercel static hosting, traditional HTTPS hosting, etc.). Serve `index.html` as the homepage and `privacy.html` as the privacy URL.

The homepage embeds all its assets, so there is nothing to build or install. Its layout adapts to phones, tablets, and desktop screens. The page has no external scripts, fonts, image services, or analytics.

## Tested

Browser interaction tests in headless Chromium verified the two sample modes, style switching, pixel-size and before/after controls, local file upload, PNG download, dialog controls, and responsive mobile navigation. No JavaScript exceptions or horizontal overflows were observed at 1440 px and 390 px viewports. This does **not** substitute for manually checking Safari on iPhone and your deployed HTTPS website.
