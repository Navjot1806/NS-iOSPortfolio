# Portfolio — Deploy Instructions

This repository contains a simple static portfolio (index.html, script.js, styles.css).

Deployment options

- **GitHub Pages (recommended)**
  1. Create a GitHub repo and push your code to the `main` branch.
  2. The included GitHub Action will automatically publish the repository root to GitHub Pages on each push to `main`.

- **Manual GitHub Pages using gh-pages**
  ```bash
  npm install --save-dev gh-pages
  npm run deploy
  ```

- **Vercel / Netlify**
  - Connect the repo on the Vercel or Netlify dashboard and set the build/publish directory to the repository root.

How to publish (quick)

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

After pushing, GitHub Actions will run and publish the site.
