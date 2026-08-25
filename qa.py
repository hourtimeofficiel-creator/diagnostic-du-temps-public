from pathlib import Path
import re
root=Path(__file__).parent
q=(root/'js/questions.js').read_text(encoding='utf-8')
ids=[int(x) for x in re.findall(r'\{id:(\d+)',q)]
assert len(ids)==28,f'Expected 28 questions, got {len(ids)}'
assert ids==list(range(1,29)),'Question IDs must be 1..28'
required=['index.html','css/style.css','js/questions.js','js/scoring.js','js/profiles.js','js/report.js','js/app.js','README.md','assets/logo/hourtime-mark.svg']
for f in required: assert (root/f).exists(),f'Missing {f}'
profiles=(root/'js/profiles.js').read_text(encoding='utf-8')
for p in ['Temps subi','Temps dispersé','Temps sacrifié','Temps contrôlé','Temps aligné']:
    assert p in profiles,f'Missing profile {p}'
print('Static QA OK: 28 questions, 5 profiles and required files present.')
