#!/bin/bash

SUBMODULE_PATH=${1:-"lib/submodule"}

if [ -n "$(git status --porcelain)" ]; then
  echo ""
  echo "⚠️  Warning you have uncommitted changes"
  echo ""
  exit 1
fi

if [ "$(git branch --show-current)" != "main" ]; then
  echo ""
  echo "❌  You are not on the main branch"
  echo ""
  exit 1
fi

# Actualizar referencia del repo principal
git pull origin main

# Bajar los cambios del submódulo
cd $SUBMODULE_PATH
git checkout main
git pull origin main

# Volver al repo principal
cd - >/dev/null

# Actualizar referencia del submódulo
if [ -n "$(git status --porcelain $SUBMODULE_PATH)" ]; then
  git add $SUBMODULE_PATH
  git commit -m "Submodule: Sync $SUBMODULE_PATH"
  git push origin main
  git submodule update --remote
fi
