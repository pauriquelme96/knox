#!/bin/bash

SUBMODULE_PATH=${1:-"lib/submodule"}
UNCOMMITTED_CHANGES=$(git status --porcelain)

if [ -n "$UNCOMMITTED_CHANGES" ]; then
  git stash -u
fi

# Bajar los cambios del submódulo
cd $SUBMODULE_PATH
git pull origin main

# Volver al repo principal
cd - >/dev/null

# Actualizar referencia del submódulo
if [ -n "$(git status --porcelain $SUBMODULE_PATH)" ]; then
  CURRENT_BRANCH=$(git branch --show-current)
  git checkout main
  git add $SUBMODULE_PATH
  git commit -m "Submodule: Sync $SUBMODULE_PATH"
  git push origin main
  git checkout $CURRENT_BRANCH
fi

if [ -n "$UNCOMMITTED_CHANGES" ]; then
  git stash pop
fi
