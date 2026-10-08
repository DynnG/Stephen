# Portfolio security review — 8 October 2026

Scope: local source, dependency audit, public HTTP headers, and build output. This is a bounded review, not a penetration test or a guarantee of security.

## Findings and changes
- Removed executable Tailwind CDN dependency. CSS is compiled locally; application JavaScript is served from the site.
- Added CSP: scripts restricted to the site, external framing prohibited, objects disabled, base URL constrained. Google Fonts remains allowed. Inline styles remain allowed because the UI updates style properties.
- Added MIME sniffing protection, framing protection, no-referrer policy, and restrictions on camera/microphone/location/payment access.
- Updated build dependencies: npm audit reports zero known vulnerabilities.
- Added name/details length limits. Set the quote form to POST so a missing JavaScript handler does not place project details in a GET query on the portfolio.
- Existing user details are encoded in compose links and not injected into HTML. New-tab links use noopener/noreferrer.

## Verified observations
- Static site with no backend, database, account system, or server-side quote storage.
- HTTPS and HSTS were already present.
- No credential patterns found in inspected tracked source/config files; environment files and Vercel state are ignored by Git. This scan does not cover all Git history or external account settings.

## Remaining considerations
- Names and project details are transferred to the chosen mail/SMS application. Desktop Gmail compose URLs include those details and may enter browser history.
- Public contact information and portrait are intentionally visible. Previously committed photos can remain in Git history.
- Google Fonts requests still reach a third party.
- GitHub/Vercel account MFA, access controls, and mobile app delivery were not assessed.
- No real email, text, or call was sent during review.
