#!/bin/bash

SUBMODULE_PATH=${1:-"lib/submodule"}
COMMIT_MESSAGE=${2:-"Update submodule"}

echo "🔄 Sincronizando submódulo: $SUBMODULE_PATH"

# Cambios en el submódulo
cd $SUBMODULE_PATH

# Bajar los cambios del submódulo
# git checkout main
# git pull origin main

if [ -n "$(git status --porcelain)" ]; then
  echo "📝 Commiteando cambios en el submódulo..."
  git add .
  git commit -m "$COMMIT_MESSAGE"
  git push origin HEAD
fi

# Volver al repo principal
cd - >/dev/null

# Actualizar referencia
if [ -n "$(git status --porcelain $SUBMODULE_PATH)" ]; then
  UNCOMMITTED_CHANGES=$(git status --porcelain)
  if [ -n "$UNCOMMITTED_CHANGES" ]; then
    git stash -u
  fi

  CURRENT_BRANCH=$(git branch --show-current)
  git checkout main
  echo "📦 Actualizando referencia del submódulo..."
  git add $SUBMODULE_PATH
  git commit -m "Update submodule: $COMMIT_MESSAGE"
  git push origin HEAD
  git checkout $CURRENT_BRANCH
  git submodule update

  if [ -n "$UNCOMMITTED_CHANGES" ]; then
    git stash pop
  fi
fi

echo "✅ Sincronización completada"
