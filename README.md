# Diagnostic du Temps — HourTime

Application web statique grand public du **Diagnostic du Temps HourTime**, compatible avec GitHub Pages.

## Fonctionnalités

- 28 questions
- 4 mécanismes : Comprendre, Organiser, Protéger, Agir & mieux vivre
- indice HourTime /100
- 5 profils : Le Temps subi, Le Temps dispersé, Le Temps sacrifié, Le Temps contrôlé, Le Temps aligné
- 12 voleurs de temps
- 3 voleurs principaux détectés automatiquement
- mécanisme prioritaire + mécanisme associé
- rouages HourTime à travailler
- recommandations personnalisées
- plan d'action 7 jours
- sauvegarde locale avec `localStorage`
- impression et export PDF
- responsive mobile / tablette / ordinateur
- aucune donnée envoyée vers un serveur

## Arborescence

```text
/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── questions.js
│   ├── scoring.js
│   ├── profiles.js
│   ├── report.js
│   └── app.js
├── assets/
│   └── logo/
│       └── hourtime-mark.svg
├── README.md
├── qa.py
└── .gitignore
```

## Tester en local

Ouvrir `index.html` directement ou lancer :

```bash
python -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

## Publication GitHub Pages

1. Créer un repository, par exemple `diagnostic-du-temps`.
2. Déposer tous les fichiers à la racine.
3. Ouvrir `Settings` > `Pages`.
4. Choisir `Deploy from a branch`.
5. Sélectionner `main` puis `/root`.
6. Enregistrer.

URL habituelle :

```text
https://VOTRE-UTILISATEUR.github.io/diagnostic-du-temps/
```

## Où modifier quoi ?

- Questions : `js/questions.js`
- Pondérations, scores, seuils et voleurs : `js/scoring.js`
- Profils temporels : `js/profiles.js`
- Recommandations, rouages, plan 7 jours et PDF : `js/report.js`
- Navigation et sauvegarde : `js/app.js`
- Design : `css/style.css`

## Logo

`assets/logo/hourtime-mark.svg` est un logo temporaire. Remplacez-le par le logo officiel HourTime si nécessaire.

## PDF

L'export utilise `jsPDF` et `html2canvas` via CDN. Si les CDN sont indisponibles, le bouton Imprimer permet toujours d'enregistrer le résultat au format PDF depuis le navigateur.

## Méthodologie

Cette version constitue une V1 propriétaire HourTime d'auto-évaluation. Les questions, pondérations, seuils et règles de profils devront être testés auprès d'utilisateurs avant toute présentation comme outil scientifiquement ou psychométriquement validé.
