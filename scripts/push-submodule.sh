#!/bin/bash

CURRENT_DIR=$(pwd)
SUBMODULE_PATH=${1}
COMMIT_MESSAGE=${2}

#Verifica que SUBMODULE_PATH no esté vacío
if [ -z "$SUBMODULE_PATH" ]; then
  echo ""
  echo "❌  Submodule path is required"
  echo ""
  exit 1
fi

#Verifica que COMMIT_MESSAGE no esté vacío
if [ -z "$COMMIT_MESSAGE" ]; then
  echo ""
  echo "❌  Commit message is required"
  echo ""
  exit 1
fi

# Verificar que estemos en la rama principal
if [ "$(git branch --show-current)" != "main" ]; then
  echo ""
  echo "❌  You are not on the main branch"
  echo ""
  exit 1
fi

# Verificar que no hay cambios pendientes de bajar/subir
git fetch origin main

if [ $(git rev-list HEAD...origin/main --count) -gt 0 ]; then
  echo ""
  echo "⚠️  There are commits pending to pull/push in main"
  echo ""
  exit 1
fi

# Cambios en el submódulo
cd $SUBMODULE_PATH
git checkout main

if [ -n "$(git status --porcelain)" ]; then
  git add .
  git commit -m "$COMMIT_MESSAGE"
  git push origin main
fi

# Volver al repo principal
cd $CURRENT_DIR

# Actualizar referencia
if [ -n "$(git status --porcelain $SUBMODULE_PATH)" ]; then
  git add $SUBMODULE_PATH
  git commit -m "Update submodule: $COMMIT_MESSAGE"
  git push origin main
fi
