---
title: "MediaSolution — API PyShiftBridge"
description: "API pédagogique pour piloter PyShiftAE depuis le panel CEP MediaSolution"
author: "MediaSolution Team"
date: "2026-02-07"
version: "1.2.0"
tags: ["api", "pyshiftae", "cep", "mediasolution", "after-effects"]
---

# MediaSolution — API PyShiftBridge

**TL;DR**: Cette API permet au panel CEP de piloter PyShiftAE sans connaître les détails d'implémentation Python.

Vous construisez un panel MediaSolution et vous voulez automatiser la création de segments dans After Effects. Le problème ; comment faire communiquer votre JavaScript CEP avec PyShiftAE sans geler l'interface ? Cette API résout le problème d'asynchronisme avec un pattern Request/Response simple.

## Le pattern Request/Response : Pourquoi cette API existe

Après Effects exécute tout sur un thread unique. Quand votre JavaScript CEP veut créer des segments, vous ne pouvez pas simplement appeler Python directement ; cela gèlerait toute l'interface pendant plusieurs secondes.

### ❌ L'approche synchrone (qui gèle AE)

```javascript
// Ne faites jamais ça
function applyCuts() {
    // AE reste gelé pendant tout le traitement
    const result = python.execute('create_segments', csvData);
    return result; // Retourne après 30 secondes de gel
}
```

### ✅ L'approche Request/Response (qui préserve AE)

```javascript
// La bonne façon
async function applyCuts() {
    // Envoi asynchrone, AE reste responsive
    const response = await bridge.send('mediasolution_apply_cuts', params);
    return response.result;
}
```

L'API transforme chaque opération en une requête avec ID unique. Le daemon Python traite en arrière-plan et renvoie une réponse quand c'est terminé. Pendant ce temps, votre interface continue de fonctionner normalement.

---

## Endpoints

### mediasolution_apply_cuts_active_layer

**Pourquoi utiliser cet endpoint** : Vous avez un CSV avec des points de coupe et vous voulez automatiquement créer des segments calqués sur une vidéo. L'endpoint gère tout ; parsing CSV, duplication du calque, découpage temporel, et même recentrage intelligent si vous avez des données de tracking.

Applique les cuts CSV à la composition active via PyShiftAE.

#### Requête

```json
{
  "csv_path": "C:/path/to/cuts.csv",
  "frame_rate": 25.0,
  "comp_duration": 300.0,
  "snap_factor": 1.0,
  "tracking_json_path": "C:/path/to/tracking.json",
  "config": {
    "enable_intelligent_recentering": true,
    "label_color": "Blue",
    "delete_original": true
  }
}
```

#### Paramètres

| Nom | Type | Requis | Description |
|---|---|---|---|
| csv_path | string | ✅ | Chemin vers fichier CSV cuts |
| frame_rate | float | ✅ | Frame rate de la composition |
| comp_duration | float | ✅ | Durée totale de la composition |
| snap_factor | float | ✅ | Facteur de snap (1.0 = frame) |
| tracking_json_path | string | ❌ | Chemin vers tracking JSON |
| config | object | ❌ | Options de traitement |

#### Réponse

```json
{
  "status": "success",
  "created": 12,
  "segments": [
    {
      "start": 0.0,
      "end": 5.2,
      "layer_name": "Segment_001",
      "recentered": true,
      "label_applied": "Blue"
    }
  ],
  "notes": [
    "SUCCESS: Created 12 segments",
    "INFO: Intelligent recentering applied to 8 segments"
  ]
}
```

#### Erreurs

| Code | Message | Cause |
|---|---|---|
| INVALID_CSV | "CSV file not found or invalid format" | Fichier manquant ou mal formaté |
| INVALID_FRAME_RATE | "Frame rate must be > 0" | frame_rate ≤ 0 |
| NO_ACTIVE_LAYER | "No active layer found" | Pas de calque sélectionné |
| PYSHIFTAE_ERROR | "PyShiftAE operation failed: ..." | Erreur interne PyShiftAE |

---

### mediasolution_apply_auto_recentering

**Pourquoi utiliser cet endpoint** : Vous avez un objet qui se déplace dans votre vidéo et vous voulez que chaque segment le suive automatiquement. Au lieu de recentrer manuellement chaque segment, l'endpoint utilise les données de tracking pour recentrer intelligemment chaque portion.

Recentrage automatique basé sur tracking JSON.

*Status: disponible*

#### Requête

```json
{
  "tracking_json_path": "C:/path/to/tracking.json",
  "config": {
    "score_threshold": 0.5,
    "area_threshold": 100,
    "label_color": "Green",
    "apply_to_all_layers": false
  }
}
```

#### Réponse

```json
{
  "status": "success",
  "layers_updated": 3,
  "notes": [
    "SUCCESS: Recentered 3 layers",
    "INFO: Best object selected for each layer"
  ]
}
```

---

### ping

**Pourquoi utiliser cet endpoint** : Avant de lancer un traitement long, vous voulez vérifier que le daemon PyShiftBridge est bien actif et responsive. C'est l'équivalent de "test de connexion" pour votre API.

Vérification de santé du daemon PyShiftBridge.

*Status: disponible*

#### Requête

```json
{}
```

*Note*: Le endpoint `ping` ne requiert aucun paramètre. Il sert uniquement à vérifier que le daemon PyShiftBridge est actif et responsive.

#### Réponse

```json
{
  "status": "ok",
  "timestamp": "2026-02-06T22:30:00Z",
  "version": "1.0.0",
  "transport": "pipe"
}
```

---

## Trade-offs : Approches d'automatisation

Le bridge offre trois approches pour l'automatisation, chacune avec ses avantages. Le choix se fait selon votre contexte et vos besoins de performance.

