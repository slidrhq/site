# Slidr homepage

The marketing site of Slidr: one static page, in English with a language menu for every language the app speaks (`packages/model/src/languages.ts` of [slidrhq/app](https://github.com/slidrhq/app)). No build step and no dependencies; the fonts come from Google Fonts.

```sh
python -m http.server 1488   # from this folder, then open http://localhost:1488
```

`?lang=he` (or any other code) opens the page in that language; the choice is remembered in the browser.

- `index.html` holds the page in English. Every text carries a `data-i18n` key.
- `assets/i18n/<code>.js` holds the text of each language, translated from `en.js`; a new key goes into every file.
- `assets/site.js` switches languages (direction and the fonts of each script with it), runs the scroll animations, the clip player, the wall of designs, the pile of slides in every language and the library's counts.
- `assets/designs.js` lists the designs of Elements the page shows (from the app, `desktop/src/elements/designs.ts`), in the columns of the library's wall and of the wall behind the hero.

## Media

- `media/clips/ai-build.mp4` is a real run: the app's window filmed over CDP while the evaluation runner sent one request ("AI in Our Classrooms", nine slides, on the Zohar template) to Claude Code (Opus 5.5) with Codex images. The request asks the agent to finish each slide, photos included (`slide_render` waits for them), before it starts the next, so the stage only moves forward. The edit cuts the time nothing on screen changes, plays the agent's work in the chat at 12× and the moments a slide arrives or a photo lands at about real speed; a few seconds where the agent wrote into the wrong box and undid it are left out. `media/edu/` are the slides of that run.
- `media/galilee/` and `media/festival/` are two more runs of the same kind, for the hero's second and third requests: "Three days in the Upper Galilee" (eight slides, on Shvil) and "Neon Nights", a festival's sponsorship deck (seven slides, on Layla), sent by the runner with `--effort high`. The hero plays the three runs in turn; the dots under its prompt jump to one.
- `media/clips/deck-tour.mp4`, the hero, is the finished deck of that run (its `.slidr` loaded into the dev server): the editor steps through slides 1–4, the show plays 4–7 with their animations, and it comes back to slide 1, so the loop has no seam. It shows the result where the showcase's first chapter shows the build.
- `media/languages/<code>-<id>.webp` (the Languages section) are 32 designs of the published library's Elements, two in each of the sixteen languages, drawn at 1920×1080 by the app's `/dev/review.html?d=<id>&src=library&lang=<code>` and saved at 960 px. `assets/site.js` (`STACK`) throws them onto a pile in that order; a design added there needs its picture here.
- `media/clips/objects-<en|he>.mp4` (the "Objects, not pictures" card) are slide 8 of that deck, "What we need from the board". The run's `.slidr` was lost, so the slide was rebuilt as objects on the Zohar theme, measured against `media/edu/slide-08.webp`; the other eight slides are their pictures, for the filmstrip. The Hebrew clip is the same slide translated and mirrored. On the dev server with the scripted agent: the photo is selected and the chat is asked for students in place of the teachers. The new photo is a Codex image edit of the old one, so the library, the light and the frame stay. Played at 1.2×, and the agent's turn at 1.6× on top of that.
- The other clips are the app on the dev server with the scripted agent.
- `media/designs/<he|en>/` are those designs, drawn by the app's `/dev/designs-review.html`; the Hebrew page shows the Hebrew ones. Only the designs `assets/designs.js` lists are kept.
- `media/templates/` are thumbnails of the built-in templates.
- `media/showcase/` are every sample slide of three library templates (Layla, Zohar, Mifgash) in Hebrew and English, drawn at 1920×1080 by the app's `/dev/review.html?src=library&t=<id>&lang=<he|en>&slide=<n>` and saved at 720 px. `assets/showcase.js` holds their names and taglines in every language (from the app) and the names of their slides (the library's `templates/catalog.json`).
- `media/library/` are strips of real items of the media library: Lucide line icons, Fluent colour illustrations and stickers of the frames catalog. The counts on the page are rounded down with a plus (8,000+ icons, 10,000+ illustrations and emoji, 600+ frames and stickers, 300+ designs) so they stay true as the library grows; on 2026-10-18 the published library had about 8,000, 10,000, 680 and 336.
- `media/og.jpg` is the picture a shared link shows (`og:image`, 1200×630): the published page's first screen with the hero on the Galilee request, captured in Edge at 1200×630 and twice the pixel density, the bar's links hidden, and scaled down to 1200×630. Facebook, LinkedIn and Reddit read `og:image` only as an absolute address, so it names `https://slidr.studio/`.

The site has no build and no checks. Publish the repository as it is, to any static host.

Until 2026-10-20 the site was `apps/website` of [slidrhq/app](https://github.com/slidrhq/app); its history came with it. "The app" and "the dev server" above are that repository and its `pnpm dev`.

The "Launched on Fazier" badge in the footer is a condition of the free listing on fazier.com: the comments and the badge are done, and the listing waits until the domain's Ahrefs Domain Rating is above 0 (it was 0 on 2026-11-14). Keep the badge until the listing is reviewed (`marketing/launch-posts.md` §5 of the working folder).

## Publishing

The site runs on Cloudflare as the Worker `www` (https://www.slidr.workers.dev), which serves the files of this repository (`wrangler.jsonc`; `.assetsignore` leaves out the rest). `.github/workflows/deploy.yml` publishes it on every push to `main`, and you can run it by hand from the Actions tab. The workflow needs two repository secrets: `CLOUDFLARE_API_TOKEN`, a token with the "Edit Cloudflare Workers" template, and `CLOUDFLARE_ACCOUNT_ID`.

To publish from your own machine: `npx wrangler login`, then `npx wrangler deploy`.

The download buttons link straight to the installer of the latest release of the app, not to its releases page. When a release of the app is published, the Site workflow of slidrhq/app (`.github/workflows/site.yml`) runs `node set-download.mjs <installer URL>`, commits and pushes here, and the push publishes the site. It pushes with a deploy key of this repository that has write access (`SITE_DEPLOY_KEY`, a secret of slidrhq/app): a push with the workflow's own token would not start the deploy.
