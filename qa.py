from pathlib import Path
import re

root = Path(__file__).parent
q = (root / 'js/questions.js').read_text(encoding='utf-8')
ids = [int(x) for x in re.findall(r'\{id:(\d+)', q)]
assert len(ids) == 28, f'Expected 28 questions, got {len(ids)}'
assert ids == list(range(1, 29)), 'Question IDs must be 1..28'

required = [
    'index.html', 'css/style.css', 'js/questions.js', 'js/scoring.js',
    'js/profiles.js', 'js/wheels.js', 'js/report.js', 'js/app.js',
    'README.md', 'assets/logo/hourtime-mark.svg'
]
for f in required:
    assert (root / f).exists(), f'Missing {f}'

profiles = (root / 'js/profiles.js').read_text(encoding='utf-8')
for p in [
    'LE POMPIER DU TEMPS', 'LE ZAPPEUR DU TEMPS', 'LE DONNEUR DE TEMPS',
    'LE CONTRÔLEUR DU TEMPS', 'L’ARCHITECTE DU TEMPS'
]:
    assert p in profiles, f'Missing profile {p}'

wheels = (root / 'js/wheels.js').read_text(encoding='utf-8')
assert len(re.findall(r'id:"R\d{2}"', wheels)) == 24, 'Expected 24 wheel IDs R01..R24'
assert 'R23",title:"Rebondir après un échec"' in wheels, 'Missing required R23 title'
assert 'R24",title:"Construire avec son temps"' in wheels, 'Missing required R24 title'

print('Static QA OK: questions, profiles, wheels and required files present.')
