#!/bin/bash

# validate-mcp-tools.sh
# Script de validation des outils MCP dans un projet

set -e

echo "🔍 Validation des outils MCP..."

# Couleurs pour le output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Compteurs
errors=0
warnings=0

# Fonction de validation
validate_prefixes() {
    local dir="$1"
    echo "📁 Vérification dans: $dir"
    
    # Rechercher les préfixes documentaires incorrects
    if find "$dir" -name "*.md" -o -name "*.js" -o -name "*.py" -o -name "*.ts" | xargs grep -l "mcp0_fast_\|mcp11_\|mcp2_\|mcp9_\|mcp10_\|mcp1_"; then
        echo -e "${RED}❌ Préfixes documentaires détectés:${NC}"
        find "$dir" -name "*.md" -o -name "*.js" -o -name "*.py" -o -name "*.ts" | xargs grep -H "mcp0_fast_\|mcp11_\|mcp2_\|mcp9_\|mcp10_\|mcp1_" | while read -r prefix; do
            echo "  - $prefix"
        done
        errors=$((errors + 1))
    else
        echo -e "${GREEN}✅ Aucun préfixe documentaire détecté${NC}"
    fi
    
    # Vérifier l'utilisation des noms réels
    echo "📋 Vérification des noms réels..."
    real_tools_found=false
    
    # Vérifier quelques outils clés
    if find "$dir" -name "*.md" -o -name "*.js" -o -name "*.py" | xargs grep -l "fast_read_file\|get_tasks\|search\|json_query_jsonpath" > /dev/null; then
        real_tools_found=true
        echo -e "${GREEN}✅ Noms réels d'outils MCP utilisés${NC}"
    else
        echo -e "${YELLOW}⚠️  Aucun outil MCP détecté dans les fichiers${NC}"
        warnings=$((warnings + 1))
    fi
    
    # Vérifier les patterns spécifiques
    echo "📊 Analyse détaillée..."
    
    # fast-filesystem
    fast_count=$(find "$dir" -name "*.md" -o -name "*.js" -o -name "*.py" | xargs grep -c "fast_read_file\|fast_write_file\|edit_file" | wc -l)
    echo "  - fast-filesystem: $fast_count occurrences"
    
    # task-master-ai
    task_count=$(find "$dir" -name "*.md" -o -name "*.js" -o -name "*.py" | xargs grep -c "get_tasks\|set_task_status\|add_task" | wc -l)
    echo "  - task-master-ai: $task_count occurrences"
    
    # ripgrep-agent
    ripgrep_count=$(find "$dir" -name "*.md" -o -name "*.js" -o -name "*.py" | xargs grep -c "search\|advanced-search" | wc -l)
    echo "  - ripgrep-agent: $ripgrep_count occurrences"
}

# Validation du répertoire courant si aucun argument
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}Usage: $0 <directory>${NC}"
    echo "Exemple: $0 .continue/rules"
    exit 1
fi

# Valider chaque répertoire fourni
for dir in "$@"; do
    if [ -d "$dir" ]; then
        echo
        validate_prefixes "$dir"
        echo
    else
        echo -e "${RED}❌ Erreur: Le répertoire '$dir' n'existe pas${NC}"
        errors=$((errors + 1))
    fi
done

# Résumé final
echo
echo -e "${NC}📈 Résumé de la validation:${NC}"
if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✅ Validation réussie - Aucune incohérence détectée${NC}"
else
    echo -e "${YELLOW}⚠️  Problèmes détectés: $errors erreurs, $warnings avertissements${NC}"
fi

exit $errors