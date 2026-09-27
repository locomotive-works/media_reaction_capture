#!/usr/bin/env bash
# Builds the Chrome Web Store upload: dist/media_reaction_capture-<version>.zip
# Only runtime files go in the zip (no store assets, docs, or icon source).
set -euo pipefail
cd "$(dirname "$0")/.."

version=$(jq -r .version manifest.json)
out="dist/media_reaction_capture-${version}.zip"
mkdir -p dist
rm -f "$out"

zip -qr -X "$out" \
  manifest.json shared.js content.js popup.html popup.css popup.js \
  _locales icons/icon16.png icons/icon32.png icons/icon48.png icons/icon128.png \
  -x '*.DS_Store'

echo "$out"
unzip -l "$out"
