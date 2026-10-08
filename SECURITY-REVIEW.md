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

## Follow-up review after UI and contact changes

Rechecked on 8 October 2026:
- npm audit completed successfully: 0 known vulnerabilities across 117 dependencies.
- Production response on stephen-villamor.vercel.app confirms CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy are active.
- No credential-pattern matches or tracked environment files were found in the current tracked files. Git history was not scanned.
- No HTML injection sinks (innerHTML, outerHTML, document.write, eval) were found in the application JavaScript. Visitor fields are URI-encoded for fixed email/SMS destinations; generated captions use textContent.
- External new-tab links retain noopener and noreferrer. Messenger destinations are fixed, with mobile and desktop variants.
- Quote fields retain maximum lengths (100 and 3,000). Visitor details are not stored by the portfolio; compose URLs can be visible to the chosen provider and browser history.
- No critical or high-severity issue identified within this review. No application security changes were needed.

Limits: no authenticated Facebook/Gmail app tests, account/MFA review, Git-history secret scan, or penetration test. An external m.me certificate error cannot be repaired through portfolio code; certificate warnings must not be bypassed.
