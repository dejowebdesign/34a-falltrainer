"""Extrahiert die Fragenbank (Fragen.txt) in eine strukturierte JSON-Datei.

Dieses Skript dokumentiert den faithful import: Fragen und Antworten werden
1:1 übernommen, es werden keine inhaltlichen Korrekturen vorgenommen.
Aufruf:  python3 scripts/extract-fragen.py
Ergebnis: scripts/fragen-extract.json
"""
import re
import json
import collections

SRC = 'scripts/Fragen.txt'
OUT = 'scripts/fragen-extract.json'

CATEGORY_MAP = {
    'RdöSuO': 'Rechtsordnung / Staatskunde',
    'GewO/BewachV': 'GewO / BewachV',
    'Datenschutz': 'Datenschutz',
    'BGB': 'BGB',
    'StGB/StPO': 'StGB / StPO',
    'Waffen': 'Waffen',
    'DGUV/UVV': 'DGUV / UVV',
    'UmM': 'Umgang mit Menschen',
    'Technik': 'Technik',
}


def main():
    s = open(SRC, encoding='utf-8').read().replace('\r\n', '\n').replace('\r', '\n')
    lines = s.split('\n')
    hdr = re.compile(r'^(?P<cat>.*?)Schwierigkeit:\s*(?P<diff>\d+)\s*Cluster:\s*(?P<cluster>.*)$')

    raw_blocks = []
    i = 0
    while i < len(lines):
        stripped = lines[i].strip()
        if stripped and hdr.match(stripped):
            m = hdr.match(stripped)
            raw_blocks.append({
                'categoryKey': m.group('cat').strip(),
                'difficulty': int(m.group('diff').strip()),
                'cluster': m.group('cluster').strip(),
                'body': [],
            })
            i += 1
            while i < len(lines) and not (lines[i].strip() and hdr.match(lines[i].strip())):
                raw_blocks[-1]['body'].append(lines[i].rstrip())
                i += 1
        else:
            i += 1

    blocks = []
    for idx, rb in enumerate(raw_blocks):
        q = ans = rl = fq1 = fq2 = None
        for line in rb['body']:
            t = line.strip()
            if not t:
                continue
            if t.startswith('Folgefrage 1:'):
                fq1 = t[len('Folgefrage 1:'):].strip()
            elif t.startswith('Folgefrage 2:'):
                fq2 = t[len('Folgefrage 2:'):].strip()
            elif t.startswith('Rechtslehre:'):
                rl = t[len('Rechtslehre:'):].strip()
            elif q is None:
                q = t
            elif ans is None:
                ans = t
        blocks.append({
            'index': idx,
            'categoryKey': rb['categoryKey'],
            'category': CATEGORY_MAP.get(rb['categoryKey'], rb['categoryKey']),
            'difficulty': rb['difficulty'],
            'cluster': rb['cluster'],
            'question': q,
            'correctAnswer': ans,
            'legalReference': rl,
            'followUp1': fq1,
            'followUp2': fq2,
            'rechtslehreMissing': rl is None,
        })

    json.dump(blocks, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('blocks:', len(blocks))
    print('categories:', dict(collections.Counter(b['category'] for b in blocks)))
    print('written', OUT)


if __name__ == '__main__':
    main()
