# Phoenix Project — Natural Disasters (Innovation Academy)

A simple static website that helps the Alpharetta community prepare for natural disasters. It includes current alerts, local resources, safety guides, and an embedded weather widget for real‑time conditions.

## Quick Start

You only need a basic static server. The easiest option is Python, which is preinstalled on macOS and most Linux distros.

1. Open a terminal in the project root.
2. Run:
   
   ```bash
   python3 -m http.server 8000
   ```
   
3. Visit `http://localhost:8000/` in your browser.

Alternative options:
- Use any static server (e.g., `npx serve .`) if you already have Node.js.
- Open directly with an editor’s Live Server plugin.

## GitHub Deployment (GitHub Pages)

Deploy from the `main` branch, serving files from the repository root.

1. Initialize git and push to GitHub:
   ```bash
   git init
   git add -A
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, go to Settings → Pages.
3. Under “Build and deployment”, choose:
   - Source: “Deploy from a branch”
   - Branch: `main`
   - Folder: `/ (root)`
4. Save. After it builds, the site will be available at:
   - `https://<your-username>.github.io/<repo-name>/`

Notes:
- GitHub Pages requires `index.html` at the repository root (this project has it).
- The weather widget loads a third‑party script; ensure your site is accessible over HTTPS (GitHub Pages is).

## Project Structure

```
.
├── index.html                      # Home page
├── status.html                     # Current alerts, school status, local resources
├── supplies.html                   # Emergency supplies guidance
├── types.html                      # Types of natural disasters and safety info
├── before-during-after.html        # What to do before, during, and after
├── css/
│   └── style.css                   # Styling (includes Home button styles)
├── js/
│   └── script.js                   # Basic JS (no build tooling required)
├── images/                         # Page images
│   ├── disaster recovery.webp
│   ├── emergency kit.jpeg
│   ├── flooding.jpg
│   ├── heatwaves.jpg
│   ├── seeking shelter.png
│   ├── thunderstrom.jpg
│   ├── wild fire.webp
│   └── winter storm.jpg
└── api/
    └── weather.js                  # Legacy script (not required when using widget)
```

## Weather Widget

The status page uses the Forecast7 (weatherwidget.io) widget for Alpharetta with US units.

- Widget anchor is in `status.html:49–55`.
- The loader script is in `status.html:56–66`.

To change location or labels, update the `href` and `data-label_*` attributes:

```html
<a class="weatherwidget-io"
   href="https://forecast7.com/en/34d08n84d29/alpharetta/?unit=us"
   data-label_1="Innovation Academy"
   data-label_2=""
   data-theme="original">
   Innovation Academy Weather
</a>
```

## UI Details

- A consistent “Back to Home” button is present on content pages.
- Styles live in `css/style.css` under “Home Button Styles” (`style.css:245–264`).
- Page backgrounds use a neutral `#f4f4f4` to keep content readable.

## Development Notes

- This is a plain HTML/CSS/JS site — no frameworks, bundlers, or environment variables.
- Third‑party widget scripts require internet access to load.
- If you see `404 /@vite/client` in local server logs, ignore it — it’s benign for static sites.

## License

Add your preferred license (MIT recommended). Create `LICENSE` if you want to formalize reuse.