#!/bin/bash

echo "🔄 Actualizando submódulos de forma segura..."

# Función para verificar cambios no commiteados
has_uncommitted_changes() {
  cd "$1"
  if [ -n "$(git status --porcelain)" ]; then
    return 0
  else
    return 1
  fi
  cd - >/dev/null
}

# Guardar estado actual
STASHED_MODULES=()

# Stash cambios en cada submódulo
git submodule foreach --quiet '
    if [ -n "$(git status --porcelain)" ]; then
        echo "📦 Guardando cambios en $name..."
        git stash push -m "auto-stash-$(date +%s)"
        echo "$name" >> /tmp/stashed_modules.txt
    fi
'

# Actualizar submódulos
echo "⬇️  Actualizando submódulos..."
git submodule update --init --recursive

# Restaurar cambios
if [ -f /tmp/stashed_modules.txt ]; then
  while IFS= read -r module; do
    echo "♻️  Restaurando cambios en $module..."
    cd "$module"
    if git stash pop; then
      echo "✅ Cambios restaurados en $module"
    else
      echo "⚠️  Conflicto al restaurar cambios en $module"
      echo "   Los cambios están guardados en el stash"
    fi
    cd - >/dev/null
  done </tmp/stashed_modules.txt
  rm /tmp/stashed_modules.txt
fi

echo "✅ Actualización completada"