| Approche | Vitesse | Fiabilité | Configuration | Idéal pour |
|-----------|---------|-----------|---------------|------------|
| **ExtendScript pur** | ~10s+ | Maximale | Aucune | Scripts simples, compatibilité maximale |
| **Hybrid 1.0 (mailbox)** | ~2-3s | Élevée | Moyenne | Transition douce, fallback garanti |
| **Hybrid 2.0 (PyShiftBridge)** | ~200ms | Élevée | Moyenne | Production, performance maximale |

### Pourquoi le fallback existe

Parfois, les pipes/sockets ne fonctionnent pas (permissions, firewall, etc.). Au lieu de laisser l'interface cassée, le bridge bascule automatiquement sur Mailbox JSON. C'est plus lent, mais ça fonctionne partout.

> **Note** : Pour les détails complets sur l'architecture de communication, voir [bridge_communication.md](../bridge_communication.md).

---

## Transport

### Mailbox JSON

```javascript
function _sendPyShiftBridgeMailbox(cmd, timeout) {
    var mailbox = new File(Folder.temp + "/pyshift_bridge_mailbox.json");
    mailbox.open("w");
    mailbox.write(JSON.stringify(cmd));
    mailbox.close();
    
    return _readPyShiftBridgeMailbox(timeout);
}
```

### Named Pipe/Socket

```javascript
const bridge = new PyShiftBridge();
const result = await bridge.sendCommand('mediasolution_apply_cuts_active_layer', params);
```

---

## Implémentation

### JavaScript (CEP → Host)

```javascript
function applyCuts(csvPath, trackingPath, config) {
    var params = {
        csv_path: csvPath,
        frame_rate: 25.0,
        comp_duration: 300.0,
        snap_factor: 1.0,
        tracking_json_path: trackingPath,
        config: config
    };
    
    var result = host.applyCuts(params);
    
    if (result.status === "success") {
        console.log("Created " + result.created + " segments");
        updateUI(result.segments);
    } else {
        showError(result.error);
    }
}
```

### Python (daemon → PyShiftAE)

```python
def mediasolution_apply_cuts_active_layer(csv_path, frame_rate, comp_duration, 
                                        snap_factor, tracking_json_path, config):
    try:
        segments = parse_segments_from_csv_content(csv_path, frame_rate, snap_factor)
        
        tracking_data = None
        if tracking_json_path:
            tracking_data = _load_tracking_data_by_frame(tracking_json_path)
        
        created_segments = []
        with ae.UndoGroup("MediaSolution Cuts"):
            for i, seg in enumerate(segments):
                layer = duplicate_active_layer(f"Segment_{i+1:03d}")
                layer.in_point = seg.start
                layer.duration = seg.end: seg.start
                
                if tracking_data and config.get('enable_intelligent_recentering'):
                    recenter_layer_from_tracking(layer, tracking_data, seg)
                
                if config.get('label_color'):
                    layer.label = config['label_color']
                
                created_segments.append({
                    'start': seg.start,
                    'end': seg.end,
                    'layer_name': layer.name,
                    'recentered': bool(tracking_data),
                    'label_applied': config.get('label_color')
                })
            
            if config.get('delete_original'):
                ae.Layer.active_layer().delete()
        
        return {
            'status': 'success',
            'created': len(created_segments),
            'segments': created_segments,
            'notes': [f"SUCCESS: Created {len(created_segments)} segments"]
        }
        
    except Exception as e:
        return {
            'status': 'error',
            'error': str(e),
            'created': 0,
            'segments': [],
            'notes': [f"ERROR: {str(e)}"]
        }
```

---

## Configuration

### Flags CEP

| Flag | Type | Défaut | Description |
|---|---|---|---|
| enablePythonCutsParser | boolean | false | Activer parsing Python |
| enablePythonRecentering | boolean | false | Activer recentrage Python |
| enablePythonProjectOpen | boolean | false | Activer ouverture projet Python (opt-in)
| enablePythonBaseAepCreation | boolean | false | Activer création AEP base Python (opt-in)
| enableHealthCheck | boolean | false | Vérifier santé daemon |

### Runtime

```javascript
host.updateRuntimeConfig({
    enablePythonCutsParser: true,
    enablePythonRecentering: false,
    enablePythonProjectOpen: false,
    enablePythonBaseAepCreation: false,
    enableHealthCheck: true
});
```

---

## Performance

| Opération | Temps moyen | Notes |
|---|---|---|
| CSV parsing | < 100ms | 1k lignes |
| Segment creation | ~50ms/segment | Duplication + time slicing |
| Intelligent recentering | ~200ms/segment | Tracking lookup + math |
| Full batch (10 segments) | ~1-2s | Including undo group |

---

## Debug

### Logs PyShiftBridge

```python
import logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s: %(levelname)s: %(message)s')

logger.info(f"Processing {len(segments)} segments")
logger.error(f"PyShiftAE error: {str(e)}")
```

### Logs CEP

```javascript
console.log("MediaSolution: Applying cuts via PyShiftAE");
console.error("MediaSolution: Daemon unreachable", error);
```

### Logs AE

```javascript
$.writeln("MediaSolution: PyShiftBridge daemon active");
$.writeln("MediaSolution: ERROR: " + error.toString());
```

---

## The Golden Rule: Batch Operations Pure Python, UI Stays CEP

Keep the user interface in CEP/JSX where it belongs, but route any batch processing that would freeze After Effects through PyShiftBridge to pure Python. This gives you responsive UI with the power of Python automation.

## Références

- [Guide d'intégration](./mediasolution_pyshiftae_integration.md)
- [Guide de déploiement](./mediasolution_deploy_windows.md)
- [Architecture PyShiftBridge](../bridge_communication.md)

---

