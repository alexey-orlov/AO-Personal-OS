# docs/ — GitHub Pages static assets

This folder is served as a GitHub Pages site at:

> `https://alexey-orlov.github.io/AO-Personal-OS/`

It exists for ONE narrow reason: hosting a tiny static page (`gmail.html`) that redirects from an `https://...` URL to the `googlegmail://` URL scheme. The inbox-sweep workflow needs this because Telegram inline-button URLs are restricted to `http://`, `https://`, and `tg://` schemes — custom schemes like `googlegmail://` are rejected by the Bot API. We trampoline through this static page so the Telegram button can deep-link into the Gmail iOS app's compose screen with the recipient, subject, and body all pre-filled.

## Files

- `gmail.html` — the redirect page. Reads `?to=…&su=…&body=…` from the query string and either auto-redirects to `googlegmail://co?…` (most iOS browsers) or shows a tap-to-open button as a fallback. No tracking, no analytics, no remote dependencies.

## Enabling Pages (one-time)

1. Go to `https://github.com/alexey-orlov/AO-Personal-OS/settings/pages`
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Under **Branch**, choose `main` and folder `/docs`. Save.
4. After ~30s, the page is live at `https://alexey-orlov.github.io/AO-Personal-OS/gmail.html`.

## Privacy considerations

The query parameters (`to`, `su`, `body`) appear in the URL itself. The URL is visible to anyone Alex shares it with, lands in Safari history, and is sent to GitHub's edge servers (no application-level logging by Alex). For job-search outreach this is acceptable; for anything sensitive (compensation, contracts), don't use this redirect — copy/paste the body manually instead.

The page sets `<meta name="robots" content="noindex,nofollow">` and exposes no JS dependencies beyond the inline script.

## Test URL

After Pages is enabled, you can sanity-check the redirect by tapping:

```
https://alexey-orlov.github.io/AO-Personal-OS/gmail.html?to=test@example.com&su=Test&body=Hello%20from%20the%20redirect
```

On iOS with Gmail installed, this should open Gmail's compose screen with the three fields pre-filled.
