#!/bin/bash

SUBMODULE_PATH=${1:-"lib/submodule"}
COMMIT_MESSAGE=${2:-"Update submodule"}

echo ""
echo "🔄 Sincronizando submódulo: $SUBMODULE_PATH"
echo ""

if [ "$(git branch --show-current)" != "main" ]; then
  echo ""
  echo "❌  You are not on the main branch"
  echo ""
  exit 1
fi

# Cambios en el submódulo
cd $SUBMODULE_PATH

# Bajar los cambios del submódulo
# ...

if [ -n "$(git status --porcelain)" ]; then
  echo ""
  echo "📝 Commiteando cambios en el submódulo..."
  echo ""
  git add .
  git commit -m "$COMMIT_MESSAGE"
  git push origin main
fi

# Volver al repo principal
cd - >/dev/null

# Actualizar referencia
if [ -n "$(git status --porcelain $SUBMODULE_PATH)" ]; then
  echo ""
  echo "📦 Actualizando referencia del submódulo..."
  echo ""
  git add $SUBMODULE_PATH
  git commit -m "Update submodule: $COMMIT_MESSAGE"
  git push origin main
  git submodule update --remote
fi

echo ""
echo "✅ Sincronización completada"
echo ""
