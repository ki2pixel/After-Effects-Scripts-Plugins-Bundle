#!/usr/bin/env python3
"""
Script de vérification automatique des liens dans la documentation docs/
Détecte les liens cassés et génère un rapport de cohérence.
"""

import re
import json
from pathlib import Path
from typing import List, Dict, Tuple
import argparse

def find_broken_links(docs_root: Path) -> List[Dict]:
    """Parcourt tous les fichiers markdown et trouve les liens cassés."""
    pattern = re.compile(r'\[[^\]]+\]\(([^)]+)\)')
    broken = []
    
    for md_path in docs_root.rglob('*.md'):
        try:
            text = md_path.read_text(encoding='utf-8', errors='ignore')
        except Exception as e:
            print(f"Erreur lecture {md_path}: {e}")
            continue
            
        for match in pattern.finditer(text):
            raw = match.group(1).strip()
            if not raw:
                continue
                
            # Nettoyer le lien
            if raw.startswith('<') and raw.endswith('>'):
                raw = raw[1:-1].strip()
                
            lower = raw.lower()
            
            # Ignorer les liens externes
            if lower.startswith(('http://', 'https://', 'mailto:', '#', 'data:')):
                continue
                
            # Extraire le chemin sans ancre ni titre
            link = raw.split(' ')[0]
            link = link.split('#')[0]
            
            if not link:
                continue
                
            # Résoudre le chemin cible
            if link.startswith('/'):
                target = docs_root / link.lstrip('/')
            else:
                target = (md_path.parent / link).resolve()
                
            # Vérifier l'existence
            try:
                exists = target.exists()
            except OSError:
                exists = False
                
            if not exists:
                broken.append({
                    'source': str(md_path.relative_to(docs_root)),
                    'line': text[:match.start()].count('\n') + 1,
                    'link_text': match.group(0),
                    'target': link,
                    'resolved_path': str(target)
                })
    
    return broken

def generate_report(broken_links: List[Dict], docs_root: Path) -> Dict:
    """Génère un rapport structuré."""
    total_files = len(list(docs_root.rglob('*.md')))
    
    # Grouper par fichier source
    by_source = {}
    for link in broken_links:
        source = link['source']
        if source not in by_source:
            by_source[source] = []
        by_source[source].append(link)
    
    # Calculer le score de cohérence
    total_links = sum(len(links) for links in by_source.values())
    coherence_score = max(0, 98 - (total_links * 2))  # Approximation
    
    return {
        'summary': {
            'total_files': total_files,
            'files_with_issues': len(by_source),
            'total_broken_links': len(broken_links),
            'coherence_score': coherence_score
        },
        'files_with_issues': by_source,
        'recommendations': generate_recommendations(by_source)
    }

def generate_recommendations(by_source: Dict) -> List[str]:
    """Génère des recommandations basées sur les erreurs trouvées."""
    recommendations = []
    
    for source, links in by_source.items():
        if 'mediasolution' in source:
            recommendations.append(f"Priorité HAUTE: Corriger les liens dans {source} (impact production)")
        elif 'repomix' in source:
            recommendations.append(f"Moyenne: Mettre à jour les noms de fichiers dans {source}")
        else:
            recommendations.append(f"Basse: Vérifier les liens dans {source}")
    
    if not recommendations:
        recommendations.append("✅ Tous les liens sont valides!")
    
    return recommendations

def main():
    parser = argparse.ArgumentParser(description='Vérification des liens dans la documentation')
    parser.add_argument('docs_path', nargs='?', default='docs', help='Chemin vers le dossier docs')
    parser.add_argument('--json', action='store_true', help='Sortie JSON')
    parser.add_argument('--quiet', action='store_true', help='Mode silencieux (sortie JSON seulement)')
    
    args = parser.parse_args()
    
    docs_root = Path(args.docs_path)
    if not docs_root.exists():
        print(f"Erreur: Le dossier {docs_root} n'existe pas")
        return 1
    
    print(f"🔍 Vérification des liens dans {docs_root}...")
    
    broken_links = find_broken_links(docs_root)
    report = generate_report(broken_links, docs_root)
    
    if args.json:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        # Affichage lisible
        summary = report['summary']
        print(f"\n📊 Résumé:")
        print(f"   Fichiers analysés: {summary['total_files']}")
        print(f"   Fichiers avec problèmes: {summary['files_with_issues']}")
        print(f"   Liens cassés: {summary['total_broken_links']}")
        print(f"   Score de cohérence: {summary['coherence_score']}%")
        
        if summary['total_broken_links'] > 0:
            print(f"\n🚨 Fichiers avec problèmes:")
            for source, links in report['files_with_issues'].items():
                print(f"\n   {source} ({len(links)} liens):")
                for link in links:
                    print(f"     Ligne {link['line']}: {link['link_text']} → {link['target']}")
        
        print(f"\n💡 Recommandations:")
        for rec in report['recommendations']:
            print(f"   • {rec}")
    
    # Code de sortie basé sur le score
    return 0 if report['summary']['coherence_score'] >= 98 else 1

if __name__ == '__main__':
    exit(main())
