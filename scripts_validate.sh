#!/usr/bin/env bash
set -euo pipefail

echo "[1/6] JSON syntax"
jq -e . data/profile.json >/dev/null
jq -e . data/projects.json >/dev/null

echo "[2/6] Required HTML markers"
grep -q '<main id="main-content"' index.html
grep -q 'application/ld+json' index.html
grep -q 'Content-Security-Policy' index.html
grep -q 'meta name="description"' index.html

echo "[3/6] Required accessibility markers"
grep -q 'class="skip-link"' index.html
grep -q 'aria-pressed' index.html
grep -q ':focus-visible' styles.css

echo "[4/6] Required SEO artifacts"
test -f robots.txt
test -f sitemap.xml
test -f favicon.svg
test -f apple-touch-icon.png

echo "[5/6] JavaScript syntax"
node --check script.js >/dev/null

echo "[6/6] Project data shape"
jq -e '.projects | type == "array" and length > 0' data/projects.json >/dev/null
jq -e '.projects[] | has("id") and has("title") and has("problem") and has("solution") and has("architecture") and has("tradeoffs") and has("impact") and has("metrics") and has("stack") and has("featured")' data/projects.json >/dev/null

echo "All static checks passed."
