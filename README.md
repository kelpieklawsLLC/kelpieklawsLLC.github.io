# Pixel Power website update — October 17, 2026

A static website for Pixel Power. This bundle contains `index.html`, `privacy.html`, and the supplied `LICENSE`.

## Publish

Put `index.html`, `privacy.html`, and `LICENSE` in the root of your GitHub Pages repository (or any static website host). Keep the two HTML files together: the site links directly to `/privacy.html`, which matches the URL used by `PixelForge/Info.plist` (`https://kelpieklawsllc.github.io/privacy.html`).

## App Store link

The project ZIP does not supply a verified live App Store listing URL. The page deliberately shows a launch-info dialog instead of directing visitors to an unrelated app. When your listing is public, open `index.html` and change:

`const SETTINGS = { appStoreUrl: "" };`

to your verified App Store link, e.g. `https://apps.apple.com/app/idYOUR_APP_ID`. All App Store buttons will then open that URL. Adjust coming-soon text if release status changes.

## Grounded content

Verified against the supplied Swift source: 30 artistic presets (3 Free / 27 Pro), region editing, on-device foreground isolation, sprite export, PNG output, StoreKit Monthly and Lifetime Pro offerings, and no in-app account. The standalone policy was synchronized with `PixelForge/PrivacyPolicy.swift` as provided, particularly the monthly auto-renewal disclosure.

The website's interactive browser demo is *not* the Swift image engine: demo outputs are illustrative approximations, and photo files stay in the browser. The website does not include analytics or third-party scripts.

Before publishing, confirm the final release build's privacy behavior and current App Store availability; prices are deliberately omitted because StoreKit shows localized live prices.
