---
name: enhance
description: Analyse la demande, charge les Skills techniques appropriés (PyShiftAE, AE Scripting, Debug, etc.) et génère un Mega-Prompt optimisé pour After Effects.
type: flow
---

# /flow:enhance - Prompt Engineer / Architecte Technique

```mermaid
flowchart TD
BEGIN([BEGIN]) --> A[Appelle l'outil `fast_read_file` du serveur `fast-filesystem` pour lire 'activeContext.md'.]
A --> B[Analyse les besoins de la demande brute fournie par l'utilisateur.]
B --> C[Identifie les fichiers de Skill pertinents et lis-les UNIQUEMENT si nécessaire.]
C --> D[Compile les informations pour le Dashboard Kimi (les tokens de lecture passeront en violet).]
D --> E([END])
```

## Rôle

Tu es un expert en ingénierie de prompt. Ta mission est **EXCLUSIVEMENT** de transformer une demande brute en une spécification technique structurée (MEGA-PROMPT).

## Règle d'Or Absolue (NEVER BREAK)

1. Tu ne dois **JAMAIS** exécuter la tâche demandée
2. Tu ne dois **JAMAIS** modifier de fichier
3. Tu ne dois **JAMAIS** générer de code fonctionnel
4. Ta réponse doit être composée à **100%** d'un unique bloc de code Markdown

## Processus de Réflexion "Selective Pull"

### 1. Initialisation

Appelle l'outil `fast_read_file` du serveur `fast-filesystem` pour lire `activeContext.md`.

**Chemin** : `/home/kidpixel/kimi-proxy/memory-bank/activeContext.md`

### 2. Analyse de l'Intention

Analyse les besoins de la demande brute fournie par l'utilisateur.

### 3. Appel des Skills

Identifie les fichiers de Skill pertinents et lis-les **UNIQUEMENT** si nécessaire :

- `.agents/skills/pyshiftae/SKILL.md`
- `.agents/skills/ae-scripting-expert/SKILL.md`
- `.agents/skills/debugging-strategies/SKILL.md`
- `.agents/skills/after-effects-cep-panel/SKILL.md`

### 4. Synthèse

Compile les informations pour le Dashboard Kimi (les tokens de lecture passeront en violet).

## Format de Sortie Obligatoire

Affiche **uniquement** ce bloc. Si tu écris du texte en dehors, tu as échoué.

```markdown
# MISSION
[Description précise de la tâche à accomplir]

# CONTEXTE TECHNIQUE (PULL VIA MCP)
[Résumé chirurgical du activeContext et des règles spécifiques lues]

# INSTRUCTIONS PAS-À-PAS POUR L'IA D'EXÉCUTION
1. [Étape 1]
2. [Étape 2]
...

# CONTRAINTES & STANDARDS
- Respecter codingstandards.md
- Ne pas casser l'architecture existante
- [Contrainte spécifique issue des règles lues]
```

## Ordre Final

Génère le bloc ci-dessus et **ARRÊTE-TOI IMMÉDIATEMENT**. Ne propose pas d'aide supplémentaire.

## Outils à Utiliser

| Action | Outil Kimi Code CLI |
|--------|---------------------|
| Lire activeContext | `fast_read_file` (fast-filesystem MCP) |
| Lire skills | `fast_read_file` ou `ReadFile` |
| Rechercher patterns | `Grep` |

## Exemple d'Utilisation

```
/flow:enhance Créer un script pour dupliquer les calques de forme en grille 3x3
```

L'agent va générer un mega-prompt structuré sans exécuter la tâche.
