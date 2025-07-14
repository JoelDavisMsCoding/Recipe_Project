#!/bin/bash

# Exit on any error
set -e

# Step 1: Build the frontend with Vite
echo "í³¦ Building the frontend..."
npm run build

# Step 2: Move into the build output directory
cd dist

# Step 3: Clean up any previous Git deployment history
rm -rf .git

# Step 4: Deploy to GitHub Pages
echo "ï¿½ï¿½ Deploying to GitHub Pages..."
git init
git remote add origin https://github.com/JoelDavisMsCoding/Recipe_Project.git
git checkout -b gh-pages
git add .
git commit -m "Manual deploy to gh-pages"
git push -f origin gh-pages

# Step 5: Done
cd ..
echo "âœ… Deployed! Visit: https://joeldavismscoding.github.io/Recipe_Project/"

