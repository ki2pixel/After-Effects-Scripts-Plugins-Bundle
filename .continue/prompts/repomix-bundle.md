---
name: repomix-bundle
description: Generate Repomix bundle for LLM analysis
invokable: true
---

# /repomix-bundle — Générer le bundle Repomix

## Objectif
Créer un bundle optimisé du codebase pour analyse par LLMs externes (Claude, ChatGPT, etc.) en utilisant Repomix avec la configuration existante.

## Étapes

1. **Vérification de la configuration**
   - Confirmer que `repomix.config.json` existe et est à jour
   - Vérifier les patterns d'inclusion/exclusion

2. **Génération du bundle**
   // turbo
   ```bash
   npx repomix --config repomix.config.json
   ```

3. **Vérification du résultat**
   - Contrôler que `repomix-output.md` a été généré
   - Vérifier la taille et le compte de tokens
   - Valider que les fichiers critiques sont inclus

## Résultat attendu

- **Fichier généré**: `repomix-after-effects-output.md`
- **Taille cible**: ~384k tokens (config actuelle)
- **Contenu**: Code core + docs essentielles, sans gros assets
- **Usage**: Partage avec LLMs externes pour analyse/review

## Notes

- Le bundle exclut automatiquement: archives, modèles, logs, assets volumineux
- La configuration utilise `.gitignore` et patterns par défaut pour la sécurité
- Le header inclut référence aux `codingstandards.md` obligatoires
- Régénérer après modifications significatives du codebase