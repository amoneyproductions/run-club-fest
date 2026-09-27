# Run Club Fest

Landing page for Run Club Fest — a team-based running festival, launching in Los Angeles.

## Structure

- `index.html` — the one page site
- `styles.css` — all styles
- `script.js` — LA run club directory data + the email signup form handler
- `assets/` — logo, mascot, and badge art
- `netlify.toml` — deploy config (static site, no build step)

## Editing

This is plain HTML/CSS/JS, no build step. Open `index.html` in a browser to preview, or run any static server, e.g.:

```
npx serve .
```

## Deploying

Pushing to `main` deploys automatically via Netlify (connected to this GitHub repo).

## Email signup

The signup form uses [Netlify Forms](https://docs.netlify.com/manage-deploys/monitor-deploys/#form-notifications) — submissions show up in the Netlify dashboard under Forms, no backend needed. Set up an email notification there so new signups land in your inbox.

## Content notes

The "LA run club scene" section lists real, independent LA run clubs as illustrative examples of the community this festival is built around. None of them are confirmed partners yet — update `script.js`'s `CLUBS` array once real teams are locked in.
