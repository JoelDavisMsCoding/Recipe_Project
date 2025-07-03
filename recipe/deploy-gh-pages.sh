#!/bin/bash

set -e

echo "í³¦ Building the project..."
npm run build

echo "íº€ Deploying to GitHub Pages..."
cd dist
rm -rf .git
git init
git remote add origin https://github.com/JoelDavisMsCoding/Recipe_Project.git
git checkout -b gh-pages
git add .
git commit -m "Manual deploy to gh-pages"
git push -f origin gh-pages

echo "âœ… Deployed to https://joeldavismscoding.github.io/Recipe_Project/"
