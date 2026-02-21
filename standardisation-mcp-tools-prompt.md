# Prompt de Standardisation des Outils MCP

## Objectif
Créer un guide universel pour standardiser l'utilisation des noms d'outils MCP dans tous les projets, en éliminant les préfixes documentaires incorrects.

## Problématique Identifiée

### Incohérence Documentation vs Réalité
- **Documentation** : Utilise des préfixes comme `mcp0_fast_read_file`, `mcp11_get_tasks`, `grep_search`
- **Réalité** : Les outils réels s'appellent `fast_read_file`, `get_tasks`, `search`
- **Impact** : Erreurs d'exécution, confusion pour les développeurs

## Solution Universelle

### Règle d'Or
**Utiliser TOUJOURS les noms réels des outils MCP, sans préfixes documentaires**

```bash
# ❌ Incorrect (avec préfixes)
mcp0_fast_read_file(path="/path/to/file")
mcp11_get_tasks(projectRoot="/path")
grep_search(pattern, path)

# ✅ Correct (noms réels)
fast_read_file(path="/path/to/file")
get_tasks(projectRoot="/path")
search(pattern, path)
```

### Mapping Complet des Serveurs MCP

| Serveur MCP | Préfixes Documentaires à Éliminer | Noms Réels à Utiliser |
|---|---|---|
| fast-filesystem | `mcp0_fast_` | `fast_read_file`, `fast_write_file`, `fast_edit_block`, `fast_search_files`, `fast_list_directory`, `fast_get_directory_tree`, `fast_get_file_info`, `fast_create_directory`, `fast_copy_file`, `fast_move_file`, `fast_delete_file`, `fast_sync_directories`, `fast_compress_files`, `fast_extract_archive`, `fast_find_large_files`, `fast_get_disk_usage`, `fast_batch_file_operations`, `fast_extract_lines`, `fast_edit_multiple_blocks`, `fast_edit_blocks`, `fast_safe_edit`, `fast_large_write_file`, `fast_read_multiple_files`, `fast_search_code` |
| task-master-ai | `mcp11_` | `get_tasks`, `next_task`, `get_task`, `set_task_status`, `update_subtask`, `add_task`, `remove_task`, `expand_task`, `expand_all`, `parse_prd`, `analyze_project_complexity`, `complexity_report`, `add_subtask`, `initialize_project` |
| sequential-thinking | `mcp10_` | `sequentialthinking_tools` |
| filesystem-agent | `mcp1_` | `read_file`, `read_text_file`, `read_media_file`, `read_multiple_files`, `write_file`, `edit_file`, `create_directory`, `list_directory`, `list_directory_with_sizes`, `directory_tree`, `move_file`, `search_files`, `get_file_info`, `list_allowed_directories` |
| ripgrep-agent | `mcp9_` | `search`, `advanced-search`, `count-matches`, `list-files`, `list-file-types` |
| json-query | `mcp2_` | `json_query_jsonpath`, `json_query_search_keys`, `json_query_search_values` |
| render-signal-mcp | `render-signal-mcp` | `create_cron_job`, `create_key_value`, `create_postgres`, `create_static_site`, `create_web_service`, `get_deploy`, `get_key_value`, `get_metrics`, `get_postgres`, `get_selected_workspace`, `get_service`, `list_deploys`, `list_key_value`, `list_log_label_values`, `list_logs`, `list_postgres_instances`, `list_services`, `list_workspaces`, `query_render_postgres`, `select_workspace`, `update_cron_job`, `update_environment_variables`, `update_static_site`, `update_web_service` |
| redis-signal-mcp-server | `redis-signal-mcp-server` | `hset`, `hget`, `hdel`, `hgetall`, `hexists`, `set_vector_in_hash`, `get_vector_from_hash`, `json_set`, `json_get`, `json_del`, `lpush`, `rpush`, `lpop`, `rpop`, `lrange`, `llen`, `delete`, `rename`, `scan_keys`, `scan_all_keys`, `search_redis_documents`, `publish`, `subscribe`, `get_indexes`, `get_index_info`, `get_indexed_keys_number`, `create_vector_index_hash`, `vector_search_hash`, `dbsize`, `info`, `client_list`, `sadd`, `srem`, `smembers`, `zadd`, `zrange`, `zrem`, `xadd`, `xrange`, `xdel`, `set`, `get` |

## Instructions d'Application

### 1. Pour les Créateurs de Documentation
```markdown
## Règle d'Or
Toujours documenter les outils MCP avec leurs **noms réels**, sans préfixes.

### Exemple
Dans les fichiers de règles, skills et documentation :

❌ À éviter :
- "Utilisez `mcp0_fast_read_file` pour lire le fichier"
- "Appelez `mcp11_get_tasks` pour obtenir les tâches"

✅ À privilégier :
- "Utilisez `fast_read_file` pour lire le fichier"
- "Appelez `get_tasks` pour obtenir les tâches"
```

### 2. Pour les Développeurs
```markdown
## Standard d'Utilisation
Toujours utiliser les noms réels des outils MCP dans le code et les commandes.

### Exemple
```bash
# Correct
fast_read_file "/path/to/config.json"
fast_edit_block --file "/path/to/file.js" --search "function oldName" --replacement "function newName"

# Incorrect
mcp0_fast_read_file "/path/to/config.json"  # Échouera
mcp11_get_tasks --projectRoot "/path"  # Échouera
```

### 3. Pour les Outils de Validation
```markdown
## Script de Validation
Créer un script qui vérifie :
1. Les préfixes documentaires ne sont pas utilisés
2. Les noms d'outils correspondent aux noms réels
3. Les chemins et paramètres sont valides

### Exemple de script
```bash
#!/bin/bash
# validate-mcp-tools.sh

echo "🔍 Validation des outils MCP..."

# Vérifier les préfixes incorrects
if grep -r "mcp0_fast_\|mcp11_\|mcp2_\|mcp9_\|mcp10_\|mcp1_" . --include="*.md" --include="*.js" --include="*.py"; then
    echo "❌ Préfixes documentaires détectés"
    exit 1
fi

# Vérifier les noms réels
if grep -r "fast_read_file\|get_tasks\|search\|json_query_jsonpath" . --include="*.md" --include="*.js" --include="*.py"; then
    echo "✅ Noms réels utilisés"
else
    echo "⚠️  Vérification manuelle requise"
fi
```

## Bénéfices

1. **Fiabilité** : Plus d'erreurs d'exécution
2. **Clarté** : Documentation cohérente avec la réalité
3. **Maintenabilité** : Un seul standard à appliquer
4. **Portabilité** : Fonctionne sur tous les projets MCP

## Implémentation

1. **Mettre à jour les fichiers existants** : Remplacer tous les préfixes documentaires
2. **Créer le script de validation** : Automatiser les vérifications
3. **Former les équipes** : Éduquer sur la nouvelle norme
4. **Documenter la migration** : Expliquer les changements

## Conclusion

**Utiliser TOUJOURS les noms réels des outils MCP, jamais les préfixes documentaires.**