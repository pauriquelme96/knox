#!/bin/bash

CURRENT_DIR=$(pwd)
SUBMODULE_PATH=${1}

#Verifica que SUBMODULE_PATH no esté vacío
if [ -z "$SUBMODULE_PATH" ]; then
  echo ""
  echo "❌  Submodule path is required"
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

# Bajar los cambios del submódulo
git submodule update --remote --merge $SUBMODULE_PATH

# Volver al repo principal
cd $CURRENT_DIR

# Actualizar referencia del submódulo
if [ -n "$(git status --porcelain $SUBMODULE_PATH)" ]; then
  git add $SUBMODULE_PATH
  git commit -m "Submodule: Sync $SUBMODULE_PATH"
  git push origin main
fi
