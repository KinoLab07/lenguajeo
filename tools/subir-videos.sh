#!/usr/bin/env bash
# Publica los diez senderos como adjuntos de una release de GitHub.
set -euo pipefail

TAG="${1:-videos-v1}"
cd "$(dirname "$0")/.."

faltan=()
for i in $(seq 0 9); do
  [ -f "4-videos/$i.mp4" ] || faltan+=("$i.mp4")
done
if [ ${#faltan[@]} -gt 0 ]; then
  echo "Faltan en 4-videos/: ${faltan[*]}" >&2
  exit 1
fi

if ! gh release view "$TAG" >/dev/null 2>&1; then
  echo "Creando la release $TAG..."
  gh release create "$TAG" \
    --title "Senderos de Lenguajeo" \
    --notes "Los diez vídeos de la película. El sitio los lee desde aquí; ver 1-scripts/config.js."
fi

echo "Subiendo los diez vídeos (632 MB, esto tarda)..."
gh release upload "$TAG" 4-videos/[0-9].mp4 --clobber

repo=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo
echo "Listo. Pon esto en 1-scripts/config.js:"
echo
echo "  var VIDEOS_BASE = \"https://github.com/$repo/releases/download/$TAG/\";"
