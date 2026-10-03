import json

q = json.load(open('/tmp/questions.json', encoding='utf-8'))
for cat in ['RdöSuO', 'GewO/BewachV', 'Datenschutz', 'BGB', 'StGB/StPO', 'Waffen', 'DGUV/UVV', 'UmM', 'Technik']:
    print('#' * 70)
    print('##', cat)
    for b in q:
        if b['categoryKey'] == cat:
            print(f"[{b['index']+1:03d}] D{b['difficulty']} ({b['cluster']}) {b['question']}")
            print(f"      A: {b['correctAnswer']}")
            print(f"      F1: {b['followUp1']}  |  F2: {b['followUp2']}")
