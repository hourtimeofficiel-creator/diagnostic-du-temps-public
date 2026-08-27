from pathlib import Path
from collections import Counter
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

# Validate mechanisms: 7 per mechanism
mechanisms = re.findall(r'mechanism:"(\w+)"', q)
mech_counts = Counter(mechanisms)
for mech in ['comprendre', 'organiser', 'proteger', 'agir']:
    assert mech_counts[mech] == 7, f'Expected 7 questions for {mech}, got {mech_counts[mech]}'

# Validate pillars: 10 mindset, 11 lifestyle, 7 accomplissement
pillars = re.findall(r'pillar:"(\w+)"', q)
pillar_counts = Counter(pillars)
assert pillar_counts['mindset'] == 10, f'Expected 10 mindset, got {pillar_counts["mindset"]}'
assert pillar_counts['lifestyle'] == 11, f'Expected 11 lifestyle, got {pillar_counts["lifestyle"]}'
assert pillar_counts['accomplissement'] == 7, f'Expected 7 accomplissement, got {pillar_counts["accomplissement"]}'

# Validate max 2 "jours sur 7" format questions (options with "X jours sur 7" labels)
days_formats = re.findall(r'options:FACTUAL_OPTIONS\.days(?:Low|High)ToHigh|options:FACTUAL_OPTIONS\.daysHighToLow', q)
assert len(days_formats) <= 2, f'Max 2 "jours sur 7" format questions allowed, found {len(days_formats)}'

# Validate at least 7 distinct response formats (options arrays)
# Each unique options array key or inline options block counts as a format
option_keys = re.findall(r'options:FACTUAL_OPTIONS\.(\w+)', q)
inline_options = re.findall(r'options:\[', q)
total_formats = len(set(option_keys)) + len(inline_options)
assert total_formats >= 7, f'Expected at least 7 response formats, found {total_formats}'

print('Static QA OK: questions, profiles, wheels and required files present.')

