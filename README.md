# Stephen Villamor — Portfolio

Responsive portfolio for Stephen Villamor, Furniture & Cabinet Maker in Cebu.
Built with HTML, CSS, JavaScript, Tailwind CSS, and Vite.

- Website: https://stephen-villamor.vercel.app/
- Repository: https://github.com/DynnG/Stephen

## Run locally

Install Node.js with npm, then run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Use the development server rather than opening `index.html` directly.

## Build and preview

```sh
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Update content

- `index.html`: headings, services, education, FAQ, and contact information.
- `styles.css`: custom layout and styling; `tailwind.config.cjs`: theme settings.
- `app.js`: gallery, portrait QR flip, navigation, and quote/contact behavior. When changing email, phone, or Messenger details, update this file too.
- `assets/images/`: Stephen’s portrait and logos.
- `public/portfolio-qr.png`: QR code. Replace it if the portfolio URL changes.

### Add project photos

Save photos in `public/projects/`, then add entries to the corresponding project's `photos` array in `project-photos.json`:

```json
{"src": "/projects/cabinetry/front.jpg", "alt": "Front view of the completed cabinet"}
```

Paths omit `public/`. Multiple entries enable thumbnails and the enlarged viewer. An empty array displays a placeholder. Keep project order aligned with `data-project` cards in `index.html`; update titles in both files.

## Deploy and hand over

In Vercel, connect the GitHub repository, select Vite, use `npm run build`, and set the output directory to `dist`. Alternatively, after signing in and linking the correct project, run `npx vercel --prod`.

Give the client GitHub and Vercel ownership or access separately. Do not share passwords or commit `.env` files or credentials. The website uses a Vercel subdomain; paid domain and hosting costs are separate. Deployment limits can delay publishing updates—confirm the live site after each deployment.

## Contact and privacy

The quote form opens an email or SMS draft; the visitor reviews and sends it. Attach photos in the chosen email app or Messenger. There is no backend, automatic message sending, or portfolio storage of visitor details. External app behavior depends on the device and installed apps; test it on the client's phone. See `SECURITY-REVIEW.md` for the review scope and privacy limitations.
