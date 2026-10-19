# Run from this folder in PowerShell after creating an EMPTY repo on GitHub.
# Edit the URL below first.
$repo = "https://github.com/YOUR-USERNAME/pips-dream-bureau.git"
git init
git branch -M main
git add package.json tsconfig.json vite.config.ts index.html .gitignore
git commit -m "Set up Vite + React + TypeScript project"
git add src/lib src/main.tsx src/index.css src/assets
git commit -m "Add state store, audio engine and 90s theme"
git add src/components src/App.tsx
git commit -m "Add Pip portfolio sections, 3D diorama and games"
git add README.md .github push.ps1
git commit -m "Add README and GitHub Pages workflow"
git remote add origin $repo
git push -u origin main
