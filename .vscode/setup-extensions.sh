#!/bin/bash
# NOTE: This script requires GNU Bash. Please run with Bash only.

# ============================================
# Script de Configuración de VS Code
# ============================================
# Este script instala automáticamente todas las extensiones recomendadas

echo "🚀 Configurando VS Code para el proyecto..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que VS Code esté instalado
if ! command -v code &> /dev/null; then
    echo -e "${RED}❌ VS Code no está instalado o 'code' no está en el PATH${NC}"
    echo ""
    echo "Por favor:"
    echo "1. Instala VS Code desde https://code.visualstudio.com/"
    echo "2. Abre VS Code"
    echo "3. Presiona Cmd+Shift+P (macOS) o Ctrl+Shift+P (Windows/Linux)"
    echo "4. Escribe 'Shell Command: Install code command in PATH'"
    echo "5. Vuelve a ejecutar este script"
    exit 1
fi

echo -e "${GREEN}✅ VS Code detectado${NC}"
echo ""

# Leer extensiones del archivo extensions.json
EXTENSIONS=(
    # Esenciales
    "esbenp.prettier-vscode"
    "dbaeumer.vscode-eslint"
    "ms-vscode.vscode-typescript-next"
    "christian-kohler.path-intellisense"
    "christian-kohler.npm-intellisense"
    "formulahendry.auto-rename-tag"
    "formulahendry.auto-close-tag"

    # Next.js & React
    "dsznajder.es7-react-js-snippets"
    "planbcoding.vscode-react-refactor"
    "WallabyJs.console-ninja"

    # Tailwind CSS
    "bradlc.vscode-tailwindcss"
    "austenc.tailwind-docs"

    # Calidad de Código
    "usernamehw.errorlens"
    "SonarSource.sonarlint-vscode"
    "streetsidesoftware.code-spell-checker"
    "streetsidesoftware.code-spell-checker-spanish"
    "aaron-bond.better-comments"
    "wayou.vscode-todo-highlight"
    "Gruntfuggly.todo-tree"
    "kisstkondoros.vscode-codemetrics"
    "wix.vscode-import-cost"

    # Git
    "eamodio.gitlens"
    "mhutchie.git-graph"
    "GitHub.copilot"
    "GitHub.copilot-chat"

    # Testing
    "Orta.vscode-jest"
    "firsttris.vscode-jest-runner"
    "ms-playwright.playwright"

    # Formateo y Visualización
    "yoavbls.pretty-ts-errors"
    "oderwat.indent-rainbow"
    "CoenraadS.bracket-pair-colorizer-2"
    "naumovs.color-highlight"
    "kisstkondoros.vscode-gutter-preview"

    # Iconos y Temas
    "PKief.material-icon-theme"
    "Equinusocio.vsc-material-theme"

    # Markdown
    "yzhang.markdown-all-in-one"
    "shd101wyy.markdown-preview-enhanced"
    "unifiedjs.vscode-mdx"

    # Utilidades
    "mikestead.dotenv"
    "redhat.vscode-yaml"
    "EditorConfig.EditorConfig"
    "humao.rest-client"
    "alefragnani.project-manager"
    "rangav.vscode-thunder-client"
    "steoates.autoimport"
    "stringhamdb.move-ts"
    "quicktype.quicktype"
    "ChakrounAnas.turbo-console-log"
    "SimonSiefke.svg-preview"
)

# Contador
INSTALLED=0
ALREADY_INSTALLED=0
FAILED=0

echo "📦 Instalando extensiones..."
echo ""

for extension in "${EXTENSIONS[@]}"; do
    # Verificar si ya está instalada
    if code --list-extensions | grep -q "^${extension}$"; then
        echo -e "${YELLOW}⏭️  ${extension} - Ya instalada${NC}"
        ((ALREADY_INSTALLED++))
    else
        echo -e "📥 Instalando ${extension}..."
        if code --install-extension "$extension" --force > /dev/null 2>&1; then
            echo -e "${GREEN}✅ ${extension} - Instalada${NC}"
            ((INSTALLED++))
        else
            echo -e "${RED}❌ ${extension} - Error al instalar${NC}"
            ((FAILED++))
        fi
    fi
done

echo ""
echo "============================================"
echo -e "${GREEN}🎉 Proceso completado!${NC}"
echo ""
echo "📊 Resumen:"
echo -e "  ${GREEN}✅ Instaladas: ${INSTALLED}${NC}"
echo -e "  ${YELLOW}⏭️  Ya instaladas: ${ALREADY_INSTALLED}${NC}"
echo -e "  ${RED}❌ Fallidas: ${FAILED}${NC}"
echo ""

if [ $FAILED -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Algunas extensiones no se pudieron instalar.${NC}"
    echo "   Por favor, instálalas manualmente desde el marketplace de VS Code."
    echo ""
fi

echo "📝 Próximos pasos:"
echo "  1. Reinicia VS Code para activar todas las extensiones"
echo "  2. Revisa el archivo .vscode/README.md para más información"
echo "  3. Ejecuta 'pnpm install' si aún no lo has hecho"
echo "  4. Ejecuta 'pnpm dev' para iniciar el servidor de desarrollo"
echo ""
echo -e "${GREEN}✨ ¡Listo para desarrollar!${NC}"
