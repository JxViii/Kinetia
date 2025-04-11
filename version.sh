#!/bin/bash

VERSION=$(date +%s)
echo "📦 Aplicando versión única: v=$VERSION"

# Función para limpiar versiones anteriores y agregar nueva
clean_v() {
  local file="$1"

  # 1. Eliminar TODO lo que sea ?v=123 seguido o repetido
  sed -i -E \
    -e 's|(\.[a-z]{2,5})(\?v=[0-9]+)+|\1|g' \
    -e 's|(\?v=[0-9]+)+||g' \
    "$file"

  # 2. Agregar nueva versión a scripts, links, imgs, iconos
  sed -i -E \
    -e "s|(<script[^>]+src=[\"'][^\"']+)([\"'])|\1?v=$VERSION\2|g" \
    -e "s|(<link[^>]+href=[\"'][^\"']+)([\"'])|\1?v=$VERSION\2|g" \
    -e "s|(<img[^>]+src=[\"'][^\"']+)([\"'])|\1?v=$VERSION\2|g" \
    "$file"

      # 3. Detectar y actualizar variables CSS con url(...) ?v=...
  sed -i -E \
    -e 's|(url\([\"'\'']?[^\"'\'')]+)(\?v=[0-9]+)+([\"'\'']?\))|\1\3|g' \
    -e "s|(url\([\"'\'']?[^\"'\'')]+)([\"'\'']?\))|\1?v=$VERSION\2|g" \
    "$file"

}

# 1. Procesar HTML
find . -type f -name "*.html" | while read -r file; do
  echo "🔄 Limpiando y actualizando $file"
  clean_v "$file"
done

# 2. Procesar @import en main.css
MAIN_CSS="./css/main.css"
if [[ -f "$MAIN_CSS" ]]; then
  echo "🎨 Limpiando y actualizando $MAIN_CSS"
  sed -i -E \
    -e 's|(@import ["'\''][^"'\'']+?)\?v=[0-9]+(\?v=[0-9]+)*(["'\''];)|\1\3|g' \
    -e "s|(@import [\"''][^\"'']+)([\"''];)|\1?v=$VERSION\2|g" \
    "$MAIN_CSS"
else
  echo "⚠️ No se encontró $MAIN_CSS"
fi

echo "✅ Limpieza y versión final aplicada: v=$VERSION"
